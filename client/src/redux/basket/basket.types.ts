import type { BookType } from '../../types/entitiesTypes/book.type'
import type { StatusEnum } from '../general/general.types'

export type BasketType = {
    status: StatusEnum,
    basket: BookType[]
}