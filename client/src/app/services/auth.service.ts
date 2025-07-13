import type { AxiosResponse } from "axios"
import type { AuthResponseType } from "../../types/responsesTypes/authResponse.type"
import { api, $api } from "../axios"
import type { UserRoles } from "../../types/user-roles.enum"
import type { DefaultResponseType } from "../../types/responsesTypes/defaultResponse.type"
import type { UserResponseType } from "../../types/responsesTypes/userResponse.type"

export default class AuthService {
    public static async signup(surname: string, name: string, paternal: string, email: string, password: string, role: UserRoles): Promise<AxiosResponse<AuthResponseType>> {
        return $api.post<AuthResponseType>('/auth/signup', { surname, name, paternal, email, password, role })
    }

    public static async login(email: string, password: string): Promise<AxiosResponse<AuthResponseType>> {
        return $api.post<AuthResponseType>('/auth/login', { email, password })
    }

    public static async logout(): Promise<AxiosResponse<DefaultResponseType>> {
        return $api.post<DefaultResponseType>('/auth/logout')
    }

    public static async checkAuth(): Promise<AxiosResponse<AuthResponseType>> {
        return api.get<AuthResponseType>('/auth/refresh')
    }

    public static async changePassword(id: string, password: string): Promise<AxiosResponse<UserResponseType>> {
        return $api.patch<UserResponseType>(`/auth/${id}`, { password })
    }
}