import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import {
  Menu, X, Home, Users, Shield, Calendar, LogOut,
  ChevronLeft, ChevronRight, GraduationCap, Sparkles, Crown, Image, FileText, Clock, FileQuestion, Star, Map, BookOpen, Check, Lock,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { getMemeUrl } from "@/lib/meme.functions";
import { listPublishedForms, getQuestionCount } from "@/lib/forms.functions";
import { getAssignments, getStudentCompletions, markAssignmentDone } from "@/lib/assignments.functions";
import { getMySubmissions, getLeaderboard } from "@/lib/submissions.functions";

export const Route = createFileRoute("/student")({
  component: SectionDashboard,
  ssr: false,
  head: () => ({ meta: [{ title: "12 — Archimedes" }] }),
});

/* ============================================================
   DATA
============================================================ */

const STUDENTS = [
  "Airah Mae Asuncion",
  "Aj Vivas",
  "Angelica Jimenez",
  "Angelo Clariz",
  "Cheska Ivy Libunao",
  "Cyus Lucas",
  "Denzer Molina",
  "Dion Tuquero Mendoza",
  "Eulycis Valdez",
  "Francis John Cayabyab",
  "Jade Cyrus Bonilla",
  "Jazmin Guillermo",
  "Jessa Mae Daluyen",
  "Jireh Anne Martinez",
  "John Oliver Rayray",
  "Johncarl Manzano",
  "Louise Gaile Cabato",
  "Loyd Adrian Lucas",
  "Mark Jose",
  "Nash Grospe",
  "Precious Lucas",
  "Prince Aron",
  "Princess Saclao",
  "Robby Correa",
  "Sophia T. Sabado",
  "Willy Gaborno",
];

const OFFICERS = [
  { name: "Francis John Cayabyab", position: "President" },
  { name: "Sophia T. Sabado", position: "Vice President" },
  { name: "Airah Mae Asuncion", position: "Secretary" },
  { name: "Jessa Mae Daluyen", position: "Treasurer" },
  { name: "Cheska Ivy Libunao", position: "Auditor" },
  { name: "Robby Correa", position: "Peace Officer" },
  { name: "Denzer Molina", position: "Public Information Officer" },
  { name: "Nash Grospe", position: "Escort" },
  { name: "Precious Lucas", position: "Muse" },
];

const FACULTY = [
  { name: "Aisa Crisologo", position: "Class Adviser" },
  { name: "Agapito Gonzaga", position: "School Principal" },
];

const PROFILE_PICS: Record<string, string> = {
  "Agapito Gonzaga": "Agapito Gonzaga.jfif",
  "Airah Mae Asuncion": "Airah Asuncion.jfif",
  "Aisa Crisologo": "Aisa Crisologo.jfif",
  "Aj Vivas": "Allan Jr Vivas.jpg",
  "Angelo CLariz": "Angelo Clariz.jpg",
  "Cheska Ivy Libunao": "Cheska Ivy Libunao.jpg",
  "Cyus Lucas": "Cyus Lucas.jfif",
  "Denzer Molina": "Denzer-Molina.png",
  "Dion Tuquero Mendoza": "Dion Mendoza.jpg",
  "Francis John Cayabyab": "Francis John Cayabyab.png",
  "Jessa Mae Daluyen": "Jessa Mae Daluyen.jfif",
  "Jireh Anne Martinez": "Jireh Anne Martinez.jpg",
  "Louise Gaile Cabato": "Louise Gaile Cabato.jfif",
  "Mark Jose": "Mark Jose.jfif",
  "Nash Grospe": "Nash Aron Grospe.jpg",
  "Precious Lucas": "Precious Lucas.jfif",
  "Sophia T. Sabado": "Sophia Sabado.jfif",
  "Willy Gab": "Willy Gaborno.jpg",
};

function getProfilePic(name: string) {
  const file = PROFILE_PICS[name];
  return file ? `/Profile/${file}` : `/Profile/NoPFP.jfif`;
}

type Section = "home" | "assignments" | "quizzes" | "students" | "officers" | "schedule";

/* ============================================================
   MAIN COMPONENT
============================================================ */

function SectionDashboard() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>("home");

  useEffect(() => {
    if (loading) return;
    if (!user) navigate({ to: "/" });
    else if (user.role === "admin") navigate({ to: "/admin" });
  }, [user, loading, navigate]);

  function goTo(section: Section) {
    setActiveSection(section);
    setSidebarOpen(false);
  }

  if (!user) return null;

  return (
    <main className="min-h-screen">
      {/* ---- Top Bar ---- */}
      <header className="sticky top-0 z-40 glass border-b border-white/10 shadow-[var(--shadow-glow)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 transition-colors hover:bg-white/10"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Section</p>
              <h1 className="text-lg font-bold sm:text-xl">
                <span className="text-gradient">12 — Archimedes</span>
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:block">
              {user.name}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={async () => { await logout(); navigate({ to: "/" }); }}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      {/* ---- Sidebar Overlay ---- */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            />
            <motion.aside
              key="sidebar"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 w-72 glass-strong overflow-y-auto"
            >
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-6 w-6 text-primary" />
                  <span className="font-bold text-gradient">12 — Archimedes</span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="grid h-8 w-8 place-items-center rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="px-3 pb-6 space-y-1">
                <SidebarItem icon={Home} label="Home" active={activeSection === "home"} onClick={() => goTo("home")} />
                <SidebarItem icon={BookOpen} label="Assignments" active={activeSection === "assignments"} onClick={() => goTo("assignments")} />
                <SidebarItem icon={FileText} label="Quizzes" active={activeSection === "quizzes"} onClick={() => goTo("quizzes")} />
                <SidebarItem icon={Users} label="Students" active={activeSection === "students"} onClick={() => goTo("students")} />
                <SidebarItem icon={Shield} label="Officers" active={activeSection === "officers"} onClick={() => goTo("officers")} />
                <SidebarItem icon={Calendar} label="Schedule" active={activeSection === "schedule"} onClick={() => goTo("schedule")} />
              </nav>

              <div className="border-t border-white/10 mx-5 pt-4 space-y-3">
                <div className="px-2">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Faculty</p>
                  {FACULTY.map((f) => (
                    <div key={f.name} className="mb-2">
                      <p className="text-sm font-medium">{f.name}</p>
                      <p className="text-xs text-muted-foreground">{f.position}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ---- Content ---- */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
        <AnimatePresence mode="wait">
          {activeSection === "home" && <HomeSection key="home" />}
          {activeSection === "assignments" && <AssignmentsSection key="assignments" />}
          {activeSection === "quizzes" && <QuizzesSection key="quizzes" />}
          {activeSection === "students" && <StudentsSection key="students" />}
          {activeSection === "officers" && <OfficersSection key="officers" />}
          {activeSection === "schedule" && <ScheduleSection key="schedule" />}
        </AnimatePresence>
      </div>
    </main>
  );
}

/* ============================================================
   SIDEBAR ITEM
============================================================ */

function SidebarItem({
  icon: Icon, label, active, onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
        active
          ? "bg-gradient-to-r from-primary/15 to-accent/10 text-primary shadow-[0_0_15px_rgba(255,255,255,0.1)] border border-primary/20"
          : "text-foreground/70 hover:bg-white/10 hover:text-foreground hover:shadow-[0_0_10px_rgba(255,255,255,0.05)] border border-transparent"
      }`}
    >
      <Icon className={`h-4.5 w-4.5 ${active ? "text-primary" : ""}`} />
      {label}
    </button>
  );
}

/* ============================================================
   HOME — MEME OF THE DAY
============================================================ */

function HomeSection() {
  const fetchMeme = useServerFn(getMemeUrl);
  const { data: memeUrl, isLoading } = useQuery({
    queryKey: ["meme-of-day"],
    queryFn: () => fetchMeme(),
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold sm:text-3xl">
          Welcome to <span className="text-gradient">12 — Archimedes</span>
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Grade 12 STEM — Calibungan High School
        </p>
      </div>

      {/* Meme of the Day Card */}
      <div className="glass-strong rounded-3xl overflow-hidden">
        <div className="flex items-center gap-2 px-6 pt-6 pb-3">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
            <Image className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Meme of the Day</h3>
            <p className="text-xs text-muted-foreground">Updated by admin</p>
          </div>
        </div>
        <div className="px-6 pb-6">
          {isLoading ? (
            <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/5">
              <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
            </div>
          ) : memeUrl ? (
            <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-black/10 overflow-hidden">
              <img
                src={memeUrl}
                alt="Meme of the day"
                className="max-h-[500px] w-auto object-contain"
              />
            </div>
          ) : (
            <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/5 gap-2">
              <Sparkles className="h-8 w-8 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">No meme today — check back later!</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <QuickCard icon={Users} label="Students" value={STUDENTS.length.toString()} />
        <QuickCard icon={Shield} label="Officers" value={OFFICERS.length.toString()} />
        <QuickCard icon={Crown} label="Section" value="Archimedes" />
      </div>
    </motion.div>
  );
}

function QuickCard({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />{label}
      </div>
      <p className="mt-2 text-2xl font-bold text-gradient">{value}</p>
    </div>
  );
}

/* ============================================================
   VERTICAL ROULETTE CAROUSEL
============================================================ */

function VerticalRoulette({ 
  items, 
  renderCard 
}: { 
  items: any[], 
  renderCard: (item: any, i: number, isActive: boolean) => React.ReactNode 
}) {
  const [index, setIndex] = useState(0);

  function handleScroll(e: React.WheelEvent) {
    if (e.deltaY > 0 && index < items.length - 1) setIndex(i => i + 1);
    else if (e.deltaY < 0 && index > 0) setIndex(i => i - 1);
  }

  const [touchStartY, setTouchStartY] = useState(0);
  function handleTouchStart(e: React.TouchEvent) { setTouchStartY(e.touches[0].clientY); }
  function handleTouchEnd(e: React.TouchEvent) {
    const endY = e.changedTouches[0].clientY;
    const diff = touchStartY - endY;
    if (diff > 40 && index < items.length - 1) setIndex(i => i + 1);
    else if (diff < -40 && index > 0) setIndex(i => i - 1);
  }

  return (
    <div className="text-center">
      <div className="mb-4 text-sm text-muted-foreground animate-pulse">
        Scroll or swipe vertically
      </div>
      <div 
        className="relative mx-auto h-[450px] w-full max-w-sm touch-none"
        onWheel={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {items.map((item, i) => {
          const distance = i - index;
          const isVisible = Math.abs(distance) <= 2;
          if (!isVisible) return null;

          const scale = 1 - Math.abs(distance) * 0.15;
          const y = distance * 110;
          const opacity = distance === 0 ? 1 : 1 - Math.abs(distance) * 0.4;
          const zIndex = 10 - Math.abs(distance);

          return (
            <motion.div
              key={i}
              initial={false}
              animate={{ y, scale, opacity, zIndex }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute left-0 right-0 top-1/2 -mt-[140px] glass-strong rounded-3xl p-6 cursor-pointer pointer-events-auto"
              onClick={() => setIndex(i)}
            >
              {renderCard(item, i, distance === 0)}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   STUDENTS — CARD CAROUSEL
============================================================ */

function StudentsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="mb-6 text-2xl font-bold text-center">
        <span className="text-gradient">Students</span>
      </h2>
      <VerticalRoulette 
        items={STUDENTS} 
        renderCard={(student, i) => {
          return (
            <>
              <div className="mx-auto h-20 w-20 overflow-hidden rounded-full border-2 border-primary/30 glow mb-4 bg-white/5">
                <img src={getProfilePic(student)} alt={student} className="h-full w-full object-cover" />
              </div>
              <h3 className="text-xl font-bold">{student}</h3>
              <p className="mt-1 text-sm text-muted-foreground">Student #{i + 1}</p>
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
                <GraduationCap className="h-3 w-3" /> Grade 12 STEM
              </div>
            </>
          );
        }}
      />
    </motion.div>
  );
}

/* ============================================================
   OFFICERS — CARD CAROUSEL
============================================================ */

function OfficersSection() {
  const allOfficers = [...OFFICERS, ...FACULTY];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="mb-6 text-2xl font-bold text-center">
        <span className="text-gradient">Officers & Faculty</span>
      </h2>
      <VerticalRoulette 
        items={allOfficers} 
        renderCard={(officer, i) => {
          const isFaculty = i >= OFFICERS.length;
          return (
            <>
              <div className={`mx-auto h-20 w-20 overflow-hidden rounded-full border-2 glow mb-4 bg-white/5 ${
                isFaculty ? "border-amber-500/50" : "border-primary/30"
              }`}>
                <img src={getProfilePic(officer.name)} alt={officer.name} className="h-full w-full object-cover" />
              </div>
              <h3 className="text-xl font-bold">{officer.name}</h3>
              <div className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium ${
                isFaculty ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" : "bg-primary/10 text-primary border border-primary/20"
              }`}>
                {isFaculty ? <Crown className="h-3.5 w-3.5" /> : <Shield className="h-3.5 w-3.5" />}
                {officer.position}
              </div>
            </>
          );
        }}
      />
    </motion.div>
  );
}

