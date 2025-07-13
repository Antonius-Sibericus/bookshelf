import { type FC } from 'react'
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

const changeUserSchema = z.object({
    surname: z.string().nonempty({ message: 'Обязательное поле' }).max(63, { message: 'Фамилия не может быть длиннее 63 символов' }).regex(/^[a-zA-Zа-яА-Я]{1,63}$/, { message: 'Фамилия может содержать только буквы' }),
    name: z.string().nonempty({ message: 'Обязательное поле' }).max(63, { message: 'Имя не может быть длиннее 63 символов' }).regex(/^[a-zA-Zа-яА-Я]{1,63}$/, { message: 'Имя может содержать только буквы' }),
    paternal: z.string().optional(),
    password: z.string().nonempty({ message: 'Обязательное поле' }).min(6, { message: 'Пароль не может быть короче 6 символов' }).max(12, { message: 'Пароль не может быть длиннее 12 символов' }).regex(/^[a-zA-Z0-9#$%&*@]{6,12}$/, { message: 'Пароль может содержать цифры, латинские буквы и специальные символы' }),
    repeatPassword: z.string().nonempty({ message: 'Обязательное поле' }).min(6, { message: 'Пароль не может быть короче 6 символов' }).max(12, { message: 'Пароль не может быть длиннее 12 символов' }).regex(/^[a-zA-Z0-9#$%&*@]{6,12}$/, { message: 'Пароль может содержать цифры, латинские буквы и специальные символы' }),
    role: z.enum(UserRoles)
}).refine(data => data.password === data.repeatPassword, { message: 'Пароли должны совпадать', path: ['repeatPassword'] })

type ChangeUserValuesType = z.infer<typeof changeUserSchema>

const ProfilePage: FC = () => {
    const { theme, currentUser } = useSelector(selectorGeneral)
    const themeTernary = theme === ColorThemeEnum.LIGHT ? styles.light : styles.dark
    const dispatch = useAppDispatch()

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
                dispatch(
                    fetchCurrentUser(response.user.id)
                )
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
            <div className={styles.container}>
                <div className={styles.profileHeading + ' ' + themeTernary}>
                    <span>Добро пожаловать, {currentUser.name} {currentUser.paternal}!</span>
                    <a className={themeTernary} onClick={logout}>Выйти</a>
                </div>
                <div className={styles.profileContainer}>
                    <form className={styles.profileForm} onSubmit={handleSubmit(onSubmitInfo)}>
                        <div className={styles.profileGroup}>
                            <label htmlFor="surname" className={styles.profileLabel + ' ' + themeTernary}>
                                Фамилия
                            </label>
                            <input
                                {...register('surname')}
                                // defaultValue={user.surname}
                                type="text"
                                id='surname'
                                name='surname'
                                className={styles.profileInput + ' ' + themeTernary}
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
                                // defaultValue={user.name}
                                type="text"
                                id='name'
                                name='name'
                                className={styles.profileInput + ' ' + themeTernary}
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
                                // defaultValue={user.paternal}
                                type="text"
                                id='paternal'
                                name='paternal'
                                className={styles.profileInput + ' ' + themeTernary}
                                style={errors.paternal ? { 'borderColor': 'red' } : {}}
                            />
                            {errors.paternal && <span className={styles.profileError}>{errors.paternal.message}</span>}
                        </div>
                        <div className={styles.profileGroup}>
                            <label htmlFor="password" className={styles.profileLabel + ' ' + themeTernary}>
                                Пароль
                            </label>
                            <input
                                {...register('password')}
                                type="text"
                                id='password'
                                name='password'
                                className={styles.profileInput + ' ' + themeTernary}
                                style={errors.password ? { 'borderColor': 'red' } : {}}
                            />
                            {errors.password && <span className={styles.profileError}>{errors.password.message}</span>}
                        </div>
                        <div className={styles.profileGroup}>
                            <label htmlFor="repeatPassword" className={styles.profileLabel + ' ' + themeTernary}>
                                Повторите пароль
                            </label>
                            <input
                                {...register('repeatPassword')}
                                type="text"
                                id='repeatPassword'
                                name='repeatPassword'
                                className={styles.profileInput + ' ' + themeTernary}
                                style={errors.repeatPassword ? { 'borderColor': 'red' } : {}}
                            />
                            {errors.repeatPassword && <span className={styles.profileError}>{errors.repeatPassword.message}</span>}
                        </div>
                        <div className={styles.profileGroup}>
                            <label htmlFor="role" className={styles.profileLabel + ' ' + themeTernary}>
                                Ваша роль на сайте
                            </label>
                            <select
                                {...register('role')}
                                name="role"
                                id="role"
                                className={styles.profileSelect + ' ' + themeTernary}
                                style={errors.role ? { 'borderColor': 'red' } : {}}
                            >
                                {(Object.keys(UserRoles)).map((item) => (
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
                        <button
                            type='submit'
                            className={styles.profileButton + ' ' + themeTernary}
                        >
                            {isSubmitting ? 'Данные обрабатываются...' : 'Сохранить профиль'}
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
                </div>
            </div>
        </section>
    )
}

export default ProfilePage