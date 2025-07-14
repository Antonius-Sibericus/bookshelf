import type { BookType } from '../../types/entitiesTypes/book.type'
import type { Filters } from '../../types/filters.enum'
import type { StatusEnum } from '../general/general.types'

export type BooksType = {
    status: StatusEnum,
    books: BookType[]
}

export type SearchBooksQuery = {
    cat: string,
    theme: string,
    title: Filters,
    year: Filters,
    search: string,
    page: string
}