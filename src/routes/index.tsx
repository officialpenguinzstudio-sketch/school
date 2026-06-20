import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GraduationCap, Lock, Sparkles } from "lucide-react";
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

function Landing() {
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
            <p className="mt-2 text-sm text-muted-foreground inline-flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" /> Sign in with your PIN to begin
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
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
        </div>
      </motion.div>
    </main>
  );
}
