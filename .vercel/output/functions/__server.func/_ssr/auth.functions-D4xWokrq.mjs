import { c as createServerRpc } from "./createServerRpc-DjT8d_2n.mjs";
import { c as createServerFn } from "./server-LI3vKvOL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
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
const loginWithPin_createServerFn_handler = createServerRpc({
  id: "eb443cb4d4db008126a834365cd1bf193abe2d722427d86fea21a647c311f95b",
  name: "loginWithPin",
  filename: "src/lib/auth.functions.ts"
}, (opts) => loginWithPin.__executeServer(opts));
const loginWithPin = createServerFn({
  method: "POST"
}).validator((d) => objectType({
  pin: stringType().min(1).max(64)
}).parse(d)).handler(loginWithPin_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-C8UZwOtV.mjs");
  const bcrypt = (await import("../_libs/bcryptjs.mjs")).default;
  const {
    getAppSession
  } = await import("./session.server-LOEEsSyE.mjs");
  const pin = data.pin.trim();
  const {
    data: users,
    error
  } = await supabaseAdmin.from("users").select("id, name, role, disabled, pin_hash");
  if (error) throw new Error("Database error");
  let matched = null;
  for (const u of users ?? []) {
    if (!u.pin_hash) continue;
    if (await bcrypt.compare(pin, u.pin_hash)) {
      matched = u;
      break;
    }
  }
  if (!matched) throw new Error("Invalid PIN");
  if (matched.disabled) throw new Error("Account disabled");
  const session = await getAppSession();
  await session.update({
    userId: matched.id,
    role: matched.role,
    name: matched.name
  });
  return {
    id: matched.id,
    name: matched.name,
    role: matched.role
  };
});
const getCurrentUser_createServerFn_handler = createServerRpc({
  id: "5d9211d3240dce68af5737fec078ee48fb5558618e9bd41f21d3c6986043680d",
  name: "getCurrentUser",
  filename: "src/lib/auth.functions.ts"
}, (opts) => getCurrentUser.__executeServer(opts));
const getCurrentUser = createServerFn({
  method: "GET"
}).handler(getCurrentUser_createServerFn_handler, async () => {
  const {
    getAppSession
  } = await import("./session.server-LOEEsSyE.mjs");
  const session = await getAppSession();
  if (!session.data.userId || !session.data.role || !session.data.name) return null;
  return {
    id: session.data.userId,
    name: session.data.name,
    role: session.data.role
  };
});
const signOut_createServerFn_handler = createServerRpc({
  id: "95f2cf03275bf7421044cb43581f390444f8462eb7ceef40d1fbcdaa0f979964",
  name: "signOut",
  filename: "src/lib/auth.functions.ts"
}, (opts) => signOut.__executeServer(opts));
const signOut = createServerFn({
  method: "POST"
}).handler(signOut_createServerFn_handler, async () => {
  const {
    getAppSession
  } = await import("./session.server-LOEEsSyE.mjs");
  const session = await getAppSession();
  await session.clear();
  return {
    ok: true
  };
});
export {
  getCurrentUser_createServerFn_handler,
  loginWithPin_createServerFn_handler,
  signOut_createServerFn_handler
};
