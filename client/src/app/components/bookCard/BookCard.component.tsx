import { useState, type FC } from 'react'
import styles from './bookCard.module.scss'
import { Link } from 'react-router-dom'
import type { BookType } from '../../../types/entitiesTypes/book.type'

const BookCard: FC<BookType> = (props) => {
    const [isInBasket, setIsInBasket] = useState(false)
    const [isInFavorites, setIsInFavorites] = useState(false)
    const { heading, tag, author, pages, isInStock, year, isbn, isSoftCover, categoryTag, themeTag } = props

    return (
        <div className={styles.bookBlock}>
            <div className={styles.bookHeading}>{heading}</div>
            <div className={styles.bookAuthor}>{author} ({year})</div>
            <Link to='/catalog/book/1'>
                <div className={styles.bookImage} style={{ 'backgroundImage': '' }}>as</div>
            </Link>
            <div className={styles.buttonCont}>
                {
                    isInFavorites ?
                        <button
                            className={styles.bookButton + ' ' + styles.bookButtonInFav}
                            onClick={() => setIsInFavorites(prev => !prev)}
                        >
                            В избранном
                        </button> :
                        <button
                            className={styles.bookButton + ' ' + styles.bookButtonToFav}
                            onClick={() => setIsInFavorites(prev => !prev)}
                        >
                            В избранное
                        </button>
                }
                {
                    isInBasket ?
                        <button
                            className={styles.bookButton + ' ' + styles.bookButtonInBas}
                            onClick={() => setIsInBasket(prev => !prev)}
                        >
                            В корзине
                        </button> :
                        <button
                            className={styles.bookButton + ' ' + styles.bookButtonToBas}
                            onClick={() => setIsInBasket(prev => !prev)}
                        >
                            В корзину
                        </button>
                }
            </div>
        </div >
    )
}

export default BookCard