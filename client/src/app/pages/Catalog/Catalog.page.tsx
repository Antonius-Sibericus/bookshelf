import { useEffect, useState, type FC } from 'react'
import styles from './catalog.module.scss'
import BookCard from '../../components/bookCard/BookCard.component'
import { useSelector } from 'react-redux'
import { selectorGeneral } from '../../../redux/general/general.selector'
import { ColorThemeEnum } from '../../../redux/general/general.types'
import BookSceleton from '../../components/bookCard/Sceleton.component'
import { useAppDispatch } from '../../../redux/store.redux'
import { fetchBooks } from '../../../redux/books/books.async'
import { selectorBooks } from '../../../redux/books/books.selector'
import type { BookType } from '../../../types/entitiesTypes/book.type'
import { Filters } from '../../../types/filters.enum'
import { selectorCategoriesAndThemes } from '../../../redux/categoriesAndThemes/categoriesAndThemes.selector'
import type { ThemeType } from '../../../types/entitiesTypes/theme.type'
import { selectFilter } from '../../../redux/filter/filter.selector'
import { fetchCategories, fetchThemes } from '../../../redux/categoriesAndThemes/categoriesAndThemes.async'
import { setCategoryFilter, setThemeFilter, setTitleFilter, setYearFilter } from '../../../redux/filter/filter.slice'
import type { CategoryType } from '../../../types/entitiesTypes/category.type'
import Pagination from './catalogComponents/Paginantion.component'

