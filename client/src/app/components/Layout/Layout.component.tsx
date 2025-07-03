import type { FC } from 'react'
import Header from './Header/Header.component'
import Footer from './Footer/Footer.component'
import { Outlet } from 'react-router-dom'
import styles from './layout.module.scss'

const Layout: FC = () => {
    return (
        <div className={styles.wrapper}>
            <Header />
            <div className={styles.content}>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Layout