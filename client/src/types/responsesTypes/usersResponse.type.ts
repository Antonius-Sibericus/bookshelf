import type { UserRoles } from '../user-roles.enum'

export type UsersResponseType = {
    error: boolean,
    message: string,
    users: {
        id: string,
        surname: string,
        name: string,
        paternal: string,
        email: string,
        role: UserRoles,
        publisherOf: {
            id: string,
            createdAt: Date,
            updatedAt: Date,
            description: string,
            heading: string,
            tag: string,
            author: string,
            pages: number,
            isInStock: boolean,
            year: number,
            isbn: number,
            isSoftCover: boolean,
            publisherId: string,
            categoryTag: string,
            themeTag: string,
        }[]
    }[]
}