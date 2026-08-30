"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import AdminSidebar from "@/components/admin/AdminSidebar/AdminSidebar";
import useAuth from "@/hooks/useAuth";

import "./admin.css";

export default function AdminPage() {
  const router = useRouter();

  const {
    isAuthenticated,
    isAdmin,
    isLoading,
  } = useAuth();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (!isAdmin) {
      router.replace("/");
    }
  }, [
    isLoading,
    isAuthenticated,
    isAdmin,
    router,
  ]);

  if (isLoading) {
    return (
      <div className="admin-loading">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="admin-page">
      <AdminSidebar />

      <main className="admin-main">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>

          <p>
            Welcome to the LMS administration dashboard.
          </p>
        </div>

        <div className="admin-dashboard">
          <div className="admin-content-card">
            <h2>Dashboard</h2>

            <p>
              Manage users, courses, and other LMS
              administration tasks from here.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}