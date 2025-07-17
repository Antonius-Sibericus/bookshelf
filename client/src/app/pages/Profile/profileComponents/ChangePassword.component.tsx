import { useState, type FC } from 'react'
import styles from '../profile.module.scss'
import { useSelector } from 'react-redux'
import { selectorGeneral } from '../../../../redux/general/general.selector'
import { ColorThemeEnum } from '../../../../redux/general/general.types'
import AuthService from '../../../services/auth.service'
import type { DefaultResponseType } from '../../../../types/responsesTypes/defaultResponse.type'
import { z } from 'zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { AxiosError } from 'axios'
import type { UserResponseType } from '../../../../types/responsesTypes/userResponse.type'

const changePasswordSchema = z.object({
    password: z.string().nonempty({ message: 'Обязательное поле' }).min(6, { message: 'Пароль не может быть короче 6 символов' }).max(12, { message: 'Пароль не может быть длиннее 12 символов' }).regex(/^[a-zA-Z0-9#$%&*@]{6,12}$/, { message: 'Пароль может содержать цифры, латинские буквы и специальные символы' }),
    repeatPassword: z.string().nonempty({ message: 'Обязательное поле' }).min(6, { message: 'Пароль не может быть короче 6 символов' }).max(12, { message: 'Пароль не может быть длиннее 12 символов' }).regex(/^[a-zA-Z0-9#$%&*@]{6,12}$/, { message: 'Пароль может содержать цифры, латинские буквы и специальные символы' }),
}).refine(data => data.password === data.repeatPassword, { message: 'Пароли должны совпадать', path: ['repeatPassword'] })

type ChangePasswordValuesType = z.infer<typeof changePasswordSchema>

const ChangePassword: FC = () => {
    const { theme, currentUser } = useSelector(selectorGeneral)

    const [userPasswordEdit, setUserPasswordEdit] = useState<boolean>(false)
    const [updated, setUpdated] = useState<string | null>(null)

    const themeTernary = theme === ColorThemeEnum.LIGHT ? styles.light : styles.dark
    const disabledeTernary = userPasswordEdit ? '' : styles.disabled

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<ChangePasswordValuesType>({
        resolver: zodResolver(changePasswordSchema)
    })

    const onSubmitPassword: SubmitHandler<ChangePasswordValuesType> = async data => {
        try {
            const result = await AuthService.changePassword(currentUser.id, data.password)
            const response = result.data

            if (response as UserResponseType) {
                setUpdated(response.message)
            }
        } catch (err) {
            const customErrorData: DefaultResponseType = (err as AxiosError).response!.data as DefaultResponseType
            setError('root', {
                message: customErrorData ? customErrorData.message : 'Непредвиденная ошибка. Обратитесь в поддержку'
            })
        }
    }

    return (
        <form className={styles.profilePassword} onSubmit={handleSubmit(onSubmitPassword)}>
            <div className={styles.profileGroup}>
                <label htmlFor="password" className={styles.profileLabel + ' ' + themeTernary}>
                    Пароль
                </label>
                <input
                    {...register('password')}
                    type="password"
                    id='password'
                    name='password'
                    className={styles.profileInput + ' ' + themeTernary + ' ' + disabledeTernary}
                    style={errors.password ? { 'borderColor': 'red' } : {}}
                    disabled={userPasswordEdit ? false : true}
                />
                {errors.password && <span className={styles.profileError}>{errors.password.message}</span>}
            </div>
            <div className={styles.profileGroup}>
                <label htmlFor="repeatPassword" className={styles.profileLabel + ' ' + themeTernary}>
                    Повторите пароль
                </label>
                <input
                    {...register('repeatPassword')}
                    type="password"
                    id='repeatPassword'
                    name='repeatPassword'
                    className={styles.profileInput + ' ' + themeTernary + ' ' + disabledeTernary}
                    style={errors.repeatPassword ? { 'borderColor': 'red' } : {}}
                    disabled={userPasswordEdit ? false : true}
                />
                {errors.repeatPassword && <span className={styles.profileError}>{errors.repeatPassword.message}</span>}
            </div>
            {errors.root && <div className={styles.mainError}>{errors.root.message}</div>}
            {!errors.root && updated && <div className={styles.mainSuccess} onClick={() => setUpdated(null)}>{updated} (закрыть)</div>}
            {userPasswordEdit &&
                <button
                    type='submit'
                    className={styles.profileButton + ' ' + themeTernary}
                >
                    {isSubmitting ? 'Данные обрабатываются...' : 'Сохранить пароль'}
                </button>
            }
            <button
                type='button'
                className={styles.profileButton + ' ' + themeTernary}
                onClick={() => setUserPasswordEdit(prev => !prev)}
            >
                {userPasswordEdit ? 'Готово' : 'Изменить пароль'}
            </button>
        </form>
    )
}

export default ChangePassword