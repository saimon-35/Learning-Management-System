'use strict';

module.exports = {
  routes: [

    // =========================================================
    // ADMIN
    // Get all courses
    // =========================================================

    {
      method: 'GET',
      path: '/admin/courses',
      handler: 'admin-course.findAllCourses',
      config: {},
    },

  ],
};