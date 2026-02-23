import express from "express";
import { validateRequest } from "../middleware/validate";
import * as eventController from "../controllers/eventController";
import { postSchemas } from "../validation/postSchemas";

const router = express.Router();

router.post("/event", validateRequest(postSchemas.create), eventController.createPostHandler);
router.get("/event", eventController.getAllPostsHandler);
router.get("/event/:id", validateRequest(postSchemas.getById), eventController.getPostByIdHandler);
router.put("/event/:id", validateRequest(postSchemas.update), eventController.updatePostHandler);
//router.delete("/event/:id", validateRequest(postSchemas.delete), eventController.deletePostHandler);

export default router;