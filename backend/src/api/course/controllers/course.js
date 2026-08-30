'use strict';

/**
 * course controller
 */

const {
  createCoreController
} = require('@strapi/strapi').factories;

module.exports = createCoreController(
  'api::course.course',
  ({ strapi }) => ({

    // =========================================================
    // GET PUBLISHED COURSES
    // =========================================================

    async getPublishedCourses(ctx) {

      const courses =
        await strapi
          .service('api::course.course')
          .getPublishedCourses();

      return {
        data: courses,
      };
    },

    // =========================================================
    // CREATE COURSE
    // Instructor only
    // =========================================================

    async create(ctx) {

      const user =
        ctx.state.user;

      if (!user) {
        return ctx.unauthorized(
          'You must be logged in.'
        );
      }

      if (
        user.role?.name !==
        'Instructor'
      ) {
        return ctx.forbidden(
          'Only instructors can create courses.'
        );
      }

      const { data } =
        ctx.request.body;

      if (!data) {
        return ctx.badRequest(
          'Course data is required.'
        );
      }

      const course =
        await strapi
          .service('api::course.course')
          .createCourse(
            user,
            data
          );

      return this.transformResponse(
        course
      );
    },

    // =========================================================
    // GET ALL INSTRUCTOR COURSES
    // =========================================================

    async find(ctx) {

      const user =
        ctx.state.user;

      if (!user) {
        return ctx.unauthorized(
          'You must be logged in.'
        );
      }

      if (
        user.role?.name !==
        'Instructor'
      ) {
        return ctx.forbidden(
          'Only instructors can access courses.'
        );
      }

      const result =
        await strapi
          .service('api::course.course')
          .getInstructorCourses(
            user,
            ctx.query
          );

      return result;
    },

    // =========================================================
    // GET SINGLE INSTRUCTOR COURSE
    // =========================================================

    async findOne(ctx) {

      const user =
        ctx.state.user;

      if (!user) {
        return ctx.unauthorized(
          'You must be logged in.'
        );
      }

      if (
        user.role?.name !==
        'Instructor'
      ) {
        return ctx.forbidden(
          'Only instructors can access courses.'
        );
      }

      const { documentId } =
        ctx.params;

      try {

        const course =
          await strapi
            .service('api::course.course')
            .getInstructorCourse(
              documentId,
              user
            );

        return this.transformResponse(
          course
        );

      } catch (error) {

        if (error.status === 404) {
          return ctx.notFound(
            error.message
          );
        }

        if (error.status === 403) {
          return ctx.forbidden(
            error.message
          );
        }

        throw error;
      }
    },

    // =========================================================
    // UPDATE COURSE
    // Instructor only
    // =========================================================

    async update(ctx) {

      const user =
        ctx.state.user;

      if (!user) {
        return ctx.unauthorized(
          'You must be logged in.'
        );
      }

      if (
        user.role?.name !==
        'Instructor'
      ) {
        return ctx.forbidden(
          'Only instructors can update courses.'
        );
      }

      const { documentId } =
        ctx.params;

      const { data } =
        ctx.request.body;

      if (!data) {
        return ctx.badRequest(
          'Course data is required.'
        );
      }

      try {

        const updatedCourse =
          await strapi
            .service('api::course.course')
            .updateCourse(
              documentId,
              user,
              data
            );

        return this.transformResponse(
          updatedCourse
        );

      } catch (error) {

        if (error.status === 404) {
          return ctx.notFound(
            error.message
          );
        }

        if (error.status === 403) {
          return ctx.forbidden(
            error.message
          );
        }

        throw error;
      }
    },

    // =========================================================
    // SUBMIT COURSE FOR REVIEW
    // Instructor only
    // draft → pending_review
    // =========================================================

    async submitForReview(ctx) {

      const user =
        ctx.state.user;

      if (!user) {
        return ctx.unauthorized(
          'You must be logged in.'
        );
      }

      if (
        user.role?.name !==
        'Instructor'
      ) {
        return ctx.forbidden(
          'Only instructors can submit courses for review.'
        );
      }

      const { documentId } =
        ctx.params;

      try {

        const updatedCourse =
          await strapi
            .service('api::course.course')
            .submitForReview(
              documentId,
              user
            );

        return this.transformResponse(
          updatedCourse
        );

      } catch (error) {

        if (error.status === 404) {
          return ctx.notFound(
            error.message
          );
        }

        if (error.status === 403) {
          return ctx.forbidden(
            error.message
          );
        }

        if (error.status === 400) {
          return ctx.badRequest(
            error.message
          );
        }

        throw error;
      }
    },

    // =========================================================
    // ADMIN
    // GET ALL COURSES
    // =========================================================

    async getAdminCourses(ctx) {

      const user =
        ctx.state.user;

      if (!user) {
        return ctx.unauthorized(
          'You must be logged in.'
        );
      }

      if (
        user.role?.name !==
        'Admin'
      ) {
        return ctx.forbidden(
          'Only admins can access courses.'
        );
      }

      const result =
        await strapi
          .service('api::course.course')
          .getAdminCourses(
            ctx.query
          );

      return result;
    },

    // =========================================================
    // ADMIN
    // GET SINGLE COURSE
    // =========================================================

    async getAdminCourse(ctx) {

      const user =
        ctx.state.user;

      if (!user) {
        return ctx.unauthorized(
          'You must be logged in.'
        );
      }

      if (
        user.role?.name !==
        'Admin'
      ) {
        return ctx.forbidden(
          'Only admins can access courses.'
        );
      }

      const { documentId } =
        ctx.params;

      try {

        const course =
          await strapi
            .service('api::course.course')
            .getAdminCourse(
              documentId
            );

        return this.transformResponse(
          course
        );

      } catch (error) {

        if (error.status === 404) {
          return ctx.notFound(
            error.message
          );
        }

        throw error;
      }
    },

    // =========================================================
    // ADMIN
    // APPROVE COURSE
    // pending_review → published
    // =========================================================

    async approveCourse(ctx) {

      const user =
        ctx.state.user;

      if (!user) {
        return ctx.unauthorized(
          'You must be logged in.'
        );
      }

      if (
        user.role?.name !==
        'Admin'
      ) {
        return ctx.forbidden(
          'Only admins can approve courses.'
        );
      }

      const { documentId } =
        ctx.params;

      try {

        const updatedCourse =
          await strapi
            .service('api::course.course')
            .approveCourse(
              documentId
            );

        return this.transformResponse(
          updatedCourse
        );

      } catch (error) {

        if (error.status === 404) {
          return ctx.notFound(
            error.message
          );
        }

        if (error.status === 400) {
          return ctx.badRequest(
            error.message
          );
        }

        throw error;
      }
    },

    // =========================================================
    // DELETE COURSE
    // Instructor only
    // =========================================================

    async delete(ctx) {

      const user =
        ctx.state.user;

      if (!user) {
        return ctx.unauthorized(
          'You must be logged in.'
        );
      }

      if (
        user.role?.name !==
        'Instructor'
      ) {
        return ctx.forbidden(
          'Only instructors can delete courses.'
        );
      }

      const { documentId } =
        ctx.params;

      try {

        const deletedCourse =
          await strapi
            .service('api::course.course')
            .deleteCourse(
              documentId,
              user
            );

        return this.transformResponse(
          deletedCourse
        );

      } catch (error) {

        if (error.status === 404) {
          return ctx.notFound(
            error.message
          );
        }

        if (error.status === 403) {
          return ctx.forbidden(
            error.message
          );
        }

        throw error;
      }
    },

  })
);