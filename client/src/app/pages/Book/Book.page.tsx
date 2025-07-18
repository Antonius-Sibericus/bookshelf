import { useEffect, useState, type FC } from 'react'
import styles from './book.module.scss'
import BooksService from '../../services/books.service'
import { useParams } from 'react-router-dom'
import type { BookResponseType } from '../../../types/responsesTypes/bookResponse.type'
import { type BookType } from '../../../types/entitiesTypes/book.type'
import { useSelector } from 'react-redux'
import { selectorCategoriesAndThemes } from '../../../redux/categoriesAndThemes/categoriesAndThemes.selector'
import BasketService from '../../services/basket.service'
import type { BooksResponseType } from '../../../types/responsesTypes/booksResponse.type'
import { useAppDispatch } from '../../../redux/store.redux'
import { fetchBasket } from '../../../redux/basket/basket.async'
import { selectorBasket } from '../../../redux/basket/basket.selector'
import FavoritesService from '../../services/favorites.service'
import { fetchFavorites } from '../../../redux/favorites/favorites.async'
import { selectorFavorites } from '../../../redux/favorites/favorites.selector'
import { selectorUsers } from '../../../redux/users/users.selector'
import { selectorGeneral } from '../../../redux/general/general.selector'
import type { DefaultResponseType } from '../../../types/responsesTypes/defaultResponse.type'
import type { AxiosError } from 'axios'

