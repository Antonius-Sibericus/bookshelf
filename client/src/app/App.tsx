import { BrowserRouter } from 'react-router-dom'
import './App.scss'
import AppRouter from './components/AppRouter.component'
import { useDispatch, useSelector } from 'react-redux'
import { selectorGeneral } from '../redux/general/general.selector'
import { useEffect } from 'react'
import { ColorThemeEnum } from '../redux/general/general.types'
import { setActivated, setSignedUp } from '../redux/general/general.slice'

function App() {
  const { theme, user } = useSelector(selectorGeneral)
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      dispatch(setSignedUp(true))
    }

    if (user.isActivated) {
      dispatch(setActivated(true))
    } else {
      dispatch(setActivated(false))
    }
  }, [])

  useEffect(() => {
    if (theme === ColorThemeEnum.LIGHT) {document.body.style.backgroundColor = '#1cadc9'} else {document.body.style.backgroundColor = '#072e36'}
  }, [theme])
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
