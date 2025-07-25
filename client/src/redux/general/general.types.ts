import type { UserType } from '../../types/entitiesTypes/user.type'

export type GeneralType = {
  theme: ColorThemeEnum,
  isSignedUp: boolean,
  currentUser: UserType,
  status: StatusEnum
}

export enum ColorThemeEnum {
  LIGHT = 'light',
  DARK = 'dark'
}

export enum StatusEnum {
  LOADING = 'loading',
  SUCCESS = 'completed',
  ERROR = 'error',
}