import type { FC } from 'react'
import styles from './personalCard.module.scss'
import image from '../../../assets/images/example.png'
import { useSelector } from 'react-redux'
import { selectorGeneral } from '../../../redux/general/general.selector'
import { ColorThemeEnum } from '../../../redux/general/general.types'
import { Link } from 'react-router-dom'

const PersonalCard: FC = () => {
    const { theme } = useSelector(selectorGeneral)
    const themeTernary = theme === ColorThemeEnum.LIGHT ? styles.light : styles.dark

    return (
        <div className={styles.personalCard + ' ' + themeTernary}>
            <Link to='/catalog/book/1'>
                <div className={styles.personalCardImage}>
                    <img src={image} alt="image" />
                </div>
            </Link>
            <div className={styles.personalCardDescription}>
                <div>
                    <div className={styles.personalCardHeading + ' ' + themeTernary}>Название название</div>
                    <div className={styles.personalCardInfo + ' ' + themeTernary}>Автор автор</div>
                </div>
                <div>
                    <div className={styles.personalCardInfo + ' ' + themeTernary}>Категория категория</div>
                    <div className={styles.personalCardInfo + ' ' + themeTernary}>Тема тема тема</div>
                </div>
            </div>
            <div className={styles.personalCardStore + ' ' + themeTernary}>Есть в наличии</div>
            <div className={styles.personalCardClose}>
                <svg className={themeTernary} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                </svg>
            </div>
        </div>
    )
}

export default PersonalCard