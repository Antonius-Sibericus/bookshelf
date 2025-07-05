import type { FC } from 'react'
import Header from './Header/Header.component'
import Footer from './Footer/Footer.component'
import { Outlet } from 'react-router-dom'
import styles from './layout.module.scss'
import { useSelector } from 'react-redux'
import { selectorGeneral } from '../../../redux/general/general.selector'
import { ColorThemeEnum } from '../../../redux/general/general.types'

const Layout: FC = () => {
    const { theme } = useSelector(selectorGeneral)

    return (
        <div className={styles.wrapper + ' ' + (theme === ColorThemeEnum.LIGHT ? styles.light : styles.dark)}>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout