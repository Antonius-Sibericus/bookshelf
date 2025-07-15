import type { FC } from 'react'
import styles from './bookEdit.module.scss'
import { ColorThemeEnum } from '../../../redux/general/general.types'
import { selectorGeneral } from '../../../redux/general/general.selector'
import { useSelector } from 'react-redux'

const BookEditPage: FC = () => {
    const { theme } = useSelector(selectorGeneral)
    const themeTernary = theme === ColorThemeEnum.LIGHT ? styles.light : styles.dark

    return (
        <section className={styles.edit + ' ' + themeTernary}>
            <div className={styles.container}></div>
        </section>
    )
}

export default BookEditPage