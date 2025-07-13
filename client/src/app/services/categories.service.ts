import type { AxiosResponse } from "axios";
import type { CategoriesResponseType } from "../../types/responsesTypes/categoriesResponse.type";
import { $api, api } from "../axios";
import type { CategoryResponseType } from "../../types/responsesTypes/categoryResponse.type";

export default class CategoriesService {
    public static async getAllCategories(): Promise<AxiosResponse<CategoriesResponseType>> {
        return await api.get<CategoriesResponseType>('categories')
    }

    public static async getOneCategory(tag: string): Promise<AxiosResponse<CategoryResponseType>> {
        return await api.get<CategoryResponseType>(`categories/${tag}`)
    }

    public static async createCategory(title: string, tag: string): Promise<AxiosResponse<CategoryResponseType>> {
        return await $api.post<CategoryResponseType>('categories', { title, tag })
    }

    public static async updateCategory(tag: string, title?: string): Promise<AxiosResponse<CategoryResponseType>> {
        return await $api.put<CategoryResponseType>(`categories/${tag}`, { title })
    }

    public static async deleteCategory(tag: string): Promise<AxiosResponse<CategoryResponseType>> {
        return await $api.delete<CategoryResponseType>(`categories/${tag}`)
    }
}