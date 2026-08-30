import { apiRequest } from "./api";

import type {
  CreateCourseRequest,
  CreateCourseResponse,
  GetCoursesResponse,
  SubmitCourseForReviewResponse,
} from "@/types/course";

export async function createCourse(
  data: CreateCourseRequest,
  token: string
): Promise<CreateCourseResponse> {
  return apiRequest<CreateCourseResponse>("/courses", {
    method: "POST",
    token,
    body: JSON.stringify({
      data,
    }),
  });
}

export async function getCourses(
  token: string
): Promise<GetCoursesResponse> {
  return apiRequest<GetCoursesResponse>("/courses", {
    method: "GET",
    token,
  });
}

export async function submitCourseForReview(
  documentId: string,
  token: string
): Promise<SubmitCourseForReviewResponse> {
  return apiRequest<SubmitCourseForReviewResponse>(
    `/courses/${documentId}/submit-review`,
    {
      method: "PUT",
      token,
    }
  );
}