import type { AxiosResponse } from "axios"
import type { AuthResponseType } from "../../types/authTypes/authResponse.type"
import api from "../axios"
import type { UserRoles } from "../../types/user-roles.enum"
import type { DefaultResponseType } from "../../types/defaultResponse.type"

export default class AuthService {
    static async signup(surname: string, name: string, paternal: string, email: string, password: string, role: UserRoles): Promise<AxiosResponse<AuthResponseType>> {
        return api.post<AuthResponseType>('/auth/signup', { surname, name, paternal, email, password, role })
    }

    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponseType>> {
        return api.post<AuthResponseType>('/auth/login', { email, password })
    }

    static async logout(): Promise<AxiosResponse<DefaultResponseType>> {
        return api.post<DefaultResponseType>('/auth/logout')
    }
}