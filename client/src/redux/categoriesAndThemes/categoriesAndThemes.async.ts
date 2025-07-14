import { createAsyncThunk } from '@reduxjs/toolkit'
import type { CategoriesResponseType } from '../../types/responsesTypes/categoriesResponse.type'
import CategoriesService from '../../app/services/categories.service'
import type { ThemesResponseType } from '../../types/responsesTypes/themesResponse.type'
import ThemesService from '../../app/services/themes.service'

export const fetchCategories = createAsyncThunk<CategoriesResponseType>(
    'categoriesAndThemes/fetchCategories',
    async (): Promise<CategoriesResponseType> => {
        const { data } = await CategoriesService.getAllCategories()
        return data
    }
)

export const fetchThemes = createAsyncThunk<ThemesResponseType>(
    'categoriesAndThemes/fetchThemes',
    async (): Promise<ThemesResponseType> => {
        const { data } = await ThemesService.getAllThemes()
        return data
    }
)