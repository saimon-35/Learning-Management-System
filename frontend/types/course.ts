export interface Course {
  id: number;

  documentId: string;

  createdAt: string;

  updatedAt: string;

  publishedAt: string | null;

  title: string;

  description: string;

  slug: string;

  price: number;

  category?: string;

  course_status: "draft" | "pending_review" | "published";

  instructor?: {
    id: number;

    documentId?: string;

    username: string;

    email: string;
  };
}

export interface CreateCourseRequest {
  title: string;

  description: string;

  slug: string;

  price: number;

  category: string;
}

export interface CreateCourseResponse {
  data: Course;

  meta?: Record<string, unknown>;
}

export interface GetCoursesResponse {
  data: Course[];

  meta: {
    pagination: {
      page: number;

      pageSize: number;

      pageCount: number;

      total: number;
    };
  };
}

export interface SubmitCourseForReviewResponse {
  data: Course;
}