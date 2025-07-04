import { BrowserRouter } from 'react-router-dom'
import './App.scss'
import AppRouter from './components/AppRouter.component'
import { useSelector } from 'react-redux'
import { selectorColorTheme } from '../redux/colorTheme/colorTheme.selector'
import { useEffect } from 'react'
import { ColorThemeEnum } from '../redux/colorTheme/colorTheme.types'

function App() {
  const { theme } = useSelector(selectorColorTheme)

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
