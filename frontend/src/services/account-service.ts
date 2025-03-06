import { fetchApi } from "@/lib/api-client"
import { Account } from "@/lib/types/auth"

export interface OAuth2UrlResponse {
    providerName: string
    providerURL: string
}

export interface OAuth2LoginRequest {
    loginType: string
    code: string
}

export const accountService = {
    getOAuth2Url: async (loginType: string): Promise<OAuth2UrlResponse> => {
        try {
            console.log("Fetching OAuth2 URL...");
            const res = await fetchApi<OAuth2UrlResponse>(`/api/account/oauth2/login?loginType=${loginType}`);
            console.log("OAuth2 URL Response:", res);
            return res;
        } catch (error) {
            console.error("Error in getOAuth2Url:", error);
            throw error;
        }
    },

    oauth2Login: async (request: OAuth2LoginRequest): Promise<Account> => {
        const { loginType, code } = request
        return fetchApi<Account>(`/api/account/oauth2/login/callback?loginType=${loginType}&code=${code}`)
    },

    refreshToken: async (refreshToken: string): Promise<Account> => {
        return fetchApi<Account>("/api/account/refresh-token", {
            method: "POST",
            body: refreshToken,
        })
    },
}

