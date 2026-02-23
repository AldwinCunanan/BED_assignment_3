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

        res.status(HTTP_STATUS.CREATED).json(successResponse( "Post created successfully",undefined,newPost, "Event Created"));
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
        const totalEvents = posts.length;

        res.status(HTTP_STATUS.OK).json(successResponse( "Posts retrieved successfully", totalEvents,posts, "Events Retrieved"));
    } catch (error: unknown) {
        next(error);
    }
};

// handles request to get a single post by Id
export const getPostByIdHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const post = await eventService.getPostById(id as string);

        res.status(HTTP_STATUS.OK).json(successResponse( "Post retrieved successfully",undefined,post, "success"));
    } catch (error: unknown) {
        next(error);
    }
};

// update
export const updatePostHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        console.log("UPDATE BODY:", req.body);
        console.log("UPDATE BODY KEYS:", Object.keys(req.body || {}));
        const { id } = req.params;
        const updateData: any = {};
        
        if (req.body.name !== undefined) updateData.name = req.body.name;
        if (req.body.date !== undefined) updateData.date = req.body.date;
        if (req.body.category !== undefined) updateData.category = req.body.category;
        if (req.body.capacity !== undefined) updateData.capacity = req.body.capacity;
        if (req.body.registrationCount !== undefined)updateData.registrationCount = req.body.registrationCount;
        if (req.body.status !== undefined) updateData.status = req.body.status;

        // Call service to update the event
        const updatedPost = await eventService.updatePost(id as string, updateData);

        // Respond with success
        res.status(HTTP_STATUS.OK).json(
            successResponse("Event updated successfully", undefined, updatedPost)
        );
    } catch (error: unknown) {
        next(error);
    }
};