
-- 1. Add hashed PIN column
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS pin_hash text;

-- 2. Seed hashes (admin = 101020091010, students keep their existing PINs)
UPDATE public.users SET pin_hash = '$2b$10$sF8UrBUXytgbSS6M2gvzt.OoHkaEdYkLbA4Ofl0csF54T8//gGtdu' WHERE login_pin = '0000';
UPDATE public.users SET pin_hash = '$2b$10$5fMSGSwWgtxo8Uj41pkO.elJqwVNnWFMNlokGf5sZanzlgSmQ/cum' WHERE login_pin = '10102009';
UPDATE public.users SET pin_hash = '$2b$10$5dFkXcMpa8mr4SLMZkrXReJRRmZ0Y5tGR3RZAnwgZGAsvGjKba7ge' WHERE login_pin = '1010';

-- 3. Drop old plaintext column
ALTER TABLE public.users DROP COLUMN login_pin;
ALTER TABLE public.users ALTER COLUMN pin_hash SET NOT NULL;

-- 4. Drop all permissive public policies
DROP POLICY IF EXISTS "public all users" ON public.users;
DROP POLICY IF EXISTS "public all forms" ON public.forms;
DROP POLICY IF EXISTS "public all questions" ON public.questions;
DROP POLICY IF EXISTS "public all submissions" ON public.submissions;

-- 5. Revoke public/anon/authenticated grants — only service_role (server code) may touch these
REVOKE ALL ON public.users FROM anon, authenticated, PUBLIC;
REVOKE ALL ON public.forms FROM anon, authenticated, PUBLIC;
REVOKE ALL ON public.questions FROM anon, authenticated, PUBLIC;
REVOKE ALL ON public.submissions FROM anon, authenticated, PUBLIC;

GRANT ALL ON public.users TO service_role;
GRANT ALL ON public.forms TO service_role;
GRANT ALL ON public.questions TO service_role;
GRANT ALL ON public.submissions TO service_role;

-- 6. Ensure RLS is still enabled (defense in depth — service_role bypasses, all others denied)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
