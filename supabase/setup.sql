-- ============================================================
-- QuizMaster Pro — Full Database Setup
-- Run this in the Supabase SQL Editor for a fresh project.
-- ============================================================

-- 1. TABLES
CREATE TABLE public.users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('admin','student')),
  pin_hash TEXT NOT NULL,
  disabled BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.forms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL DEFAULT 'quiz' CHECK (type IN ('quiz','test')),
  has_timer BOOLEAN NOT NULL DEFAULT false,
  time_limit_minutes INTEGER,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  form_id UUID NOT NULL REFERENCES public.forms(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL DEFAULT 'multiple_choice' CHECK (question_type IN ('multiple_choice','short_answer')),
  options_json JSONB,
  correct_answer TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  form_id UUID NOT NULL REFERENCES public.forms(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  answers_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  score INTEGER NOT NULL DEFAULT 0,
  total_questions INTEGER NOT NULL DEFAULT 0,
  duration_seconds INTEGER NOT NULL DEFAULT 0,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (form_id, student_id)
);

-- 2. INDEXES
CREATE INDEX idx_questions_form ON public.questions(form_id, order_index);
CREATE INDEX idx_submissions_form ON public.submissions(form_id);
CREATE INDEX idx_submissions_student ON public.submissions(student_id);

-- 3. ROW LEVEL SECURITY (only service_role can access)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.users FROM anon, authenticated, PUBLIC;
REVOKE ALL ON public.forms FROM anon, authenticated, PUBLIC;
REVOKE ALL ON public.questions FROM anon, authenticated, PUBLIC;
REVOKE ALL ON public.submissions FROM anon, authenticated, PUBLIC;

GRANT ALL ON public.users TO service_role;
GRANT ALL ON public.forms TO service_role;
GRANT ALL ON public.questions TO service_role;
GRANT ALL ON public.submissions TO service_role;

-- 4. SEED DATA
-- Admin PIN: admin1234  (bcrypt hash below)
-- Student PIN: student1234  (bcrypt hash below)
INSERT INTO public.users (name, role, pin_hash) VALUES (
  'Administrator', 'admin',
  '$2b$10$djjkhuaZ9uowlTb6HxsWseCeypkY89J/2mKShyYNa1a2ox8AEkIx.'
);
INSERT INTO public.users (name, role, pin_hash) VALUES (
  'Demo Student', 'student',
  '$2b$10$Wn46KLghYezxmatd3CuNvuGvgQVa1c1nD0cv0iw3yfp30uLF3WN56'
);
