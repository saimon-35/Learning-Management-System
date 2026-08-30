"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import InstructorSidebar from "@/components/instructor/InstructorSidebar/InstructorSidebar";
import useAuth from "@/hooks/useAuth";

import {
  getCourses,
  submitCourseForReview,
} from "@/services/course.service";

import "../instructor.css";
import "./courses.css";

import type { Course } from "@/types/course";

export default function InstructorCoursesPage() {
  const router = useRouter();

  const {
    isAuthenticated,
    isInstructor,
    isLoading,
    token,
  } = useAuth();

  const [courses, setCourses] = useState<Course[]>([]);
  const [isCoursesLoading, setIsCoursesLoading] =
    useState(true);

  const [submittingCourseId, setSubmittingCourseId] =
    useState<string | null>(null);

  const [error, setError] = useState("");

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
      return;
    }

    if (!token) {
      setError("Authentication token is missing.");
      setIsCoursesLoading(false);
      return;
    }

    async function fetchCourses() {
      try {
        setIsCoursesLoading(true);
        setError("");

        const response = await getCourses(token);

        setCourses(response.data);
      } catch (error) {
        console.error(
          "Failed to fetch courses:",
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
    isInstructor,
    token,
    router,
  ]);

  // =========================================================
  // SUBMIT COURSE FOR REVIEW
  // =========================================================

  const handleSubmitForReview = async (
    documentId: string
  ) => {
    if (!token) {
      setError("Authentication token is missing.");
      return;
    }

    try {
      setSubmittingCourseId(documentId);
      setError("");

      const response =
        await submitCourseForReview(
          documentId,
          token
        );

      // Update the course status in local state
      setCourses((currentCourses) =>
        currentCourses.map((course) =>
          course.documentId === documentId
            ? response.data
            : course
        )
      );
    } catch (error) {
      console.error(
        "Failed to submit course for review:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to submit course for review."
      );
    } finally {
      setSubmittingCourseId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="instructor-page">
        <InstructorSidebar />

        <main className="instructor-main">
          <div className="instructor-loading">
            <p>Loading courses...</p>
          </div>
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
        <div className="courses-header">
          <div>
            <h1>My Courses</h1>

            <p>
              Create and manage the courses you teach.
            </p>
          </div>

          <Link
            href="/instructor/courses/create"
            className="create-course-button"
          >
            + Create Course
          </Link>
        </div>

        <section className="courses-section">
          <div className="courses-section-header">
            <div>
              <h2>All Courses</h2>

              <p>
                Courses created by you will appear here.
              </p>
            </div>

            <span className="course-count">
              {courses.length}{" "}
              {courses.length === 1
                ? "Course"
                : "Courses"}
            </span>
          </div>

          {error && (
            <div className="courses-error">
              {error}
            </div>
          )}

          {isCoursesLoading ? (
            <div className="courses-loading">
              <p>Loading courses...</p>
            </div>
          ) : courses.length === 0 ? (
            <div className="courses-empty-state">
              <div className="courses-empty-icon">
                📚
              </div>

              <h3>No courses found</h3>

              <p>
                You haven't created any courses yet.
                Create your first course to get started.
              </p>

              <Link
                href="/instructor/courses/create"
                className="empty-create-course-button"
              >
                Create Your First Course
              </Link>
            </div>
          ) : (
            <div className="courses-grid">
              {courses.map((course) => (
                <article
                  key={course.documentId}
                  className="course-card"
                >
                  <div className="course-card-content">
                    <div className="course-card-top">
                      <span className="course-label">
                        Course
                      </span>

                      <span className="course-price">
                        ৳{course.price}
                      </span>
                    </div>

                    <h3>{course.title}</h3>

                    <p className="course-description">
                      {course.description}
                    </p>

                    {/* Course Status */}
                    <div className="course-status">
                      <span>
                        Status:
                      </span>

                      <strong>
                        {course.course_status}
                      </strong>
                    </div>

                    <div className="course-card-footer">
                      <span className="course-slug">
                        /{course.slug}
                      </span>

                      <div className="course-actions">
                        <Link
                          href={`/instructor/courses/${course.documentId}`}
                          className="manage-course-button"
                        >
                          Manage
                        </Link>

                        {course.course_status ===
                          "draft" && (
                          <button
                            type="button"
                            className="submit-review-button"
                            onClick={() =>
                              handleSubmitForReview(
                                course.documentId
                              )
                            }
                            disabled={
                              submittingCourseId ===
                              course.documentId
                            }
                          >
                            {submittingCourseId ===
                            course.documentId
                              ? "Submitting..."
                              : "Submit for Review"}
                          </button>
                        )}

                        {course.course_status ===
                          "pending_review" && (
                          <span className="pending-review">
                            Pending Review
                          </span>
                        )}

                        {course.course_status ===
                          "published" && (
                          <span className="published-status">
                            Published
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
