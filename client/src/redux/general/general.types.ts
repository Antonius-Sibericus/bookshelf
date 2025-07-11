import type { UserType } from "../../types/user.type"

export type GeneralType = {
    theme: ColorThemeEnum,
    isActivated: boolean,
    isSignedUp: boolean,
    user: UserType
}

export enum ColorThemeEnum {
    LIGHT = 'light',
    DARK = 'dark'
}