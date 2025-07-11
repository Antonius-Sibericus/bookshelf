import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { ColorThemeEnum, type GeneralType } from './general.types'
import { type UserType } from '../../types/user.type'

const initialState: GeneralType = {
    theme: ColorThemeEnum.LIGHT,
    isActivated: false,
    isSignedUp: false,
    user: {} as UserType
}

const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setTheme(state, action: PayloadAction<ColorThemeEnum>) {
            state.theme = action.payload
        },
        setActivated(state, action: PayloadAction<boolean>) {
            state.isActivated = action.payload
        },
        setSignedUp(state, action: PayloadAction<boolean>) {
            state.isSignedUp = action.payload
        },
        setUser(state, action: PayloadAction<UserType>) {
            state.user = action.payload
        }
    }
})

export const { setTheme, setActivated, setSignedUp, setUser } = generalSlice.actions
export default generalSlice.reducer

// Здесь передать authService и функции логина, регистрации и т.д.

// async login(email: string, password: string) {
//      const response = await AuthService.login(email, password)
//      localStorage.setItem('accessToken', response.data.accessToken)
//      setAuth(true)
//      setUserInfo(response.data.user)
// } catch (err) {
//      console.error(err.response?.data?.message)
// }

// Для логаутв установить дял пользователя пустой объект типа юзер, из локалсторадж удалить токен