import type { BookType } from "../../types/entitiesTypes/book.type"
import type { StatusEnum } from "../general/general.types"

export type FavoritesType = {
    status: StatusEnum,
    favorites: BookType[]
}