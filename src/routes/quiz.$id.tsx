import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ChevronLeft, ChevronRight, Clock, Send } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { getFormForQuiz } from "@/lib/forms.functions";
import { submitQuiz } from "@/lib/submissions.functions";

export const Route = createFileRoute("/quiz/$id")({
  component: QuizRunner,
  ssr: false,
  head: () => ({ meta: [{ title: "Quiz — Quiz Portal" }] }),
});

type Question = {
  id: string;
  question_text: string;
  question_type: "multiple_choice" | "short_answer";
  options_json: string[] | null;
  order_index: number;
};

function QuizRunner() {
  const { id } = Route.useParams();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [direction, setDirection] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const startRef = useRef<number>(Date.now());
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const fetchForm = useServerFn(getFormForQuiz);
  const submit = useServerFn(submitQuiz);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/" });
  }, [user, loading, navigate]);

  const { data } = useQuery({
    queryKey: ["form-quiz", id],
    enabled: !!user,
    queryFn: () => fetchForm({ data: { formId: id } }),
  });
  const form = data?.form;
  const questions = (data?.questions ?? []) as Question[];

  useEffect(() => {
    if (form?.has_timer && form.time_limit_minutes) {
      setTimeLeft(form.time_limit_minutes * 60);
    }
  }, [form]);

  useEffect(() => {
    if (timeLeft == null) return;
    if (timeLeft <= 0) { handleSubmit(true); return; }
    const t = setTimeout(() => setTimeLeft((v) => (v == null ? null : v - 1)), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const current = questions[idx];
  const isLast = idx === questions.length - 1;

  async function handleSubmit(auto = false) {
    if (submitting || !user) return;
    setSubmitting(true);
    const duration = Math.round((Date.now() - startRef.current) / 1000);
    try {
      const res = await submit({
        data: { formId: id, answers, durationSeconds: duration },
      });
      toast.success(auto ? `Time's up! ${res.score}/${res.total}` : `Submitted — ${res.score}/${res.total}`);
      navigate({ to: "/student" });
    } catch (e: any) {
      toast.error(e?.message ?? "Submission failed");
    } finally {
      setSubmitting(false);
    }
  }

  if (!user || !form) return null;
  if (questions.length === 0) {
    return <main className="min-h-screen grid place-items-center"><p className="text-muted-foreground">No questions in this quiz.</p></main>;
  }

  const progress = ((idx + 1) / questions.length) * 100;

  return (
    <main className="min-h-screen px-4 py-6 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <header className="glass mb-6 flex items-center justify-between rounded-2xl px-5 py-3">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">{form.title}</p>
            <p className="text-sm font-medium">Slide {idx + 1} of {questions.length}</p>
          </div>
          {timeLeft != null && (
            <div className={`flex items-center gap-2 rounded-lg px-3 py-1.5 font-mono text-sm ${timeLeft < 60 ? "bg-destructive/20 text-destructive" : "bg-primary/15 text-primary"}`}>
              <Clock className="h-4 w-4" />{formatClock(timeLeft)}
            </div>
          )}
        </header>

        <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-white/5">
          <motion.div className="h-full bg-gradient-to-r from-primary to-accent" animate={{ width: `${progress}%` }} />
        </div>

        <div className="relative min-h-[360px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 80 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="glass-strong rounded-3xl p-7"
            >
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Question {idx + 1}</p>
              <h2 className="mt-2 text-xl font-semibold leading-snug sm:text-2xl">{current.question_text}</h2>

              <div className="mt-6 space-y-3">
                {current.question_type === "multiple_choice" && Array.isArray(current.options_json) ? (
                  current.options_json.map((opt) => {
                    const active = answers[current.id] === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => setAnswers((a) => ({ ...a, [current.id]: opt }))}
                        className={`w-full rounded-xl border px-4 py-3 text-left transition-all ${active ? "border-primary bg-primary/15 text-foreground glow" : "border-white/10 bg-background/30 hover:border-white/20"}`}
                      >
                        {opt}
                      </button>
                    );
                  })
                ) : (
                  <Input
                    value={answers[current.id] ?? ""}
                    onChange={(e) => setAnswers((a) => ({ ...a, [current.id]: e.target.value }))}
                    placeholder="Type your answer…"
                    className="h-12 bg-input/40 border-white/10"
                  />
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <Button
            variant="outline" className="gap-1 border-white/10"
            disabled={idx === 0}
            onClick={() => { setDirection(-1); setIdx((i) => Math.max(0, i - 1)); }}
          ><ChevronLeft className="h-4 w-4" /> Previous</Button>

          {isLast ? (
            <Button onClick={() => handleSubmit(false)} disabled={submitting}
              className="gap-2 bg-gradient-to-r from-success to-primary text-primary-foreground glow">
              <Send className="h-4 w-4" />{submitting ? "Submitting…" : "Submit Answers"}
            </Button>
          ) : (
            <Button onClick={() => { setDirection(1); setIdx((i) => Math.min(questions.length - 1, i + 1)); }}
              className="gap-1 bg-gradient-to-r from-primary to-accent text-primary-foreground">
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}

function formatClock(s: number) {
  const m = Math.floor(s / 60); const r = s % 60;
  return `${m.toString().padStart(2, "0")}:${r.toString().padStart(2, "0")}`;
}
