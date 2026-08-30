'use strict';

/**
 * course controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController(
  'api::course.course',
  ({ strapi }) => ({

    // =========================================================
    // CREATE COURSE
    // =========================================================

    async create(ctx) {
      const user = ctx.state.user;

      // Check authentication
      if (!user) {
        return ctx.unauthorized('You must be logged in.');
      }

      // Check instructor role
      if (user.role?.name !== 'Instructor') {
        return ctx.forbidden(
          'Only instructors can create courses.'
        );
      }

      const { data } = ctx.request.body;

      if (!data) {
        return ctx.badRequest(
          'Course data is required.'
        );
      }

      // Never allow frontend to set the instructor
      delete data.instructor;

      // Create course
      // The logged-in instructor becomes the owner
      const course = await strapi
        .documents('api::course.course')
        .create({
          data: {
            ...data,
            instructor: user.id,
          },
          populate: {
            instructor: true,
            category: true,
            thumbnail: true,
          },
        });

      return this.transformResponse(course);
    },

    // =========================================================
    // GET ALL COURSES
    // Only courses belonging to logged-in instructor
    // =========================================================

    async find(ctx) {
      const user = ctx.state.user;

      // Check authentication
      if (!user) {
        return ctx.unauthorized('You must be logged in.');
      }

      // Check instructor role
      if (user.role?.name !== 'Instructor') {
        return ctx.forbidden(
          'Only instructors can access courses.'
        );
      }

      // Pagination
      const page = Number(
        ctx.query.pagination?.page || 1
      );

      const pageSize = Number(
        ctx.query.pagination?.pageSize || 25
      );

      const start = (page - 1) * pageSize;

      // Ownership filter
      const filters = {
        instructor: {
          id: {
            $eq: user.id,
          },
        },
      };

      // Get courses
      const courses = await strapi
        .documents('api::course.course')
        .findMany({
          filters,

          populate: {
            instructor: true,
            category: true,
            thumbnail: true,
          },

          sort: 'createdAt:desc',

          start,
          limit: pageSize,
        });

      // Get total number of courses
      const total = await strapi
        .documents('api::course.course')
        .count({
          filters,
        });

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

    // =========================================================
    // GET SINGLE COURSE
    // Only owner can access
    // =========================================================

    async findOne(ctx) {
      const user = ctx.state.user;

      // Check authentication
      if (!user) {
        return ctx.unauthorized('You must be logged in.');
      }

      // Check instructor role
      if (user.role?.name !== 'Instructor') {
        return ctx.forbidden(
          'Only instructors can access courses.'
        );
      }

      const { documentId } = ctx.params;

      // Find course
      const course = await strapi
        .documents('api::course.course')
        .findOne({
          documentId,

          populate: {
            instructor: true,
            category: true,
            thumbnail: true,
          },
        });

      // Course doesn't exist
      if (!course) {
        return ctx.notFound(
          'Course not found.'
        );
      }

      // Check ownership
      if (
        !course.instructor ||
        course.instructor.id !== user.id
      ) {
        return ctx.forbidden(
          'You can only access your own courses.'
        );
      }

      return this.transformResponse(course);
    },

    // =========================================================
    // UPDATE COURSE
    // Only owner can update
    // =========================================================

    async update(ctx) {
      const user = ctx.state.user;

      // Check authentication
      if (!user) {
        return ctx.unauthorized('You must be logged in.');
      }

      // Check instructor role
      if (user.role?.name !== 'Instructor') {
        return ctx.forbidden(
          'Only instructors can update courses.'
        );
      }

      const { documentId } = ctx.params;

      const { data } = ctx.request.body;

      if (!data) {
        return ctx.badRequest(
          'Course data is required.'
        );
      }

      // Find existing course
      const course = await strapi
        .documents('api::course.course')
        .findOne({
          documentId,

          populate: {
            instructor: true,
          },
        });

      // Course doesn't exist
      if (!course) {
        return ctx.notFound(
          'Course not found.'
        );
      }

      // Check ownership
      if (
        !course.instructor ||
        course.instructor.id !== user.id
      ) {
        return ctx.forbidden(
          'You can only update your own courses.'
        );
      }

      // Never allow instructor ownership
      // to be changed from frontend
      delete data.instructor;

      // Update course
      const updatedCourse = await strapi
        .documents('api::course.course')
        .update({
          documentId,

          data,

          populate: {
            instructor: true,
            category: true,
            thumbnail: true,
          },
        });

      return this.transformResponse(
        updatedCourse
      );
    },

    // =========================================================
    // DELETE COURSE
    // Only owner can delete
    // =========================================================

    async delete(ctx) {
      const user = ctx.state.user;

      // Check authentication
      if (!user) {
        return ctx.unauthorized('You must be logged in.');
      }

      // Check instructor role
      if (user.role?.name !== 'Instructor') {
        return ctx.forbidden(
          'Only instructors can delete courses.'
        );
      }

      const { documentId } = ctx.params;

      // Find existing course
      const course = await strapi
        .documents('api::course.course')
        .findOne({
          documentId,

          populate: {
            instructor: true,
          },
        });

      // Course doesn't exist
      if (!course) {
        return ctx.notFound(
          'Course not found.'
        );
      }

      // Check ownership
      if (
        !course.instructor ||
        course.instructor.id !== user.id
      ) {
        return ctx.forbidden(
          'You can only delete your own courses.'
        );
      }

      // Delete course
      const deletedCourse = await strapi
        .documents('api::course.course')
        .delete({
          documentId,
        });

      return this.transformResponse(
        deletedCourse
      );
    },

  })
);