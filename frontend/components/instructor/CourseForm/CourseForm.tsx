"use client";

import { FormEvent, useState } from "react";
import styles from "./CourseForm.module.css";

interface CourseFormData {
  title: string;
  description: string;
  category: string;
  slug: string;
  price: string;
}

interface CourseFormProps {
  initialData?: Partial<CourseFormData>;
  onSubmit?: (data: CourseFormData) => void;
  submitLabel?: string;
}

export default function CourseForm({
  initialData,
  onSubmit,
  submitLabel = "Create Course",
}: CourseFormProps) {
  const [formData, setFormData] = useState<CourseFormData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    category: initialData?.category || "",
    slug: initialData?.slug || "",
    price: initialData?.price || "",
  });

  const [error, setError] = useState("");

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      setError("Course title is required.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Course description is required.");
      return;
    }

    if (!formData.slug.trim()) {
      setError("Course slug is required.");
      return;
    }

    if (!formData.category) {
      setError("Please select a category.");
      return;
    }

    if (!formData.price) {
      setError("Course price is required.");
      return;
    }

    if (Number(formData.price) < 0) {
      setError("Course price cannot be negative.");
      return;
    }

    setError("");

    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <h2 className={styles.title}>{submitLabel}</h2>

        <p className={styles.subtitle}>
          Enter the information for your course.
        </p>
      </div>

      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      <div className={styles.formGroup}>
        <label htmlFor="title">
          Course Title
        </label>

        <input
          id="title"
          name="title"
          type="text"
          placeholder="Enter course title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="slug">
          Course Slug
        </label>

        <input
          id="slug"
          name="slug"
          type="text"
          placeholder="cpp-programming"
          value={formData.slug}
          onChange={handleChange}
        />

        <span className={styles.helpText}>
          Example: cpp-programming
        </span>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">
          Course Description
        </label>

        <textarea
          id="description"
          name="description"
          placeholder="Enter course description"
          rows={6}
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label htmlFor="category">
            Category
          </label>

          <input
            id="category"
            name="category"
            type="text"
            placeholder="Enter category document ID"
            value={formData.category}
            onChange={handleChange}
          />

          <span className={styles.helpText}>
            Example: l655z6jm6jzsi7i34mvnd9u5
          </span>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="price">
            Price
          </label>

          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="1"
            placeholder="1500"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
      </div>

      <button
        type="submit"
        className={styles.submitButton}
      >
        {submitLabel}
      </button>
    </form>
  );
}