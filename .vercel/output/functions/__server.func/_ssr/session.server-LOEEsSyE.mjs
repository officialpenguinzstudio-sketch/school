import { u as useSession } from "./server-LI3vKvOL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "../_libs/scheduler.mjs";
import "stream";
import "util";
import "../_libs/isbot.mjs";
const SESSION_PASSWORD = process.env.SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || "dev-only-fallback-not-for-production-min-32chars";
function getAppSession() {
  return useSession({
    password: SESSION_PASSWORD,
    name: "quizportal_session",
    maxAge: 60 * 60 * 24 * 7,
    // 7 days
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/"
    }
  });
}
export {
  getAppSession
};
