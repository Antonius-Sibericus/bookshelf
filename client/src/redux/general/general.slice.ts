import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { ColorThemeEnum, type GeneralType } from './general.types'

const initialState: GeneralType = {
    theme: ColorThemeEnum.LIGHT,
    isAuthed: false
}

const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers:{
        setTheme(state, action: PayloadAction<ColorThemeEnum>) {
            state.theme = action.payload
        },
        setAuthed(state, action: PayloadAction<boolean>) {
            state.isAuthed = action.payload
        }
    }
})

export const { setTheme, setAuthed } = generalSlice.actions
export default generalSlice.reducer