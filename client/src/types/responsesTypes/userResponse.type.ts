import type { UserType } from '../entitiesTypes/user.type'

export interface UserResponseType {
    error: boolean,
    message: string,
    user: UserType
}