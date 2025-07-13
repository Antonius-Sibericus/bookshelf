import { useState, type FC } from 'react'
import styles from './profile.module.scss'
import { UserRoles, UserRolesTranslations } from '../../../types/user-roles.enum'
import { useSelector } from 'react-redux'
import { selectorGeneral } from '../../../redux/general/general.selector'
import { ColorThemeEnum } from '../../../redux/general/general.types'
import AuthService from '../../services/auth.service'
import type { DefaultResponseType } from '../../../types/defaultResponse.type'
import { setSignedUp } from '../../../redux/general/general.slice'
import { z } from 'zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { AxiosError } from 'axios'
import UsersService from '../../services/users.service'
import type { UserResponseType } from '../../../types/responsesTypes/userResponse.type'
import { useAppDispatch } from '../../../redux/store.redux'
import { fetchCurrentUser } from '../../../redux/general/general.async'
import ChangePassword from './profileComponents/ChangePassword.component'
import DeleteUserModal from './profileComponents/DeleteUserModal.component'

const changeUserSchema = z.object({
    surname: z.string().nonempty({ message: 'Обязательное поле' }).max(63, { message: 'Фамилия не может быть длиннее 63 символов' }).regex(/^[a-zA-Zа-яА-Я]{1,63}$/, { message: 'Фамилия может содержать только буквы' }),
    name: z.string().nonempty({ message: 'Обязательное поле' }).max(63, { message: 'Имя не может быть длиннее 63 символов' }).regex(/^[a-zA-Zа-яА-Я]{1,63}$/, { message: 'Имя может содержать только буквы' }),
    paternal: z.string().optional(),
    role: z.enum(UserRoles)
})

type ChangeUserValuesType = z.infer<typeof changeUserSchema>

const ProfilePage: FC = () => {
    const { theme, currentUser } = useSelector(selectorGeneral)
    const dispatch = useAppDispatch()

    const [userInfoEdit, setUserInfoEdit] = useState<boolean>(false)
    const [areYouSure, setAreYouSure] = useState<boolean>(false)

    const themeTernary = theme === ColorThemeEnum.LIGHT ? styles.light : styles.dark
    const disabledeTernary = userInfoEdit ? '' : styles.disabled

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<ChangeUserValuesType>({
        resolver: zodResolver(changeUserSchema)
    })

    const onSubmitInfo: SubmitHandler<ChangeUserValuesType> = async data => {
        try {
            const result = await UsersService.changeUserInfo(currentUser.id, data.surname, data.name, data.paternal ? data.paternal : '', currentUser.email, data.role)
            const response = result.data

            if (response as UserResponseType) {
                const userId: string = response.user.id

                if (userId) {
                    dispatch(
                        fetchCurrentUser(response.user.id)
                    )
                }
            }
        } catch (err) {
            const customErrorData: DefaultResponseType = (err as AxiosError).response!.data as DefaultResponseType
            setError('root', {
                message: customErrorData ? customErrorData.message : 'Непредвиденная ошибка. Обратитесь в поддержку'
            })
        }
    }

    const logout = async () => {
        localStorage.removeItem('accessToken')
        dispatch(setSignedUp(false))
        try {
            const result = await AuthService.logout()
            const response = result.data

            if (response as DefaultResponseType) {
                console.log(response.message)
            }
        } catch (err) {
            console.error((err as DefaultResponseType)?.message || err)
        }
    }

    return (
        <section className={styles.profile}>
            {areYouSure &&
                <DeleteUserModal setAreYouSure={setAreYouSure} currentUser={currentUser} />
            }
            <div className={styles.container}>
                <div className={styles.profileHeading + ' ' + themeTernary}>
                    <span>Добро пожаловать, {currentUser.name} {currentUser.paternal}!</span>
                    <div>
                        <a className={themeTernary} onClick={logout}>Выйти</a>
                        <a className={styles.deleteAcc + ' ' + themeTernary} onClick={() => setAreYouSure(true)}>Удалить аккаунт</a>
                    </div>
                </div>
                <div className={styles.profileContainer}>
                    <form className={styles.profileForm} onSubmit={handleSubmit(onSubmitInfo)}>
                        <div className={styles.profileGroup}>
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
                        </div>
                        <div className={styles.profileGroup}>
                            <label htmlFor="name" className={styles.profileLabel + ' ' + themeTernary}>
                                Имя
                            </label>
                            <input
                                {...register('name')}
                                defaultValue={currentUser.name}
                                type="text"
                                id='name'
                                name='name'
                                className={styles.profileInput + ' ' + themeTernary + ' ' + disabledeTernary}
                                style={errors.name ? { 'borderColor': 'red' } : {}}
                            />
                            {errors.name && <span className={styles.profileError}>{errors.name.message}</span>}
                        </div>
                        <div className={styles.profileGroup}>
                            <label htmlFor="paternal" className={styles.profileLabel + ' ' + themeTernary}>
                                Отчество (если есть)
                            </label>
                            <input
                                {...register('paternal')}
                                defaultValue={currentUser.paternal}
                                type="text"
                                id='paternal'
                                name='paternal'
                                className={styles.profileInput + ' ' + themeTernary + ' ' + disabledeTernary}
                                style={errors.paternal ? { 'borderColor': 'red' } : {}}
                            />
                            {errors.paternal && <span className={styles.profileError}>{errors.paternal.message}</span>}
                        </div>
                        <div className={styles.profileGroup}>
                            <label htmlFor="role" className={styles.profileLabel + ' ' + themeTernary}>
                                Ваша роль на сайте
                            </label>
                            <select
                                {...register('role')}
                                name="role"
                                id="role"
                                className={styles.profileSelect + ' ' + themeTernary + ' ' + disabledeTernary}
                                style={errors.role ? { 'borderColor': 'red' } : {}}
                            >
                                {Object.keys(UserRoles).map((item) => (
                                    <option
                                        selected={currentUser.role === item ? true : false}
                                        key={item}
                                        value={item}
                                        className={styles.profileOption + ' ' + themeTernary}
                                    >
                                        {(Object(UserRolesTranslations))[item]}
                                    </option>
                                ))}
                            </select>
                            {errors.role && <span className={styles.profileError}>{errors.role.message}</span>}
                        </div>
                        {errors.root && <div className={styles.mainError}>{errors.root.message}</div>}
                        {userInfoEdit &&
                            <button
                                type='submit'
                                className={styles.profileButton + ' ' + themeTernary}
                            >
                                {isSubmitting ? 'Данные обрабатываются...' : 'Сохранить профиль'}
                            </button>
                        }
                        <button
                            type='button'
                            className={styles.profileButton + ' ' + themeTernary}
                            onClick={() => setUserInfoEdit(prev => !prev)}
                        >
                            {userInfoEdit ? 'Готово' : 'Изменить профиль'}
                        </button>
                    </form>
                    {/* <div className={styles.profilePassword}>
                        <div className={styles.profileGroup}>
                            <label htmlFor="password" className={styles.profileLabel + ' ' + themeTernary}>
                                Пароль
                            </label>
                            <input
                                type="text"
                                id='password'
                                name='password'
                                className={styles.profileInput + ' ' + themeTernary}
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
                                className={styles.profileInput + ' ' + themeTernary}
                            />
                        </div>
                        <button className={styles.profileButton + ' ' + themeTernary}>Сохранить пароль</button>
                    </div> */}
                    <ChangePassword />
                </div>
            </div>
        </section>
    )
}

export default ProfilePage