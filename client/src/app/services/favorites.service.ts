import type { AxiosResponse } from 'axios'
import type { BooksResponseType } from '../../types/responsesTypes/booksResponse.type'
import { $api } from '../axios'
import type { BookResponseType } from '../../types/responsesTypes/bookResponse.type'

export default class FavoritesService {
    public static async getFavorites(): Promise<AxiosResponse<BooksResponseType>> {
        return await $api.get<BooksResponseType>('/favorites')
    }

    public static async addFavorite(tag: string): Promise<AxiosResponse<BooksResponseType>> {
        return await $api.patch<BooksResponseType>(`/favorites/${tag}`)
    }

    public static async removeFavorite(tag: string): Promise<AxiosResponse<BookResponseType>> {
        return await $api.delete<BookResponseType>(`/favorites/${tag}`)
    }
}