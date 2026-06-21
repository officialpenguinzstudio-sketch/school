import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth, a as useServerFn, l as loginWithPin } from "./router-BkKrKimK.mjs";
import { B as Button } from "./button-DjOZMqFS.mjs";
import { I as Input } from "./input-D_U8fI25.mjs";
import { u as ue } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { G as GraduationCap, S as Sparkles, j as Lock } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__react-query.mjs";
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
function Landing() {
  const [pin, setPin] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const {
    user,
    setUser
  } = useAuth();
  const navigate = useNavigate();
  const login = useServerFn(loginWithPin);
  reactExports.useEffect(() => {
    if (user) navigate({
      to: user.role === "admin" ? "/admin" : "/student"
    });
  }, [user, navigate]);
  async function handleLogin(e) {
    e.preventDefault();
    if (!pin.trim()) return;
    setLoading(true);
    try {
      const me = await login({
        data: {
          pin: pin.trim()
        }
      });
      setUser(me);
      ue.success(`Welcome, ${me.name}`);
      navigate({
        to: me.role === "admin" ? "/admin" : "/student"
      });
    } catch (err) {
      ue.error(err?.message?.includes("disabled") ? "Account disabled" : "Invalid PIN");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "relative min-h-screen overflow-hidden flex items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
    opacity: 0,
    y: 24
  }, animate: {
    opacity: 1,
    y: 0
  }, transition: {
    duration: 0.6,
    ease: "easeOut"
  }, className: "w-full max-w-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-strong rounded-3xl p-8 sm:p-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        scale: 0.8,
        opacity: 0
      }, animate: {
        scale: 1,
        opacity: 1
      }, transition: {
        delay: 0.1,
        type: "spring"
      }, className: "grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-7 w-7 text-primary-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-6 text-3xl font-bold", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Quiz Portal" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-muted-foreground inline-flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
        " Sign in with your PIN to begin"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLogin, className: "mt-8 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: pin, onChange: (e) => setPin(e.target.value), placeholder: "Enter your PIN", inputMode: "numeric", type: "password", autoFocus: true, className: "h-12 pl-10 text-center text-lg tracking-[0.4em] font-mono bg-input/40 border-white/10" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, className: "w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity glow", children: loading ? "Signing in…" : "Continue" })
    ] })
  ] }) }) });
}
export {
  Landing as component
};
