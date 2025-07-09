import { type FC } from 'react'
import styles from './auth.module.scss'
import { useSelector } from 'react-redux'
import { selectorGeneral } from '../../../redux/general/general.selector'
import { ColorThemeEnum } from '../../../redux/general/general.types'
import { UserRoles, UserRolesTranslations } from '../../../types/user-roles.enum'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'

const signupSchema = z.object({
    surname: z.string().nonempty({ message: 'Обязательное поле' }).max(63, { message: 'Фамилия не может быть длиннее 63 символов' }).regex(/^[a-zA-Zа-яА-Я]{1,63}$/, { message: 'Фамилия может содержать только буквы' }),
    name: z.string().nonempty({ message: 'Обязательное поле' }).max(63, { message: 'Имя не может быть длиннее 63 символов' }).regex(/^[a-zA-Zа-яА-Я]{1,63}$/, { message: 'Имя может содержать только буквы' }),
    paternal: z.string().optional(),
    email: z.email().max(63, { message: 'Почтовый адрес не должен быть длиннее 63 символов' }),
    password: z.string().nonempty({ message: 'Обязательное поле' }).min(6, { message: 'Пароль не может быть короче 6 символов' }).max(12, { message: 'Пароль не может быть длиннее 12 символов' }).regex(/^[a-zA-Z0-9#$%&*@]{6,12}$/, { message: 'Пароль может содержать цифры, латинские буквы и специальные символы' }),
    repeatPassword: z.string().nonempty({ message: 'Обязательное поле' }).min(6, { message: 'Пароль не может быть короче 6 символов' }).max(12, { message: 'Пароль не может быть длиннее 12 символов' }).regex(/^[a-zA-Z0-9#$%&*@]{6,12}$/, { message: 'Пароль может содержать цифры, латинские буквы и специальные символы' }),
    role: z.enum(UserRoles)
}).refine(data => data.password === data.repeatPassword, { message: 'Пароли должны совпадать', path: ['repeatPassword'] })

type SignupValuesType = z.infer<typeof signupSchema>

const SignupPage: FC = () => {
    const { theme } = useSelector(selectorGeneral)
    const themeTernary = theme === ColorThemeEnum.LIGHT ? styles.light : styles.dark

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<SignupValuesType>({
        resolver: zodResolver(signupSchema)
    })

    const onSubmit: SubmitHandler<SignupValuesType> = async data => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500))
            console.log(data)
        } catch (err) {
            setError('root', {
                message: 'Server Error'
            })
        }
    }

    return (
        <section className={styles.auth}>
            <div className={styles.container}>
                <div className={styles.authHeading + ' ' + themeTernary}>
                    Регистрация
                </div>
                <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.authGroup}>
                        <label htmlFor="surname" className={styles.authLabel + ' ' + themeTernary}>Фамилия</label>
                        <input
                            {...register('surname')}
                            type="text"
                            placeholder='Фамилия'
                            id='surname'
                            name='surname'
                            className={styles.authInput + ' ' + themeTernary}
                            style={errors.surname ? { 'borderColor': 'red' } : {}}
                        />
                        {errors.surname && <span className={styles.authError}>{errors.surname.message}</span>}
                    </div>
                    <div className={styles.authGroup}>
                        <label htmlFor="name" className={styles.authLabel + ' ' + themeTernary}>Имя</label>
                        <input
                            {...register('name')}
                            type="text"
                            placeholder='Имя'
                            id='name'
                            name='name'
                            className={styles.authInput + ' ' + themeTernary}
                            style={errors.name ? { 'borderColor': 'red' } : {}}
                        />
                        {errors.name && <span className={styles.authError}>{errors.name.message}</span>}
                    </div>
                    <div className={styles.authGroup}>
                        <label htmlFor="paternal" className={styles.authLabel + ' ' + themeTernary}>Отчество (если есть)</label>
                        <input
                            {...register('paternal')}
                            type="text"
                            placeholder='Отчество'
                            id='paternal'
                            name='paternal'
                            className={styles.authInput + ' ' + themeTernary}
                            style={errors.paternal ? { 'borderColor': 'red' } : {}}
                        />
                        {errors.paternal && <span className={styles.authError}>{errors.paternal.message}</span>}
                    </div>
                    <div className={styles.authGroup}>
                        <label htmlFor="email" className={styles.authLabel + ' ' + themeTernary}>Электронная почта</label>
                        <input
                            {...register('email')}
                            type="text"
                            placeholder='Электронная почта'
                            id='email'
                            name='email'
                            className={styles.authInput + ' ' + themeTernary}
                            style={errors.email ? { 'borderColor': 'red' } : {}}
                        />
                        {errors.email && <span className={styles.authError}>{errors.email.message}</span>}
                    </div>
                    <div className={styles.authGroup}>
                        <label htmlFor="password" className={styles.authLabel + ' ' + themeTernary}>Пароль</label>
                        <input
                            {...register('password')}
                            type="password"
                            placeholder='Пароль'
                            id='password'
                            name='password'
                            className={styles.authInput + ' ' + themeTernary}
                            style={errors.password ? { 'borderColor': 'red' } : {}}
                        />
                        {errors.password && <span className={styles.authError}>{errors.password.message}</span>}
                    </div>
                    <div className={styles.authGroup}>
                        <label htmlFor="repeatPassword" className={styles.authLabel + ' ' + themeTernary}>Повторите пароль</label>
                        <input
                            {...register('repeatPassword')}
                            type="password"
                            placeholder='Повторите пароль'
                            id='repeatPassword'
                            name='repeatPassword'
                            className={styles.authInput + ' ' + themeTernary}
                            style={errors.repeatPassword ? { 'borderColor': 'red' } : {}}
                        />
                        {errors.repeatPassword && <span className={styles.authError}>{errors.repeatPassword.message}</span>}
                    </div>
                    <div className={styles.authGroup}>
                        <label htmlFor='role' className={styles.authLabel + ' ' + themeTernary}>
                            Зарегистрироваться как: (можно поменять в любое время)
                        </label>
                        <select
                            {...register('role')}
                            name='role'
                            id='role'
                            className={styles.authSelect + ' ' + themeTernary}
                        >
                            {(Object.keys(UserRoles).filter((item) => item !== 'VISITOR')).map((item) => (
                                <option
                                    key={item}
                                    value={item}
                                    className={styles.authOption + ' ' + themeTernary}
                                >
                                    {(Object(UserRolesTranslations))[item]}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className={styles.authButton + ' ' + themeTernary} disabled={isSubmitting}>
                        {isSubmitting ? 'В процессе...' : 'Зарегистрироваться'}
                    </button>
                    <p className={styles.authLink + ' ' + themeTernary}>Уже есть аккаунт? <Link className={themeTernary} to='/login'>Войдите</Link></p>
                </form>
            </div>
        </section>
    )
}

export default SignupPage