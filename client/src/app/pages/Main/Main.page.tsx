import type { FC } from 'react'
import styles from './main.module.scss'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectorGeneral } from '../../../redux/general/general.selector'
import { ColorThemeEnum } from '../../../redux/general/general.types'

const MainPage: FC = () => {
    const { theme } = useSelector(selectorGeneral)
    const themeTernary = theme === ColorThemeEnum.LIGHT ? styles.light : styles.dark

    return (
        <>
            <section className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.mainHeading}>
                        Bookshelf <br />
                        Первый буккроссинг в Тюмени
                    </div>
                    <div className={styles.mainText}>
                        Если вы страстный любитель чтения или коллекционер книг, то вам - к нам!
                        <br />
                        Уникальная возможность обмениваться книгами, которая не стоит ни копейки
                    </div>
                    <div className={styles.mainText}>
                        Начните поиск книг <Link to='/catalog'>в каталоге</Link>
                    </div>
                </div>
            </section>
            <section className={styles.address}>
                <div className={styles.addressHeading + ' ' + themeTernary}>Наш офис и место получения заказов</div>
                <iframe src='https://yandex.ru/map-widget/v1/?um=constructor%3A9cd8f5a4976c1bb039e234bf5e46cdb3cf15f248e995c02b6b8bdbddd1a06216&amp;source=constructor' width='100%'></iframe>
            </section>
        </>
    )
}

export default MainPage