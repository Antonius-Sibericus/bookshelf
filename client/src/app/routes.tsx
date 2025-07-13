import { lazy } from 'react'
import { basketPath, bookPath, catalogPath, favoritesPath, mainPath, notFoundPath, profilePath, publishedPath, workshopPath } from '../utils/consts.utils'

const ProfilePage = lazy(() => import('./pages/Profile/Profile.page'))
const BasketPage = lazy(() => import('./pages/Personal/Basket.page'))
const FavoritesPage = lazy(() => import('./pages/Personal/Favorites.page'))
const PublishedPage = lazy(() => import('./pages/Personal/Published.page'))
const MainPage = lazy(() => import('./pages/Main/Main.page'))
const NotFoundPage = lazy(() => import('./pages/Main/NotFound.page'))
const Catalog = lazy(() => import('./pages/Catalog/Catalog.page'))
const Book = lazy(() => import('./pages/Book/Book.page'))
const Workshop = lazy(() => import('./pages/Workshop/Workshop.page'))

export const authedRoutes = [
    { path: profilePath, element: <ProfilePage /> },
    { path: basketPath, element: <BasketPage /> },
    { path: favoritesPath, element: <FavoritesPage /> },
    { path: publishedPath, element: <PublishedPage /> }
]

export const publicRoutes = [
    { path: mainPath, element: <MainPage /> },
    { path: notFoundPath, element: <NotFoundPage /> },
    { path: catalogPath, element: <Catalog /> },
    { path: bookPath, element: <Book /> },
    { path: workshopPath, element: <Workshop /> }
]