"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./protectedroute.css";

interface ProtectedRouteProps {
  children: ReactNode;
  isAuthenticated: boolean;
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  isAuthenticated,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, redirectTo, router]);

  if (!isAuthenticated) {
    return (
      <div className="protected-route">
        <div className="protected-route-loader">
          <div className="protected-route-spinner" />
          <p>Checking authentication...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}