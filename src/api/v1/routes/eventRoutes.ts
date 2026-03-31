import express from "express";
import { validateRequest } from "../middleware/validate";
import * as eventController from "../controllers/eventController";
import { postSchemas } from "../validation/postSchemas";

const router = express.Router();

// Example 1: Create a new event
/**
 * @openapi
 * /event:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - date
 *               - capacity
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 example: "Tech Conference"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-06-15T10:00:00Z"
 *               capacity:
 *                 type: integer
 *                 minimum: 5
 *                 example: 100
 *               status:
 *                 type: string
 *                 enum: [active, cancelled, completed]
 *                 default: active
 *               category:
 *                 type: string
 *                 enum: [conference, workshop, meetup, seminar, general]
 *                 default: general
 *               registrationCount:
 *                 type: integer
 *                 minimum: 0
 *                 example: 0
 *     responses:
 *       '201':
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventResponse'
 *       '400':
 *         description: Invalid input data
 */
router.post("/event", validateRequest(postSchemas.create), eventController.createPostHandler);

// Example 2: Get all events
/**
 * @openapi
 * /event:
 *   get:
 *     summary: Retrieve all events
 *     tags: [Events]
 *     responses:
 *       '200':
 *         description: Successfully retrieved events
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventListResponse'
 */
router.get("/event", eventController.getAllPostsHandler);


// Example 2: Get all events
/**
 * @openapi
 * /event:
 *   get:
 *     summary: Retrieve all events
 *     tags: [Events]
 *     responses:
 *       '200':
 *         description: Successfully retrieved events
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventListResponse'
 */
router.get("/event", eventController.getAllPostsHandler);

// Example 3: Get event by ID
/**
 * @openapi
 * /event/{id}:
 *   get:
 *     summary: Retrieve a specific event by ID
 *     tags: [Events]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       '200':
 *         description: Event retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventResponse'
 *       '400':
 *         description: Invalid ID
 *       '404':
 *         description: Event not found
 */
router.get("/event/:id", validateRequest(postSchemas.getById), eventController.getPostByIdHandler);

// Example 4: Update an event
/**
 * @openapi
 * /event/{id}:
 *   put:
 *     summary: Update a specific event
 *     tags: [Events]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             minProperties: 1
 *             properties:
 *               name:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               capacity:
 *                 type: integer
 *               category:
 *                 type: string
 *               registrationCount:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [active, cancelled, completed]
 *     responses:
 *       '200':
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventResponse'
 *       '400':
 *         description: Validation error
 *       '404':
 *         description: Event not found
 */
router.put("/event/:id", validateRequest(postSchemas.update), eventController.updatePostHandler);

// Example 5: Delete an event
/**
 * @openapi
 * /event/{id}:
 *   delete:
 *     summary: Delete a specific event
 *     tags: [Events]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       '200':
 *         description: Event deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BasicResponse'
 *       '400':
 *         description: Missing or invalid ID
 *       '404':
 *         description: Event not found
 */
router.delete("/event/:id", validateRequest(postSchemas.delete), eventController.deletePostHandler);

export default router;