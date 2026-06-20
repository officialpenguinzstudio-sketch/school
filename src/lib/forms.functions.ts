import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const QuestionInput = z.object({
  question_text: z.string().min(1),
  question_type: z.enum(["multiple_choice", "short_answer"]),
  options: z.array(z.string()).optional(),
  correct_answer: z.string().min(1),
});

export const listPublishedForms = createServerFn({ method: "GET" }).handler(async () => {
  const { requireStudent } = await import("./guards.server");
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  await requireStudent();
  const { data } = await supabaseAdmin
    .from("forms")
    .select("id, title, description, type, has_timer, time_limit_minutes")
    .eq("is_published", true)
    .order("created_at", { ascending: false });
  return data ?? [];
});

export const listAdminForms = createServerFn({ method: "GET" }).handler(async () => {
  const { requireAdmin } = await import("./guards.server");
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  await requireAdmin();
  const { data } = await supabaseAdmin
    .from("forms")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
});

export const getFormForQuiz = createServerFn({ method: "POST" })
  .validator((d) => z.object({ formId: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    const { requireStudent } = await import("./guards.server");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await requireStudent();

    const { data: form } = await supabaseAdmin
      .from("forms")
      .select("id, title, description, type, has_timer, time_limit_minutes, is_published")
      .eq("id", data.formId)
      .maybeSingle();
    if (!form || !form.is_published) throw new Error("Quiz unavailable");

    // CRITICAL: never return correct_answer to the client
    const { data: questions } = await supabaseAdmin
      .from("questions")
      .select("id, question_text, question_type, options_json, order_index")
      .eq("form_id", data.formId)
      .order("order_index");

    return { form, questions: questions ?? [] };
  });

export const getQuestionCount = createServerFn({ method: "POST" })
  .validator((d) => z.object({ formId: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    const { requireUser } = await import("./guards.server");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await requireUser();
    const { count } = await supabaseAdmin
      .from("questions")
      .select("*", { count: "exact", head: true })
      .eq("form_id", data.formId);
    return count ?? 0;
  });

export const createForm = createServerFn({ method: "POST" })
  .validator((d) =>
    z.object({
      title: z.string().min(1),
      description: z.string().nullable(),
      type: z.enum(["quiz", "test"]),
      has_timer: z.boolean(),
      time_limit_minutes: z.number().nullable(),
      questions: z.array(QuestionInput).min(1),
    }).parse(d),
  )
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./guards.server");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await requireAdmin();

    const { data: form, error } = await supabaseAdmin
      .from("forms")
      .insert({
        title: data.title,
        description: data.description,
        type: data.type,
        has_timer: data.has_timer,
        time_limit_minutes: data.time_limit_minutes,
      })
      .select("id")
      .single();
    if (error || !form) throw new Error("Could not create form");

    const rows = data.questions.map((q, i) => ({
      form_id: form.id,
      question_text: q.question_text,
      question_type: q.question_type,
      options_json: q.question_type === "multiple_choice" ? q.options : null,
      correct_answer: q.correct_answer,
      order_index: i,
    }));

    const { error: qErr } = await supabaseAdmin.from("questions").insert(rows);
    if (qErr) throw new Error("Could not save questions");

    return { id: form.id };
  });

export const deleteForm = createServerFn({ method: "POST" })
  .validator((d) => z.object({ formId: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./guards.server");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await requireAdmin();

    const { error } = await supabaseAdmin
      .from("forms")
      .delete()
      .eq("id", data.formId);
    if (error) throw new Error("Could not delete form");

    return { ok: true };
  });

export const getFormReview = createServerFn({ method: "POST" })
  .validator((d) => z.object({ formId: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./guards.server");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await requireAdmin();

    const { data: form } = await supabaseAdmin
      .from("forms")
      .select("id, title")
      .eq("id", data.formId)
      .maybeSingle();

    const { data: questions } = await supabaseAdmin
      .from("questions")
      .select("id, question_text, question_type, options_json, correct_answer, order_index")
      .eq("form_id", data.formId)
      .order("order_index");

    const { data: subs } = await supabaseAdmin
      .from("submissions")
      .select("*")
      .eq("form_id", data.formId);

    const { data: students } = await supabaseAdmin
      .from("users")
      .select("id, name")
      .eq("role", "student")
      .eq("disabled", false);

    return {
      form,
      questions: questions ?? [],
      subs: subs ?? [],
      students: students ?? [],
    };
  });

