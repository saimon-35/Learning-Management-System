"use client";

import { useEffect, useState } from "react";

import { getPublishedCourses } from "@/services/course.service";

import type { Course } from "@/types/course";

import "./courses.css";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCourses() {
      try {
        setIsLoading(true);
        setError("");

        const response = await getPublishedCourses();

        setCourses(response.data);
      } catch (error) {
        console.error(
          "Failed to fetch published courses:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load courses."
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchCourses();
  }, []);

  if (isLoading) {
    return (
      <main className="courses-page">
        <div className="courses-container">
          <p>Loading courses...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="courses-page">
      <div className="courses-container">
        <header className="courses-header">
          <h1>All Courses</h1>

          <p>
            Explore our available courses and start
            learning today.
          </p>
        </header>

        {error && (
          <div className="courses-error">
            {error}
          </div>
        )}

        {!error && courses.length === 0 && (
          <div className="courses-empty">
            <h2>No courses available</h2>

            <p>
              There are currently no published courses.
            </p>
          </div>
        )}

        {courses.length > 0 && (
          <div className="courses-grid">
            {courses.map((course) => (
              <article
                key={course.documentId}
                className="course-card"
              >
                <div className="course-card-content">
                  <h2>{course.title}</h2>

                  <p>
                    {course.description}
                  </p>

                  <div className="course-card-footer">
                    <span>
                      ৳{course.price}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}