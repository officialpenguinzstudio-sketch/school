import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { getCurrentUser, signOut, type CurrentUser } from "./auth.functions";

type AuthCtx = {
  user: CurrentUser | null;
  loading: boolean;
  setUser: (u: CurrentUser | null) => void;
  logout: () => Promise<void>;
};

const Ctx = createContext<AuthCtx>({
  user: null,
  loading: true,
  setUser: () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const fetchMe = useServerFn(getCurrentUser);
  const doSignOut = useServerFn(signOut);

  useEffect(() => {
    let alive = true;
    fetchMe()
      .then((u) => {
        if (alive) setUserState(u ?? null);
      })
      .catch(() => alive && setUserState(null))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [fetchMe]);

  const logout = async () => {
    try {
      await doSignOut();
    } catch {}
    setUserState(null);
  };

  return (
    <Ctx.Provider value={{ user, loading, setUser: setUserState, logout }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
export type { CurrentUser };
