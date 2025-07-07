import { useState, type FC } from 'react'
import styles from './profile.module.scss'
import { UserRoles, UserRolesTranslations } from '../../../types/user-roles.enum'
import { useSelector } from 'react-redux'
import { selectorGeneral } from '../../../redux/general/general.selector'
import { ColorThemeEnum } from '../../../redux/general/general.types'

const ProfilePage: FC = () => {
    const { theme } = useSelector(selectorGeneral)
    const themeTernary = theme === ColorThemeEnum.LIGHT ? styles.light : styles.dark
    const [profileUnderUpdate, setProfileUnderUpdate] = useState(false)
    const [passwordUnderUpdate, setPasswordUnderUpdate] = useState(false)
    const disabledTernary = profileUnderUpdate ? '' : styles.disabled
    const disabledPasswordTernary = passwordUnderUpdate ? '' : styles.disabled

    return (
        <section className={styles.profile}>
            <div className={styles.container}>
                <div className={styles.profileHeading + ' ' + themeTernary}>
                    Добро пожаловать, Александр Сергеевич!
                </div>
                <div className={styles.profileContainer}>
                    <div className={styles.profileForm}>
                        <div className={styles.profileGroup}>
                            <label htmlFor="surname" className={styles.profileLabel + ' ' + themeTernary}>
                                Фамилия
                            </label>
                            <input
                                defaultValue={'Пушкин'}
                                type="text"
                                id='surname'
                                name='surname'
                                className={styles.profileInput + ' ' + themeTernary + ' ' + disabledTernary}
                                disabled={profileUnderUpdate ? false : true}
                            />
                        </div>
                        <div className={styles.profileGroup}>
                            <label htmlFor="name" className={styles.profileLabel + ' ' + themeTernary}>
                                Имя
                            </label>
                            <input
                                defaultValue={'Александр'}
                                type="text"
                                id='name'
                                name='name'
                                className={styles.profileInput + ' ' + themeTernary + ' ' + disabledTernary}
                                disabled={profileUnderUpdate ? false : true}
                            />
                        </div>
                        <div className={styles.profileGroup}>
                            <label htmlFor="paternal" className={styles.profileLabel + ' ' + themeTernary}>
                                Отчество (если есть)
                            </label>
                            <input
                                defaultValue={'Сергеевич'}
                                type="text"
                                id='paternal'
                                name='paternal'
                                className={styles.profileInput + ' ' + themeTernary + ' ' + disabledTernary}
                                disabled={profileUnderUpdate ? false : true}
                            />
                        </div>
                        <div className={styles.profileGroup}>
                            <label htmlFor="email" className={styles.profileLabel + ' ' + themeTernary}>
                                Электронная почта
                            </label>
                            <input
                                defaultValue={'pas@mail.ru'}
                                type="text"
                                id='email'
                                name='email'
                                className={styles.profileInput + ' ' + themeTernary + ' ' + disabledTernary}
                                disabled={profileUnderUpdate ? false : true}
                            />
                        </div>
                        <div className={styles.profileGroup}>
                            <label htmlFor="role" className={styles.profileLabel + ' ' + themeTernary}>
                                Ваша роль на сайте
                            </label>
                            <select
                                name="role"
                                id="role"
                                className={styles.profileSelect + ' ' + themeTernary + ' ' + disabledTernary}
                                disabled={profileUnderUpdate ? false : true}
                            >
                                {(Object.keys(UserRoles).filter((item) => item !== 'VISITOR')).map((item) => (
                                    <option selected={false ? true : false} key={item} defaultValue={item} className={styles.profileOption + ' ' + themeTernary}>{(Object(UserRolesTranslations))[item]}</option>
                                ))}
                            </select>
                        </div>
                        {profileUnderUpdate ?
                            <button className={styles.profileButton + ' ' + themeTernary} onClick={() => setProfileUnderUpdate(prev => !prev)}>Сохранить профиль</button> :
                            <button className={styles.profileButton + ' ' + themeTernary} onClick={() => setProfileUnderUpdate(prev => !prev)}>Изменить профиль</button>
                        }
                    </div>
                    <div className={styles.profilePassword}>
                        <div className={styles.profileGroup}>
                            <label htmlFor="password" className={styles.profileLabel + ' ' + themeTernary}>
                                Пароль
                            </label>
                            <input
                                type="text"
                                id='password'
                                name='password'
                                className={styles.profileInput + ' ' + themeTernary + ' ' + disabledPasswordTernary}
                                disabled={passwordUnderUpdate ? false : true}
                            />
                        </div>
                        <div className={styles.profileGroup}>
                            <label htmlFor="repeatPassword" className={styles.profileLabel + ' ' + themeTernary}>
                                Повторите пароль
                            </label>
                            <input
                                type="text"
                                id='repeatPassword'
                                name='repeatPassword'
                                className={styles.profileInput + ' ' + themeTernary + ' ' + disabledPasswordTernary}
                                disabled={passwordUnderUpdate ? false : true}
                            />
                        </div>
                        {passwordUnderUpdate ?
                            <button className={styles.profileButton + ' ' + themeTernary} onClick={() => setPasswordUnderUpdate(prev => !prev)}>Сохранить пароль</button> :
                            <button className={styles.profileButton + ' ' + themeTernary} onClick={() => setPasswordUnderUpdate(prev => !prev)}>Изменить пароль</button>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProfilePage