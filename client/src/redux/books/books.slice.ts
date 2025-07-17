import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { BooksType } from './books.types'
import { StatusEnum } from '../general/general.types'
import type { BookType } from '../../types/entitiesTypes/book.type'
import { fetchBooks } from './books.async'

const initialState: BooksType = {
    status: StatusEnum.LOADING,
    books: [] as BookType[]
}

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        setBooks(state, action: PayloadAction<BookType[]>) {
            state.books = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBooks.pending, (state) => {
            state.status = StatusEnum.LOADING,
            state.books = [] as BookType[]
        }),
        builder.addCase(fetchBooks.rejected, (state) => {
            state.status = StatusEnum.ERROR,
            state.books = [] as BookType[]
        }),
        builder.addCase(fetchBooks.fulfilled, (state, action) => {
            state.status = StatusEnum.SUCCESS,
            state.books = action.payload.books
        })
    }
})

export const { setBooks } = booksSlice.actions
export default booksSlice.reducer
