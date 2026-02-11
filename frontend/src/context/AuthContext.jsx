import React, {
  createContext,
  useState,
  useEffect
} from "react";

import api from "../api/axios";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

  /* ---------- STATE ---------- */

  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );

  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored && stored !== "undefined"
        ? JSON.parse(stored)
        : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  /* ---------- LOGIN ---------- */

  const login = (data) => {
    if (!data?.token) return;

    localStorage.setItem("token", data.token);
    setToken(data.token);

    if (data.user) {
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );
      setUser(data.user);
    }
  };

  /* ---------- LOGOUT ---------- */

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
  };

  /* ---------- VERIFY TOKEN ---------- */

  useEffect(() => {
    const verifyUser = async () => {

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/users/profile");

        setUser(res.data);

        localStorage.setItem(
          "user",
          JSON.stringify(res.data)
        );
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [token]);

  /* ---------- VALUE ---------- */

  const value = {
    token,
    user,
    loading,
    isLoggedIn: !!user,
    login,
    logout
  };

  /* ---------- RENDER ---------- */

  if (loading) return null;

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
