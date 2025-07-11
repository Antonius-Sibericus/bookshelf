import type { UserType } from "../user.type";

export interface AuthResponseType {
    error: boolean,
    message: string,
    accessToken: string,
    user: UserType
}