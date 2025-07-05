import type { FC } from 'react'
import styles from './footer.module.scss'
import { Link } from 'react-router-dom'
import { ColorThemeEnum } from '../../../../redux/general/general.types'
import { selectorGeneral } from '../../../../redux/general/general.selector'
import { useSelector } from 'react-redux'

const Footer: FC = () => {
    const { theme } = useSelector(selectorGeneral)
    const themeTernary = theme === ColorThemeEnum.LIGHT ? styles.light : styles.dark

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <Link to='/'>
                    <div className={styles.logo}>
                        <img width='120' src='images/logo-bookshelf.jpg' alt='Bookshelf Logo' />
                    </div>
                </Link>
                <div className={styles.footerColumn}>
                    <h6 className={themeTernary}>Контакты</h6>
                    <a className={styles.footerPhone + ' ' + themeTernary} href='tel:+375299182888'>8 (800) 555-35-35</a>
                    <span>Адрес: г. Тюмень, ул. Республики, д. 777</span>
                    <span>E-mail: example@mail.ru</span>
                </div>
                <div className={styles.footerColumn + ' ' + styles.footerNav}>
                    <h6 className={themeTernary}>Навигация</h6>
                    <Link to='/' className={themeTernary}>Главная</Link>
                    <Link to='/catalog' className={themeTernary}>Каталог</Link>
                </div>
                <div className={styles.footerColumn + ' ' + styles.footerNav}>
                    <h6 className={themeTernary}>Категории</h6>
                    <Link to='/catalog' className={themeTernary}>Category</Link>
                    <Link to='/catalog' className={themeTernary}>Category</Link>
                    <Link to='/catalog' className={themeTernary}>Category</Link>
                    <Link to='/catalog' className={themeTernary}>Category</Link>
                    <Link to='/catalog' className={themeTernary}>Category</Link>
                    <Link to='/catalog' className={themeTernary}>Category</Link>
                    <Link to='/catalog' className={themeTernary}>Category</Link>
                    <Link to='/catalog' className={themeTernary}>Category</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer