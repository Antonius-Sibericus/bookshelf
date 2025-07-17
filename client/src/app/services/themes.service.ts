import type { AxiosResponse } from 'axios'
import { $api, api } from '../axios'
import type { ThemesResponseType } from '../../types/responsesTypes/themesResponse.type'
import type { ThemeResponseType } from '../../types/responsesTypes/themeResponse.type'

export default class ThemesService {
    public static async getAllThemes(): Promise<AxiosResponse<ThemesResponseType>> {
        return await api.get<ThemesResponseType>('themes')
    }

    public static async getOneTheme(tag: string): Promise<AxiosResponse<ThemeResponseType>> {
        return await api.get<ThemeResponseType>(`themes/${tag}`)
    }

    public static async createTheme(title: string, tag: string, categoryTag: string): Promise<AxiosResponse<ThemeResponseType>> {
        return await $api.post<ThemeResponseType>('themes', { title, tag, categoryTag })
    }

    public static async updateTheme(tag: string, title?: string, categoryTag?: string): Promise<AxiosResponse<ThemeResponseType>> {
        return await $api.put<ThemeResponseType>(`themes/${tag}`, { title, categoryTag })
    }

    public static async deleteTheme(tag: string): Promise<AxiosResponse<ThemeResponseType>> {
        return await $api.delete<ThemeResponseType>(`themes/${tag}`)
    }
}