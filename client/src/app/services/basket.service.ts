import type { AxiosResponse } from 'axios'
import { $api } from '../axios'
import type { BooksResponseType } from '../../types/responsesTypes/booksResponse.type'

export default class BasketService {
    public static async getBasket(): Promise<AxiosResponse<BooksResponseType>> {
        return await $api.get<BooksResponseType>('/basket')
    }

    public static async addToBasket(tag: string): Promise<AxiosResponse<BooksResponseType>> {
        return await $api.patch<BooksResponseType>(`/basket/${tag}`)
    }

    public static async removeFromBasket(tag: string): Promise<AxiosResponse<BooksResponseType>> {
        return await $api.delete<BooksResponseType>(`/basket/${tag}`)
    }
}