import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { Filters } from '../../types/filters.enum'
import type { SearchValuesType } from './filter.types'

const initialState: SearchValuesType = {
    categoryQuery: '',
    themeQuery: '',
    titleQuery: Filters.DEF,
    yearQuery: Filters.DEF,
    pageQuery: '1',
    searchQuery: ''
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryFilter(state, action: PayloadAction<string>) {
            state.categoryQuery = action.payload
        },
        setThemeFilter(state, action: PayloadAction<string>) {
            state.themeQuery = action.payload
        },
        setTitleFilter(state, action: PayloadAction<Filters>) {
            state.titleQuery = action.payload
        },
        setYearFilter(state, action: PayloadAction<Filters>) {
            state.yearQuery = action.payload
        },
        setPageFilter(state, action: PayloadAction<string>) {
            state.pageQuery = action.payload
        },
        setSearchFilter(state, action: PayloadAction<string>) {
            state.searchQuery = action.payload
        }
    }
})

export const {
    setCategoryFilter,
    setThemeFilter,
    setTitleFilter,
    setYearFilter,
    setPageFilter,
    setSearchFilter
} = filterSlice.actions

export default filterSlice.reducer