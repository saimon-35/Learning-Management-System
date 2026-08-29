"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import InstructorSidebar from "@/components/instructor/InstructorSidebar/InstructorSidebar";
import CourseForm from "@/components/instructor/CourseForm/CourseForm";
import useAuth from "@/hooks/useAuth";

import { createCourse } from "@/services/course.service";

import "../../instructor.css";
import "./create-course.css";

interface CourseFormData {
  title: string;
  description: string;
  category: string;
  slug: string;
  price: string;
}

export default function CreateCoursePage() {
  const router = useRouter();

  const {
    isAuthenticated,
    isInstructor,
    isLoading,
    token,
  } = useAuth();

  const [isCreating, setIsCreating] = useState(false);
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
    }
  }, [
    isLoading,
    isAuthenticated,
    isInstructor,
    router,
  ]);

  const handleSubmit = async (data: CourseFormData) => {
    if (!token) {
      setError("Authentication token is missing.");
      return;
    }

    try {
      setIsCreating(true);
      setError("");

      await createCourse(
        {
          title: data.title.trim(),
          description: data.description.trim(),
          slug: data.slug.trim(),
          price: Number(data.price),
          category: data.category.trim(),
        },
        token
      );

      router.push("/instructor/courses");
    } catch (error) {
      console.error("Failed to create course:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to create course."
      );
    } finally {
      setIsCreating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="instructor-page">
        <InstructorSidebar />

        <main className="instructor-main">
          <div className="instructor-loading">
            <p>Loading...</p>
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
        <div className="create-course-header">
          <button
            type="button"
            className="back-button"
            onClick={() =>
              router.push("/instructor/courses")
            }
          >
            ← Back to Courses
          </button>

          <div>
            <h1>Create Course</h1>

            <p>
              Create a new course and start adding lessons.
            </p>
          </div>
        </div>

        {error && (
          <div className="course-form-error">
            {error}
          </div>
        )}

        <section className="create-course-section">
          <CourseForm
            onSubmit={handleSubmit}
            submitLabel={
              isCreating
                ? "Creating Course..."
                : "Create Course"
            }
          />
        </section>
      </main>
    </div>
  );
}