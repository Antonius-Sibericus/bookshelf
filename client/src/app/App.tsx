import { BrowserRouter } from 'react-router-dom'
import './App.scss'
import AppRouter from './components/AppRouter.component'
import { useSelector } from 'react-redux'
import { selectorGeneral } from '../redux/general/general.selector'
import { useEffect } from 'react'
import { ColorThemeEnum } from '../redux/general/general.types'

function App() {
  const { theme } = useSelector(selectorGeneral)

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
