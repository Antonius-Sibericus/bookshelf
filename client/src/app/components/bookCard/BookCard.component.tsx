import { useEffect, useState, type FC } from 'react'
import styles from './bookCard.module.scss'
import { Link } from 'react-router-dom'
import type { BookType } from '../../../types/entitiesTypes/book.type'
import { useAppDispatch } from '../../../redux/store.redux'
import { fetchBasket } from '../../../redux/basket/basket.async'
import { fetchFavorites } from '../../../redux/favorites/favorites.async'
import type { BookResponseType } from '../../../types/responsesTypes/bookResponse.type'
import type { BooksResponseType } from '../../../types/responsesTypes/booksResponse.type'
import BasketService from '../../services/basket.service'
import FavoritesService from '../../services/favorites.service'
import { useSelector } from 'react-redux'
import { selectorBasket } from '../../../redux/basket/basket.selector'
import { selectorFavorites } from '../../../redux/favorites/favorites.selector'

const BookCard: FC<BookType> = (props) => {
    const dispatch = useAppDispatch()
    const { basket } = useSelector(selectorBasket)
    const { favorites } = useSelector(selectorFavorites)
    const [isInBasket, setIsInBasket] = useState(false)
    const [isInFavorites, setIsInFavorites] = useState(false)
    const { heading, tag, author, year } = props

    useEffect(() => {
        setIsInFavorites(favorites.find(item => item.tag === tag) ? true : false)
        setIsInBasket(basket.find(item => item.tag === tag) ? true : false)
    }, [])

    const addToCart = async (tag: string) => {
        try {
            const result = await BasketService.addToBasket(tag)
            const response = result.data

            if (response as BooksResponseType) {
                dispatch(fetchBasket())
                setIsInBasket(true)
            }

        } catch (err) {
            console.error(err)
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
            console.error(err)
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
            console.error(err)
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
            console.error(err)
        }
    }

    return (
        <div className={styles.bookBlock}>
            <div className={styles.bookHeading}>{heading}</div>
            <div className={styles.bookAuthor}>{author} ({year})</div>
            <Link to={`/catalog/book/${tag}`}>
                <div className={styles.bookImage} style={{ 'backgroundImage': `url(${import.meta.env.VITE_API_URL}/${tag}.png)` }}></div>
            </Link>
            <div className={styles.buttonCont}>
                {
                    isInFavorites ?
                        <button
                            className={styles.bookButton + ' ' + styles.bookButtonInFav}
                            onClick={() => deleteFromFav(tag)}
                        >
                            В избранном
                        </button> :
                        <button
                            className={styles.bookButton + ' ' + styles.bookButtonToFav}
                            onClick={() => addToFav(tag)}
                        >
                            В избранное
                        </button>
                }
                {
                    isInBasket ?
                        <button
                            className={styles.bookButton + ' ' + styles.bookButtonInBas}
                            onClick={() => deleteFromCart(tag)}
                        >
                            В корзине
                        </button> :
                        <button
                            className={styles.bookButton + ' ' + styles.bookButtonToBas}
                            onClick={() => addToCart(tag)}
                        >
                            В корзину
                        </button>
                }
            </div>
        </div >
    )
}

export default BookCard