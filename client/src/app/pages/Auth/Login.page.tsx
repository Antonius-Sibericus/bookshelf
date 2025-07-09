import { type FC } from 'react'
import { useSelector } from 'react-redux'
import { selectorGeneral } from '../../../redux/general/general.selector'
import { Link } from 'react-router-dom'
import { ColorThemeEnum } from '../../../redux/general/general.types'

import styles from './auth.module.scss'

import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const loginSchema = z.object({
    email: z.email({ message: 'Введите почтовый адрес в корректном формате' }).max(63, { message: 'Почтовый адрес не должен быть длиннее 63 символов' }),
    password: z.string().nonempty({ message: 'Обязательное поле' }).min(6, { message: 'Пароль не должен быть короче 6 символов' }).max(12, { message: 'Пароль не должен быть длиннее 12 символов' }).regex(/^[a-zA-Z0-9#$%&*@]{6,12}$/, { message: 'Пароль может содержать цифры, латинские буквы и специальные символы' })
})

type LoginValuesType = z.infer<typeof loginSchema>

const LoginPage: FC = () => {
    const { theme } = useSelector(selectorGeneral)
    const themeTernary = theme === ColorThemeEnum.LIGHT ? styles.light : styles.dark

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<LoginValuesType>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit: SubmitHandler<LoginValuesType> = async data => {
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
                    Вход
                </div>
                <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
                    {errors.root && <span>{errors.root.message}</span>}
                    <div className={styles.authGroup}>
                        <label htmlFor="email" className={styles.authLabel + ' ' + themeTernary}>
                            Электронная почта
                        </label>
                        <input
                            {...register('email')}
                            type="text"
                            placeholder='Электронная почта'
                            id='email'
                            name='email'
                            className={styles.authInput + ' ' + themeTernary}
                            style={errors.email ? {'borderColor': 'red'} : {}}
                        />
                        {errors.email && <span className={styles.authError}>{errors.email.message}</span>}
                    </div>
                    <div className={styles.authGroup}>
                        <label htmlFor="password" className={styles.authLabel + ' ' + themeTernary}>
                            Пароль
                        </label>
                        <input
                            {...register('password')}
                            type="password"
                            placeholder='Пароль'
                            id='password'
                            name='password'
                            className={styles.authInput + ' ' + themeTernary}
                            style={errors.password ? {'borderColor': 'red'} : {}}
                        />
                        {errors.password && <span className={styles.authError}>{errors.password.message}</span>}
                    </div>
                    <button className={styles.authButton + ' ' + themeTernary} disabled={isSubmitting}>
                        {isSubmitting ? 'В процессе...' : 'Войти'}
                    </button>
                    <p className={styles.authLink + ' ' + themeTernary}>Ещё нет аккаунта? <Link className={themeTernary} to='/signup'>Зарегистрируйтесь</Link></p>
                </form>
            </div>
        </section>
    )
}

export default LoginPage