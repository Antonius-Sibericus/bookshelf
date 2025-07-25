import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { ColorThemeEnum, StatusEnum, type GeneralType } from './general.types'
import { type UserType } from '../../types/entitiesTypes/user.type'
import { fetchCurrentUser } from './general.async'

const initialState: GeneralType = {
    theme: ColorThemeEnum.LIGHT,
    isSignedUp: localStorage.getItem('accessToken') ? true : false,
    currentUser: {} as UserType,
    status: StatusEnum.LOADING
}

const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setTheme(state, action: PayloadAction<ColorThemeEnum>) {
            state.theme = action.payload
        },
        setSignedUp(state, action: PayloadAction<boolean>) {
            state.isSignedUp = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCurrentUser.pending, (state) => {
            state.status = StatusEnum.LOADING,
            state.currentUser = {} as UserType
        }),
        builder.addCase(fetchCurrentUser.rejected, (state) => {
            state.status = StatusEnum.ERROR,
            state.currentUser = {} as UserType
        }),
        builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
            state.status = StatusEnum.SUCCESS,
            state.currentUser = action.payload.user
        })
    }
})

export const { setTheme, setSignedUp } = generalSlice.actions
export default generalSlice.reducer
