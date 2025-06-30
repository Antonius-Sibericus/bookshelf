import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AppRouter from './components/AppRouter.component'

function App() {

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
