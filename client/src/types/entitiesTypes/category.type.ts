import type { ThemeType } from "./theme.type"

export type CategoryType = {
    title: string,
    tag: string,
    id: string,
    themes?: ThemeType[],
    createdAt?: Date,
    updatedAt?: Date,
}