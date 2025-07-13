import type { AxiosResponse } from "axios";
import { $api } from "../axios";
import type { UserResponseType } from "../../types/responsesTypes/userResponse.type";
import type { UserRoles } from "../../types/user-roles.enum";

export default class UsersService {
    public static async getOneUser(userId: string): Promise<AxiosResponse<UserResponseType>> {
        return await $api.get<UserResponseType>(`users/${userId}`)
    }

    public static async changeUserInfo(userId: string, surname: string, name: string, paternal: string, email: string, role: UserRoles): Promise<AxiosResponse<UserResponseType>> {
        return await $api.patch<UserResponseType>(`users/${userId}`, { surname, name, paternal, email, role })
    }
}