"use client"

import { useState, useCallback } from "react"
import { useToast } from "@/components/ui/use-toast"

// Error types based on the ResourceException enum
export type ErrorType =
  | "ENTITY_NOT_FOUND"
  | "ENTITY_ALREADY_EXISTS"
  | "INVALID_ENTITY_ID"
  | "CREATION_FAILED"
  | "UPDATE_FAILED"
  | "DELETE_FAILED"
  | "ACCESS_DENIED"
  | "INVALID_PAYLOAD"
  | "UNEXPECTED_ERROR"
  | string

interface ApiError {
  code: number
  type: ErrorType
  message: string
}

interface ApiResponse<T> {
  data: T | null
  error: ApiError | null
  isLoading: boolean
  isError: boolean
  execute: (options?: RequestInit) => Promise<T | null>
}

interface UseApiOptions {
  endpoint: string
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  body?: any
  headers?: HeadersInit
  immediate?: boolean
  showToast?: boolean
  customErrorMap?: Record<string, string>
}


// ⚡ Define the Base URL (Có thể lấy từ env)
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api"

/**
 * Custom hook for making API calls with error handling
 */
export function useApi<T = any>({
  endpoint,
  method = "GET",
  body,
  headers = {},
  immediate = false,
  showToast = true,
  customErrorMap = {},
}: UseApiOptions): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<ApiError | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(immediate)
  const [isError, setIsError] = useState<boolean>(false)
  const { toast } = useToast()

  // Default error messages based on ResourceException enum
  const defaultErrorMessages: Record<ErrorType, string> = {
    ENTITY_NOT_FOUND: "The requested resource could not be found.",
    ENTITY_ALREADY_EXISTS: "This resource already exists.",
    INVALID_ENTITY_ID: "The provided ID is invalid.",
    CREATION_FAILED: "Failed to create the resource.",
    UPDATE_FAILED: "Failed to update the resource.",
    DELETE_FAILED: "Failed to delete the resource.",
    ACCESS_DENIED: "You don't have permission to access this resource.",
    INVALID_PAYLOAD: "The provided data is invalid.",
    UNEXPECTED_ERROR: "An unexpected error occurred. Please try again later.",
  }

  // Combine default error messages with custom ones
  const errorMessages = { ...defaultErrorMessages, ...customErrorMap }
  const url = `${BASE_URL}${endpoint}`

  const execute = useCallback(
    async (options?: RequestInit): Promise<T | null> => {
      setIsLoading(true)
      setIsError(false)
      setError(null)

      try {
        const requestHeaders = {
          "Content-Type": "application/json",
          ...headers,
          ...(options?.headers || {}),
        }

        const requestBody = body ? JSON.stringify(body) : options?.body

        const response = await fetch(url, {
          method,
          headers: requestHeaders,
          body: requestBody,
          ...options,
        })

        const responseData = await response.json()

        if (!response.ok) {
          // Handle API error
          const errorType = responseData.type || "UNEXPECTED_ERROR"
          const errorMessage = responseData.message || errorMessages[errorType] || "An error occurred"

          const apiError: ApiError = {
            code: response.status,
            type: errorType,
            message: errorMessage,
          }

          setError(apiError)
          setIsError(true)

          if (showToast) {
            toast({
              title: `Error: ${apiError.type}`,
              description: apiError.message,
              variant: "destructive",
            })
          }

          return null
        }

        setData(responseData)
        return responseData
      } catch (err) {
        console.error("API request failed:", err)

        const apiError: ApiError = {
          code: 500,
          type: "UNEXPECTED_ERROR",
          message: errorMessages["UNEXPECTED_ERROR"],
        }

        setError(apiError)
        setIsError(true)

        if (showToast) {
          toast({
            title: "Request Failed",
            description: apiError.message,
            variant: "destructive",
          })
        }

        return null
      } finally {
        setIsLoading(false)
      }
    },
    [url, method, body, headers, showToast, toast],
  )

  // Execute the request immediately if specified
  useState(() => {
    if (immediate) {
      execute()
    }
  })

  return { data, error, isLoading, isError, execute }
}

