import type { CategoryType } from '../entitiesTypes/category.type'

export type CategoryResponseType = {
    error: boolean,
    message: string,
    category: CategoryType
}