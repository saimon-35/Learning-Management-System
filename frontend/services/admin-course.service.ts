import { apiRequest } from "./api";

import type {
  GetCoursesResponse,
  SubmitCourseForReviewResponse,
} from "@/types/course";

/**
 * Get all courses for admin
 */
export async function getAdminCourses(
  token: string
): Promise<GetCoursesResponse> {
  return apiRequest<GetCoursesResponse>(
    "/admin/courses",
    {
      method: "GET",
      token,
    }
  );
}

/**
 * Approve course
 *
 * pending_review → published
 */
export async function approveCourse(
  documentId: string,
  token: string
): Promise<SubmitCourseForReviewResponse> {
  return apiRequest<SubmitCourseForReviewResponse>(
    `/courses/${documentId}/approve`,
    {
      method: "PUT",
      token,
    }
  );
}