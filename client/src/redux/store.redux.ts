import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import general from './general/general.slice'
import filter from './filter/filter.slice'
import categoriesAndThemes from './categoriesAndThemes/categoriesAndThemes.slice'
import books from './books/books.slice'
import favorites from './favorites/favorites.slice'
import published from './published/published.slice'
import basket from './basket/basket.slice'
import users from './users/users.slice'

export const store = configureStore({
    reducer: {
        general,
        filter,
        categoriesAndThemes,
        books,
        favorites,
        published,
        basket,
        users
    }
});

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()