"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AdminSidebar from "@/components/admin/AdminSidebar/AdminSidebar";
import useAuth from "@/hooks/useAuth";

import {
  getAdminCourses,
  approveCourse,
} from "@/services/admin-course.service";

import type { Course } from "@/types/course";

import "../admin.css";
import "./courses.css";

export default function AdminCoursesPage() {
  const router = useRouter();

  const {
    isAuthenticated,
    isAdmin,
    isLoading,
    token,
  } = useAuth();

  const [courses, setCourses] = useState<Course[]>([]);
  const [isCoursesLoading, setIsCoursesLoading] =
    useState(true);

  const [approvingCourseId, setApprovingCourseId] =
    useState<string | null>(null);

  const [error, setError] = useState("");

  // =========================================================
  // LOAD COURSES
  // =========================================================

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
      return;
    }

    if (!token) {
      setError("Authentication token is missing.");
      setIsCoursesLoading(false);
      return;
    }

    const authToken = token;

    async function fetchCourses() {
      try {
        setIsCoursesLoading(true);
        setError("");

        const response =
          await getAdminCourses(authToken);

        setCourses(response.data);
      } catch (error) {
        console.error(
          "Failed to fetch admin courses:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load courses."
        );
      } finally {
        setIsCoursesLoading(false);
      }
    }

    fetchCourses();
  }, [
    isLoading,
    isAuthenticated,
    isAdmin,
    token,
    router,
  ]);

  // =========================================================
  // APPROVE COURSE
  // =========================================================

  const handleApproveCourse = async (
    documentId: string
  ) => {
    if (!token) {
      setError("Authentication token is missing.");
      return;
    }

    try {
      setApprovingCourseId(documentId);
      setError("");

      const response =
        await approveCourse(
          documentId,
          token
        );

      setCourses((currentCourses) =>
        currentCourses.map((course) =>
          course.documentId === documentId
            ? response.data
            : course
        )
      );
    } catch (error) {
      console.error(
        "Failed to approve course:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to approve course."
      );
    } finally {
      setApprovingCourseId(null);
    }
  };

  // =========================================================
  // LOADING AUTH
  // =========================================================

  if (isLoading) {
    return (
      <div className="admin-page">
        <AdminSidebar />

        <main className="admin-main">
          <div className="admin-loading">
            <p>Loading...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="admin-page">
      <AdminSidebar />

      <main className="admin-main">

        {/* Header */}

        <div className="admin-courses-header">
          <div>
            <h1>Courses</h1>

            <p>
              Review and manage courses submitted
              by instructors.
            </p>
          </div>

          <div className="admin-course-count">
            {courses.length}{" "}
            {courses.length === 1
              ? "Course"
              : "Courses"}
          </div>
        </div>

        {/* Error */}

        {error && (
          <div className="admin-courses-error">
            {error}
          </div>
        )}

        {/* Loading */}

        {isCoursesLoading ? (
          <div className="admin-courses-loading">
            <p>Loading courses...</p>
          </div>
        ) : courses.length === 0 ? (

          /* Empty */

          <div className="admin-courses-empty">
            <div className="admin-courses-empty-icon">
              📚
            </div>

            <h2>No courses found</h2>

            <p>
              There are currently no courses
              available for review.
            </p>
          </div>

        ) : (

          /* Course list */

          <section className="admin-courses-section">

            <div className="admin-courses-table-wrapper">

              <table className="admin-courses-table">

                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Instructor</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {courses.map((course) => (

                    <tr key={course.documentId}>

                      {/* Course */}

                      <td>
                        <div className="admin-course-title">
                          {course.title}
                        </div>

                        <div className="admin-course-slug">
                          /{course.slug}
                        </div>
                      </td>

                      {/* Instructor */}

                      <td>
                        {course.instructor?.username ||
                          "Unknown"}
                      </td>

                      {/* Category */}

                      <td>
                        {course.category?.title ||
                          "No category"}
                      </td>

                      {/* Price */}

                      <td>
                        ৳{course.price}
                      </td>

                      {/* Status */}

                      <td>
                        <span
                          className={`admin-course-status ${course.course_status}`}
                        >
                          {course.course_status}
                        </span>
                      </td>

                      {/* Action */}

                      <td>

                        {course.course_status ===
                          "pending_review" ? (

                          <button
                            type="button"
                            className="approve-course-button"
                            onClick={() =>
                              handleApproveCourse(
                                course.documentId
                              )
                            }
                            disabled={
                              approvingCourseId ===
                              course.documentId
                            }
                          >
                            {approvingCourseId ===
                            course.documentId
                              ? "Approving..."
                              : "Approve"}
                          </button>

                        ) : course.course_status ===
                          "published" ? (

                          <span className="course-published">
                            Published
                          </span>

                        ) : (

                          <span className="course-draft">
                            Draft
                          </span>

                        )}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </section>

        )}

      </main>
    </div>
  );
}