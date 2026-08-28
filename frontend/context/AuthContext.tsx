"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type {
  AuthContextType,
  AuthUser,
  LoginRequest,
  RegisterRequest,
} from "@/types/auth";

import {
  getCurrentUser,
  login as loginRequest,
  register as registerRequest,
} from "@/services/auth.service";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const isAuthenticated = user !== null && token !== null;

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    if (!storedToken) {
      return;
    }

    getCurrentUser(storedToken)
      .then((currentUser) => {
        setToken(storedToken);
        setUser(currentUser);
      })
      .catch(() => {
        localStorage.removeItem("authToken");
        setToken(null);
        setUser(null);
      });
  }, []);

  const login = async (credentials: LoginRequest) => {
    const response = await loginRequest(credentials);

    localStorage.setItem("authToken", response.jwt);

    setToken(response.jwt);
    setUser(response.user);
  };

  const register = async (data: RegisterRequest) => {
    const response = await registerRequest(data);

    localStorage.setItem("authToken", response.jwt);

    setToken(response.jwt);
    setUser(response.user);
  };

  const logout = () => {
    localStorage.removeItem("authToken");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuthContext must be used inside an AuthProvider"
    );
  }

  return context;
}