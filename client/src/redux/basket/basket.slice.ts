import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { BasketType } from './basket.types'
import { StatusEnum } from '../general/general.types'
import type { BookType } from '../../types/entitiesTypes/book.type'
import { fetchBasket } from './basket.async'
import type { BooksResponseType } from '../../types/responsesTypes/booksResponse.type'

const initialState: BasketType = {
    status: StatusEnum.LOADING,
    basket: [] as BookType[]
}

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasket(state, action: PayloadAction<BookType[]>) {
            state.basket = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBasket.pending, (state, action) => {
            state.status = StatusEnum.LOADING,
            state.basket = [] as BookType[]
        }),
        builder.addCase(fetchBasket.rejected, (state, action) => {
            state.status = StatusEnum.ERROR,
            state.basket = [] as BookType[]
        }),
        builder.addCase(fetchBasket.fulfilled, (state, action) => {
            state.status = StatusEnum.SUCCESS,
            state.basket = action.payload.books
        })
    }
})

export const { setBasket } = basketSlice.actions
export default basketSlice.reducer
