import { createAsyncThunk } from '@reduxjs/toolkit'
import type { BooksResponseType } from '../../types/responsesTypes/booksResponse.type'
import BasketService from '../../app/services/basket.service'

export const fetchBasket = createAsyncThunk<BooksResponseType>(
    'basket/fetchBasket',
    async (): Promise<BooksResponseType> => {
        const { data } = await BasketService.getBasket()
        return data
    }
)