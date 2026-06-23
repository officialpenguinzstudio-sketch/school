import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getAssignments = createServerFn({ method: "GET" }).handler(async () => {
  const { requireUser } = await import("./guards.server");
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  await requireUser();

  const { data, error } = await supabaseAdmin
    .from("assignments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getStudentCompletions = createServerFn({ method: "GET" }).handler(async () => {
  const { requireUser, getUser } = await import("./guards.server");
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  
  await requireUser();
  const user = await getUser();

  // If guest, they haven't completed anything
  if (user?.id === "guest") return [];

  const { data, error } = await supabaseAdmin
    .from("assignment_completions")
    .select("assignment_id")
    .eq("student_id", user?.id);

  if (error) throw new Error(error.message);
  return data?.map((d: any) => d.assignment_id) ?? [];
});

export const markAssignmentDone = createServerFn({ method: "POST" })
  .validator((d) => z.object({ assignmentId: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    const { requireUser, getUser } = await import("./guards.server");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    
    await requireUser();
    const user = await getUser();
    
    if (user?.id === "guest") throw new Error("Guests cannot complete assignments");

    const { error } = await supabaseAdmin
      .from("assignment_completions")
      .insert({
        assignment_id: data.assignmentId,
        student_id: user?.id,
      });

    if (error) throw new Error(error.message);
    return { success: true };
  });

export const createAssignment = createServerFn({ method: "POST" })
  .validator((d) => z.object({
    title: z.string().min(1),
    instruction: z.string().min(1),
    deadline_at: z.string().nullable(),
    base64Image: z.string().optional(),
    mimeType: z.string().optional(),
    fileName: z.string().optional(),
  }).parse(d))
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./guards.server");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await requireAdmin();

    let image_url = null;

    if (data.base64Image && data.mimeType && data.fileName) {
      const fileBuffer = Buffer.from(data.base64Image, "base64");
      const uniqueName = `${Date.now()}_${data.fileName.replace(/[^a-zA-Z0-9.\-_]/g, "")}`;
      const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
        .from("assignments")
        .upload(uniqueName, fileBuffer, {
          contentType: data.mimeType,
          upsert: true,
        });

      if (uploadError) throw new Error("Image upload failed: " + uploadError.message);
      
      const { data: publicData } = supabaseAdmin.storage.from("assignments").getPublicUrl(uniqueName);
      image_url = publicData.publicUrl;
    }

    const { data: row, error } = await supabaseAdmin
      .from("assignments")
      .insert({
        title: data.title,
        instruction: data.instruction,
        deadline_at: data.deadline_at,
        image_url,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return row;
  });

export const deleteAssignment = createServerFn({ method: "POST" })
  .validator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./guards.server");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await requireAdmin();

    const { error } = await supabaseAdmin
      .from("assignments")
      .delete()
      .eq("id", data.id);

    if (error) throw new Error(error.message);
    return { success: true };
  });
