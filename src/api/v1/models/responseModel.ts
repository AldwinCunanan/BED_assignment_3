export interface ApiResponse <T>{
    status: string,
    count?:number,
    data?: T,
    message?: string,
    error?: string,
    code?: string;
}

export const successResponse = <T>(
    status: string ="success",
    count?: number,
    data?: T,
    message?: string,
): ApiResponse<T> => ({
    status,
    count,
    data,
    message,
});