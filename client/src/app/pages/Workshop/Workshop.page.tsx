import { useEffect, useState, type FC } from 'react'
import styles from './workshop.module.scss'
import { useSelector } from 'react-redux'
import { selectorGeneral } from '../../../redux/general/general.selector'
import { ColorThemeEnum } from '../../../redux/general/general.types'
import CreateCategory from './workshopComponents/CreateCategory.component'
import CreateTheme from './workshopComponents/CreateTheme.component'
import { selectorCategoriesAndThemes } from '../../../redux/categoriesAndThemes/categoriesAndThemes.selector'
import { useAppDispatch } from '../../../redux/store.redux'
import { fetchCategories, fetchThemes } from '../../../redux/categoriesAndThemes/categoriesAndThemes.async'
import CreateBook from './workshopComponents/CreateBook.component'

const WorkshopPage: FC = () => {
    const { theme, currentUser } = useSelector(selectorGeneral)
    const { status, categories, themes } = useSelector(selectorCategoriesAndThemes)
    const dispatch = useAppDispatch()
    const themeTernary = theme === ColorThemeEnum.LIGHT ? styles.light : styles.dark

    const [catOpen, setCatOpen] = useState<boolean>(false)
    const [themesOpen, setThemesOpen] = useState<boolean>(false)

    useEffect(() => {
        const getCategoriesAndThemes = async () => {
            dispatch(
                fetchCategories()
            )

            dispatch(
                fetchThemes()
            )
        }
        getCategoriesAndThemes()
    }, [])

    return (
        <section className={styles.workshop}>
            <div className={styles.container}>
                <h1 className={styles.workshopHeading}>Мастерская</h1>
                <div className={styles.workshopObserve}>
                    <div className={styles.workshopObserveItem}>
                        <h3 className={styles.workshopMediumHeading + ' ' + themeTernary} onClick={() => setCatOpen(prev => !prev)}>
                            {catOpen ?
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
                                </svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                                </svg>
                            }
                            Список категорий
                        </h3>
                        {catOpen &&
                            categories.map(item => (
                                <div key={item.id} className={styles.workshopItem + ' ' + themeTernary}>
                                    <span>{item.title}</span>
                                    {/* <a className={styles.deleteItem}>Удалить</a> */}
                                </div>
                            ))
                        }
                    </div>
                    <div className={styles.workshopObserveItem}>
                        <h3 className={styles.workshopMediumHeading + ' ' + themeTernary} onClick={() => setThemesOpen(prev => !prev)}>
                            {themesOpen ?
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
                                </svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                                </svg>
                            }
                            Список категорий
                        </h3>
                        {themesOpen &&
                            themes.map(item => (
                                <div key={item.id} className={styles.workshopItem + ' ' + themeTernary}>
                                    <span>{item.title} ({item.category?.title})</span>
                                    {/* <a className={styles.deleteItem}>Удалить</a> */}
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={styles.workshopCreate}>
                    <CreateCategory />
                    <CreateTheme />
                </div>
                <CreateBook />
            </div>
        </section>
    )
}

export default WorkshopPage