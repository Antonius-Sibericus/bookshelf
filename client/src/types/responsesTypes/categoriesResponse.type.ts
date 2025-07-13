import type { CategoryType } from '../entitiesTypes/category.type'

export type CategoriesResponseType = {
    error: boolean,
    message: string,
    categories: CategoryType[]
}