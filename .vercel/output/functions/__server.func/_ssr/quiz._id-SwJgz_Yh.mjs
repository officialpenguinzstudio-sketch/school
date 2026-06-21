import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { R as Route, u as useAuth, a as useServerFn } from "./router-BkKrKimK.mjs";
import { B as Button } from "./button-DjOZMqFS.mjs";
import { I as Input } from "./input-D_U8fI25.mjs";
import { u as ue } from "../_libs/sonner.mjs";
import { i as getFormForQuiz, s as submitQuiz } from "./submissions.functions-YOHQta7i.mjs";
import "../_libs/seroval.mjs";
import { C as Clock, k as ChevronLeft, l as Send, m as ChevronRight } from "../_libs/lucide-react.mjs";
import { m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "../_libs/scheduler.mjs";
import "stream";
import "util";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./server-LI3vKvOL.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function QuizRunner() {
  const {
    id
  } = Route.useParams();
  const {
    user,
    loading
  } = useAuth();
  const navigate = useNavigate();
  const [idx, setIdx] = reactExports.useState(0);
  const [answers, setAnswers] = reactExports.useState({});
  const [direction, setDirection] = reactExports.useState(1);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const startRef = reactExports.useRef(Date.now());
  const [timeLeft, setTimeLeft] = reactExports.useState(null);
  const fetchForm = useServerFn(getFormForQuiz);
  const submit = useServerFn(submitQuiz);
  reactExports.useEffect(() => {
    if (!loading && !user) navigate({
      to: "/"
    });
  }, [user, loading, navigate]);
  const {
    data
  } = useQuery({
    queryKey: ["form-quiz", id],
    enabled: !!user,
    queryFn: () => fetchForm({
      data: {
        formId: id
      }
    })
  });
  const form = data?.form;
  const questions = data?.questions ?? [];
  reactExports.useEffect(() => {
    if (form?.has_timer && form.time_limit_minutes) {
      setTimeLeft(form.time_limit_minutes * 60);
    }
  }, [form]);
  reactExports.useEffect(() => {
    if (timeLeft == null) return;
    if (timeLeft <= 0) {
      handleSubmit(true);
      return;
    }
    const t = setTimeout(() => setTimeLeft((v) => v == null ? null : v - 1), 1e3);
    return () => clearTimeout(t);
  }, [timeLeft]);
  const current = questions[idx];
  const isLast = idx === questions.length - 1;
  async function handleSubmit(auto = false) {
    if (submitting || !user) return;
    setSubmitting(true);
    const duration = Math.round((Date.now() - startRef.current) / 1e3);
    try {
      const res = await submit({
        data: {
          formId: id,
          answers,
          durationSeconds: duration
        }
      });
      ue.success(auto ? `Time's up! ${res.score}/${res.total}` : `Submitted — ${res.score}/${res.total}`);
      navigate({
        to: "/student"
      });
    } catch (e) {
      ue.error(e?.message ?? "Submission failed");
    } finally {
      setSubmitting(false);
    }
  }
  if (!user || !form) return null;
  if (questions.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-screen grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No questions in this quiz." }) });
  }
  const progress = (idx + 1) / questions.length * 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-screen px-4 py-6 sm:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "glass mb-6 flex items-center justify-between rounded-2xl px-5 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: form.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium", children: [
          "Slide ",
          idx + 1,
          " of ",
          questions.length
        ] })
      ] }),
      timeLeft != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-2 rounded-lg px-3 py-1.5 font-mono text-sm ${timeLeft < 60 ? "bg-destructive/20 text-destructive" : "bg-primary/15 text-primary"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4" }),
        formatClock(timeLeft)
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 h-1.5 overflow-hidden rounded-full bg-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "h-full bg-gradient-to-r from-primary to-accent", animate: {
      width: `${progress}%`
    } }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative min-h-[360px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", custom: direction, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { custom: direction, initial: {
      opacity: 0,
      x: direction * 80
    }, animate: {
      opacity: 1,
      x: 0
    }, exit: {
      opacity: 0,
      x: -direction * 80
    }, transition: {
      duration: 0.35,
      ease: "easeOut"
    }, className: "glass-strong rounded-3xl p-7", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: [
        "Question ",
        idx + 1
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 text-xl font-semibold leading-snug sm:text-2xl", children: current.question_text }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 space-y-3", children: current.question_type === "multiple_choice" && Array.isArray(current.options_json) ? current.options_json.map((opt) => {
        const active = answers[current.id] === opt;
        return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setAnswers((a) => ({
          ...a,
          [current.id]: opt
        })), className: `w-full rounded-xl border px-4 py-3 text-left transition-all ${active ? "border-primary bg-primary/15 text-foreground glow" : "border-white/10 bg-background/30 hover:border-white/20"}`, children: opt }, opt);
      }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: answers[current.id] ?? "", onChange: (e) => setAnswers((a) => ({
        ...a,
        [current.id]: e.target.value
      })), placeholder: "Type your answer…", className: "h-12 bg-input/40 border-white/10" }) })
    ] }, current.id) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "gap-1 border-white/10", disabled: idx === 0, onClick: () => {
        setDirection(-1);
        setIdx((i) => Math.max(0, i - 1));
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }),
        " Previous"
      ] }),
      isLast ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => handleSubmit(false), disabled: submitting, className: "gap-2 bg-gradient-to-r from-success to-primary text-primary-foreground glow", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }),
        submitting ? "Submitting…" : "Submit Answers"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => {
        setDirection(1);
        setIdx((i) => Math.min(questions.length - 1, i + 1));
      }, className: "gap-1 bg-gradient-to-r from-primary to-accent text-primary-foreground", children: [
        "Next ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
      ] })
    ] })
  ] }) });
}
function formatClock(s) {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m.toString().padStart(2, "0")}:${r.toString().padStart(2, "0")}`;
}
export {
  QuizRunner as component
};
