import type { FC } from 'react'
import styles from './main.module.scss'
import { Link } from 'react-router-dom'

const NotFoundPage: FC = () => {
    return (
        <section className={styles.main}>
            <div className={styles.container}>
                <div className={styles.mainHeading}>
                    404 <br />
                    Такой страницы не существует
                </div>
                <div className={styles.mainText}>
                    Адрес, на который вы перешли, никуда не ведёт
                    <br />
                    Не спешите уходить! Вам понравятся следующие предложения:
                    <br />
                </div>
                <div className={styles.mainText}>
                    Давайте познакомимся! <Link to='/'>Главная страница</Link>
                </div>
                <div className={styles.mainText}>
                    Начните поиск книг <Link to='/catalog'>в каталоге</Link>
                </div>
            </div>
        </section>
    )
}

export default NotFoundPage