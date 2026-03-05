import { createContext, useContext } from "react";
import type { UserType } from "../types/user-type";

export type UserContext = UserType;

export type AuthContextType = {
  isAuthenticated: boolean;
  user: UserContext | null;
  login: (userData: UserContext) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth outside AuthProvider");
  return context;
};
