import { db } from "../../../../config/firebaseConfig";
import { FirestoreDataTypes } from "../types/firestore";
import { QuerySnapshot } from "firebase-admin/firestore";

interface FieldValuePair {
    fieldName: string;
    fieldValue: FirestoreDataTypes;
}


// Creating new document in firestore
export const createDocument = async <T>(
    collectionName: string,
    data: Partial<T>,
    id?: string
): Promise<string> => {
    try {
        let docRef;

        if (id) {
            docRef = db.collection(collectionName).doc(id);
            await docRef.set(data);
        } else {
            docRef = await db.collection(collectionName).add(data);
        }

        return docRef.id;
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to create document in ${collectionName}: ${errorMessage}`
        );
    }
};

export const getDocuments = async (
    collectionName: string
): Promise<QuerySnapshot> => {
    try {
        return await db.collection(collectionName).get();
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to fetch documents from ${collectionName}: ${errorMessage}`
        );
    }
};