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