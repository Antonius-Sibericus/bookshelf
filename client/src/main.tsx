import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.redux.ts'

const rootElem = document.getElementById('root')

if (rootElem) {
  const root = createRoot(rootElem);

  root.render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>,
  )
}