import Joi, { ObjectSchema } from "joi";

// Post operation schemas organized by request part
export const postSchemas = {
    // POST /posts - Create new post
    create: {
        body: Joi.object({
            name: Joi.string().min(3).required().messages({
                //"any.required": "name is required",
                //"string.min": "length must be at least 3 characters long",
            }),
            date: Joi.date().iso().greater("now").required().messages({
                //"any.required": "Event date is required",
                //"date.format": "Event date must be valid ISO date format",
                //"date.greater": "Event date must be in the future",
            }),
            capacity: Joi.number().integer().min(5).required().messages({
                //"any.required": "Capacity is required",
                //"number.base": "Capacity must be a number",
                //"number.integer": "Capacity must be an integer",
                //"number.min": "Capacity must be at least 5",
            }),
            status: Joi.string().valid("active", "cancelled", "completed").default("active").messages({
                //"any.only": "Status must be one of [active, cancelled, completed]"
            }),
            category: Joi.string().valid("conference", "workshop", "meetup", "seminar", "general").default("general").messages({
                //"any.only": "Category must be one of [conference, workshop, meetup, seminar, general]",
            }),
            registrationCount: Joi.number().integer().min(0).max(Joi.ref("capacity")).default(0).messages({
                //"number.base": "Registration count must be a number",
                //"number.integer": "Registration count must be an integer",
                //"number.max": "Registration must be less than or equal to ref:capacity",
            }),

            // System fields. Block user from creating
            id: Joi.forbidden(),
            createdAt: Joi.forbidden(),
            updatedAt: Joi.forbidden(),
        }),
    },
    //get by id
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Post ID is required",
                "string.empty": "Post ID cannot be empty",
            }),
        }),
    },
    // update post
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Post ID is required",
                "string.empty": "Post ID cannot be empty",
            }),
        }),
        body: Joi.object({
            name: Joi.string().optional(),
            date: Joi.date().optional(),
            category: Joi.string().optional(),
            capacity: Joi.number().optional(),
            registrationCount: Joi.number().optional(),
            status: Joi.string().valid("active", "cancelled", "completed").optional(),}).min(1).messages({
                "object.min": "At least one field must be provided to update",
         }),
    },

}