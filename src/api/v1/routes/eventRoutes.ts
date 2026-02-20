import express from "express";
import { validateRequest } from "../middleware/validate";
import * as eventController from "../controllers/eventController";
import { postSchemas } from "../validation/postSchemas";

const router = express.Router();

router.post("/event", validateRequest(postSchemas.create), eventController.createPostHandler);
router.get("/event", eventController.getAllPostsHandler);

export default router;