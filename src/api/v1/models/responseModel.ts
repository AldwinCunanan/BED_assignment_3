export interface ApiResponse <T>{
    status: string,
    count?:number,
    data?: T,
    message?: string,
    error?: string,
    code?: string;
}

export const successResponse = <T>(
    count?: number,
    data?: T,
    message?: string
): ApiResponse<T> => ({
    status: "Event created",
    count,
    data,
    message,
});