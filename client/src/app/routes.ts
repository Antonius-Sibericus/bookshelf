import { basketPath, bookPath, catalogPath, favoritesPath, loginPath, mainPath, profilePath, publishedPath, signupPath } from '../utils/consts.utils'

export const authedRoutes = [
    { path: profilePath, element: 'Profile.page.tsx' },
    { path: basketPath, element: 'Basket.page.tsx' },
    { path: favoritesPath, element: 'Favorites.page.tsx' },
    { path: publishedPath, element: 'Pubished.page.tsx' }
]

export const publicRoutes = [
    { path: mainPath, element: 'Main.page.tsx' },
    { path: signupPath, element: 'Signup.page.tsx' },
    { path: loginPath, element: 'Login.page.tsx' },
    { path: catalogPath, element: 'Catalog.page.tsx' },
    { path: bookPath, element: 'Book.page.tsx' }
]