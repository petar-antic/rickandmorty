import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../firebase/firebaseConfig";
import { getIdToken, onAuthStateChanged } from "firebase/auth";

interface AuthContextType {
  userLoggedIn: boolean;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setUserLoggedIn(true);
      setLoading(false);
    } else {
      const unsubscribe = onAuthStateChanged(auth, async user => {
        if (user) {
          const token = await getIdToken(user);
          localStorage.setItem("token", token);
          setUserLoggedIn(true);
        } else {
          localStorage.removeItem("token");
          setUserLoggedIn(false);
        }
        setLoading(false);
      });

      return unsubscribe;
    }
  }, []);

  const value = {
    userLoggedIn,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
