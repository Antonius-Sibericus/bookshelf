import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { PublishedType } from './published.types'
import { StatusEnum } from '../general/general.types'
import type { BookType } from '../../types/entitiesTypes/book.type'
import { fetchPublished } from './published.async'

const initialState: PublishedType = {
    status: StatusEnum.LOADING,
    published: [] as BookType[]
}

const publishedSlice = createSlice({
    name: 'published',
    initialState,
    reducers: {
        setPublished(state, action: PayloadAction<BookType[]>) {
            state.published = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPublished.pending, (state) => {
            state.status = StatusEnum.LOADING,
            state.published = [] as BookType[]
        }),
        builder.addCase(fetchPublished.rejected, (state) => {
            state.status = StatusEnum.ERROR,
            state.published = [] as BookType[]
        }),
        builder.addCase(fetchPublished.fulfilled, (state, action) => {
            state.status = StatusEnum.SUCCESS,
            state.published = action.payload.books
        })
    }
})

export const { setPublished } = publishedSlice.actions
export default publishedSlice.reducer
