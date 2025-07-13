import type { UserType } from '../../types/user.type'

export type GeneralType = {
    theme: ColorThemeEnum,
    isActivated: boolean,
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