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

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated =
    user !== null && token !== null;

  const isInstructor =
    user?.role?.name === "Instructor";

  const isStudent =
    user?.role?.name === "Student";

  const isContentManager =
    user?.role?.name === "Content Manager";

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken =
        localStorage.getItem("authToken");

      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const currentUser =
          await getCurrentUser(storedToken);

        setToken(storedToken);
        setUser(currentUser);
      } catch {
        localStorage.removeItem("authToken");

        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (
    credentials: LoginRequest
  ): Promise<AuthUser> => {
    const response =
      await loginRequest(credentials);

    localStorage.setItem(
      "authToken",
      response.jwt
    );

    setToken(response.jwt);

    const currentUser =
      await getCurrentUser(response.jwt);

    setUser(currentUser);

    return currentUser;
  };

  const register = async (
    data: RegisterRequest
  ): Promise<AuthUser> => {
    const response =
      await registerRequest(data);

    localStorage.setItem(
      "authToken",
      response.jwt
    );

    setToken(response.jwt);

    const currentUser =
      await getCurrentUser(response.jwt);

    setUser(currentUser);

    return currentUser;
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
        token,

        isAuthenticated,
        isLoading,

        isInstructor,
        isStudent,
        isContentManager,

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