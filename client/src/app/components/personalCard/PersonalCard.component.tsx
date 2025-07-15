import type { FC } from 'react'
import styles from './personalCard.module.scss'
import image from '../../../assets/images/example.png'
import { useSelector } from 'react-redux'
import { selectorGeneral } from '../../../redux/general/general.selector'
import { ColorThemeEnum } from '../../../redux/general/general.types'
import { Link, useLocation } from 'react-router-dom'
import type { BookType } from '../../../types/entitiesTypes/book.type'
import { selectorCategoriesAndThemes } from '../../../redux/categoriesAndThemes/categoriesAndThemes.selector'

interface props extends BookType {
    remove?: (tag: string) => void
}

const PersonalCard: FC<props> = (props) => {
    const { heading, tag, author, categoryTag, themeTag, isInStock, remove } = props
    const { theme } = useSelector(selectorGeneral)
    const { categories, themes } = useSelector(selectorCategoriesAndThemes)
    const themeTernary = theme === ColorThemeEnum.LIGHT ? styles.light : styles.dark

    const location = useLocation()

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
            {location.pathname.includes('published') ?
                <>
                    <Link to={`/catalog/book/${tag}/edit`}>
                        <div className={styles.personalCardClose} onClick={remove ? () => remove(tag) : () => { }}>
                            <svg className={themeTernary} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z" />
                            </svg>
                        </div>
                    </Link>
                        <div className={styles.personalCardClose} onClick={remove ? () => remove(tag) : () => { }}>
                            <svg className={themeTernary} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
                            </svg>
                        </div>
                </> :
                <div className={styles.personalCardClose} onClick={remove ? () => remove(tag) : () => { }}>
                    <svg className={themeTernary} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
                    </svg>
                </div>

            }
        </div>
    )
}

export default PersonalCard