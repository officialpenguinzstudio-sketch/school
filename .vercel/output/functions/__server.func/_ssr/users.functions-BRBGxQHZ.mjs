import { c as createServerRpc } from "./createServerRpc-DjT8d_2n.mjs";
import { c as createServerFn } from "./server-LI3vKvOL.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType, b as booleanType } from "../_libs/zod.mjs";
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
const listStudents_createServerFn_handler = createServerRpc({
  id: "f6a17220f53f43f0be0bb4675b08bc7d0abc86f67b0a49eb578011f1aff6e341",
  name: "listStudents",
  filename: "src/lib/users.functions.ts"
}, (opts) => listStudents.__executeServer(opts));
const listStudents = createServerFn({
  method: "GET"
}).handler(listStudents_createServerFn_handler, async () => {
  const {
    requireAdmin
  } = await import("./guards.server-Do8_C0UY.mjs");
  const {
    supabaseAdmin
  } = await import("./client.server-C8UZwOtV.mjs");
  await requireAdmin();
  const {
    data
  } = await supabaseAdmin.from("users").select("id, name, role, disabled, created_at").eq("role", "student").order("created_at", {
    ascending: false
  });
  return data ?? [];
});
const createStudent_createServerFn_handler = createServerRpc({
  id: "6b2368e01b9d9c0b0581503c38eb8a4885eb357baa4378729db997d501be91ca",
  name: "createStudent",
  filename: "src/lib/users.functions.ts"
}, (opts) => createStudent.__executeServer(opts));
const createStudent = createServerFn({
  method: "POST"
}).validator((d) => objectType({
  name: stringType().min(1).max(100),
  pin: stringType().min(4).max(32)
}).parse(d)).handler(createStudent_createServerFn_handler, async ({
  data
}) => {
  const {
    requireAdmin
  } = await import("./guards.server-Do8_C0UY.mjs");
  const {
    supabaseAdmin
  } = await import("./client.server-C8UZwOtV.mjs");
  const bcrypt = (await import("../_libs/bcryptjs.mjs")).default;
  await requireAdmin();
  const hash = await bcrypt.hash(data.pin, 10);
  const {
    error
  } = await supabaseAdmin.from("users").insert({
    name: data.name,
    role: "student",
    pin_hash: hash
  });
  if (error) throw new Error("Could not create student");
  return {
    ok: true
  };
});
const toggleStudentDisabled_createServerFn_handler = createServerRpc({
  id: "d74d4b29fbab4cd8ae68e79af262cca14fc64b667ddcf518d8c2f4bd7a163261",
  name: "toggleStudentDisabled",
  filename: "src/lib/users.functions.ts"
}, (opts) => toggleStudentDisabled.__executeServer(opts));
const toggleStudentDisabled = createServerFn({
  method: "POST"
}).validator((d) => objectType({
  id: stringType().uuid(),
  disabled: booleanType()
}).parse(d)).handler(toggleStudentDisabled_createServerFn_handler, async ({
  data
}) => {
  const {
    requireAdmin
  } = await import("./guards.server-Do8_C0UY.mjs");
  const {
    supabaseAdmin
  } = await import("./client.server-C8UZwOtV.mjs");
  await requireAdmin();
  await supabaseAdmin.from("users").update({
    disabled: data.disabled
  }).eq("id", data.id);
  return {
    ok: true
  };
});
const deleteStudent_createServerFn_handler = createServerRpc({
  id: "781bc413e9193340db58fe33e2fc1fc9399b3fdca04efa600bdb8c106512e914",
  name: "deleteStudent",
  filename: "src/lib/users.functions.ts"
}, (opts) => deleteStudent.__executeServer(opts));
const deleteStudent = createServerFn({
  method: "POST"
}).validator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(deleteStudent_createServerFn_handler, async ({
  data
}) => {
  const {
    requireAdmin
  } = await import("./guards.server-Do8_C0UY.mjs");
  const {
    supabaseAdmin
  } = await import("./client.server-C8UZwOtV.mjs");
  await requireAdmin();
  await supabaseAdmin.from("submissions").delete().eq("student_id", data.id);
  await supabaseAdmin.from("users").delete().eq("id", data.id).eq("role", "student");
  return {
    ok: true
  };
});
export {
  createStudent_createServerFn_handler,
  deleteStudent_createServerFn_handler,
  listStudents_createServerFn_handler,
  toggleStudentDisabled_createServerFn_handler
};
