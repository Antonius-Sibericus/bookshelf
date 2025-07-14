import { createAsyncThunk } from '@reduxjs/toolkit'
import type { BooksResponseType } from '../../types/responsesTypes/booksResponse.type'
import BooksService from '../../app/services/books.service'
import type { SearchBooksQuery } from './books.types'

export const fetchBooks = createAsyncThunk<BooksResponseType, SearchBooksQuery>(
    'books/fetchBooks',
    async (params: SearchBooksQuery): Promise<BooksResponseType> => {
        const { cat, theme, title, year, page, search } = params
        const { data } = await BooksService.getAllBooks(cat, theme, title, year, page, search)
        return data
    }
)