const BookPage: FC = () => {
    const { isSignedUp } = useSelector(selectorGeneral)
    const { categories, themes } = useSelector(selectorCategoriesAndThemes)
    const { basket } = useSelector(selectorBasket)
    const { favorites } = useSelector(selectorFavorites)
    const { users } = useSelector(selectorUsers)
    const params = useParams()
    const dispatch = useAppDispatch()
    const [isInBasket, setIsInBasket] = useState<boolean>(false)
    const [isInFavorites, setIsInFavorites] = useState<boolean>(false)
    const [currentBook, setCurrentBook] = useState<BookType>({} as BookType)
    const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(false)

    useEffect(() => {
        try {
            const getBook = async () => {
                if (params.bookTag) {
                    const result = await BooksService.getOneBook(params.bookTag)
                    const response = result.data

                    if (response as BookResponseType) {
                        setCurrentBook(response.book)
                    }
                }
            }

            getBook()
        } catch (err) {
            const customErrorData: DefaultResponseType = (err as AxiosError).response?.data as DefaultResponseType
            console.error(customErrorData ? customErrorData.message : err)
        }
    }, [])

    useEffect(() => {
        setIsInFavorites(favorites.find(item => item.tag === currentBook.tag) ? true : false)
        setIsInBasket(basket.find(item => item.tag === currentBook.tag) ? true : false)
    }, [currentBook])

    const addToCart = async (tag: string) => {
        try {
            const result = await BasketService.addToBasket(tag)
            const response = result.data

            if (response as BooksResponseType) {
                dispatch(fetchBasket())
                setIsInBasket(true)
            }

        } catch (err) {
            const customErrorData: DefaultResponseType = (err as AxiosError).response?.data as DefaultResponseType
            console.error(customErrorData ? customErrorData.message : err)
        }
    }

    const addToFav = async (tag: string) => {
        try {
            const result = await FavoritesService.addFavorite(tag)
            const response = result.data

            if (response as BooksResponseType) {
                dispatch(fetchFavorites())
                setIsInFavorites(true)
            }
        } catch (err) {
            const customErrorData: DefaultResponseType = (err as AxiosError).response?.data as DefaultResponseType
            console.error(customErrorData ? customErrorData.message : err)
        }
    }

    const deleteFromCart = async (tag: string) => {
        try {
            const result = await BasketService.removeFromBasket(tag)
            const response = result.data

            if (response as BooksResponseType) {
                dispatch(fetchBasket())
                setIsInBasket(false)
            }
        } catch (err) {
            const customErrorData: DefaultResponseType = (err as AxiosError).response?.data as DefaultResponseType
            console.error(customErrorData ? customErrorData.message : err)
        }
    }

    const deleteFromFav = async (tag: string) => {
        try {
            const result = await FavoritesService.removeFavorite(tag)
            const response = result.data

            if (response as BookResponseType) {
                dispatch(fetchFavorites())
                setIsInFavorites(false)
            }
        } catch (err) {
            const customErrorData: DefaultResponseType = (err as AxiosError).response?.data as DefaultResponseType
            console.error(customErrorData ? customErrorData.message : err)
        }
    }

    return (
        <section className={styles.bookPage}>
            <div className={styles.container}>
                <div className={styles.bookPageHeading}>{currentBook.heading}</div>
                <div className={styles.bookPageAuthor}>{currentBook.author}</div>
                <div className={styles.bookMainContent}>
                    <div className={styles.bookPageImage}>
                        <img src={`${import.meta.env.VITE_API_URL}/${currentBook.tag}.png`} alt='image' />
                    </div>
                    <div className={styles.bookPageInfo}>
                        <div className={styles.bookPageEntry}>
                            <span className={styles.bookPageChar}>Число страниц: </span>
                            <span className={styles.bookPageValue}>{currentBook.pages}</span>
                        </div>
                        <div className={styles.bookPageEntry}>
                            <span className={styles.bookPageChar}>В наличии: </span>
                            <span className={styles.bookPageValue}>{currentBook.isInStock ? 'Доступна' : 'Нет в наличии'}</span>
                        </div>
                        <div className={styles.bookPageEntry}>
                            <span className={styles.bookPageChar}>Год выпуска: </span>
                            <span className={styles.bookPageValue}>{currentBook.year}</span>
                        </div>
                        <div className={styles.bookPageEntry}>
                            <span className={styles.bookPageChar}>ISBN: </span>
                            <span className={styles.bookPageValue}>{currentBook.isbn}</span>
                        </div>
                        <div className={styles.bookPageEntry}>
                            <span className={styles.bookPageChar}>Обложка: </span>
                            <span className={styles.bookPageValue}>{currentBook.isSoftCover ? 'Мягкая' : 'Твёрдая'}</span>
                        </div>
                        <div className={styles.bookPageEntry}>
                            <span className={styles.bookPageChar}>Категория: </span>
                            <span className={styles.bookPageValue}>{categories.find(item => item.tag === currentBook.categoryTag)?.title}</span>
                        </div>
                        <div className={styles.bookPageEntry}>
                            <span className={styles.bookPageChar}>Тема: </span>
                            <span className={styles.bookPageValue}>{themes.find(item => item.tag === currentBook.themeTag)?.title}</span>
                        </div>
                        <div className={styles.bookPageEntry}>
                            <span className={styles.bookPageChar}>Публикатор: </span>
                            <span className={styles.bookPageValue}>
                                {users.find(item => item.id === currentBook.publisherId)?.surname + ' '}
                                {users.find(item => item.id === currentBook.publisherId)?.name + ' '}
                                {users.find(item => item.id === currentBook.publisherId)?.paternal}
                            </span>
                        </div>
                        <div className={styles.bookPageActions}>
                            {
                                isInFavorites ?
                                    <button
                                        className={styles.bookButton + ' ' + styles.bookButtonInFav}
                                        onClick={() => deleteFromFav(currentBook.tag)}
                                    >
                                        В избранном
                                    </button> :
                                    <button
                                        className={styles.bookButton + ' ' + styles.bookButtonToFav}
                                        onClick={isSignedUp ? () => addToFav(currentBook.tag) : () => setIsCheckingAuth(prev => !prev)}
                                    >
                                        {isCheckingAuth ? 'Войдите в аккаунт' : 'В избранное'}
                                    </button>
                            }
                            {
                                isInBasket ?
                                    <button
                                        className={styles.bookButton + ' ' + styles.bookButtonInBas}
                                        onClick={() => deleteFromCart(currentBook.tag)}
                                    >
                                        В корзине
                                    </button> :
                                    <button
                                        className={styles.bookButton + ' ' + styles.bookButtonToBas}
                                        onClick={isSignedUp ? () => addToCart(currentBook.tag) : () => setIsCheckingAuth(prev => !prev)}
                                    >
                                        {isCheckingAuth ? 'Войдите в аккаунт' : 'В корзину'}
                                    </button>
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.bookPageDescription}>
                    <div className={styles.bookPageDescHeading}>Описание</div>
                    <p className={styles.bookPageDescText}>{currentBook.description}</p>
                </div>
            </div>
        </section>
    )
}

export default BookPage