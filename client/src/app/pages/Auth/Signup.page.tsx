import type { FC } from 'react'
import styles from './auth.module.scss'
import { useSelector } from 'react-redux'
import { selectorGeneral } from '../../../redux/general/general.selector'
import { ColorThemeEnum } from '../../../redux/general/general.types'
import { UserRoles, UserRolesTranslations } from '../../../types/user-roles.enum'
import { Link } from 'react-router-dom'

const SignupPage: FC = () => {
    const { theme } = useSelector(selectorGeneral)
    const themeTernary = theme === ColorThemeEnum.LIGHT ? styles.light : styles.dark

    return (
        <section className={styles.auth}>
            <div className={styles.container}>
                <div className={styles.authHeading + ' ' + themeTernary}>
                    Регистрация
                </div>
                <div className={styles.authForm}>
                    <div className={styles.authGroup}>
                        <label htmlFor="surname" className={styles.authLabel + ' ' + themeTernary}>
                            Фамилия
                        </label>
                        <input type="text" id='surname' name='surname' className={styles.authInput + ' ' + themeTernary} />
                    </div>
                    <div className={styles.authGroup}>
                        <label htmlFor="name" className={styles.authLabel + ' ' + themeTernary}>
                            Имя
                        </label>
                        <input type="text" id='name' name='name' className={styles.authInput + ' ' + themeTernary} />
                    </div>
                    <div className={styles.authGroup}>
                        <label htmlFor="paternal" className={styles.authLabel + ' ' + themeTernary}>
                            Отчество (если есть)
                        </label>
                        <input type="text" id='paternal' name='paternal' className={styles.authInput + ' ' + themeTernary} />
                    </div>
                    <div className={styles.authGroup}>
                        <label htmlFor="email" className={styles.authLabel + ' ' + themeTernary}>
                            Электронная почта
                        </label>
                        <input type="email" id='email' name='email' className={styles.authInput + ' ' + themeTernary} />
                    </div>
                    <div className={styles.authGroup}>
                        <label htmlFor="password" className={styles.authLabel + ' ' + themeTernary}>
                            Пароль
                        </label>
                        <input type="password" id='password' name='password' className={styles.authInput + ' ' + themeTernary} />
                    </div>
                    <div className={styles.authGroup}>
                        <label htmlFor="repeatPassword" className={styles.authLabel + ' ' + themeTernary}>
                            Повторите пароль
                        </label>
                        <input type="password" id='repeatPassword' name='repeatPassword' className={styles.authInput + ' ' + themeTernary} />
                    </div>
                    <div className={styles.authGroup}>
                        <label htmlFor="role" className={styles.authLabel + ' ' + themeTernary}>
                            Зарегистрироваться как: (можно поменять в любое время)
                        </label>
                        <select name="role" id="role" className={styles.authSelect + ' ' + themeTernary}>
                            {(Object.keys(UserRoles).filter((item) => item !== 'VISITOR')).map((item) => (
                                <option key={item} value={item} className={styles.authOption + ' ' + themeTernary}>{(Object(UserRolesTranslations))[item]}</option>
                            ))}
                        </select>
                    </div>
                    <button className={styles.authButton + ' ' + themeTernary}>Зарегистрироваться</button>
                    <p className={styles.authLink + ' ' + themeTernary}>Уже есть аккаунт? <Link className={themeTernary} to='/login'>Войдите</Link></p>
                </div>
            </div>
        </section>
    )
}

export default SignupPage