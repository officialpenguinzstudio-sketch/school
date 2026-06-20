import { getAppSession } from "./session.server";

export async function requireUser() {
  const session = await getAppSession();
  if (!session.data.userId || !session.data.role) {
    throw new Error("Not signed in");
  }
  return {
    id: session.data.userId,
    role: session.data.role,
    name: session.data.name ?? "",
  };
}

export async function requireAdmin() {
  const u = await requireUser();
  if (u.role !== "admin") throw new Error("Admin only");
  return u;
}

export async function requireStudent() {
  const u = await requireUser();
  if (u.role !== "student") throw new Error("Student only");
  return u;
}
