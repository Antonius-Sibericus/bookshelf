import { createAsyncThunk } from '@reduxjs/toolkit'
import type { BooksResponseType } from '../../types/responsesTypes/booksResponse.type'
import FavoritesService from '../../app/services/favorites.service'

export const fetchFavorites = createAsyncThunk<BooksResponseType>(
    'favorites/fetchFavorites',
    async (): Promise<BooksResponseType> => {
        const { data } = await FavoritesService.getFavorites()
        return data
    }
)