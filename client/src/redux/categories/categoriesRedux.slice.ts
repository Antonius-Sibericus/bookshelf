import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CategoriesReduxType } from './categoriesRedux.type'
import type { CategoryType } from '../../types/entitiesTypes/category.type'
import { StatusEnum } from '../general/general.types'
import { fetchCategories } from './categoriesRedux.async'

const initialState: CategoriesReduxType = {
    statusCat: StatusEnum.LOADING,
    categories: [] as CategoryType[]
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<CategoryType[]>) {
            state.categories = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state, action) => {
            state.statusCat = StatusEnum.LOADING,
            state.categories = [] as CategoryType[]
        }),
        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.statusCat = StatusEnum.ERROR,
            state.categories = [] as CategoryType[]
        }),
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.statusCat = StatusEnum.SUCCESS,
            state.categories = action.payload.categories
        })
    }
})

export const { setItems } = categoriesSlice.actions
export default categoriesSlice.reducer
