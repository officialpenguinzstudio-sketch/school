import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { GraduationCap, Lock, Sparkles, UserRound, Users, ArrowLeft, LogIn } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth";
import { loginWithPin } from "@/lib/auth.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: Landing,
  ssr: false,
  head: () => ({ meta: [{ title: "Sign In — Quiz Portal" }] }),
});

type View = "initial" | "choose" | "student";

function Landing() {
  const [view, setView] = useState<View>("initial");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const login = useServerFn(loginWithPin);

  useEffect(() => {
    if (user) navigate({ to: user.role === "admin" ? "/admin" : "/student" });
  }, [user, navigate]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!pin.trim()) return;
    setLoading(true);
    try {
      const me = await login({ data: { pin: pin.trim() } });
      setUser(me);
      toast.success(`Welcome, ${me.name}`);
      navigate({ to: me.role === "admin" ? "/admin" : "/student" });
    } catch (err: any) {
      toast.error(err?.message?.includes("disabled") ? "Account disabled" : "Invalid PIN");
    } finally {
      setLoading(false);
    }
  }

  function handleGuestLogin() {
    setUser({ id: "guest", name: "Guest", role: "student" as const });
    toast.success("Welcome, Guest");
    navigate({ to: "/student" });
  }

  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="glass-strong rounded-3xl p-8 sm:p-10">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent glow"
            >
              <GraduationCap className="h-7 w-7 text-primary-foreground" />
            </motion.div>
            <h1 className="mt-6 text-3xl font-bold">
              <span className="text-gradient">Quiz Portal</span>
            </h1>
            <AnimatePresence mode="wait">
              {view === "initial" && (
                <motion.p
                  key="tagline-initial"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-2 text-sm text-muted-foreground inline-flex items-center gap-1.5"
                >
                  <Sparkles className="h-3.5 w-3.5" /> Ready to test your knowledge?
                </motion.p>
              )}
              {view === "choose" && (
                <motion.p
                  key="tagline-choose"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-2 text-sm text-muted-foreground inline-flex items-center gap-1.5"
                >
                  <Sparkles className="h-3.5 w-3.5" /> Choose how you'd like to sign in
                </motion.p>
              )}
              {view === "student" && (
                <motion.p
                  key="tagline-student"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-2 text-sm text-muted-foreground inline-flex items-center gap-1.5"
                >
                  <Lock className="h-3.5 w-3.5" /> Enter your PIN to continue
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-8">
            <AnimatePresence mode="wait">
              {/* Step 1: Sign In button */}
              {view === "initial" && (
                <motion.div
                  key="initial"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <Button
                    onClick={() => setView("choose")}
                    className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity glow gap-2"
                  >
                    <LogIn className="h-5 w-5" />
                    Sign In
                  </Button>
                </motion.div>
              )}

              {/* Step 2: Choose role */}
              {view === "choose" && (
                <motion.div
                  key="choose"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-3"
                >
                  <button
                    onClick={() => setView("student")}
                    className="group w-full flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition-all hover:border-primary/40 hover:bg-primary/5 hover:shadow-[var(--shadow-glow)]"
                  >
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
                      <UserRound className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Sign in as Student</p>
                      <p className="text-xs text-muted-foreground">Use your PIN to access quizzes</p>
                    </div>
                  </button>

                  <button
                    onClick={handleGuestLogin}
                    className="group w-full flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition-all hover:border-accent/40 hover:bg-accent/5 hover:shadow-[var(--shadow-glow)]"
                  >
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 group-hover:from-accent/30 group-hover:to-primary/30 transition-colors">
                      <Users className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold">Sign in as Guest</p>
                      <p className="text-xs text-muted-foreground">Browse quizzes without an account</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setView("initial")}
                    className="mx-auto flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors pt-1"
                  >
                    <ArrowLeft className="h-3 w-3" /> Back
                  </button>
                </motion.div>
              )}

              {/* Step 3: Student PIN form */}
              {view === "student" && (
                <motion.div
                  key="student"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        placeholder="Enter your PIN"
                        inputMode="numeric"
                        type="password"
                        autoFocus
                        className="h-12 pl-10 text-center text-lg tracking-[0.4em] font-mono bg-input/40 border-white/10"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity glow"
                    >
                      {loading ? "Signing in…" : "Continue"}
                    </Button>
                  </form>
                  <button
                    onClick={() => { setView("choose"); setPin(""); }}
                    className="mx-auto mt-4 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="h-3 w-3" /> Back
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Bottom bar */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="fixed bottom-0 inset-x-0 z-50"
      >
        <div className="mx-auto max-w-screen-xl px-4 py-3">
          <div className="glass rounded-2xl px-6 py-3 flex items-center justify-between">
            <span className="text-sm font-medium text-foreground/80 tracking-wide">
              12 &mdash; Archimedes
            </span>
            <a
              href="https://www.facebook.com/officialchs12archimedes"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:opacity-80 transition-opacity"
              aria-label="Follow us on Facebook"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" className="h-8 w-8">
                <rect width="36" height="36" rx="7" fill="#1877F2" />
                <path d="M25 18.09h-3.26v9.66h-4v-9.66h-2.35V14.6h2.35v-2.23c0-1.95.93-5.02 5.03-5.02l3.69.02v3.38h-2.68c-.44 0-1.06.22-1.06 1.14v2.72H26.4l-.47 3.49h-2.67z" fill="#fff" transform="translate(1, 1) scale(0.94)" />
              </svg>
            </a>
          </div>
        </div>
      </motion.footer>
    </main>
  );
}
