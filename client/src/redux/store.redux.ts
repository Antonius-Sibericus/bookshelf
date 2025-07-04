import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import colorTheme from './colorTheme/colorTheme.slice'

export const store = configureStore({
    reducer: {
        colorTheme
    }
});

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()