import { BrowserRouter } from 'react-router-dom'
import './App.scss'
import AppRouter from './components/AppRouter.component'
import { useSelector } from 'react-redux'
import { selectorGeneral } from '../redux/general/general.selector'
import { useEffect } from 'react'
import { ColorThemeEnum } from '../redux/general/general.types'
import { setSignedUp } from '../redux/general/general.slice'
import AuthService from './services/auth.service'
import type { DefaultResponseType } from '../types/responsesTypes/defaultResponse.type'
import type { AxiosError } from 'axios'
import type { AuthResponseType } from '../types/responsesTypes/authResponse.type'
import { fetchCurrentUser } from '../redux/general/general.async'
import { useAppDispatch } from '../redux/store.redux'
import { fetchUsers } from '../redux/users/users.async'

function App() {
  const { theme } = useSelector(selectorGeneral)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      const refresh = async () => {
        try {
          const result = await AuthService.checkAuth()
          const response = result.data

          if (response as AuthResponseType) {
            if (response.accessToken) {
              localStorage.setItem('accessToken', response.accessToken)
            } else {
              throw new Error('Токен доступа не получен')
            }

            const userId: string | null = response.user.id

            if (userId) {
              dispatch(
                fetchCurrentUser(userId)
              )
            }

            dispatch(setSignedUp(true))
          }
        } catch (err) {
          localStorage.removeItem('accessToken')
          window.location.reload()
          const customErrorData: DefaultResponseType = (err as AxiosError).response!.data as DefaultResponseType
          console.log(customErrorData ? customErrorData : err)
        }
      }

      refresh()
    }
    dispatch(fetchUsers())
  }, [])

  useEffect(() => {
    if (theme === ColorThemeEnum.LIGHT) { document.body.style.backgroundColor = '#1cadc9' } else { document.body.style.backgroundColor = '#072e36' }
  }, [theme])

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
