import { Request, Response, NextFunction } from "express";
import * as eventService from "../services/eventServices";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

// Handles creating new Post
export const createPostHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const {name, date, category, capacity, registrationCount, status} = req.body;
        const postData = {
        name, 
        date: new Date(date),
        category,
        capacity,
        registrationCount,
        status
    };

        const newPost = await eventService.createPost(postData);

        res.status(HTTP_STATUS.CREATED).json(successResponse({newPost}, "Post created successfully"));
    } catch (error: unknown) {
        next(error);
    }
};

// handles request to get all posts
export const getAllPostsHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const posts = await eventService.getAllPosts();

        res.status(HTTP_STATUS.OK).json(successResponse({posts}, "Posts retrieved successfully"));
    } catch (error: unknown) {
        next(error);
    }
};