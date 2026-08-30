'use strict';

module.exports = {
  routes: [

    // =========================================================
    // PUBLIC
    // Get published courses
    // =========================================================
    {
      method: 'GET',
      path: '/public/courses',
      handler: 'course.getPublishedCourses',
      config: {},
    },

    // =========================================================
    // INSTRUCTOR
    // Submit course for review
    // draft → pending_review
    // =========================================================
    {
      method: 'PUT',
      path: '/courses/:documentId/submit-review',
      handler: 'course.submitForReview',
      config: {},
    },

    // =========================================================
    // ADMIN
    // Approve course
    // pending_review → published
    // =========================================================
    {
      method: 'PUT',
      path: '/courses/:documentId/approve',
      handler: 'course.approveCourse',
      config: {},
    },

  ],
};