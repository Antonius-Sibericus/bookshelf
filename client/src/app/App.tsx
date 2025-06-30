import { BrowserRouter } from 'react-router-dom'
import './App.scss'
import AppRouter from './components/AppRouter.component'
import Layout from './components/Layout/Layout.component'

function App() {

  return (
    <BrowserRouter>
      <Layout>
        <AppRouter />
      </Layout>
    </BrowserRouter>
  )
}

export default App
