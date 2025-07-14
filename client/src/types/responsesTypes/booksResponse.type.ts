import type { BookType } from '../entitiesTypes/book.type'

export type BooksResponseType = {
    error: boolean,
    message: string,
    books: BookType[]
}