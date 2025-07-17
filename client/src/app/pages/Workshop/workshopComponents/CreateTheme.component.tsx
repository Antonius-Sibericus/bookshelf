import { useEffect, useState, type FC } from 'react'
import styles from '../workshop.module.scss'
import { z } from 'zod'
import { useSelector } from 'react-redux'
import { selectorGeneral } from '../../../../redux/general/general.selector'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ColorThemeEnum } from '../../../../redux/general/general.types'
import type { DefaultResponseType } from '../../../../types/responsesTypes/defaultResponse.type'
import type { AxiosError } from 'axios'
import ThemesService from '../../../services/themes.service'
import type { ThemeResponseType } from '../../../../types/responsesTypes/themeResponse.type'
import { useAppDispatch } from '../../../../redux/store.redux'
import { fetchThemes } from '../../../../redux/categoriesAndThemes/categoriesAndThemes.async'
import { selectorCategoriesAndThemes } from '../../../../redux/categoriesAndThemes/categoriesAndThemes.selector'

const createThemeSchema = z.object({
    themeTitle: z.string().nonempty({ message: 'Обязательное поле' }).max(63, { message: 'Название не может быть длиннее 63 символов' }).regex(/^[-a-zA-Zа-яёА-ЯЁ]{1,63}$/, { message: 'Название может содержать только буквы' }),
    themeTag: z.string().nonempty({ message: 'Обязательное поле' }).max(63, { message: 'Тэг не может быть длиннее 63 символов' }).regex(/^[-a-zA-Z]{1,63}$/, { message: 'Тэг может содержать только латинские буквы' }),
    categoryTag: z.string()
})

type CreateThemeValuesType = z.infer<typeof createThemeSchema>

const CreateTheme: FC = () => {
    const { theme } = useSelector(selectorGeneral)
    const { categories } = useSelector(selectorCategoriesAndThemes)
    const themeTernary = theme === ColorThemeEnum.LIGHT ? styles.light : styles.dark
    const dispatch = useAppDispatch()

    const [created, setCreated] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<CreateThemeValuesType>({
        resolver: zodResolver(createThemeSchema)
    })

    useEffect(() => {
        const getThemes = async () => {
            dispatch(
                fetchThemes()
            )
        }
        getThemes()
    }, [created])

    const onSubmit: SubmitHandler<CreateThemeValuesType> = async data => {
        try {
            const result = await ThemesService.createTheme(data.themeTitle, data.themeTag, data.categoryTag.toString())
            const response = result.data

            if (response as ThemeResponseType) {
                setCreated(response.message)
            }
        } catch (err) {
            const customErrorData: DefaultResponseType = (err as AxiosError).response!.data as DefaultResponseType
            setError('root', {
                message: customErrorData ? customErrorData.message : 'Непредвиденная ошибка. Обратитесь в поддержку'
            })
        }
    }

    return (
        <form className={styles.workshopCreateItem} onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="categoryTag" className={styles.workshopLabel + ' ' + themeTernary}>Создать тему</label>
            <select
                {...register('categoryTag')}
                name="categoryTag"
                id="categoryTag"
                className={styles.workshopSelect + ' ' + themeTernary}
            >
                {categories.map(item => (
                    <option key={item.id} value={item.tag} className={styles.workshopOption + ' ' + themeTernary}>{item.title}</option>
                ))
                }
            </select>
            <input
                {...register('themeTitle')}
                placeholder='Заголовок темы'
                type="text"
                id='themeTitle'
                name='themeTitle'
                className={styles.workshopInput + ' ' + themeTernary}
                style={errors.themeTitle ? { 'borderColor': 'red' } : {}}
            />
            {errors.themeTitle && <span className={styles.workshopError}>{errors.themeTitle.message}</span>}
            <input
                {...register('themeTag')}
                placeholder='Тэг темы (например, biology)'
                type="text"
                id='themeTag'
                name='themeTag'
                className={styles.workshopInput + ' ' + themeTernary}
                style={errors.themeTag ? { 'borderColor': 'red' } : {}}
            />
            {errors.themeTag && <span className={styles.workshopError}>{errors.themeTag.message}</span>}
            {errors.root && <div className={styles.mainError}>{errors.root.message}</div>}
            {!errors.root && created && <div className={styles.mainSuccess} onClick={() => setCreated(null)}>{created} (закрыть)</div>}
            <button className={styles.workshopButton + ' ' + themeTernary}>{isSubmitting ? 'Загрузка...' : 'Добавить тему'}</button>
        </form>
    )
}

export default CreateTheme