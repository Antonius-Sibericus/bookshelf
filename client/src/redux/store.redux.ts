import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import general from './general/general.slice'

export const store = configureStore({
    reducer: {
        general
    }
});

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()