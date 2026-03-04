import { type FC, type PropsWithChildren, useState } from "react";
import { AuthContext, type UserContext } from "./AuthContext";

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserContext | null>(null);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login: setUser,
        logout: () => setUser(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
