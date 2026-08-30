export interface CourseCategory {
  id: number;
  documentId?: string;
  title: string;
}

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

  category?: CourseCategory | null;

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