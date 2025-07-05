import type { FC } from 'react'
import Header from './Header/Header.component'
import Footer from './Footer/Footer.component'
import { Outlet } from 'react-router-dom'
import styles from './layout.module.scss'
import { useSelector } from 'react-redux'
import { selectorColorTheme } from '../../../redux/colorTheme/colorTheme.selector'
import { ColorThemeEnum } from '../../../redux/colorTheme/colorTheme.types'

const Layout: FC = () => {
    const { theme } = useSelector(selectorColorTheme)

    return (
        <div className={styles.wrapper + ' ' + (theme === ColorThemeEnum.LIGHT ? styles.light : styles.dark)}>
            <Header theme={theme} />
            <div className={styles.content}>
                <Outlet />
            </div>
            <Footer theme={theme} />
        </div>
    )
}

export default Layout