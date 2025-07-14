import type { CategoryType } from "../../types/entitiesTypes/category.type"
import type { ThemeType } from "../../types/entitiesTypes/theme.type"
import type { StatusEnum } from "../general/general.types"

export type CategoriesAndThemesType = {
    status: StatusEnum,
    categories: CategoryType[],
    themes: ThemeType[]
}