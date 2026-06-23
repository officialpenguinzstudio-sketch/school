import { createServerFn } from "@tanstack/react-start";

/**
 * Get the public URL of the current "meme of the day" image.
 * Returns null if no meme has been uploaded yet.
 */
export const getMemeUrl = createServerFn({ method: "GET" }).handler(
  async (): Promise<string | null> => {
    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );

    const { data } = await supabaseAdmin.storage
      .from("memes")
      .list("", { limit: 1, sortBy: { column: "created_at", order: "desc" } });

    if (!data || data.length === 0) return null;

    const {
      data: { publicUrl },
    } = supabaseAdmin.storage.from("memes").getPublicUrl(data[0].name);

    return publicUrl;
  },
);

/**
 * Admin-only: upload a new meme image, replacing any existing one.
 * Accepts a base64-encoded image string with its MIME type.
 */
export const uploadMeme = createServerFn({ method: "POST" })
  .validator(
    (d: unknown) => d as { base64: string; mimeType: string; fileName: string },
  )
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./guards.server");
    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );
    await requireAdmin();

    // Remove all existing memes first
    const { data: existing } = await supabaseAdmin.storage
      .from("memes")
      .list("");
    if (existing && existing.length > 0) {
      await supabaseAdmin.storage
        .from("memes")
        .remove(existing.map((f) => f.name));
    }

    // Decode base64 and upload
    const buffer = Buffer.from(data.base64, "base64");
    const ext = data.fileName.split(".").pop() || "png";
    const name = `meme-${Date.now()}.${ext}`;

    const { error } = await supabaseAdmin.storage
      .from("memes")
      .upload(name, buffer, {
        contentType: data.mimeType,
        upsert: true,
      });

    if (error) throw new Error("Failed to upload meme: " + error.message);
    return { ok: true };
  });

/**
 * Admin-only: remove the current meme image.
 */
export const removeMeme = createServerFn({ method: "POST" }).handler(
  async () => {
    const { requireAdmin } = await import("./guards.server");
    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );
    await requireAdmin();

    const { data: existing } = await supabaseAdmin.storage
      .from("memes")
      .list("");
    if (existing && existing.length > 0) {
      await supabaseAdmin.storage
        .from("memes")
        .remove(existing.map((f) => f.name));
    }

    return { ok: true };
  },
);