const CatalogPage: FC = () => {
    const { theme } = useSelector(selectorGeneral)
    const { categories, themes } = useSelector(selectorCategoriesAndThemes)
    const { status, books } = useSelector(selectorBooks)
    const { categoryQuery, themeQuery, titleQuery, yearQuery, pageQuery, searchQuery } = useSelector(selectFilter)
    const themeTernary = theme === ColorThemeEnum.LIGHT ? styles.light : styles.dark
    const dispatch = useAppDispatch()

    const [categoriesOpen, setCategoriesOpen] = useState<boolean>(categoryQuery ? true : false)
    const [themesOpen, setThemesOpen] = useState<boolean>(false)
    const [yearOpen, setYearOpen] = useState<boolean>(false)
    const [headingOpen, setHeadingOpen] = useState<boolean>(false)

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

    useEffect(() => {
        const getBooks = async () => {
            dispatch(fetchBooks({
                cat: categoryQuery,
                theme: themeQuery,
                title: titleQuery,
                year: yearQuery,
                page: pageQuery,
                search: searchQuery
            }))
        }

        getBooks()
    }, [categoryQuery, themeQuery, titleQuery, yearQuery, pageQuery, searchQuery])

    const [cat, setCat] = useState<string | null>(categoryQuery ? categoryQuery : null)
    const filteredThemes = cat ? themes.filter(item => item.categoryTag === cat) : themes
    const preparedBooks = books.map((item: BookType) => <BookCard key={item.tag} {...item} />)
    const skeletons = [...new Array(6).map((item, index) => <BookSceleton key={index} />)]

    const settingCategory = (catTag: string) => {
        dispatch(setCategoryFilter(categoryQuery === catTag ? '' : catTag))
        setCat(categoryQuery === catTag ? null : catTag)
    }

    const settingTag = (theTag: string) => {
        dispatch(setThemeFilter(themeQuery === theTag ? '' : theTag))
    }

    return (
        <section className={styles.catalog}>
            <div className={styles.container}>
                <div className={styles.filtersBlock + ' ' + themeTernary}>
                    <div className={styles.filterBlock + ' ' + themeTernary}>
                        <div className={styles.filterHeading + ' ' + themeTernary} onClick={() => setCategoriesOpen(prev => !prev)}>
                            Категории
                            {categoriesOpen ?
                                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                                    <path d='M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z' />
                                </svg> :
                                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                                    <path d='M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z' />
                                </svg>
                            }
                        </div>
                        {categoriesOpen &&
                            <div className={styles.filterOptions}>
                                {categories.map((categ: CategoryType) => (
                                    <div key={categ.id} className={styles.filterOption + ' ' + themeTernary} onClick={() => settingCategory(categ.tag)}>
                                        {
                                            categoryQuery === categ.tag ?
                                                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
                                                    <path d='M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80zM0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z' />
                                                </svg> :
                                                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
                                                    <path d='M384 80c8.8 0 16 7.2 16 16l0 320c0 8.8-7.2 16-16 16L64 432c-8.8 0-16-7.2-16-16L48 96c0-8.8 7.2-16 16-16l320 0zM64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32z' />
                                                </svg>
                                        }
                                        <span>{categ.title}</span>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                    {
                        cat &&
                        <div className={styles.filterBlock + ' ' + themeTernary}>
                            <div className={styles.filterHeading + ' ' + themeTernary} onClick={() => setThemesOpen(prev => !prev)}>
                                Темы
                                {themesOpen ?
                                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                                        <path d='M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z' />
                                    </svg> :
                                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                                        <path d='M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z' />
                                    </svg>
                                }
                            </div>
                            {themesOpen &&
                                <div className={styles.filterOptions}>
                                    {filteredThemes.map((theme: ThemeType) => (
                                        <div key={theme.id} className={styles.filterOption + ' ' + themeTernary} onClick={() => settingTag(theme.tag)}>
                                            {
                                                themeQuery === theme.tag ?
                                                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
                                                        <path d='M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80zM0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z' />
                                                    </svg> :
                                                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
                                                        <path d='M384 80c8.8 0 16 7.2 16 16l0 320c0 8.8-7.2 16-16 16L64 432c-8.8 0-16-7.2-16-16L48 96c0-8.8 7.2-16 16-16l320 0zM64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32z' />
                                                    </svg>
                                            }
                                            <span>{theme.title}</span>
                                        </div>
                                    ))}
                                </div>
                            }
                        </div>
                    }
                    <div className={styles.filterBlock + ' ' + themeTernary}>
                        <div className={styles.filterHeading + ' ' + themeTernary} onClick={() => setYearOpen(prev => !prev)}>
                            Год
                            {yearOpen ?
                                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                                    <path d='M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z' />
                                </svg> :
                                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                                    <path d='M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z' />
                                </svg>
                            }
                        </div>
                        {yearOpen &&
                            <select name='yearFilter' id='yearFilter' className={styles.filterSelect + ' ' + themeTernary} onChange={(e) => dispatch(setYearFilter(e.target.value as Filters))}>
                                <option value={Filters.DEF}>По умолчанию</option>
                                <option value={Filters.ASC}>Сначала старые</option>
                                <option value={Filters.DESC}>Сначала новые</option>
                            </select>
                        }
                    </div>
                    <div className={styles.filterBlock + ' ' + themeTernary}>
                        <div className={styles.filterHeading + ' ' + themeTernary} onClick={() => setHeadingOpen(prev => !prev)}>
                            Название
                            {headingOpen ?
                                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                                    <path d='M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z' />
                                </svg> :
                                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                                    <path d='M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z' />
                                </svg>
                            }
                        </div>
                        {headingOpen &&
                            <select name='headingFilter' id='headingFilter' className={styles.filterSelect + ' ' + themeTernary} onChange={(e) => dispatch(setTitleFilter(e.target.value as Filters))}>
                                <option value={Filters.DEF}>По умолчанию</option>
                                <option value={Filters.ASC}>От А до Я</option>
                                <option value={Filters.DESC}>От Я до А</option>
                            </select>
                        }
                    </div>
                </div>
                <div className={styles.catalogBlock}>
                    <div className={styles.catalogHeading + ' ' + themeTernary}>Коллекция</div>
                    <div className={styles.catalogContainer}>
                        {status === 'loading' ? skeletons : preparedBooks}
                    </div>
                    <div className={styles.catalogPagination}>
                        <Pagination />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CatalogPage