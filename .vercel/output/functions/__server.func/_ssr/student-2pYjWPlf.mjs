import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useAuth, a as useServerFn } from "./router-BkKrKimK.mjs";
import { B as Button } from "./button-DjOZMqFS.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription } from "./dialog-DNrxlBog.mjs";
import { l as listPublishedForms, g as getMySubmissions, a as getQuestionCount, b as getLeaderboard } from "./submissions.functions-YOHQta7i.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import { L as LogOut, F as FileText, C as Clock, a as CircleCheck, T as Trophy, b as CirclePlay } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function StudentDashboard() {
  const {
    user,
    loading,
    logout
  } = useAuth();
  const navigate = useNavigate();
  const fetchForms = useServerFn(listPublishedForms);
  const fetchSubs = useServerFn(getMySubmissions);
  reactExports.useEffect(() => {
    if (loading) return;
    if (!user) navigate({
      to: "/"
    });
    else if (user.role !== "student") navigate({
      to: "/admin"
    });
  }, [user, loading, navigate]);
  const {
    data: forms = []
  } = useQuery({
    queryKey: ["forms-published"],
    enabled: !!user && user.role === "student",
    queryFn: () => fetchForms()
  });
  const {
    data: submissions = []
  } = useQuery({
    queryKey: ["my-subs"],
    enabled: !!user && user.role === "student",
    queryFn: () => fetchSubs()
  });
  const completedIds = new Set(submissions.map((s) => s.form_id));
  const available = forms.filter((f) => !completedIds.has(f.id));
  const completed = forms.filter((f) => completedIds.has(f.id));
  const [selected, setSelected] = reactExports.useState(null);
  if (!user) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen px-4 py-8 sm:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mx-auto flex max-w-6xl items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Welcome back" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold sm:text-3xl", children: user.name })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", onClick: async () => {
        await logout();
        navigate({
          to: "/"
        });
      }, className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
        " Sign out"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto mt-10 max-w-6xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground", children: "Available" }),
      available.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass rounded-2xl p-8 text-center text-muted-foreground", children: "No quizzes available right now." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: available.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.button, { initial: {
        opacity: 0,
        y: 16
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: i * 0.05
      }, whileHover: {
        y: -4
      }, onClick: () => setSelected(f), className: "glass rounded-2xl p-6 text-left transition-shadow hover:shadow-[var(--shadow-glow)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs uppercase tracking-widest text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3.5 w-3.5" }),
          f.type
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 text-lg font-semibold", children: f.title }),
        f.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 line-clamp-2 text-sm text-muted-foreground", children: f.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-3 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
          f.has_timer ? `${f.time_limit_minutes} min` : "No timer"
        ] })
      ] }, f.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto mt-12 max-w-6xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground", children: "Completed" }),
      completed.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass rounded-2xl p-6 text-center text-sm text-muted-foreground", children: "Your completed quizzes appear here." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: completed.map((f) => {
        const sub = submissions.find((s) => s.form_id === f.id);
        const pct = Math.round(sub.score / Math.max(1, sub.total_questions) * 100);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSelected(f), className: "glass rounded-2xl p-6 text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs uppercase tracking-widest text-success", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
            " Completed"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 text-lg font-semibold", children: f.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-baseline gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-bold text-gradient", children: [
              pct,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              sub.score,
              " / ",
              sub.total_questions
            ] })
          ] })
        ] }, f.id);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PreQuizModal, { form: selected, onClose: () => setSelected(null), alreadyCompleted: selected ? completedIds.has(selected.id) : false })
  ] });
}
function PreQuizModal({
  form,
  onClose,
  alreadyCompleted
}) {
  const [showLeaderboard, setShowLeaderboard] = reactExports.useState(false);
  const fetchCount = useServerFn(getQuestionCount);
  const fetchLb = useServerFn(getLeaderboard);
  const {
    data: questionCount
  } = useQuery({
    queryKey: ["q-count", form?.id],
    enabled: !!form,
    queryFn: () => fetchCount({
      data: {
        formId: form.id
      }
    })
  });
  const {
    data: leaderboard = []
  } = useQuery({
    queryKey: ["lb", form?.id],
    enabled: !!form && showLeaderboard,
    queryFn: () => fetchLb({
      data: {
        formId: form.id
      }
    })
  });
  reactExports.useEffect(() => {
    if (!form) setShowLeaderboard(false);
  }, [form]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!form, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "glass-strong border-white/10 sm:max-w-lg", children: form && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-2xl", children: form.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: form.description ?? "Get ready to start." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/10 bg-background/40 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Questions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-2xl font-bold", children: questionCount ?? "…" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/10 bg-background/40 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Timer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-2xl font-bold", children: form.has_timer ? `${form.time_limit_minutes}m` : "Off" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showLeaderboard && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      opacity: 0,
      height: 0
    }, animate: {
      opacity: 1,
      height: "auto"
    }, exit: {
      opacity: 0,
      height: 0
    }, className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/10 bg-background/40 p-4 max-h-64 overflow-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-xs uppercase tracking-widest text-muted-foreground", children: "Leaderboard" }),
      leaderboard.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No submissions yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-2", children: leaderboard.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `w-6 text-center font-mono ${i === 0 ? "text-accent" : "text-muted-foreground"}`, children: [
            "#",
            i + 1
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: row.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
          row.score,
          "/",
          row.total,
          " · ",
          formatTime(row.time)
        ] })
      ] }, i)) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-col gap-2 sm:flex-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: () => setShowLeaderboard((s) => !s), className: "gap-2 border-white/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4" }),
        showLeaderboard ? "Hide" : "View",
        " Rankings"
      ] }),
      alreadyCompleted ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: true, className: "flex-1", children: "Already submitted" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "flex-1 gap-2 bg-gradient-to-r from-primary to-accent text-primary-foreground glow", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/quiz/$id", params: {
        id: form.id
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "h-4 w-4" }),
        " Start Quiz"
      ] }) })
    ] })
  ] }) }) });
}
function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
export {
  StudentDashboard as component
};