/* ============================================================
   SCHEDULE — PLACEHOLDER
============================================================ */

function ScheduleSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="mb-6 text-2xl font-bold">
        <span className="text-gradient">Class Schedule</span>
      </h2>

      <div className="glass-strong rounded-3xl p-8 text-center">
        <Calendar className="mx-auto h-12 w-12 text-muted-foreground/30" />
        <p className="mt-4 text-lg font-semibold">Coming Soon</p>
        <p className="mt-1 text-sm text-muted-foreground">
          The class schedule will be posted here soon.
        </p>
      </div>
    </motion.div>
  );
}

/* ============================================================
   QUIZZES — LIST OF FORMS
============================================================ */

function QuizzesSection() {
  const { user } = useAuth();
  const fetchForms = useServerFn(listPublishedForms);
  const fetchSubs = useServerFn(getMySubmissions);

  const { data: forms = [] } = useQuery({ queryKey: ["forms-published"], queryFn: () => fetchForms() });
  const { data: subs = [] } = useQuery({ queryKey: ["my-subs"], queryFn: () => fetchSubs() });

  if (user?.id === "guest") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div className="glass-strong p-10 rounded-3xl max-w-sm w-full mx-auto shadow-[var(--shadow-glow)]">
          <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h2 className="text-xl font-bold mb-2 text-gradient">Access Restricted</h2>
          <p className="text-muted-foreground text-sm">
            You must be a student to view and take quizzes.
          </p>
        </div>
      </motion.div>
    );
  }

  const quizzes = forms.filter((f: any) => f.type === "quiz");
  const tests = forms.filter((f: any) => f.type === "test");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
      className="space-y-12"
    >
      <div>
        <h2 className="text-2xl font-bold text-gradient mb-6">Quizzes</h2>
        {quizzes.length === 0 ? (
          <p className="text-muted-foreground">No quizzes available right now.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quizzes.map((f: any) => <FormCard key={f.id} form={f} sub={subs.find((s: any) => s.form_id === f.id)} />)}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gradient mb-6">Tests / Exams</h2>
        {tests.length === 0 ? (
          <p className="text-muted-foreground">No tests available right now.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tests.map((f: any) => <FormCard key={f.id} form={f} sub={subs.find((s: any) => s.form_id === f.id)} />)}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function FormCard({ form, sub }: { form: any; sub: any }) {
  const navigate = useNavigate();
  const getQCount = useServerFn(getQuestionCount);
  const { data: count = 0 } = useQuery({ queryKey: ["qcount", form.id], queryFn: () => getQCount({ data: { formId: form.id } }) });

  const pct = sub ? Math.round((sub.score / Math.max(1, sub.total_questions)) * 100) : 0;
  let gradeColor = "text-muted-foreground";
  if (sub) {
    if (pct >= 90) gradeColor = "text-success";
    else if (pct >= 75) gradeColor = "text-primary";
    else if (pct >= 60) gradeColor = "text-accent";
    else gradeColor = "text-destructive";
  }

  return (
    <div className="glass rounded-3xl p-6 transition-all hover:shadow-[var(--shadow-glow)] hover:border-primary/30 flex flex-col h-full relative overflow-hidden group">
      {sub && (
        <div className="absolute top-0 right-0 rounded-bl-2xl bg-success/10 px-4 py-1.5 text-xs font-bold text-success border-l border-b border-success/20">
          COMPLETED
        </div>
      )}
      
      <div className="flex-1">
        <h3 className="text-lg font-bold pr-16">{form.title}</h3>
        {form.description && <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{form.description}</p>}
      </div>
      
      <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
          <FileQuestion className="h-3.5 w-3.5" /> {count} Qs
        </div>
        {form.has_timer && (
          <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-accent">
            <Clock className="h-3.5 w-3.5" /> {form.time_limit_minutes}m
          </div>
        )}
      </div>

      <div className="mt-6">
        {sub ? (
          <div className="flex items-center justify-between rounded-xl border border-white/5 bg-black/10 p-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Score</p>
              <p className={`mt-1 text-2xl font-bold ${gradeColor}`}>{sub.score}<span className="text-sm font-normal text-muted-foreground">/{sub.total_questions}</span></p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Grade</p>
              <p className={`mt-1 text-2xl font-bold ${gradeColor}`}>{pct}%</p>
            </div>
          </div>
        ) : (
          <Button
            onClick={() => navigate({ to: "/take/$formId", params: { formId: form.id } })}
            className="w-full h-11 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            Start {form.type === "quiz" ? "Quiz" : "Test"}
          </Button>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   ASSIGNMENTS
============================================================ */
function AssignmentsSection() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const fetchAssignments = useServerFn(getAssignments);
  const fetchCompletions = useServerFn(getStudentCompletions);
  const markDone = useServerFn(markAssignmentDone);
  const [finishing, setFinishing] = useState<string | null>(null);

  const { data: assignments = [], isLoading: loadingAssignments } = useQuery({
    queryKey: ["assignments"],
    queryFn: () => fetchAssignments(),
  });

  const { data: completions = [], isLoading: loadingComps } = useQuery({
    queryKey: ["assignment-completions"],
    queryFn: () => fetchCompletions(),
  });

  const activeAssignments = assignments.filter((a: any) => !completions.includes(a.id));

  async function handleFinish(id: string) {
    if (user?.id === "guest") return toast.error("Guests cannot complete assignments");
    setFinishing(id);
    try {
      await markDone({ data: { assignmentId: id } });
      toast.success("Assignment marked as finished!");
      qc.invalidateQueries({ queryKey: ["assignment-completions"] });
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setFinishing(null);
    }
  }

  if (loadingAssignments || loadingComps) {
    return <div className="text-center py-10 animate-pulse text-muted-foreground">Loading assignments...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <h2 className="text-2xl font-bold text-gradient mb-6">Assignments</h2>

      {activeAssignments.length === 0 ? (
        <div className="glass-strong rounded-3xl p-10 text-center shadow-[var(--shadow-glow)] max-w-md mx-auto">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-success/20 mx-auto mb-4">
            <Check className="h-8 w-8 text-success" />
          </div>
          <h3 className="text-xl font-bold mb-2">You're all caught up!</h3>
          <p className="text-muted-foreground text-sm">There are no pending assignments at the moment.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {activeAssignments.map((a: any) => (
            <div key={a.id} className="glass rounded-3xl p-6 transition-all hover:shadow-[var(--shadow-glow)] hover:border-primary/30 flex flex-col h-full group">
              <div className="flex-1">
                <h3 className="text-lg font-bold">{a.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground whitespace-pre-wrap">{a.instruction}</p>
                {a.deadline_at && (
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-accent">
                    <Clock className="h-3.5 w-3.5" /> Due: {new Date(a.deadline_at).toLocaleString()}
                  </div>
                )}
                {a.image_url && (
                  <div className="mt-4 rounded-xl overflow-hidden border border-white/10 bg-black/20">
                    <img src={a.image_url} alt="Assignment attachment" className="w-full h-32 object-cover transition-transform group-hover:scale-105" />
                  </div>
                )}
              </div>
              <div className="mt-6 pt-4 border-t border-white/5">
                <Button
                  onClick={() => handleFinish(a.id)}
                  disabled={finishing === a.id || user?.id === "guest"}
                  className="w-full h-11 bg-gradient-to-r from-success/80 to-success text-success-foreground font-semibold hover:opacity-90 glow"
                >
                  {finishing === a.id ? "Finishing..." : <><Check className="h-4 w-4 mr-2" /> Mark as Finished</>}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
