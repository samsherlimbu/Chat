'use client'
import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  // Safely access localStorage on the client side
  useEffect(() => {
    const storedUser = localStorage.getItem("chat-user");

    if (storedUser) {
      try {
        // Try to parse the JSON, and only set if successful
        setAuthUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing chat-user:", error);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
