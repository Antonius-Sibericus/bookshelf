import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CategoriesAndThemesType } from './categoriesAndThemes.types'
import type { CategoryType } from '../../types/entitiesTypes/category.type'
import { StatusEnum } from '../general/general.types'
import { fetchCategories, fetchThemes } from './categoriesAndThemes.async'
import type { ThemeType } from '../../types/entitiesTypes/theme.type'

const initialState: CategoriesAndThemesType = {
    status: StatusEnum.LOADING,
    categories: [] as CategoryType[],
    themes: [] as ThemeType[]
}

const categoriesSlice = createSlice({
    name: 'categoriesAndThemes',
    initialState,
    reducers: {
        setCategories(state, action: PayloadAction<CategoryType[]>) {
            state.categories = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.status = StatusEnum.LOADING,
            state.categories = [] as CategoryType[]
        }),
        builder.addCase(fetchCategories.rejected, (state) => {
            state.status = StatusEnum.ERROR,
            state.categories = [] as CategoryType[]
        }),
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.status = StatusEnum.SUCCESS,
            state.categories = action.payload.categories
        }),
        builder.addCase(fetchThemes.pending, (state) => {
            state.status = StatusEnum.LOADING,
            state.themes = [] as ThemeType[]
        }),
        builder.addCase(fetchThemes.rejected, (state) => {
            state.status = StatusEnum.ERROR,
            state.themes = [] as ThemeType[]
        }),
        builder.addCase(fetchThemes.fulfilled, (state, action) => {
            state.status = StatusEnum.SUCCESS,
            state.themes = action.payload.themes
        })
    }
})

export const { setCategories } = categoriesSlice.actions
export default categoriesSlice.reducer
