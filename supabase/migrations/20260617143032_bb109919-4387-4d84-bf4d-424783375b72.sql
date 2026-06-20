
CREATE TABLE public.users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('admin','student')),
  login_pin TEXT NOT NULL UNIQUE,
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

CREATE INDEX idx_questions_form ON public.questions(form_id, order_index);
CREATE INDEX idx_submissions_form ON public.submissions(form_id);
CREATE INDEX idx_submissions_student ON public.submissions(student_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.users TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.forms TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.questions TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.submissions TO anon, authenticated;
GRANT ALL ON public.users, public.forms, public.questions, public.submissions TO service_role;

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public all users" ON public.users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "public all forms" ON public.forms FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "public all questions" ON public.questions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "public all submissions" ON public.submissions FOR ALL USING (true) WITH CHECK (true);

INSERT INTO public.users (name, role, login_pin) VALUES ('Administrator', 'admin', '0000');
INSERT INTO public.users (name, role, login_pin) VALUES ('Demo Student', 'student', '10102009');
