import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  Plus, LogOut, Users as UsersIcon, FileText, BarChart3,
  Eye, Trash2, ToggleLeft, ToggleRight,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";
import {
  listAdminForms, createForm, deleteForm, getFormReview,
} from "@/lib/forms.functions";
import { getDashboardStats } from "@/lib/submissions.functions";
import {
  listStudents, createStudent, toggleStudentDisabled, deleteStudent,
} from "@/lib/users.functions";

export const Route = createFileRoute("/admin")({
  component: AdminPanel,
  ssr: false,
  head: () => ({ meta: [{ title: "Admin — Quiz Portal" }] }),
});

function AdminPanel() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) navigate({ to: "/" });
    else if (user.role !== "admin") navigate({ to: "/student" });
  }, [user, loading, navigate]);

  if (!user) return null;

  return (
    <main className="min-h-screen px-4 py-8 sm:px-8">
      <header className="mx-auto flex max-w-6xl items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Command Center</p>
          <h1 className="text-2xl font-bold sm:text-3xl text-gradient">Admin Console</h1>
        </div>
        <Button variant="ghost" onClick={async () => { await logout(); navigate({ to: "/" }); }} className="gap-2">
          <LogOut className="h-4 w-4" /> Sign out
        </Button>
      </header>

      <div className="mx-auto mt-8 max-w-6xl">
        <Tabs defaultValue="dashboard">
          <TabsList className="glass border border-white/10 bg-transparent">
            <TabsTrigger value="dashboard" className="gap-2"><BarChart3 className="h-4 w-4" /> Dashboard</TabsTrigger>
            <TabsTrigger value="forms" className="gap-2"><FileText className="h-4 w-4" /> Forms</TabsTrigger>
            <TabsTrigger value="students" className="gap-2"><UsersIcon className="h-4 w-4" /> Students</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6"><DashboardTab /></TabsContent>
          <TabsContent value="forms" className="mt-6"><FormsTab /></TabsContent>
          <TabsContent value="students" className="mt-6"><StudentsTab /></TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

/* ============== DASHBOARD ============== */
function DashboardTab() {
  const fetchStats = useServerFn(getDashboardStats);
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => fetchStats(),
  });

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard label="Total Submissions" value={stats?.total ?? 0} />
      <StatCard label="Average Score" value={`${stats?.avg ?? 0}%`} />
      <StatCard label="Forms / Students" value={`${stats?.formCount ?? 0} / ${stats?.studentCount ?? 0}`} />

      <div className="glass rounded-2xl p-6 md:col-span-1">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">Pass vs Fail</h3>
        <div className="h-56">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={[
                { name: "Pass", value: stats?.pass ?? 0 },
                { name: "Fail", value: stats?.fail ?? 0 },
              ]} dataKey="value" innerRadius={50} outerRadius={80} strokeWidth={0}>
                <Cell fill="oklch(0.72 0.17 155)" />
                <Cell fill="oklch(0.62 0.24 25)" />
              </Pie>
              <Tooltip contentStyle={{ background: "oklch(0.18 0.03 265)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass rounded-2xl p-6 md:col-span-2">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">Avg Score per Form</h3>
        <div className="h-56">
          <ResponsiveContainer>
            <BarChart data={stats?.perForm ?? []}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" fontSize={11} />
              <YAxis stroke="rgba(255,255,255,0.5)" fontSize={11} />
              <Tooltip contentStyle={{ background: "oklch(0.18 0.03 265)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
              <Bar dataKey="avg" fill="oklch(0.72 0.18 220)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-bold text-gradient">{value}</p>
    </motion.div>
  );
}

/* ============== FORMS ============== */
function FormsTab() {
  const qc = useQueryClient();
  const [wizardOpen, setWizardOpen] = useState(false);
  const [reviewFormId, setReviewFormId] = useState<string | null>(null);
  const fetchForms = useServerFn(listAdminForms);
  const removeForm = useServerFn(deleteForm);

  const { data: forms = [] } = useQuery({
    queryKey: ["admin-forms"],
    queryFn: () => fetchForms(),
  });

  async function handleDelete(id: string) {
    if (!confirm("Delete this form and all submissions?")) return;
    try {
      await removeForm({ data: { formId: id } });
      qc.invalidateQueries({ queryKey: ["admin-forms"] });
      toast.success("Form deleted");
    } catch {
      toast.error("Could not delete");
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">All Forms</h2>
        <Button onClick={() => setWizardOpen(true)} className="gap-2 bg-gradient-to-r from-primary to-accent text-primary-foreground glow">
          <Plus className="h-4 w-4" /> New Form
        </Button>
      </div>

      {forms.length === 0 ? (
        <div className="glass rounded-2xl p-8 text-center text-muted-foreground">No forms yet. Create your first one.</div>
      ) : (
        <div className="glass rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Timer</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((f: any) => (
                <tr key={f.id} className="border-t border-white/5">
                  <td className="px-4 py-3 font-medium">{f.title}</td>
                  <td className="px-4 py-3 capitalize text-muted-foreground">{f.type}</td>
                  <td className="px-4 py-3 text-muted-foreground">{f.has_timer ? `${f.time_limit_minutes}m` : "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm" onClick={() => setReviewFormId(f.id)} className="gap-1"><Eye className="h-4 w-4" /> Review</Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(f.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <NewFormWizard open={wizardOpen} onClose={() => setWizardOpen(false)} />
      <SubmissionsReview formId={reviewFormId} onClose={() => setReviewFormId(null)} />
    </div>
  );
}

/* ===== Submissions review ===== */
function SubmissionsReview({ formId, onClose }: { formId: string | null; onClose: () => void }) {
  const [viewing, setViewing] = useState<any | null>(null);
  const fetchReview = useServerFn(getFormReview);

  const { data } = useQuery({
    queryKey: ["review", formId],
    enabled: !!formId,
    queryFn: () => fetchReview({ data: { formId: formId! } }),
  });

  return (
    <Dialog open={!!formId} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="glass-strong border-white/10 sm:max-w-3xl max-h-[85vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>{data?.form?.title ?? "Submissions"}</DialogTitle>
          <DialogDescription>Submission overview for this form.</DialogDescription>
        </DialogHeader>
        {data && (
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="py-2 text-left">Student</th>
                <th className="py-2 text-left">Status</th>
                <th className="py-2 text-left">Score</th>
                <th className="py-2 text-left">%</th>
                <th className="py-2 text-left">Time</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody>
              {data.students.map((s: any) => {
                const sub = data.subs.find((x: any) => x.student_id === s.id);
                const pct = sub ? Math.round((sub.score / Math.max(1, sub.total_questions)) * 100) : 0;
                return (
                  <tr key={s.id} className="border-t border-white/5">
                    <td className="py-2 font-medium">{s.name}</td>
                    <td className="py-2">{sub ? <span className="text-success">Submitted</span> : <span className="text-muted-foreground">Pending</span>}</td>
                    <td className="py-2">{sub ? `${sub.score}/${sub.total_questions}` : "—"}</td>
                    <td className="py-2">{sub ? `${pct}%` : "—"}</td>
                    <td className="py-2 font-mono text-xs">{sub ? formatDur(sub.duration_seconds) : "—"}</td>
                    <td className="py-2 text-right">
                      {sub && (
                        <Button size="sm" variant="ghost" onClick={() => setViewing({ student: s, sub, questions: data.questions })} className="gap-1">
                          <Eye className="h-4 w-4" /> View
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        <Dialog open={!!viewing} onOpenChange={(o) => !o && setViewing(null)}>
          <DialogContent className="glass-strong border-white/10 sm:max-w-xl max-h-[80vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>{viewing?.student?.name}'s answers</DialogTitle>
              <DialogDescription>Score: {viewing?.sub?.score}/{viewing?.sub?.total_questions}</DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              {viewing?.questions.map((q: any, i: number) => {
                const a = (viewing.sub.answers_json?.[q.id] ?? "").toString();
                const correct = a.trim().toLowerCase() === q.correct_answer.trim().toLowerCase();
                return (
                  <div key={q.id} className="rounded-xl border border-white/10 bg-background/40 p-4">
                    <p className="text-xs text-muted-foreground">Q{i + 1}</p>
                    <p className="font-medium">{q.question_text}</p>
                    <p className={`mt-2 text-sm ${correct ? "text-success" : "text-destructive"}`}>
                      Answer: {a || <em className="text-muted-foreground">no answer</em>}
                    </p>
                    {!correct && <p className="text-xs text-muted-foreground">Correct: {q.correct_answer}</p>}
                  </div>
                );
              })}
            </div>
          </DialogContent>
        </Dialog>
      </DialogContent>
    </Dialog>
  );
}

function formatDur(s: number) {
  const m = Math.floor(s / 60); const r = s % 60;
  return `${m}m ${r}s`;
}

/* ===== New Form Wizard ===== */
function NewFormWizard({ open, onClose }: { open: boolean; onClose: () => void }) {
  const qc = useQueryClient();
  const [step, setStep] = useState(1);
  const [type, setType] = useState<"quiz" | "test">("quiz");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hasTimer, setHasTimer] = useState(false);
  const [timeLimit, setTimeLimit] = useState(30);
  const [questions, setQuestions] = useState<Array<{
    question_text: string; question_type: "multiple_choice" | "short_answer";
    options: string[]; correct_answer: string;
  }>>([]);
  const saveForm = useServerFn(createForm);

  function reset() {
    setStep(1); setType("quiz"); setTitle(""); setDescription("");
    setHasTimer(false); setTimeLimit(30); setQuestions([]);
  }

  function addQuestion() {
    setQuestions((q) => [...q, { question_text: "", question_type: "multiple_choice", options: ["", "", "", ""], correct_answer: "" }]);
  }

  async function save() {
    if (!title.trim()) { toast.error("Title required"); return; }
    if (questions.length === 0) { toast.error("Add at least one question"); return; }
    try {
      await saveForm({
        data: {
          title, description: description || null, type,
          has_timer: hasTimer, time_limit_minutes: hasTimer ? timeLimit : null,
          questions,
        },
      });
      qc.invalidateQueries({ queryKey: ["admin-forms"] });
      qc.invalidateQueries({ queryKey: ["forms-published"] });
      toast.success("Form created");
      reset(); onClose();
    } catch (e: any) {
      toast.error(e?.message ?? "Could not create form");
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) { reset(); onClose(); } }}>
      <DialogContent className="glass-strong border-white/10 sm:max-w-2xl max-h-[85vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>New Form · Step {step} of 4</DialogTitle>
          <DialogDescription>Build a custom quiz or test.</DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-3">
            <Label>Type</Label>
            <Select value={type} onValueChange={(v) => setType(v as any)}>
              <SelectTrigger className="bg-input/40 border-white/10"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="quiz">Quiz</SelectItem><SelectItem value="test">Test</SelectItem></SelectContent>
            </Select>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-3">
            <div><Label>Title</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} className="bg-input/40 border-white/10" /></div>
            <div><Label>Description</Label><Textarea value={description} onChange={(e) => setDescription(e.target.value)} className="bg-input/40 border-white/10" /></div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-xl border border-white/10 p-4">
              <div><p className="font-medium">Enable Timer</p><p className="text-xs text-muted-foreground">Auto-submit when time runs out</p></div>
              <Switch checked={hasTimer} onCheckedChange={setHasTimer} />
            </div>
            {hasTimer && (
              <div><Label>Duration (minutes)</Label>
                <Input type="number" min={1} value={timeLimit} onChange={(e) => setTimeLimit(parseInt(e.target.value) || 1)} className="bg-input/40 border-white/10" />
              </div>
            )}
          </div>
        )}
        {step === 4 && (
          <div className="space-y-3">
            {questions.map((q, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-background/40 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Q{i + 1}</span>
                  <Button variant="ghost" size="sm" onClick={() => setQuestions((qs) => qs.filter((_, k) => k !== i))} className="text-destructive h-7"><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
                <Input placeholder="Question text" value={q.question_text}
                  onChange={(e) => setQuestions((qs) => qs.map((x, k) => k === i ? { ...x, question_text: e.target.value } : x))}
                  className="bg-input/40 border-white/10" />
                <Select value={q.question_type} onValueChange={(v: any) => setQuestions((qs) => qs.map((x, k) => k === i ? { ...x, question_type: v } : x))}>
                  <SelectTrigger className="bg-input/40 border-white/10"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="multiple_choice">Multiple choice</SelectItem>
                    <SelectItem value="short_answer">Short answer</SelectItem>
                  </SelectContent>
                </Select>
                {q.question_type === "multiple_choice" && (
                  <div className="grid grid-cols-2 gap-2">
                    {q.options.map((opt, oi) => (
                      <Input key={oi} placeholder={`Option ${oi + 1}`} value={opt}
                        onChange={(e) => setQuestions((qs) => qs.map((x, k) => k === i ? { ...x, options: x.options.map((o, m) => m === oi ? e.target.value : o) } : x))}
                        className="bg-input/40 border-white/10" />
                    ))}
                  </div>
                )}
                <Input placeholder="Correct answer (exact match)" value={q.correct_answer}
                  onChange={(e) => setQuestions((qs) => qs.map((x, k) => k === i ? { ...x, correct_answer: e.target.value } : x))}
                  className="bg-input/40 border-white/10" />
              </div>
            ))}
            <Button variant="outline" onClick={addQuestion} className="w-full gap-2 border-dashed border-white/15"><Plus className="h-4 w-4" /> Add question</Button>
          </div>
        )}

        <DialogFooter className="gap-2">
          {step > 1 && <Button variant="outline" onClick={() => setStep((s) => s - 1)} className="border-white/10">Back</Button>}
          {step < 4 ? (
            <Button onClick={() => setStep((s) => s + 1)} className="bg-gradient-to-r from-primary to-accent text-primary-foreground">Next</Button>
          ) : (
            <Button onClick={save} className="bg-gradient-to-r from-success to-primary text-primary-foreground glow">Create Form</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ============== STUDENTS ============== */
function StudentsTab() {
  const qc = useQueryClient();
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const fetchStudents = useServerFn(listStudents);
  const addStudentFn = useServerFn(createStudent);
  const toggleFn = useServerFn(toggleStudentDisabled);
  const deleteFn = useServerFn(deleteStudent);

  const { data: students = [] } = useQuery({
    queryKey: ["admin-students"],
    queryFn: () => fetchStudents(),
  });

  async function addStudent() {
    if (!name.trim() || pin.trim().length < 4) { toast.error("Name + PIN (min 4 chars) required"); return; }
    try {
      await addStudentFn({ data: { name: name.trim(), pin: pin.trim() } });
      setName(""); setPin("");
      qc.invalidateQueries({ queryKey: ["admin-students"] });
      toast.success("Student added");
    } catch {
      toast.error("Failed to add");
    }
  }

  async function toggleDisabled(s: any) {
    await toggleFn({ data: { id: s.id, disabled: !s.disabled } });
    qc.invalidateQueries({ queryKey: ["admin-students"] });
  }

  async function remove(id: string) {
    if (!confirm("Delete this student?")) return;
    await deleteFn({ data: { id } });
    qc.invalidateQueries({ queryKey: ["admin-students"] });
  }

  return (
    <div className="space-y-4">
      <div className="glass rounded-2xl p-4 flex flex-col gap-2 sm:flex-row sm:items-end">
        <div className="flex-1"><Label>Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Student name" className="bg-input/40 border-white/10" /></div>
        <div className="flex-1"><Label>Login PIN</Label><Input value={pin} onChange={(e) => setPin(e.target.value)} placeholder="e.g. 12345678" className="bg-input/40 border-white/10 font-mono" /></div>
        <Button onClick={addStudent} className="gap-2 bg-gradient-to-r from-primary to-accent text-primary-foreground"><Plus className="h-4 w-4" /> Add</Button>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s: any) => (
              <tr key={s.id} className="border-t border-white/5">
                <td className="px-4 py-3 font-medium">{s.name}</td>
                <td className="px-4 py-3">
                  {s.disabled ? <span className="text-destructive">Disabled</span> : <span className="text-success">Active</span>}
                </td>
                <td className="px-4 py-3 text-right">
                  <Button variant="ghost" size="sm" onClick={() => toggleDisabled(s)}>
                    {s.disabled ? <ToggleLeft className="h-4 w-4" /> : <ToggleRight className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => remove(s.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                </td>
              </tr>
            ))}
            {students.length === 0 && <tr><td colSpan={3} className="px-4 py-8 text-center text-muted-foreground">No students yet.</td></tr>}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground">PINs are hashed in the database and cannot be viewed after creation. Reset by deleting and re-adding the student.</p>
    </div>
  );
}
