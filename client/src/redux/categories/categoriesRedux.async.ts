import { createAsyncThunk } from '@reduxjs/toolkit'
import type { CategoriesResponseType } from '../../types/responsesTypes/categoriesResponse.type'
import CategoriesService from '../../app/services/categories.service'

export const fetchCategories = createAsyncThunk<CategoriesResponseType>(
    'general/fetchCategories',
    async (): Promise<CategoriesResponseType> => {
        const { data } = await CategoriesService.getAllCategories()
        return data
    }
)