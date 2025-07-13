import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import general from './general/general.slice'
import filter from './filter/filter.slice'

export const store = configureStore({
    reducer: {
        general,
        filter
    }
});

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()