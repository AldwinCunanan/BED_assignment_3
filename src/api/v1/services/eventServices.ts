import { Post } from "../models/postModels";
import { db } from "../.././../../config/firebaseConfig";
import { Transaction } from "firebase-admin/firestore";
import * as firestoreRepository from "../repositories/firestoreRepository";

const COLLECTION = "posts";
const COUNTER_DOC = "events";

// creating a new post
//fields
interface CreatePostInput {
  name: string;
  date: Date;
  category: string;
  capacity?: number;
  registrationCount?: number;
  status?: string;
}
export const createPost = async (
  postData: CreatePostInput
): Promise<Post> => {
  try {
    const newPostData = {
      ...postData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const formattedId = await db.runTransaction(async (transaction: Transaction) => {
      const counterRef = db.collection("counters").doc(COUNTER_DOC);
      const counterSnap = await transaction.get(counterRef);

      let lastId = 0;

      if (counterSnap.exists) {
        lastId = counterSnap.data()?.lastId ?? 0;
      }

      const newIdNumber = lastId + 1;

      const formatted = `evt_${newIdNumber
        .toString()
        .padStart(6, "0")}`;

      const postRef = db.collection(COLLECTION).doc(formatted);
      
      transaction.set(postRef, newPostData);

      transaction.set(counterRef, { lastId: newIdNumber });

      return formatted;
    });

    return { id: formattedId, ...newPostData } as Post;

  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to create post: ${errorMessage}`);
  }
};

// retreiveing all posts
export const getAllPosts = async (): Promise<(Post & { id: string })[]> => {
    try {
        const posts = await firestoreRepository.getAllDocuments<Post>(COLLECTION);
        return posts;
       
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to retrieve all posts: ${errorMessage}`
        );
    }
};

// Get event by id
export const getPostById = async (id: string): Promise<Post> => {
    try {
        const post = await firestoreRepository.getDocById<Post>(COLLECTION, id);
        
        if(!post){
            throw new Error("Event not found");
        }

        return post;
       
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to retrive the post: ${errorMessage}`
        );
    }
};

// 
export const updatePost = async (
    id: string,
    postData: Partial<{
        name: string;
        date: string | Date;
        category: string;
        capacity: number;
        registrationCount: number;
        status: "active" | "cancelled" | "completed";
        createdAt: string | Date;
        updatedAt: string | Date;
    }>
): Promise<Post> => {
    try {
        const updatedPost: Partial<Post> = {};

        // Only set fields that exist in postData
        if (postData.name !== undefined) updatedPost.name = postData.name;
        if (postData.date !== undefined)
            updatedPost.date = postData.date instanceof Date ? postData.date : new Date(postData.date);
        if (postData.category !== undefined) updatedPost.category = postData.category;
        if (postData.capacity !== undefined) updatedPost.capacity = postData.capacity;
        if (postData.registrationCount !== undefined) updatedPost.registrationCount = postData.registrationCount;
        if (postData.status !== undefined) updatedPost.status = postData.status;

        if (Object.keys(updatedPost).length === 0) {
            throw new Error("No fields provided to update");
        }

        updatedPost.updatedAt = new Date();

        // Update the document in Firestore
        await firestoreRepository.updateDocument<Post>(COLLECTION, id, updatedPost);

        // Retrieve the updated post
        const updatedPostData = await firestoreRepository.getDocById<Post>(COLLECTION, id);

        if (!updatedPostData) {
            throw new Error("Updated post couldn't be found");
        }
        const formattedPost: Post = {
          ...updatedPostData,
          date: (updatedPostData.date as any)?.toDate?.()?.toISOString() ?? updatedPostData.date,
          createdAt: (updatedPostData.createdAt as any)?.toDate?.()?.toISOString() ?? updatedPostData.createdAt,
          updatedAt: (updatedPostData.updatedAt as any)?.toDate?.()?.toISOString() ?? updatedPostData.updatedAt,
        };
        return formattedPost;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to update post ${id}: ${errorMessage}`);
    }
};

// delete
export const deletePost = async (id: string): Promise<void> => {
    try {
        await firestoreRepository.deleteDocument(COLLECTION, id);
       
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to delete the post: ${errorMessage}`
        );
    }
};