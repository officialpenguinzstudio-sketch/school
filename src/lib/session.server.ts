import { useSession } from "@tanstack/react-start/server";

export type SessionData = {
  userId?: string;
  role?: "admin" | "student";
  name?: string;
};

const SESSION_PASSWORD =
  process.env.SESSION_SECRET ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "dev-only-fallback-not-for-production-min-32chars";

export function getAppSession() {
  return useSession<SessionData>({
    password: SESSION_PASSWORD,
    name: "quizportal_session",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    },
  });
}
