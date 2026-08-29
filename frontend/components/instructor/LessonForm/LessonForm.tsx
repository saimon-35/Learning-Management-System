"use client";

import { FormEvent, useState } from "react";
import styles from "./LessonForm.module.css";

interface LessonFormData {
  title: string;
  description: string;
  content: string;
  videoUrl: string;
  order: string;
}

interface LessonFormProps {
  initialData?: Partial<LessonFormData>;
  onSubmit?: (data: LessonFormData) => void;
  submitLabel?: string;
}

export default function LessonForm({
  initialData,
  onSubmit,
  submitLabel = "Create Lesson",
}: LessonFormProps) {
  const [formData, setFormData] = useState<LessonFormData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    content: initialData?.content || "",
    videoUrl: initialData?.videoUrl || "",
    order: initialData?.order || "",
  });

  const [error, setError] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      setError("Lesson title is required.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Lesson description is required.");
      return;
    }

    if (!formData.content.trim()) {
      setError("Lesson content is required.");
      return;
    }

    if (!formData.order) {
      setError("Lesson order is required.");
      return;
    }

    if (Number(formData.order) < 1) {
      setError("Lesson order must be at least 1.");
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
          Add the information and content for your lesson.
        </p>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.formGroup}>
        <label htmlFor="title">Lesson Title</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Enter lesson title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">Lesson Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Enter a short description of this lesson"
          rows={4}
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="content">Lesson Content</label>
        <textarea
          id="content"
          name="content"
          placeholder="Write the lesson content here..."
          rows={10}
          value={formData.content}
          onChange={handleChange}
        />
      </div>

      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label htmlFor="videoUrl">Video URL</label>
          <input
            id="videoUrl"
            name="videoUrl"
            type="url"
            placeholder="https://youtube.com/..."
            value={formData.videoUrl}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="order">Lesson Order</label>
          <input
            id="order"
            name="order"
            type="number"
            min="1"
            placeholder="1"
            value={formData.order}
            onChange={handleChange}
          />
        </div>
      </div>

      <button type="submit" className={styles.submitButton}>
        {submitLabel}
      </button>
    </form>
  );
}