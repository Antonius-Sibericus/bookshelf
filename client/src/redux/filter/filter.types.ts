import type { Filters } from '../../types/filters.enum'

export type SearchValuesType = {
    categoryQuery: string,
    themeQuery: string,
    titleQuery: Filters,
    yearQuery: Filters,
    pageQuery: string,
    searchQuery: string
}