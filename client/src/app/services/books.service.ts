import type { AxiosResponse } from "axios";
import type { BookResponseType } from "../../types/responsesTypes/bookResponse.type";
import { $api } from "../axios";

export default class BooksService {
    public static async createBook(
        heading: string, tag: string, author: string, description: string, pages: number, isInStock: boolean, year: number, isbn: number, isSoftCover: boolean, categoryTag: string, themeTag: string): Promise<AxiosResponse<BookResponseType>> {
        return await $api.post<BookResponseType>('/books', {
            heading,
            tag,
            author,
            description,
            pages,
            isInStock,
            year,
            isbn,
            isSoftCover,
            categoryTag,
            themeTag
        })
    }
}