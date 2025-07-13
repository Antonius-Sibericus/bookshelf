import { useEffect, useState, type FC } from 'react'
import styles from './workshop.module.scss'
import { useSelector } from 'react-redux'
import { selectorGeneral } from '../../../redux/general/general.selector'
import { ColorThemeEnum } from '../../../redux/general/general.types'
import CreateCategory from './workshopComponents/CreateCategory.component'
import CreateTheme from './workshopComponents/CreateTheme.component'
import { selectorCategories } from '../../../redux/categories/categoriesRedux.selector'
import { useAppDispatch } from '../../../redux/store.redux'
import { fetchCategories } from '../../../redux/categories/categoriesRedux.async'

const WorkshopPage: FC = () => {
    const { theme, currentUser } = useSelector(selectorGeneral)
    const { categories } = useSelector(selectorCategories)
    const dispatch = useAppDispatch()
    const themeTernary = theme === ColorThemeEnum.LIGHT ? styles.light : styles.dark

    useEffect(() => {
        const getCategories = async () => {
            dispatch(
                fetchCategories()
            )
        }
        getCategories()
    }, [categories])

    return (
        <section className={styles.workshop}>
            <div className={styles.container}>
                <h1 className={styles.workshopHeading}>Мастерская</h1>
                <div className={styles.workshopObserve}>
                    <div className={styles.workshopObserveItem}>
                        <h3 className={styles.workshopMediumHeading}>Список категорий</h3>
                        {
                            categories.map(item => (
                                <div key={item.id} className={styles.workshopItem + ' ' + themeTernary}>
                                    <span>{item.title}</span>
                                    <a className={styles.deleteItem}>Удалить</a>
                                </div>
                            ))
                        }
                    </div>
                    <div className={styles.workshopObserveItem}>
                        <h3 className={styles.workshopMediumHeading}>Список категорий</h3>
                        {
                            categories.map(item => (
                                <div key={item.id} className={styles.workshopItem + ' ' + themeTernary}>
                                    <span>{item.title}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={styles.workshopCreate}>
                    <CreateCategory />
                    <CreateTheme />
                </div>
                <form>
                    <h3 className={styles.workshopHeading}>Добавить книгу</h3>
                    {/* <div className={styles.profileGroup}>
                        <label htmlFor="surname" className={styles.profileLabel + ' ' + themeTernary}>
                            Фамилия
                        </label>
                        <input
                            {...register('surname')}
                            defaultValue={currentUser.surname}
                            type="text"
                            id='surname'
                            name='surname'
                            className={styles.profileInput + ' ' + themeTernary + ' ' + disabledeTernary}
                            style={errors.surname ? { 'borderColor': 'red' } : {}}
                        />
                        {errors.surname && <span className={styles.profileError}>{errors.surname.message}</span>}
                    </div> */}
                </form>
            </div>
        </section>
    )
}

export default WorkshopPage