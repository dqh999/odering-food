import { ApiResponse } from "./types/api"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

type RequestOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
    headers?: Record<string, string>
    body?: any
    cache?: RequestCache
    next?: { revalidate?: number | false }
}

export class ApiError extends Error {
    code: number
    errors: Record<string, any>

    constructor(message: string, code: number, errors: Record<string, any> = {}) {
        super(message)
        this.name = "ApiError"
        this.code = code
        this.errors = errors
    }
}

export async function fetchApi<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = "GET", headers = {}, body, cache, next } = options

    const url = `${API_BASE_URL}${endpoint}`
    const requestOptions: RequestInit = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        cache,
        next,
    }

    if (body) {
        requestOptions.body = JSON.stringify(body)
    }

    try {
        const response = await fetch(url, requestOptions)
        console.log(response)
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`)
        }
        const apiResponse = (await response.json()) as ApiResponse<T>

        // console.log(apiResponse.data)
        // if (!apiResponse.isSuccess) {
        //     throw new ApiError(apiResponse.message || "API request failed", apiResponse.code, apiResponse.errors)
        // }
        return apiResponse.data
    } catch (error) {
        if (error instanceof ApiError) {
            throw error
        } else if (error instanceof Error) {
            throw new ApiError(error.message, 500)
        } else {
            throw new ApiError("Unknown error occurred", 500)
        }
    }
}

