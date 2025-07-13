import type { CategoryType } from "../../types/entitiesTypes/category.type"
import type { StatusEnum } from "../general/general.types"

export type CategoriesReduxType = {
    statusCat: StatusEnum,
    categories: CategoryType[]
}