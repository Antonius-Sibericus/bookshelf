import type { BookType } from '../entitiesTypes/book.type'

export type BookResponseType = {
    error: boolean,
    message: string,
    book: BookType
}