import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { ColorThemeEnum, type ColorThemeType } from './colorTheme.types'

const initialState: ColorThemeType = { theme: ColorThemeEnum.LIGHT }

const colorThemeSlice = createSlice({
    name: 'colorTheme',
    initialState,
    reducers:{
        setTheme(state, action: PayloadAction<ColorThemeEnum>) {
            state.theme = action.payload
        }
    }
})

export const { setTheme } = colorThemeSlice.actions
export default colorThemeSlice.reducer