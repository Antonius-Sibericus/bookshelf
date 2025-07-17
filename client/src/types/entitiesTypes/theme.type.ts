import type { CategoryType } from './category.type'

export type ThemeType = {
    title: string,
    tag: string,
    id: string,
    createdAt?: Date,
    updatedAt?: Date,
    categoryTag: string,
    category?: CategoryType
}