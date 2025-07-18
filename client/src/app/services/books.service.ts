import type { AxiosResponse } from 'axios'
import type { BookResponseType } from '../../types/responsesTypes/bookResponse.type'
import { $api, api } from '../axios'
import type { BooksResponseType } from '../../types/responsesTypes/booksResponse.type'
import type { Filters } from '../../types/filters.enum'
import { dataFormation } from '../../utils/formData.utils'

export default class BooksService {
    public static async getAllBooks(cat: string, theme: string, title: Filters, year: Filters, search: string, page: string): Promise<AxiosResponse<BooksResponseType>> {
        return await api.get<BooksResponseType>(`/books?cat=${cat}&theme=${theme}&title=${title}&year=${year}&page=${page}&search=${search}`)
    }

    public static async getOneBook(tag: string): Promise<AxiosResponse<BookResponseType>> {
        return await api.get<BookResponseType>(`/books/${tag}`)
    }

    public static async createBook(heading: string, tag: string, author: string, description: string, pages: number, isInStock: boolean, year: number, isbn: string, isSoftCover: boolean, categoryTag: string, themeTag: string, image: File): Promise<AxiosResponse<BookResponseType>> {
        const formData = dataFormation(heading, tag, author, description, pages, isInStock, year, isbn, isSoftCover, categoryTag, themeTag, image)
        return await $api.post<BookResponseType>('/books', formData)
    }
    
    public static async updateBook(tag: string, heading: string, author: string, description: string, pages: number, isInStock: boolean, year: number, isbn: string, isSoftCover: boolean, categoryTag: string, themeTag: string, image: File): Promise<AxiosResponse<BookResponseType>> {
        const formData = dataFormation(heading, tag, author, description, pages, isInStock, year, isbn, isSoftCover, categoryTag, themeTag, image)
        return await $api.put<BookResponseType>(`/books/${tag}`, formData)
    }

    public static async deleteBook(tag: string): Promise<AxiosResponse<BookResponseType>> {
        return await $api.delete<BookResponseType>(`/books/${tag}`)
    }
}