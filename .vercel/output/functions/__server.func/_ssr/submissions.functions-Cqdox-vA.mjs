import { c as createServerRpc } from "./createServerRpc-DjT8d_2n.mjs";
import { c as createServerFn } from "./server-LI3vKvOL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, n as numberType, r as recordType, s as stringType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "../_libs/scheduler.mjs";
import "stream";
import "util";
import "../_libs/isbot.mjs";
const submitQuiz_createServerFn_handler = createServerRpc({
  id: "0555f3e448c5dec7fda8f685da7f3772d4cf3ad07697971ab4d6865f102d7150",
  name: "submitQuiz",
  filename: "src/lib/submissions.functions.ts"
}, (opts) => submitQuiz.__executeServer(opts));
const submitQuiz = createServerFn({
  method: "POST"
}).validator((d) => objectType({
  formId: stringType().uuid(),
  answers: recordType(stringType(), stringType()),
  durationSeconds: numberType().int().nonnegative().max(60 * 60 * 24)
}).parse(d)).handler(submitQuiz_createServerFn_handler, async ({
  data
}) => {
  const {
    requireStudent
  } = await import("./guards.server-Do8_C0UY.mjs");
  const {
    supabaseAdmin
  } = await import("./client.server-C8UZwOtV.mjs");
  const me = await requireStudent();
  const {
    data: form
  } = await supabaseAdmin.from("forms").select("id, is_published").eq("id", data.formId).maybeSingle();
  if (!form || !form.is_published) throw new Error("Quiz unavailable");
  const {
    data: existing
  } = await supabaseAdmin.from("submissions").select("id").eq("form_id", data.formId).eq("student_id", me.id).maybeSingle();
  if (existing) throw new Error("Already submitted");
  const {
    data: questions
  } = await supabaseAdmin.from("questions").select("id, correct_answer").eq("form_id", data.formId);
  let score = 0;
  for (const q of questions ?? []) {
    const a = (data.answers[q.id] ?? "").trim().toLowerCase();
    if (a && a === (q.correct_answer ?? "").trim().toLowerCase()) score++;
  }
  const total = (questions ?? []).length;
  const {
    error: insertErr
  } = await supabaseAdmin.from("submissions").insert({
    form_id: data.formId,
    student_id: me.id,
    answers_json: data.answers,
    score,
    total_questions: total,
    duration_seconds: data.durationSeconds,
    submitted_at: (/* @__PURE__ */ new Date()).toISOString()
  });
  if (insertErr) throw new Error("Could not save submission");
  return {
    score,
    total
  };
});
const getMySubmissions_createServerFn_handler = createServerRpc({
  id: "70b837ca04fbbc9c9a7073a089837beb1985f7ebc70ee21dadc9b81aaf7f7eaa",
  name: "getMySubmissions",
  filename: "src/lib/submissions.functions.ts"
}, (opts) => getMySubmissions.__executeServer(opts));
const getMySubmissions = createServerFn({
  method: "GET"
}).handler(getMySubmissions_createServerFn_handler, async () => {
  const {
    requireStudent
  } = await import("./guards.server-Do8_C0UY.mjs");
  const {
    supabaseAdmin
  } = await import("./client.server-C8UZwOtV.mjs");
  const me = await requireStudent();
  const {
    data
  } = await supabaseAdmin.from("submissions").select("form_id, score, total_questions, duration_seconds").eq("student_id", me.id);
  return data ?? [];
});
const getLeaderboard_createServerFn_handler = createServerRpc({
  id: "014feeb62350dcb3c1604586a7c738d656d284d9ae4638c2346a9a2808166c31",
  name: "getLeaderboard",
  filename: "src/lib/submissions.functions.ts"
}, (opts) => getLeaderboard.__executeServer(opts));
const getLeaderboard = createServerFn({
  method: "POST"
}).validator((d) => objectType({
  formId: stringType().uuid()
}).parse(d)).handler(getLeaderboard_createServerFn_handler, async ({
  data
}) => {
  const {
    requireUser
  } = await import("./guards.server-Do8_C0UY.mjs");
  const {
    supabaseAdmin
  } = await import("./client.server-C8UZwOtV.mjs");
  await requireUser();
  const {
    data: subs
  } = await supabaseAdmin.from("submissions").select("score, total_questions, duration_seconds, student_id").eq("form_id", data.formId);
  const {
    data: students
  } = await supabaseAdmin.from("users").select("id, name").eq("role", "student");
  const nameMap = new Map((students ?? []).map((s) => [s.id, s.name]));
  const rows = (subs ?? []).map((r) => ({
    name: nameMap.get(r.student_id) ?? "—",
    score: r.score,
    total: r.total_questions,
    time: r.duration_seconds
  }));
  rows.sort((a, b) => b.score - a.score || a.time - b.time);
  return rows;
});
const getDashboardStats_createServerFn_handler = createServerRpc({
  id: "06a64a7a092e60a0091030f99fe6bf18dac2b6b9e7cb3b01ca949347c182918a",
  name: "getDashboardStats",
  filename: "src/lib/submissions.functions.ts"
}, (opts) => getDashboardStats.__executeServer(opts));
const getDashboardStats = createServerFn({
  method: "GET"
}).handler(getDashboardStats_createServerFn_handler, async () => {
  const {
    requireAdmin
  } = await import("./guards.server-Do8_C0UY.mjs");
  const {
    supabaseAdmin
  } = await import("./client.server-C8UZwOtV.mjs");
  await requireAdmin();
  const [{
    data: subs
  }, {
    count: formCount
  }, {
    count: studentCount
  }, {
    data: forms
  }] = await Promise.all([supabaseAdmin.from("submissions").select("score, total_questions, form_id"), supabaseAdmin.from("forms").select("*", {
    count: "exact",
    head: true
  }), supabaseAdmin.from("users").select("*", {
    count: "exact",
    head: true
  }).eq("role", "student"), supabaseAdmin.from("forms").select("id, title")]);
  const list = subs ?? [];
  let pass = 0, fail = 0, sum = 0;
  list.forEach((s) => {
    const pct = s.score / Math.max(1, s.total_questions) * 100;
    if (pct >= 50) pass++;
    else fail++;
    sum += pct;
  });
  const avg = list.length ? Math.round(sum / list.length) : 0;
  const perForm = (forms ?? []).map((f) => {
    const s = list.filter((x) => x.form_id === f.id);
    const a = s.length ? Math.round(s.reduce((acc, b) => acc + b.score / Math.max(1, b.total_questions) * 100, 0) / s.length) : 0;
    return {
      name: f.title.slice(0, 14),
      avg: a
    };
  });
  return {
    pass,
    fail,
    avg,
    total: list.length,
    formCount: formCount ?? 0,
    studentCount: studentCount ?? 0,
    perForm
  };
});
export {
  getDashboardStats_createServerFn_handler,
  getLeaderboard_createServerFn_handler,
  getMySubmissions_createServerFn_handler,
  submitQuiz_createServerFn_handler
};
