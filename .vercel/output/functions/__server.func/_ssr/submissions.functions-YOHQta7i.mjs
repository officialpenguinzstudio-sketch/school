import { c as createSsrRpc } from "./router-BkKrKimK.mjs";
import { c as createServerFn } from "./server-LI3vKvOL.mjs";
import { o as objectType, s as stringType, n as numberType, r as recordType, a as arrayType, b as booleanType, e as enumType } from "../_libs/zod.mjs";
const QuestionInput = objectType({
  question_text: stringType().min(1),
  question_type: enumType(["multiple_choice", "short_answer"]),
  options: arrayType(stringType()).optional(),
  correct_answer: stringType().min(1)
});
const listPublishedForms = createServerFn({
  method: "GET"
}).handler(createSsrRpc("9bf86eb5a59c955e5d6b181f4e049d966f5cd3c2e02d98ab937b0f9fbc7e4ae4"));
const listAdminForms = createServerFn({
  method: "GET"
}).handler(createSsrRpc("96360126a2b7e7131920d620f2e02b8349d25791e143d804f1650d567f9beebf"));
const getFormForQuiz = createServerFn({
  method: "POST"
}).validator((d) => objectType({
  formId: stringType().uuid()
}).parse(d)).handler(createSsrRpc("49d69718854de24c8702a89cf3c0a9df4895d8070749c145bce03d713cc502e9"));
const getQuestionCount = createServerFn({
  method: "POST"
}).validator((d) => objectType({
  formId: stringType().uuid()
}).parse(d)).handler(createSsrRpc("9d1b5c73dff9930f9ced8d1bf1b60af0c0af6a5031f4b7a992f442e705ccc03a"));
const createForm = createServerFn({
  method: "POST"
}).validator((d) => objectType({
  title: stringType().min(1),
  description: stringType().nullable(),
  type: enumType(["quiz", "test"]),
  has_timer: booleanType(),
  time_limit_minutes: numberType().nullable(),
  questions: arrayType(QuestionInput).min(1)
}).parse(d)).handler(createSsrRpc("ec7ee786be50570d3408460666c9d14c8e9b6244bead39fdbbd2eff28b2cab22"));
const deleteForm = createServerFn({
  method: "POST"
}).validator((d) => objectType({
  formId: stringType().uuid()
}).parse(d)).handler(createSsrRpc("1c641ee571e61ae8a41d816b0c5322e45d9aecaab1aeba0eedca263dd0963fba"));
const getFormReview = createServerFn({
  method: "POST"
}).validator((d) => objectType({
  formId: stringType().uuid()
}).parse(d)).handler(createSsrRpc("9849aa4e5232a4914539e6de52acec9b752da4370b6a805710dda87e9dd76727"));
const submitQuiz = createServerFn({
  method: "POST"
}).validator((d) => objectType({
  formId: stringType().uuid(),
  answers: recordType(stringType(), stringType()),
  durationSeconds: numberType().int().nonnegative().max(60 * 60 * 24)
}).parse(d)).handler(createSsrRpc("0555f3e448c5dec7fda8f685da7f3772d4cf3ad07697971ab4d6865f102d7150"));
const getMySubmissions = createServerFn({
  method: "GET"
}).handler(createSsrRpc("70b837ca04fbbc9c9a7073a089837beb1985f7ebc70ee21dadc9b81aaf7f7eaa"));
const getLeaderboard = createServerFn({
  method: "POST"
}).validator((d) => objectType({
  formId: stringType().uuid()
}).parse(d)).handler(createSsrRpc("014feeb62350dcb3c1604586a7c738d656d284d9ae4638c2346a9a2808166c31"));
const getDashboardStats = createServerFn({
  method: "GET"
}).handler(createSsrRpc("06a64a7a092e60a0091030f99fe6bf18dac2b6b9e7cb3b01ca949347c182918a"));
export {
  getQuestionCount as a,
  getLeaderboard as b,
  getDashboardStats as c,
  listAdminForms as d,
  deleteForm as e,
  createForm as f,
  getMySubmissions as g,
  getFormReview as h,
  getFormForQuiz as i,
  listPublishedForms as l,
  submitQuiz as s
};
