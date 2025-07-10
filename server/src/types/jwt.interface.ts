import { UserRole } from 'generated/prisma'

export interface JwtPayload {
    id: string,
    email: string,
    role: UserRole
}