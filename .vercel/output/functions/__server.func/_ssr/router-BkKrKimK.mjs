import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { m as isRedirect } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-LI3vKvOL.mjs";
import { $ as $e } from "../_libs/sonner.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "../_libs/scheduler.mjs";
import "stream";
import "util";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
function useServerFn(serverFn) {
  const router2 = useRouter();
  return reactExports.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router2.stores.location.get();
        return router2.navigate(router2.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router2, serverFn]);
}
const appCss = "/assets/styles-CNwri191.css";
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const loginWithPin = createServerFn({
  method: "POST"
}).validator((d) => objectType({
  pin: stringType().min(1).max(64)
}).parse(d)).handler(createSsrRpc("eb443cb4d4db008126a834365cd1bf193abe2d722427d86fea21a647c311f95b"));
const getCurrentUser = createServerFn({
  method: "GET"
}).handler(createSsrRpc("5d9211d3240dce68af5737fec078ee48fb5558618e9bd41f21d3c6986043680d"));
const signOut = createServerFn({
  method: "POST"
}).handler(createSsrRpc("95f2cf03275bf7421044cb43581f390444f8462eb7ceef40d1fbcdaa0f979964"));
const Ctx = reactExports.createContext({
  user: null,
  loading: true,
  setUser: () => {
  },
  logout: async () => {
  }
});
function AuthProvider({ children }) {
  const [user, setUserState] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const fetchMe = useServerFn(getCurrentUser);
  const doSignOut = useServerFn(signOut);
  reactExports.useEffect(() => {
    let alive = true;
    fetchMe().then((u) => {
      if (alive) setUserState(u ?? null);
    }).catch(() => alive && setUserState(null)).finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [fetchMe]);
  const logout = async () => {
    try {
      await doSignOut();
    } catch {
    }
    setUserState(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Ctx.Provider, { value: { user, loading, setUser: setUserState, logout }, children });
}
const useAuth = () => reactExports.useContext(Ctx);
function AnimatedBg() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none fixed inset-0 overflow-hidden", style: { zIndex: 0 }, "aria-hidden": true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mesh-blobs absolute -inset-[20%]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mesh-grid absolute inset-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: "/school-logo.png",
        alt: "",
        className: "logo-bg absolute",
        style: {
          width: "55vw",
          height: "55vw",
          maxWidth: 700,
          maxHeight: 700,
          top: "50%",
          left: "50%",
          marginTop: "-27.5vw",
          marginLeft: "-27.5vw",
          objectFit: "contain"
        }
      }
    )
  ] });
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    $e,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass max-w-md rounded-2xl p-8 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-6xl font-bold text-gradient", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "mt-6 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground", children: "Go home" })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  const router2 = useRouter();
  reactExports.useEffect(() => {
    console.error("[ErrorBoundary]", error);
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass max-w-md rounded-2xl p-8 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", children: "Something went wrong" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: error.message }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => {
          router2.invalidate();
          reset();
        },
        className: "mt-6 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
        children: "Try again"
      }
    )
  ] }) });
}
const Route$4 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Quiz Portal — Premium School Testing" },
      { name: "description", content: "A premium, customizable quiz & test portal for schools." }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$4.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AuthProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedBg, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-center" })
  ] }) });
}
const $$splitComponentImporter$3 = () => import("./student-2pYjWPlf.mjs");
const Route$3 = createFileRoute("/student")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component"),
  ssr: false,
  head: () => ({
    meta: [{
      title: "Student Dashboard — Quiz Portal"
    }]
  })
});
const $$splitComponentImporter$2 = () => import("./admin-adZHDcD7.mjs");
const Route$2 = createFileRoute("/admin")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component"),
  ssr: false,
  head: () => ({
    meta: [{
      title: "Admin — Quiz Portal"
    }]
  })
});
const $$splitComponentImporter$1 = () => import("./index-BbKiGsJr.mjs");
const Route$1 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component"),
  ssr: false,
  head: () => ({
    meta: [{
      title: "Sign In — Quiz Portal"
    }]
  })
});
const $$splitComponentImporter = () => import("./quiz._id-SwJgz_Yh.mjs");
const Route = createFileRoute("/quiz/$id")({
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  ssr: false,
  head: () => ({
    meta: [{
      title: "Quiz — Quiz Portal"
    }]
  })
});
const StudentRoute = Route$3.update({
  id: "/student",
  path: "/student",
  getParentRoute: () => Route$4
});
const AdminRoute = Route$2.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$4
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$4
});
const QuizIdRoute = Route.update({
  id: "/quiz/$id",
  path: "/quiz/$id",
  getParentRoute: () => Route$4
});
const rootRouteChildren = {
  IndexRoute,
  AdminRoute,
  StudentRoute,
  QuizIdRoute
};
const routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route as R,
  useServerFn as a,
  createSsrRpc as c,
  loginWithPin as l,
  router as r,
  useAuth as u
};
