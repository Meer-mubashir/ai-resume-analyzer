import { useState, useEffect, useCallback } from "react";
import api from "../api/client";

let globalState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token") || null,
};

const listeners = new Set();

function notify() {
  listeners.forEach((l) => l());
}

export function useAuth() {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const fn = () => forceUpdate((n) => n + 1);
    listeners.add(fn);
    return () => listeners.delete(fn);
  }, []);

  const login = useCallback(async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    globalState.user = data.user;
    globalState.token = data.token;
    notify();
    return data;
  }, []);

  const register = useCallback(async (name, email, password) => {
    const { data } = await api.post("/auth/register", { name, email, password });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    globalState.user = data.user;
    globalState.token = data.token;
    notify();
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    globalState.user = null;
    globalState.token = null;
    notify();
  }, []);

  return {
    user: globalState.user,
    token: globalState.token,
    isAuthenticated: !!globalState.token,
    login,
    register,
    logout,
  };
}
