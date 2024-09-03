"use client";
import { ReactNode, createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { AuthUser } from "@/types/auth";
import { useUser } from "@/hooks/useUser";

interface TAuthContext {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
}

export const AuthContext = createContext<TAuthContext>({
  user: null,
  setUser: () => {},
});

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const router = useRouter();
  const { checkUser } = useUser();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    if (!user) {
      const existingUser = checkUser();

      if (existingUser) {
        setUser(existingUser);
      }
    }
  }, [user, checkUser, router]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
