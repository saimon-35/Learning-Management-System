"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import InstructorSidebar from "@/components/instructor/InstructorSidebar/InstructorSidebar";
import useAuth from "@/hooks/useAuth";

import "./instructor.css";

export default function InstructorPage() {
  const router = useRouter();

  const {
    user,
    isAuthenticated,
    isInstructor,
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

    if (!isInstructor) {
      router.replace("/my-courses");
    }
  }, [
    isLoading,
    isAuthenticated,
    isInstructor,
    router,
  ]);

  if (isLoading) {
    return (
      <div className="instructor-page">
        <main className="instructor-main">
          <p>Loading instructor dashboard...</p>
        </main>
      </div>
    );
  }

  if (!isAuthenticated || !isInstructor) {
    return null;
  }

  return (
    <div className="instructor-page">
      <InstructorSidebar />

      <main className="instructor-main">
        <div className="instructor-header">
          <div>
            <h1>Instructor Dashboard</h1>

            <p>
              Welcome back,{" "}
              <strong>
                {user?.username}
              </strong>
              . Manage your courses and lessons from
              here.
            </p>
          </div>

          <Link
            href="/instructor/courses/create"
            className="create-course-button"
          >
            + Create Course
          </Link>
        </div>

        <section className="instructor-stats">
          <div className="stat-card">
            <span className="stat-icon">
              📚
            </span>

            <div>
              <p>Total Courses</p>
              <h2>0</h2>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">
              📖
            </span>

            <div>
              <p>Total Lessons</p>
              <h2>0</h2>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">
              👥
            </span>

            <div>
              <p>Total Students</p>
              <h2>0</h2>
            </div>
          </div>
        </section>

        <section className="recent-courses">
          <div className="section-header">
            <div>
              <h2>My Courses</h2>

              <p>
                Your recently created courses will
                appear here.
              </p>
            </div>

            <Link
              href="/instructor/courses"
              className="view-all-link"
            >
              View All
            </Link>
          </div>

          <div className="empty-courses">
            <div className="empty-icon">
              📚
            </div>

            <h3>No courses yet</h3>

            <p>
              You have not created any courses yet.
              Start creating your first course.
            </p>

            <Link
              href="/instructor/courses/create"
              className="empty-create-button"
            >
              Create Your First Course
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}