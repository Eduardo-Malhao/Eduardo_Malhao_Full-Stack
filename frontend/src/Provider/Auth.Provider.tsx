import React, { useState, useMemo, type ReactNode } from "react";
import AuthContext from "../Context/Auth.Context";

import type { IMe } from "../Features/Auth/Types";
import type { AuthContextType } from "../Context/Auth.Context";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IMe>({} as IMe);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      setUser,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;