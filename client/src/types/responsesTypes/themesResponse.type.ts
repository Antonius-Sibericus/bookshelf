import type { ThemeType } from '../entitiesTypes/theme.type'

export type ThemesResponseType = {
    error: boolean,
    message: string,
    themes?: ThemeType[]
}