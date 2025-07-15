import type { AxiosResponse } from 'axios'
import type { BooksResponseType } from '../../types/responsesTypes/booksResponse.type'
import { $api } from '../axios'

export default class PublishedService {
    public static async getPubished(): Promise<AxiosResponse<BooksResponseType>> {
        return await $api.get<BooksResponseType>('published')
    }
}