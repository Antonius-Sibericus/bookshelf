import { type FC } from 'react'
import { useSelector } from 'react-redux'
import { selectorGeneral } from '../../../redux/general/general.selector'
import { Link, useNavigate } from 'react-router-dom'
import { ColorThemeEnum } from '../../../redux/general/general.types'
import styles from './auth.module.scss'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import AuthService from '../../services/auth.service'
import type { AuthResponseType } from '../../../types/responsesTypes/authResponse.type'
import { useAppDispatch } from '../../../redux/store.redux'
import { setSignedUp } from '../../../redux/general/general.slice'
import type { DefaultResponseType } from '../../../types/responsesTypes/defaultResponse.type'
import type { AxiosError } from 'axios'
import { fetchCurrentUser } from '../../../redux/general/general.async'

const loginSchema = z.object({
    email: z.email({ message: 'Введите почтовый адрес в корректном формате' }).max(63, { message: 'Почтовый адрес не должен быть длиннее 63 символов' }),
    password: z.string().nonempty({ message: 'Обязательное поле' }).min(6, { message: 'Пароль не должен быть короче 6 символов' }).max(12, { message: 'Пароль не должен быть длиннее 12 символов' }).regex(/^[a-zA-Z0-9#$%&*@]{6,12}$/, { message: 'Пароль может содержать цифры, латинские буквы и специальные символы' })
})

type LoginValuesType = z.infer<typeof loginSchema>

const LoginPage: FC = () => {
    const { theme } = useSelector(selectorGeneral)
    const themeTernary = theme === ColorThemeEnum.LIGHT ? styles.light : styles.dark
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

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
            const result = await AuthService.login(data.email, data.password)
            const response = result.data
            if (response as AuthResponseType) {
                if (response.accessToken) {
                    localStorage.setItem('accessToken', response.accessToken)
                } else {
                    throw new Error('Токен доступа не получен')
                }
                
                const userId: string = response.user.id
                
                if (userId) {
                    dispatch(fetchCurrentUser(userId))
                    localStorage.setItem('userId', JSON.stringify(userId))
                    dispatch(setSignedUp(true))
                    
                    navigate('/')
                }
            }
        } catch (err) {
            console.log(err)
            const customErrorData: DefaultResponseType = (err as AxiosError).response?.data as DefaultResponseType
            setError('root', {
                message: customErrorData ? customErrorData.message : 'Непредвиденная ошибка. Обратитесь в поддержку'
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
                    <div className={styles.authGroup}>
                        <label htmlFor='email' className={styles.authLabel + ' ' + themeTernary}>
                            Электронная почта
                        </label>
                        <input
                            {...register('email')}
                            type='text'
                            placeholder='Электронная почта'
                            id='email'
                            name='email'
                            className={styles.authInput + ' ' + themeTernary}
                            style={errors.email ? { 'borderColor': 'red' } : {}}
                        />
                        {errors.email && <span className={styles.authError}>{errors.email.message}</span>}
                    </div>
                    <div className={styles.authGroup}>
                        <label htmlFor='password' className={styles.authLabel + ' ' + themeTernary}>
                            Пароль
                        </label>
                        <input
                            {...register('password')}
                            type='password'
                            placeholder='Пароль'
                            id='password'
                            name='password'
                            className={styles.authInput + ' ' + themeTernary}
                            style={errors.password ? { 'borderColor': 'red' } : {}}
                        />
                        {errors.password && <span className={styles.authError}>{errors.password.message}</span>}
                    </div>
                    {errors.root && <div className={styles.mainError}>{errors.root.message}</div>}
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