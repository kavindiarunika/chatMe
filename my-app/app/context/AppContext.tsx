"use client";

import { createContext, useEffect, useState, ReactNode } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // check JWT on page load
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
};