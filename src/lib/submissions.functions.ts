import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const submitQuiz = createServerFn({ method: "POST" })
  .validator((d) =>
    z
      .object({
        formId: z.string().uuid(),
        answers: z.record(z.string(), z.string()),
        durationSeconds: z.number().int().nonnegative().max(60 * 60 * 24),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const { requireStudent } = await import("./guards.server");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const me = await requireStudent();

    const { data: form } = await supabaseAdmin
      .from("forms")
      .select("id, is_published")
      .eq("id", data.formId)
      .maybeSingle();
    if (!form || !form.is_published) throw new Error("Quiz unavailable");

    // Prevent duplicate submissions
    const { data: existing } = await supabaseAdmin
      .from("submissions")
      .select("id")
      .eq("form_id", data.formId)
      .eq("student_id", me.id)
      .maybeSingle();
    if (existing) throw new Error("Already submitted");

    const { data: questions } = await supabaseAdmin
      .from("questions")
      .select("id, correct_answer")
      .eq("form_id", data.formId);

    let score = 0;
    for (const q of questions ?? []) {
      const a = (data.answers[q.id] ?? "").trim().toLowerCase();
      if (a && a === (q.correct_answer ?? "").trim().toLowerCase()) score++;
    }
    const total = (questions ?? []).length;

    const { error: insertErr } = await supabaseAdmin.from("submissions").insert({
      form_id: data.formId,
      student_id: me.id,
      answers_json: data.answers,
      score,
      total_questions: total,
      duration_seconds: data.durationSeconds,
      submitted_at: new Date().toISOString(),
    });
    if (insertErr) throw new Error("Could not save submission");

    return { score, total };
  });

export const getMySubmissions = createServerFn({ method: "GET" }).handler(async () => {
  const { requireStudent } = await import("./guards.server");
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const me = await requireStudent();
  const { data } = await supabaseAdmin
    .from("submissions")
    .select("form_id, score, total_questions, duration_seconds")
    .eq("student_id", me.id);
  return data ?? [];
});

export const getLeaderboard = createServerFn({ method: "POST" })
  .validator((d) => z.object({ formId: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    const { requireUser } = await import("./guards.server");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await requireUser();
    const { data: subs } = await supabaseAdmin
      .from("submissions")
      .select("score, total_questions, duration_seconds, student_id")
      .eq("form_id", data.formId);
    const { data: students } = await supabaseAdmin
      .from("users")
      .select("id, name")
      .eq("role", "student");
    const nameMap = new Map((students ?? []).map((s: any) => [s.id, s.name as string]));
    const rows = (subs ?? []).map((r: any) => ({
      name: nameMap.get(r.student_id) ?? "—",
      score: r.score as number,
      total: r.total_questions as number,
      time: r.duration_seconds as number,
    }));
    rows.sort((a, b) => b.score - a.score || a.time - b.time);
    return rows;
  });

export const getDashboardStats = createServerFn({ method: "GET" }).handler(async () => {
  const { requireAdmin } = await import("./guards.server");
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  await requireAdmin();
  const [{ data: subs }, { count: formCount }, { count: studentCount }, { data: forms }] =
    await Promise.all([
      supabaseAdmin.from("submissions").select("score, total_questions, form_id"),
      supabaseAdmin.from("forms").select("*", { count: "exact", head: true }),
      supabaseAdmin
        .from("users")
        .select("*", { count: "exact", head: true })
        .eq("role", "student"),
      supabaseAdmin.from("forms").select("id, title"),
    ]);
  const list = subs ?? [];
  let pass = 0,
    fail = 0,
    sum = 0;
  list.forEach((s: any) => {
    const pct = (s.score / Math.max(1, s.total_questions)) * 100;
    if (pct >= 50) pass++;
    else fail++;
    sum += pct;
  });
  const avg = list.length ? Math.round(sum / list.length) : 0;
  const perForm = (forms ?? []).map((f: any) => {
    const s = list.filter((x: any) => x.form_id === f.id);
    const a = s.length
      ? Math.round(
          s.reduce(
            (acc: number, b: any) =>
              acc + (b.score / Math.max(1, b.total_questions)) * 100,
            0,
          ) / s.length,
        )
      : 0;
    return { name: f.title.slice(0, 14), avg: a };
  });
  return {
    pass,
    fail,
    avg,
    total: list.length,
    formCount: formCount ?? 0,
    studentCount: studentCount ?? 0,
    perForm,
  };
});
