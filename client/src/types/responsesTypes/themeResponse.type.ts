import type { ThemeType } from '../entitiesTypes/theme.type'

export type ThemeResponseType = {
    error: boolean,
    message: string,
    theme: ThemeType
}