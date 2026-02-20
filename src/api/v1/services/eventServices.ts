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
