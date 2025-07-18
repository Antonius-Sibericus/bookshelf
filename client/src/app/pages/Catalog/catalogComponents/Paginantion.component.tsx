import { useEffect, type FC } from 'react'
import styles from '../catalog.module.scss'
import { selectorGeneral } from '../../../../redux/general/general.selector'
import { useSelector } from 'react-redux'
import { ColorThemeEnum } from '../../../../redux/general/general.types'
import { selectorBooks } from '../../../../redux/books/books.selector'
import { useAppDispatch } from '../../../../redux/store.redux'
import { selectFilter } from '../../../../redux/filter/filter.selector'
import { setPageFilter } from '../../../../redux/filter/filter.slice'

const Pagination: FC = () => {
    const { theme } = useSelector(selectorGeneral)
    const { books } = useSelector(selectorBooks)
    const { categoryQuery, themeQuery, titleQuery, yearQuery, pageQuery, searchQuery } = useSelector(selectFilter)
    const dispatch = useAppDispatch()
    const themeTernary = theme === ColorThemeEnum.LIGHT ? styles.light : styles.dark

    useEffect(() => {
        dispatch(setPageFilter('1'))
    }, [categoryQuery, themeQuery, titleQuery, yearQuery, searchQuery])

    return (
        <div className={styles.pgntnBlock}>
            <div className={styles.pgntnArrow + ' ' + themeTernary} onClick={() => dispatch(setPageFilter(pageQuery === '1' ? pageQuery : (+pageQuery - 1).toString()))}>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' className={themeTernary}>
                    <path d='M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z' />
                </svg>
                <span>Назад</span>
            </div>
            <div className={styles.pgntnArrow + ' ' + themeTernary} onClick={() => dispatch(setPageFilter(books.length < 6 ? pageQuery : (+pageQuery + 1).toString()))}>
                <span>Вперёд</span>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' className={themeTernary}>
                    <path d='M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z' />
                </svg>
            </div>
        </div>
    )
}

export default Pagination