import type { UserRoles } from '../user-roles.enum'
import type { BookType } from './book.type'

export type UserType = {
    id: string,
    surname: string,
    name: string,
    paternal: string,
    email: string,
    password?: string,
    isActivated?: boolean,
    activationLink?: string,
    role: UserRoles,
    createdAt?: Date,
    updatedAt?: Date
    publishedOf?: BookType[]
}