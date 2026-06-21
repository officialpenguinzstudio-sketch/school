import { getAppSession } from "./session.server-LOEEsSyE.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "./server-LI3vKvOL.mjs";
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
async function requireUser() {
  const session = await getAppSession();
  if (!session.data.userId || !session.data.role) {
    throw new Error("Not signed in");
  }
  return {
    id: session.data.userId,
    role: session.data.role,
    name: session.data.name ?? ""
  };
}
async function requireAdmin() {
  const u = await requireUser();
  if (u.role !== "admin") throw new Error("Admin only");
  return u;
}
async function requireStudent() {
  const u = await requireUser();
  if (u.role !== "student") throw new Error("Student only");
  return u;
}
export {
  requireAdmin,
  requireStudent,
  requireUser
};
