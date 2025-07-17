import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { FavoritesType } from './favorites.types'
import { StatusEnum } from '../general/general.types'
import type { BookType } from '../../types/entitiesTypes/book.type'
import { fetchFavorites } from './favorites.async'

const initialState: FavoritesType = {
    status: StatusEnum.LOADING,
    favorites: [] as BookType[]
}

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        setFavorites(state, action: PayloadAction<BookType[]>) {
            state.favorites = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFavorites.pending, (state) => {
            state.status = StatusEnum.LOADING,
            state.favorites = [] as BookType[]
        }),
        builder.addCase(fetchFavorites.rejected, (state) => {
            state.status = StatusEnum.ERROR,
            state.favorites = [] as BookType[]
        }),
        builder.addCase(fetchFavorites.fulfilled, (state, action) => {
            state.status = StatusEnum.SUCCESS,
            state.favorites = action.payload.books
        })
    }
})

export const { setFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer
