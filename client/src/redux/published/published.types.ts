import type { BookType } from "../../types/entitiesTypes/book.type"
import type { StatusEnum } from "../general/general.types"

export type PublishedType = {
    status: StatusEnum,
    published: BookType[]
}