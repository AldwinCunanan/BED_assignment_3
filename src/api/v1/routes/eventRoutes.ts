import express from "express";
import { validateRequest } from "../middleware/validate";
import * as eventController from "../controllers/eventController";
import { postSchemas } from "../validation/postSchemas";

const router = express.Router();

router.post("/", validateRequest(postSchemas.create), postController.createPostHandler);
router.get("/", postController.getAllPostsHandler);

export default router;