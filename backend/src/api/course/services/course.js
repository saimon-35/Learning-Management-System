'use strict';

/**
 * course service
 */

const { createCoreService } =
  require('@strapi/strapi').factories;

module.exports = createCoreService(
  'api::course.course',
  ({ strapi }) => ({

    // =========================================================
// GET PUBLISHED COURSES
// Public courses for students
// =========================================================

async getPublishedCourses() {

  const courses = await strapi
    .documents('api::course.course')
    .findMany({
      filters: {
        course_status: {
          $eq: 'published',
        },
      },

      populate: {
        instructor: true,
        category: true,
        thumbnail: true,
      },

      sort: 'createdAt:desc',
    });

  return courses;
},

    // =========================================================
    // CREATE COURSE
    // Instructor only
    // New course → draft
    // =========================================================

    async createCourse(user, data) {

      // Never allow frontend to set
      // instructor or course status
      delete data.instructor;
      delete data.course_status;

      const course =
        await strapi
          .documents('api::course.course')
          .create({
            data: {
              ...data,
              instructor: user.id,
              course_status: 'draft',
            },

            populate: {
              instructor: {
                fields: [
                  'id',
                  'documentId',
                  'username',
                  'email',
                ],
              },
              category: true,
              thumbnail: true,
            },
          });

      return course;
    },

    // =========================================================
    // GET INSTRUCTOR COURSES
    // Only courses owned by instructor
    // =========================================================

    async getInstructorCourses(user, query) {

      const page = Number(
        query.pagination?.page || 1
      );

      const pageSize = Number(
        query.pagination?.pageSize || 25
      );

      const start = (page - 1) * pageSize;

      const filters = {
        instructor: {
          id: {
            $eq: user.id,
          },
        },
      };

      const courses =
        await strapi
          .documents('api::course.course')
          .findMany({
            filters,

            populate: {
              instructor: {
                fields: [
                  'id',
                  'documentId',
                  'username',
                  'email',
                ],
              },
              category: true,
              thumbnail: true,
            },

            sort: 'createdAt:desc',

            start,
            limit: pageSize,
          });

      const total =
        await strapi
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
    // GET SINGLE INSTRUCTOR COURSE
    // =========================================================

    async getInstructorCourse(
      documentId,
      user
    ) {

      const course =
        await strapi
          .documents('api::course.course')
          .findOne({
            documentId,

            populate: {
              instructor: {
                fields: [
                  'id',
                  'documentId',
                  'username',
                  'email',
                ],
              },
              category: true,
              thumbnail: true,
            },
          });

      if (!course) {

        const error =
          new Error(
            'Course not found.'
          );

        error.status = 404;

        throw error;
      }

      // Check ownership
      if (
        !course.instructor ||
        course.instructor.id !== user.id
      ) {

        const error =
          new Error(
            'You can only access your own courses.'
          );

        error.status = 403;

        throw error;
      }

      return course;
    },

    // =========================================================
    // UPDATE COURSE
    // Instructor only
    // =========================================================

    async updateCourse(
      documentId,
      user,
      data
    ) {

      const course =
        await strapi
          .documents('api::course.course')
          .findOne({
            documentId,

            populate: {
              instructor: {
                fields: [
                  'id',
                  'documentId',
                  'username',
                  'email',
                ],
              },
            },
          });

      if (!course) {

        const error =
          new Error(
            'Course not found.'
          );

        error.status = 404;

        throw error;
      }

      // Check ownership
      if (
        !course.instructor ||
        course.instructor.id !== user.id
      ) {

        const error =
          new Error(
            'You can only update your own courses.'
          );

        error.status = 403;

        throw error;
      }

      // Never allow frontend to change
      // ownership or course status
      delete data.instructor;
      delete data.course_status;

      const updatedCourse =
        await strapi
          .documents('api::course.course')
          .update({
            documentId,

            data,

            populate: {
              instructor: {
                fields: [
                  'id',
                  'documentId',
                  'username',
                  'email',
                ],
              },
              category: true,
              thumbnail: true,
            },
          });

      return updatedCourse;
    },

    // =========================================================
    // SUBMIT COURSE FOR REVIEW
    // draft → pending_review
    // Instructor only
    // =========================================================

    async submitForReview(
      documentId,
      user
    ) {

      const course =
        await strapi
          .documents('api::course.course')
          .findOne({
            documentId,

            populate: {
              instructor: {
                fields: [
                  'id',
                  'documentId',
                  'username',
                  'email',
                ],
              },
            },
          });

      if (!course) {

        const error =
          new Error(
            'Course not found.'
          );

        error.status = 404;

        throw error;
      }

      // Check ownership
      if (
        !course.instructor ||
        course.instructor.id !== user.id
      ) {

        const error =
          new Error(
            'You can only submit your own courses.'
          );

        error.status = 403;

        throw error;
      }

      // Only draft courses can be submitted
      if (
        course.course_status !== 'draft'
      ) {

        const error =
          new Error(
            'Only draft courses can be submitted for review.'
          );

        error.status = 400;

        throw error;
      }

      const updatedCourse =
        await strapi
          .documents('api::course.course')
          .update({
            documentId,

            data: {
              course_status:
                'pending_review',
            },

            populate: {
              instructor: {
                fields: [
                  'id',
                  'documentId',
                  'username',
                  'email',
                ],
              },
              category: true,
              thumbnail: true,
            },
          });

      return updatedCourse;
    },

    // =========================================================
    // ADMIN
    // GET ALL COURSES
    // =========================================================

    async getAdminCourses(query) {

      const page = Number(
        query.pagination?.page || 1
      );

      const pageSize = Number(
        query.pagination?.pageSize || 25
      );

      const start =
        (page - 1) * pageSize;

      const courses =
        await strapi
          .documents('api::course.course')
          .findMany({

            populate: {
              instructor: {
                fields: [
                  'id',
                  'documentId',
                  'username',
                  'email',
                ],
              },
              category: true,
              thumbnail: true,
            },

            sort: 'createdAt:desc',

            start,
            limit: pageSize,
          });

      const total =
        await strapi
          .documents('api::course.course')
          .count();

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
    // ADMIN
    // GET SINGLE COURSE
    // =========================================================

    async getAdminCourse(
      documentId
    ) {

      const course =
        await strapi
          .documents('api::course.course')
          .findOne({
            documentId,

            populate: {
              instructor: {
                fields: [
                  'id',
                  'documentId',
                  'username',
                  'email',
                ],
              },
              category: true,
              thumbnail: true,
            },
          });

      if (!course) {

        const error =
          new Error(
            'Course not found.'
          );

        error.status = 404;

        throw error;
      }

      return course;
    },

    // =========================================================
    // ADMIN
    // APPROVE COURSE
    // pending_review → published
    // =========================================================

    async approveCourse(
      documentId
    ) {

      const course =
        await strapi
          .documents('api::course.course')
          .findOne({
            documentId,

            populate: {
              instructor: {
                fields: [
                  'id',
                  'documentId',
                  'username',
                  'email',
                ],
              },
            },
          });

      if (!course) {

        const error =
          new Error(
            'Course not found.'
          );

        error.status = 404;

        throw error;
      }

      // Only pending courses can be approved
      if (
        course.course_status !==
        'pending_review'
      ) {

        const error =
          new Error(
            'Only courses pending review can be approved.'
          );

        error.status = 400;

        throw error;
      }

      const updatedCourse =
        await strapi
          .documents('api::course.course')
          .update({
            documentId,

            data: {
              course_status:
                'published',
            },

            populate: {
              instructor: {
                fields: [
                  'id',
                  'documentId',
                  'username',
                  'email',
                ],
              },
              category: true,
              thumbnail: true,
            },
          });

      return updatedCourse;
    },

    // =========================================================
    // DELETE COURSE
    // Instructor only
    // =========================================================

    async deleteCourse(
      documentId,
      user
    ) {

      const course =
        await strapi
          .documents('api::course.course')
          .findOne({
            documentId,

            populate: {
              instructor: {
                fields: [
                  'id',
                  'documentId',
                  'username',
                  'email',
                ],
              },
            },
          });

      if (!course) {

        const error =
          new Error(
            'Course not found.'
          );

        error.status = 404;

        throw error;
      }

      // Check ownership
      if (
        !course.instructor ||
        course.instructor.id !== user.id
      ) {

        const error =
          new Error(
            'You can only delete your own courses.'
          );

        error.status = 403;

        throw error;
      }

      const deletedCourse =
        await strapi
          .documents('api::course.course')
          .delete({
            documentId,
          });

      return deletedCourse;
    },

  })
);