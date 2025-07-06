import type { FC } from 'react'
import styles from './auth.module.scss'
import { useSelector } from 'react-redux'
import { selectorGeneral } from '../../../redux/general/general.selector'
import { Link } from 'react-router-dom'
import { ColorThemeEnum } from '../../../redux/general/general.types'

const LoginPage: FC = () => {
    const { theme } = useSelector(selectorGeneral)
    const themeTernary = theme === ColorThemeEnum.LIGHT ? styles.light : styles.dark

    return (
        <section className={styles.auth}>
            <div className={styles.container}>
                <div className={styles.authHeading + ' ' + themeTernary}>
                    Вход
                </div>
                <div className={styles.authForm}>
                    <div className={styles.authGroup}>
                        <label htmlFor="email" className={styles.authLabel + ' ' + themeTernary}>
                            Электронная почта
                        </label>
                        <input type="text" id='email' name='email' className={styles.authInput + ' ' + themeTernary} />
                    </div>
                    <div className={styles.authGroup}>
                        <label htmlFor="password" className={styles.authLabel + ' ' + themeTernary}>
                            Пароль
                        </label>
                        <input type="text" id='password' name='password' className={styles.authInput + ' ' + themeTernary} />
                    </div>
                    <button className={styles.authButton + ' ' + themeTernary}>Войти</button>
                    <p className={styles.authLink + ' ' + themeTernary}>Ещё нет аккаунта? <Link className={themeTernary} to='/signup'>Зарегистрируйтесь</Link></p>
                </div>
            </div>
        </section>
    )
}

export default LoginPage