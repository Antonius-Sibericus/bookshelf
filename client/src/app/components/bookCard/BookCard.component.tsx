import { useState, type FC } from 'react'
import styles from './bookCard.module.scss'

const BookCard: FC = () => {
    const [isInBasket, setIsInBasket] = useState(false)
    const [isInFavorites, setIsInFavorites] = useState(false)

    return (
        <div className={styles.bookBlock}>
            <div className={styles.bookHeading}>Название</div>
            <div className={styles.bookAuthor}>Автор</div>
            <div className={styles.bookImage} style={{ 'backgroundImage': '' }}></div>
            {isInFavorites ?
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
            {isInBasket ?
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
    )
}

export default BookCard