"use client"

import { useState, useEffect, useCallback } from "react"
import { ApiError } from "@/lib/api-client"

interface ApiState<T> {
    data: T | null
    isLoading: boolean
    error: ApiError | null
}

interface ApiHookResult<T> extends ApiState<T> {
    refetch: () => Promise<void>
}

export function useApi<T>(fetchFn: () => Promise<T>, dependencies: any[] = []): ApiHookResult<T> {
    const [state, setState] = useState<ApiState<T>>({
        data: null,
        isLoading: true,
        error: null,
    })

    const fetchData = useCallback(async () => {
        setState((prev) => ({ ...prev, isLoading: true, error: null }))

        try {
            const data = await fetchFn()
            setState({ data, isLoading: false, error: null })
        } catch (error) {
            setState({
                data: null,
                isLoading: false,
                error: error instanceof ApiError ? error : new ApiError("Unknown error", 500),
            })
        }
    }, [fetchFn])

    useEffect(() => {
        fetchData()
    }, [...dependencies, fetchData])

    return {
        ...state,
        refetch: fetchData,
    }
}

