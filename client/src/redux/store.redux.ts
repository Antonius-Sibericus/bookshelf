import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import general from './general/general.slice'
import filter from './filter/filter.slice'
import categoriesAndThemes from './categoriesAndThemes/categoriesAndThemes.slice'
import books from './books/books.slice'

export const store = configureStore({
    reducer: {
        general,
        filter,
        categoriesAndThemes,
        books
    }
});

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()