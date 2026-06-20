import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type CurrentUser = {
  id: string;
  name: string;
  role: "admin" | "student";
};

export const loginWithPin = createServerFn({ method: "POST" })
  .validator((d) => z.object({ pin: z.string().min(1).max(64) }).parse(d))
  .handler(async ({ data }): Promise<CurrentUser> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const bcrypt = (await import("bcryptjs")).default;
    const { getAppSession } = await import("./session.server");

    const pin = data.pin.trim();
    const { data: users, error } = await supabaseAdmin
      .from("users")
      .select("id, name, role, disabled, pin_hash");
    if (error) throw new Error("Database error");

    // Compare against every hash (small user table)
    type Row = { id: string; name: string; role: string; disabled: boolean; pin_hash: string | null };
    let matched: Row | null = null;
    for (const u of (users ?? []) as Row[]) {
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
      role: matched.role as "admin" | "student",
      name: matched.name,
    });

    return {
      id: matched.id,
      name: matched.name,
      role: matched.role as "admin" | "student",
    };
  });

export const getCurrentUser = createServerFn({ method: "GET" }).handler(
  async (): Promise<CurrentUser | null> => {
    const { getAppSession } = await import("./session.server");
    const session = await getAppSession();
    if (!session.data.userId || !session.data.role || !session.data.name) return null;
    return {
      id: session.data.userId,
      name: session.data.name,
      role: session.data.role,
    };
  },
);

export const signOut = createServerFn({ method: "POST" }).handler(async () => {
  const { getAppSession } = await import("./session.server");
  const session = await getAppSession();
  await session.clear();
  return { ok: true };
});
