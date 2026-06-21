import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery, a as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { u as useAuth, a as useServerFn, c as createSsrRpc } from "./router-BkKrKimK.mjs";
import { B as Button, c as cn } from "./button-DjOZMqFS.mjs";
import { I as Input } from "./input-D_U8fI25.mjs";
import { R as Root2, L as List, T as Trigger, C as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from "./dialog-DNrxlBog.mjs";
import { R as Root } from "../_libs/radix-ui__react-label.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { S as Switch$1, a as SwitchThumb } from "../_libs/radix-ui__react-switch.mjs";
import { S as Select$1, a as SelectValue$1, b as SelectTrigger$1, c as SelectIcon, d as SelectPortal, e as SelectContent$1, f as SelectViewport, g as SelectItem$1, h as SelectItemIndicator, i as SelectItemText, j as SelectScrollUpButton$1, k as SelectScrollDownButton$1, l as SelectLabel$1, m as SelectSeparator$1 } from "../_libs/radix-ui__react-select.mjs";
import { u as ue } from "../_libs/sonner.mjs";
import { c as getDashboardStats, d as listAdminForms, e as deleteForm, f as createForm, h as getFormReview } from "./submissions.functions-YOHQta7i.mjs";
import { c as createServerFn } from "./server-LI3vKvOL.mjs";
import "../_libs/seroval.mjs";
import { L as LogOut, c as ChartColumn, F as FileText, U as Users, P as Plus, E as Eye, d as Trash2, e as ToggleLeft, f as ToggleRight, g as ChevronDown, h as Check, i as ChevronUp } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, P as PieChart, a as Pie, C as Cell, T as Tooltip, B as BarChart, b as CartesianGrid, X as XAxis, Y as YAxis, c as Bar } from "../_libs/recharts.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { o as objectType, s as stringType, b as booleanType } from "../_libs/zod.mjs";
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
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/lodash.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const Tabs = Root2;
const TabsList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = List.displayName;
const TabsTrigger = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = Trigger.displayName;
const TabsContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = Content.displayName;
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = Root.displayName;
const Switch = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Switch$1,
  {
    className: cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SwitchThumb,
      {
        className: cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = Switch$1.displayName;
const Textarea = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const Select = Select$1;
const SelectValue = SelectValue$1;
const SelectTrigger = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SelectTrigger$1,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectIcon, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectTrigger$1.displayName;
const SelectScrollUpButton = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SelectScrollUpButton$1,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
const SelectScrollDownButton = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SelectScrollDownButton$1,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
const SelectContent = reactExports.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectPortal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SelectContent$1,
  {
    ref,
    className: cn(
      "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SelectViewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectContent$1.displayName;
const SelectLabel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SelectLabel$1,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectLabel$1.displayName;
const SelectItem = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SelectItem$1,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItemIndicator, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectItem$1.displayName;
const SelectSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SelectSeparator$1,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectSeparator$1.displayName;
const listStudents = createServerFn({
  method: "GET"
}).handler(createSsrRpc("f6a17220f53f43f0be0bb4675b08bc7d0abc86f67b0a49eb578011f1aff6e341"));
const createStudent = createServerFn({
  method: "POST"
}).validator((d) => objectType({
  name: stringType().min(1).max(100),
  pin: stringType().min(4).max(32)
}).parse(d)).handler(createSsrRpc("6b2368e01b9d9c0b0581503c38eb8a4885eb357baa4378729db997d501be91ca"));
const toggleStudentDisabled = createServerFn({
  method: "POST"
}).validator((d) => objectType({
  id: stringType().uuid(),
  disabled: booleanType()
}).parse(d)).handler(createSsrRpc("d74d4b29fbab4cd8ae68e79af262cca14fc64b667ddcf518d8c2f4bd7a163261"));
const deleteStudent = createServerFn({
  method: "POST"
}).validator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("781bc413e9193340db58fe33e2fc1fc9399b3fdca04efa600bdb8c106512e914"));
function AdminPanel() {
  const {
    user,
    loading,
    logout
  } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (loading) return;
    if (!user) navigate({
      to: "/"
    });
    else if (user.role !== "admin") navigate({
      to: "/student"
    });
  }, [user, loading, navigate]);
  if (!user) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen px-4 py-8 sm:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mx-auto flex max-w-6xl items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Command Center" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold sm:text-3xl text-gradient", children: "Admin Console" })
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mt-8 max-w-6xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "dashboard", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "glass border border-white/10 bg-transparent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "dashboard", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-4 w-4" }),
          " Dashboard"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "forms", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }),
          " Forms"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "students", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }),
          " Students"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "dashboard", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardTab, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "forms", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormsTab, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "students", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StudentsTab, {}) })
    ] }) })
  ] });
}
function DashboardTab() {
  const fetchStats = useServerFn(getDashboardStats);
  const {
    data: stats
  } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => fetchStats()
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Total Submissions", value: stats?.total ?? 0 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Average Score", value: `${stats?.avg ?? 0}%` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: "Forms / Students", value: `${stats?.formCount ?? 0} / ${stats?.studentCount ?? 0}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-6 md:col-span-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground", children: "Pass vs Fail" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-56", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Pie, { data: [{
          name: "Pass",
          value: stats?.pass ?? 0
        }, {
          name: "Fail",
          value: stats?.fail ?? 0
        }], dataKey: "value", innerRadius: 50, outerRadius: 80, strokeWidth: 0, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: "oklch(0.72 0.17 155)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: "oklch(0.62 0.24 25)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
          background: "oklch(0.18 0.03 265)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 12
        } })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-6 md:col-span-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground", children: "Avg Score per Form" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-56", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: stats?.perForm ?? [], children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "rgba(255,255,255,0.06)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", stroke: "rgba(255,255,255,0.5)", fontSize: 11 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "rgba(255,255,255,0.5)", fontSize: 11 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
          background: "oklch(0.18 0.03 265)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 12
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "avg", fill: "oklch(0.72 0.18 220)", radius: [8, 8, 0, 0] })
      ] }) }) })
    ] })
  ] });
}
function StatCard({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 10
  }, animate: {
    opacity: 1,
    y: 0
  }, className: "glass rounded-2xl p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-3xl font-bold text-gradient", children: value })
  ] });
}
function FormsTab() {
  const qc = useQueryClient();
  const [wizardOpen, setWizardOpen] = reactExports.useState(false);
  const [reviewFormId, setReviewFormId] = reactExports.useState(null);
  const fetchForms = useServerFn(listAdminForms);
  const removeForm = useServerFn(deleteForm);
  const {
    data: forms = []
  } = useQuery({
    queryKey: ["admin-forms"],
    queryFn: () => fetchForms()
  });
  async function handleDelete(id) {
    if (!confirm("Delete this form and all submissions?")) return;
    try {
      await removeForm({
        data: {
          formId: id
        }
      });
      qc.invalidateQueries({
        queryKey: ["admin-forms"]
      });
      ue.success("Form deleted");
    } catch {
      ue.error("Could not delete");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "All Forms" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setWizardOpen(true), className: "gap-2 bg-gradient-to-r from-primary to-accent text-primary-foreground glow", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " New Form"
      ] })
    ] }),
    forms.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass rounded-2xl p-8 text-center text-muted-foreground", children: "No forms yet. Create your first one." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass rounded-2xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-white/5 text-xs uppercase tracking-widest text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Timer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: forms.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-white/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium", children: f.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 capitalize text-muted-foreground", children: f.type }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: f.has_timer ? `${f.time_limit_minutes}m` : "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: () => setReviewFormId(f.id), className: "gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }),
            " Review"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => handleDelete(f.id), className: "text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
        ] })
      ] }, f.id)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NewFormWizard, { open: wizardOpen, onClose: () => setWizardOpen(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SubmissionsReview, { formId: reviewFormId, onClose: () => setReviewFormId(null) })
  ] });
}
function SubmissionsReview({
  formId,
  onClose
}) {
  const [viewing, setViewing] = reactExports.useState(null);
  const fetchReview = useServerFn(getFormReview);
  const {
    data
  } = useQuery({
    queryKey: ["review", formId],
    enabled: !!formId,
    queryFn: () => fetchReview({
      data: {
        formId
      }
    })
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!formId, onOpenChange: (o) => !o && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "glass-strong border-white/10 sm:max-w-3xl max-h-[85vh] overflow-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: data?.form?.title ?? "Submissions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Submission overview for this form." })
    ] }),
    data && /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-left", children: "Student" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-left", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-left", children: "Score" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-left", children: "%" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2 text-left", children: "Time" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-2" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: data.students.map((s) => {
        const sub = data.subs.find((x) => x.student_id === s.id);
        const pct = sub ? Math.round(sub.score / Math.max(1, sub.total_questions) * 100) : 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-white/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 font-medium", children: s.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2", children: sub ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-success", children: "Submitted" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Pending" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2", children: sub ? `${sub.score}/${sub.total_questions}` : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2", children: sub ? `${pct}%` : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 font-mono text-xs", children: sub ? formatDur(sub.duration_seconds) : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2 text-right", children: sub && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "ghost", onClick: () => setViewing({
            student: s,
            sub,
            questions: data.questions
          }), className: "gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }),
            " View"
          ] }) })
        ] }, s.id);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!viewing, onOpenChange: (o) => !o && setViewing(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "glass-strong border-white/10 sm:max-w-xl max-h-[80vh] overflow-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
          viewing?.student?.name,
          "'s answers"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
          "Score: ",
          viewing?.sub?.score,
          "/",
          viewing?.sub?.total_questions
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: viewing?.questions.map((q, i) => {
        const a = (viewing.sub.answers_json?.[q.id] ?? "").toString();
        const correct = a.trim().toLowerCase() === q.correct_answer.trim().toLowerCase();
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/10 bg-background/40 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Q",
            i + 1
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: q.question_text }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: `mt-2 text-sm ${correct ? "text-success" : "text-destructive"}`, children: [
            "Answer: ",
            a || /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "text-muted-foreground", children: "no answer" })
          ] }),
          !correct && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Correct: ",
            q.correct_answer
          ] })
        ] }, q.id);
      }) })
    ] }) })
  ] }) });
}
function formatDur(s) {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}m ${r}s`;
}
function NewFormWizard({
  open,
  onClose
}) {
  const qc = useQueryClient();
  const [step, setStep] = reactExports.useState(1);
  const [type, setType] = reactExports.useState("quiz");
  const [title, setTitle] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [hasTimer, setHasTimer] = reactExports.useState(false);
  const [timeLimit, setTimeLimit] = reactExports.useState(30);
  const [questions, setQuestions] = reactExports.useState([]);
  const saveForm = useServerFn(createForm);
  function reset() {
    setStep(1);
    setType("quiz");
    setTitle("");
    setDescription("");
    setHasTimer(false);
    setTimeLimit(30);
    setQuestions([]);
  }
  function addQuestion() {
    setQuestions((q) => [...q, {
      question_text: "",
      question_type: "multiple_choice",
      options: ["", "", "", ""],
      correct_answer: ""
    }]);
  }
  async function save() {
    if (!title.trim()) {
      ue.error("Title required");
      return;
    }
    if (questions.length === 0) {
      ue.error("Add at least one question");
      return;
    }
    try {
      await saveForm({
        data: {
          title,
          description: description || null,
          type,
          has_timer: hasTimer,
          time_limit_minutes: hasTimer ? timeLimit : null,
          questions
        }
      });
      qc.invalidateQueries({
        queryKey: ["admin-forms"]
      });
      qc.invalidateQueries({
        queryKey: ["forms-published"]
      });
      ue.success("Form created");
      reset();
      onClose();
    } catch (e) {
      ue.error(e?.message ?? "Could not create form");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => {
    if (!o) {
      reset();
      onClose();
    }
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "glass-strong border-white/10 sm:max-w-2xl max-h-[85vh] overflow-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
        "New Form · Step ",
        step,
        " of 4"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Build a custom quiz or test." })
    ] }),
    step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Type" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: type, onValueChange: (v) => setType(v), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "bg-input/40 border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "quiz", children: "Quiz" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "test", children: "Test" })
        ] })
      ] })
    ] }),
    step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: title, onChange: (e) => setTitle(e.target.value), className: "bg-input/40 border-white/10" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: description, onChange: (e) => setDescription(e.target.value), className: "bg-input/40 border-white/10" })
      ] })
    ] }),
    step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-xl border border-white/10 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "Enable Timer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Auto-submit when time runs out" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: hasTimer, onCheckedChange: setHasTimer })
      ] }),
      hasTimer && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Duration (minutes)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: 1, value: timeLimit, onChange: (e) => setTimeLimit(parseInt(e.target.value) || 1), className: "bg-input/40 border-white/10" })
      ] })
    ] }),
    step === 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      questions.map((q, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/10 bg-background/40 p-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            "Q",
            i + 1
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => setQuestions((qs) => qs.filter((_, k) => k !== i)), className: "text-destructive h-7", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Question text", value: q.question_text, onChange: (e) => setQuestions((qs) => qs.map((x, k) => k === i ? {
          ...x,
          question_text: e.target.value
        } : x)), className: "bg-input/40 border-white/10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: q.question_type, onValueChange: (v) => setQuestions((qs) => qs.map((x, k) => k === i ? {
          ...x,
          question_type: v
        } : x)), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "bg-input/40 border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "multiple_choice", children: "Multiple choice" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "short_answer", children: "Short answer" })
          ] })
        ] }),
        q.question_type === "multiple_choice" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: q.options.map((opt, oi) => /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: `Option ${oi + 1}`, value: opt, onChange: (e) => setQuestions((qs) => qs.map((x, k) => k === i ? {
          ...x,
          options: x.options.map((o, m) => m === oi ? e.target.value : o)
        } : x)), className: "bg-input/40 border-white/10" }, oi)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Correct answer (exact match)", value: q.correct_answer, onChange: (e) => setQuestions((qs) => qs.map((x, k) => k === i ? {
          ...x,
          correct_answer: e.target.value
        } : x)), className: "bg-input/40 border-white/10" })
      ] }, i)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: addQuestion, className: "w-full gap-2 border-dashed border-white/15", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " Add question"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
      step > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setStep((s) => s - 1), className: "border-white/10", children: "Back" }),
      step < 4 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => setStep((s) => s + 1), className: "bg-gradient-to-r from-primary to-accent text-primary-foreground", children: "Next" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: save, className: "bg-gradient-to-r from-success to-primary text-primary-foreground glow", children: "Create Form" })
    ] })
  ] }) });
}
function StudentsTab() {
  const qc = useQueryClient();
  const [name, setName] = reactExports.useState("");
  const [pin, setPin] = reactExports.useState("");
  const fetchStudents = useServerFn(listStudents);
  const addStudentFn = useServerFn(createStudent);
  const toggleFn = useServerFn(toggleStudentDisabled);
  const deleteFn = useServerFn(deleteStudent);
  const {
    data: students = []
  } = useQuery({
    queryKey: ["admin-students"],
    queryFn: () => fetchStudents()
  });
  async function addStudent() {
    if (!name.trim() || pin.trim().length < 4) {
      ue.error("Name + PIN (min 4 chars) required");
      return;
    }
    try {
      await addStudentFn({
        data: {
          name: name.trim(),
          pin: pin.trim()
        }
      });
      setName("");
      setPin("");
      qc.invalidateQueries({
        queryKey: ["admin-students"]
      });
      ue.success("Student added");
    } catch {
      ue.error("Failed to add");
    }
  }
  async function toggleDisabled(s) {
    await toggleFn({
      data: {
        id: s.id,
        disabled: !s.disabled
      }
    });
    qc.invalidateQueries({
      queryKey: ["admin-students"]
    });
  }
  async function remove(id) {
    if (!confirm("Delete this student?")) return;
    await deleteFn({
      data: {
        id
      }
    });
    qc.invalidateQueries({
      queryKey: ["admin-students"]
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-4 flex flex-col gap-2 sm:flex-row sm:items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: name, onChange: (e) => setName(e.target.value), placeholder: "Student name", className: "bg-input/40 border-white/10" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Login PIN" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: pin, onChange: (e) => setPin(e.target.value), placeholder: "e.g. 12345678", className: "bg-input/40 border-white/10 font-mono" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: addStudent, className: "gap-2 bg-gradient-to-r from-primary to-accent text-primary-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " Add"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass rounded-2xl overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-white/5 text-xs uppercase tracking-widest text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        students.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-white/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium", children: s.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: s.disabled ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "Disabled" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-success", children: "Active" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => toggleDisabled(s), children: s.disabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleLeft, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleRight, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => remove(s.id), className: "text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
          ] })
        ] }, s.id)),
        students.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 3, className: "px-4 py-8 text-center text-muted-foreground", children: "No students yet." }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "PINs are hashed in the database and cannot be viewed after creation. Reset by deleting and re-adding the student." })
  ] });
}
export {
  AdminPanel as component
};
