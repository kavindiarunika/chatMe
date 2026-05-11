"use client";

import { createContext, useEffect, useState, ReactNode } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  loading: boolean;
  active:string;
  setactive:(value:string)=>void;

};

export const ChatContext = createContext<AuthContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [active,setactive] =useState("");

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
    <ChatContext.Provider value={{ isLoggedIn, setIsLoggedIn, loading,active,setactive }}>
      {children}
    </ChatContext.Provider>
  );
};