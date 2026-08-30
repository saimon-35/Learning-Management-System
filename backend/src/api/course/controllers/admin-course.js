'use strict';

/**
 * Admin Course Controller
 */

const { createCoreController } =
  require('@strapi/strapi').factories;

module.exports = createCoreController(
  'api::course.course',
  ({ strapi }) => ({

    // =========================================================
    // GET ALL COURSES
    // Only Admin can access
    // =========================================================

    async findAllCourses(ctx) {
      const user = ctx.state.user;
      console.log('Admin user:', user);
      // -------------------------------------------------------
      // Check authentication
      // -------------------------------------------------------

      if (!user) {
        return ctx.unauthorized(
          'You must be logged in.'
        );
      }

      // -------------------------------------------------------
      // Check Admin role
      // -------------------------------------------------------

      if (user.role?.name !== 'Admin') {
        return ctx.forbidden(
          'Only admins can access all courses.'
        );
      }

      // -------------------------------------------------------
      // Pagination
      // -------------------------------------------------------

      const page = Number(
        ctx.query.pagination?.page || 1
      );

      const pageSize = Number(
        ctx.query.pagination?.pageSize || 25
      );

      const start = (page - 1) * pageSize;

      // -------------------------------------------------------
      // Get all courses
      // -------------------------------------------------------

      const courses = await strapi
        .documents('api::course.course')
        .findMany({
          populate: {
            instructor: true,
            category: true,
            thumbnail: true,
          },

          sort: 'createdAt:desc',

          start,
          limit: pageSize,
        });

      // -------------------------------------------------------
      // Get total courses
      // -------------------------------------------------------

      const total = await strapi
        .documents('api::course.course')
        .count();

      // -------------------------------------------------------
      // Return response
      // -------------------------------------------------------

      return {
        data: courses,

        meta: {
          pagination: {
            page,
            pageSize,
            pageCount: Math.ceil(
              total / pageSize
            ),
            total,
          },
        },
      };
    },

  })
);