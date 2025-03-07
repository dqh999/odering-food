export interface ApiResponse<T> {
    code: number;
    isSuccess: boolean;
    message: string;
    data: T;
    errors: Record<string, any>;
    timestamp: string;
}

export interface ApiError {
    message: string;
    code: number;
    errors: Record<string, any>;
}

export interface PageResponse<T> {
    totalPages: number
    totalElements: number
    currentPage: number
    data: T[]
    hastNext: boolean
    hasPrevious: boolean
}