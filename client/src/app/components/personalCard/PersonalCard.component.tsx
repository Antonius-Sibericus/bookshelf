import type { FC } from 'react'
import styles from './personalCard.module.scss'
import image from '../../../assets/images/example.png'
import { useSelector } from 'react-redux'
import { selectorGeneral } from '../../../redux/general/general.selector'
import { ColorThemeEnum } from '../../../redux/general/general.types'
import { Link } from 'react-router-dom'
import type { BookType } from '../../../types/entitiesTypes/book.type'
import { selectorCategoriesAndThemes } from '../../../redux/categoriesAndThemes/categoriesAndThemes.selector'

interface props extends BookType {
    remove: (tag: string) => void
}

const PersonalCard: FC<props> = (props) => {
    const { heading, tag, author, categoryTag, themeTag, isInStock, remove } = props
    const { theme } = useSelector(selectorGeneral)
    const { categories, themes } = useSelector(selectorCategoriesAndThemes)
    const themeTernary = theme === ColorThemeEnum.LIGHT ? styles.light : styles.dark

    return (
        <div className={styles.personalCard + ' ' + themeTernary}>
            <Link to={`/catalog/book/${tag}`}>
                <div className={styles.personalCardImage}>
                    <img src={image} alt="image" />
                </div>
            </Link>
            <div className={styles.personalCardDescription}>
                <div>
                    <div className={styles.personalCardHeading + ' ' + themeTernary}>{heading}</div>
                    <div className={styles.personalCardInfo + ' ' + themeTernary}>{author}</div>
                </div>
                <div>
                    <div className={styles.personalCardInfo + ' ' + themeTernary}>{categories.find(cat => cat.tag === categoryTag)?.title || 'Категория не найдена'}</div>
                    <div className={styles.personalCardInfo + ' ' + themeTernary}>{themes.find(theme => theme.tag === themeTag)?.title || 'Тема не найдена'}</div>
                </div>
            </div>
            <div className={styles.personalCardStore + ' ' + themeTernary}>{isInStock ? 'Есть в наличии' : 'нет в наличии'}</div>
            <div className={styles.personalCardClose} onClick={() => remove(tag)}>
                <svg className={themeTernary} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                </svg>
            </div>
        </div>
    )
}

export default PersonalCard