'use strict';

module.exports = {
  routes: [

    // =========================================================
    // INSTRUCTOR
    // Submit course for review
    // =========================================================

    {
      method: 'PUT',
      path: '/courses/:documentId/submit-review',
      handler: 'course.submitForReview',
      config: {},
    },

    // =========================================================
    // ADMIN
    // Get all courses
    // =========================================================

    {
      method: 'GET',
      path: '/admin/courses',
      handler: 'course.getAdminCourses',
      config: {},
    },

    // =========================================================
    // ADMIN
    // Get single course
    // =========================================================

    {
      method: 'GET',
      path: '/admin/courses/:documentId',
      handler: 'course.getAdminCourse',
      config: {},
    },

    // =========================================================
    // ADMIN
    // Approve course
    // pending_review → published
    // =========================================================

    {
      method: 'PUT',
      path: '/admin/courses/:documentId/approve',
      handler: 'course.approveCourse',
      config: {},
    },
  ],
};