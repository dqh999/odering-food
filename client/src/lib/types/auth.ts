import { User } from "./user";

export interface Token {
    userId: string
    accessToken: string
    accessTokenExpiry: string
    refreshToken: string
    refreshTokenExpiry: string
}
export interface Account {
    user: User,
    token: Token
}