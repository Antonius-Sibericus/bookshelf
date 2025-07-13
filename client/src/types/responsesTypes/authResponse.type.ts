import type { UserType } from '../entitiesTypes/user.type'

export interface AuthResponseType {
    error: boolean,
    message: string,
    accessToken: string,
    user: UserType
}