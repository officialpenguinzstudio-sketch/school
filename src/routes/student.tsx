import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Clock, FileText, LogOut, Trophy, CheckCircle2, PlayCircle } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { listPublishedForms } from "@/lib/forms.functions";
import { getMySubmissions, getLeaderboard } from "@/lib/submissions.functions";
import { getQuestionCount } from "@/lib/forms.functions";

export const Route = createFileRoute("/student")({
  component: StudentDashboard,
  ssr: false,
  head: () => ({ meta: [{ title: "Student Dashboard — Quiz Portal" }] }),
});

type Form = {
  id: string;
  title: string;
  description: string | null;
  type: string;
  has_timer: boolean;
  time_limit_minutes: number | null;
};

function StudentDashboard() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const fetchForms = useServerFn(listPublishedForms);
  const fetchSubs = useServerFn(getMySubmissions);

  useEffect(() => {
    if (loading) return;
    if (!user) navigate({ to: "/" });
    else if (user.role !== "student") navigate({ to: "/admin" });
  }, [user, loading, navigate]);

  const { data: forms = [] } = useQuery({
    queryKey: ["forms-published"],
    enabled: !!user && user.role === "student",
    queryFn: () => fetchForms() as Promise<Form[]>,
  });

  const { data: submissions = [] } = useQuery({
    queryKey: ["my-subs"],
    enabled: !!user && user.role === "student",
    queryFn: () => fetchSubs(),
  });

  const completedIds = new Set(submissions.map((s: any) => s.form_id));
  const available = forms.filter((f) => !completedIds.has(f.id));
  const completed = forms.filter((f) => completedIds.has(f.id));

  const [selected, setSelected] = useState<Form | null>(null);

  if (!user) return null;

  return (
    <main className="min-h-screen px-4 py-8 sm:px-8">
      <header className="mx-auto flex max-w-6xl items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Welcome back</p>
          <h1 className="text-2xl font-bold sm:text-3xl">{user.name}</h1>
        </div>
        <Button variant="ghost" onClick={async () => { await logout(); navigate({ to: "/" }); }} className="gap-2">
          <LogOut className="h-4 w-4" /> Sign out
        </Button>
      </header>

      <section className="mx-auto mt-10 max-w-6xl">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">Available</h2>
        {available.length === 0 ? (
          <div className="glass rounded-2xl p-8 text-center text-muted-foreground">No quizzes available right now.</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {available.map((f, i) => (
              <motion.button
                key={f.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelected(f)}
                className="glass rounded-2xl p-6 text-left transition-shadow hover:shadow-[var(--shadow-glow)]"
              >
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
                  <FileText className="h-3.5 w-3.5" />{f.type}
                </div>
                <h3 className="mt-2 text-lg font-semibold">{f.title}</h3>
                {f.description && <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{f.description}</p>}
                <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {f.has_timer ? `${f.time_limit_minutes} min` : "No timer"}
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto mt-12 max-w-6xl">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">Completed</h2>
        {completed.length === 0 ? (
          <div className="glass rounded-2xl p-6 text-center text-sm text-muted-foreground">Your completed quizzes appear here.</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {completed.map((f) => {
              const sub = submissions.find((s: any) => s.form_id === f.id)!;
              const pct = Math.round((sub.score / Math.max(1, sub.total_questions)) * 100);
              return (
                <button key={f.id} onClick={() => setSelected(f)} className="glass rounded-2xl p-6 text-left">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-success">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Completed
                  </div>
                  <h3 className="mt-2 text-lg font-semibold">{f.title}</h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gradient">{pct}%</span>
                    <span className="text-xs text-muted-foreground">{sub.score} / {sub.total_questions}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </section>

      <PreQuizModal form={selected} onClose={() => setSelected(null)} alreadyCompleted={selected ? completedIds.has(selected.id) : false} />
    </main>
  );
}

function PreQuizModal({ form, onClose, alreadyCompleted }: { form: Form | null; onClose: () => void; alreadyCompleted: boolean }) {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const fetchCount = useServerFn(getQuestionCount);
  const fetchLb = useServerFn(getLeaderboard);

  const { data: questionCount } = useQuery({
    queryKey: ["q-count", form?.id],
    enabled: !!form,
    queryFn: () => fetchCount({ data: { formId: form!.id } }),
  });

  const { data: leaderboard = [] } = useQuery({
    queryKey: ["lb", form?.id],
    enabled: !!form && showLeaderboard,
    queryFn: () => fetchLb({ data: { formId: form!.id } }),
  });

  useEffect(() => { if (!form) setShowLeaderboard(false); }, [form]);

  return (
    <Dialog open={!!form} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="glass-strong border-white/10 sm:max-w-lg">
        {form && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">{form.title}</DialogTitle>
              <DialogDescription>{form.description ?? "Get ready to start."}</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/10 bg-background/40 p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Questions</p>
                <p className="mt-1 text-2xl font-bold">{questionCount ?? "…"}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-background/40 p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Timer</p>
                <p className="mt-1 text-2xl font-bold">{form.has_timer ? `${form.time_limit_minutes}m` : "Off"}</p>
              </div>
            </div>

            <AnimatePresence>
              {showLeaderboard && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="rounded-xl border border-white/10 bg-background/40 p-4 max-h-64 overflow-auto">
                    <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Leaderboard</p>
                    {leaderboard.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No submissions yet.</p>
                    ) : (
                      <ol className="space-y-2">
                        {leaderboard.map((row: any, i: number) => (
                          <li key={i} className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-3">
                              <span className={`w-6 text-center font-mono ${i === 0 ? "text-accent" : "text-muted-foreground"}`}>#{i + 1}</span>
                              <span className="font-medium">{row.name}</span>
                            </span>
                            <span className="font-mono text-xs text-muted-foreground">
                              {row.score}/{row.total} · {formatTime(row.time)}
                            </span>
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" onClick={() => setShowLeaderboard((s) => !s)} className="gap-2 border-white/10">
                <Trophy className="h-4 w-4" />{showLeaderboard ? "Hide" : "View"} Rankings
              </Button>
              {alreadyCompleted ? (
                <Button disabled className="flex-1">Already submitted</Button>
              ) : (
                <Button asChild className="flex-1 gap-2 bg-gradient-to-r from-primary to-accent text-primary-foreground glow">
                  <Link to="/quiz/$id" params={{ id: form.id }}><PlayCircle className="h-4 w-4" /> Start Quiz</Link>
                </Button>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function formatTime(sec: number) {
  const m = Math.floor(sec / 60); const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
