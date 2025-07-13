import { useState, type FC } from 'react'
import styles from './bookCard.module.scss'
import { Link } from 'react-router-dom'

const BookCard: FC<{test: number}> = ({ test }) => {
    const [isInBasket, setIsInBasket] = useState(false)
    const [isInFavorites, setIsInFavorites] = useState(false)

    return (
        <div className={styles.bookBlock}>
            <div className={styles.bookHeading}>{test}Название{test}</div>
            <div className={styles.bookAuthor}>{test}Автор{test}</div>
            <Link to='/catalog/book/1'>
                <div className={styles.bookImage} style={{ 'backgroundImage': '' }}>as</div>
            </Link>
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
        </div >
    )
}

export default BookCard