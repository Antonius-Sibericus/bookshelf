import { useState, type FC } from 'react'
import image from '../../../assets/images/example.png'
import styles from './book.module.scss'

const BookPage: FC = () => {
    const [isInBasket, setIsInBasket] = useState(false)
    const [isInFavorites, setIsInFavorites] = useState(false)
    return (
        <section className={styles.bookPage}>
            <div className={styles.container}>
                <div className={styles.bookPageHeading}>Название название</div>
                <div className={styles.bookPageAuthor}>Автор автор</div>
                <div className={styles.bookMainContent}>
                    <div className={styles.bookPageImage}>
                        <img src={image} alt="image" />
                    </div>
                    <div className={styles.bookPageInfo}>
                        <div className={styles.bookPageEntry}>
                            <span className={styles.bookPageChar}>Char: </span>
                            <span className={styles.bookPageValue}>Value</span>
                        </div>
                        <div className={styles.bookPageEntry}>
                            <span className={styles.bookPageChar}>Char: </span>
                            <span className={styles.bookPageValue}>Value</span>
                        </div>
                        <div className={styles.bookPageEntry}>
                            <span className={styles.bookPageChar}>Char: </span>
                            <span className={styles.bookPageValue}>Value</span>
                        </div>
                        <div className={styles.bookPageActions}>
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
                    </div>
                </div>
                <div className={styles.bookPageDescription}>
                    <div className={styles.bookPageDescHeading}>Описание</div>
                    <p className={styles.bookPageDescText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi eos repellat porro mollitia possimus voluptatum, labore culpa ipsam, magni debitis commodi, nulla nisi rem sunt. Mollitia rerum nesciunt dolores assumenda!</p>
                    <p className={styles.bookPageDescText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi eos repellat porro mollitia possimus voluptatum, labore culpa ipsam, magni debitis commodi, nulla nisi rem sunt. Mollitia rerum nesciunt dolores assumenda!</p>
                    <p className={styles.bookPageDescText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi eos repellat porro mollitia possimus voluptatum, labore culpa ipsam, magni debitis commodi, nulla nisi rem sunt. Mollitia rerum nesciunt dolores assumenda!</p>
                </div>
            </div>
        </section>
    )
}

export default BookPage