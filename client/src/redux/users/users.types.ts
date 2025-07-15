import type { UserType } from '../../types/entitiesTypes/user.type'
import type { Filters } from '../../types/filters.enum'
import type { StatusEnum } from '../general/general.types'

export type UsersType = {
    status: StatusEnum,
    users: UserType[]
}