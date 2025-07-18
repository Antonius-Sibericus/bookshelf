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
import CategoriesService from '../../../services/categories.service'
import type { CategoryResponseType } from '../../../../types/responsesTypes/categoryResponse.type'
import { useAppDispatch } from '../../../../redux/store.redux'
import { fetchCategories } from '../../../../redux/categoriesAndThemes/categoriesAndThemes.async'

const createCategorySchema = z.object({
    categoryTitle: z.string().nonempty({ message: 'Обязательное поле' }).max(63, { message: 'Название не может быть длиннее 63 символов' }).regex(/^[-a-zA-Zа-яёА-ЯЁ]{1,63}$/, { message: 'Название может содержать только буквы' }),
    categoryTag: z.string().nonempty({ message: 'Обязательное поле' }).max(63, { message: 'Тэг не может быть длиннее 63 символов' }).regex(/^[-a-zA-Z]{1,63}$/, { message: 'Тэг может содержать только латинские буквы' }),
})

type CreateCategoryValuesType = z.infer<typeof createCategorySchema>

const CreateCategory: FC = () => {
    const { theme } = useSelector(selectorGeneral)
    const themeTernary = theme === ColorThemeEnum.LIGHT ? styles.light : styles.dark
    const dispatch = useAppDispatch()

    const [created, setCreated] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<CreateCategoryValuesType>({
        resolver: zodResolver(createCategorySchema)
    })

    useEffect(() => {
        const getCategories = async () => {
            dispatch(
                fetchCategories()
            )
        }
        getCategories()
    }, [created])

    const onSubmit: SubmitHandler<CreateCategoryValuesType> = async data => {
        try {
            const result = await CategoriesService.createCategory(data.categoryTitle, data.categoryTag)
            const response = result.data

            if (response as CategoryResponseType) {
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
            <label htmlFor='categoryTitle' className={styles.workshopLabel + ' ' + themeTernary}>Создать категорию</label>
            <input
                {...register('categoryTitle')}
                placeholder='Заголовок категории'
                type='text'
                id='categoryTitle'
                name='categoryTitle'
                className={styles.workshopInput + ' ' + themeTernary}
                style={errors.categoryTitle ? { 'borderColor': 'red' } : {}}
            />
            {errors.categoryTitle && <span className={styles.workshopError}>{errors.categoryTitle.message}</span>}
            <input
                {...register('categoryTag')}
                placeholder='Тэг категории (например, textbook)'
                type='text'
                id='categoryTag'
                name='categoryTag'
                className={styles.workshopInput + ' ' + themeTernary}
                style={errors.categoryTag ? { 'borderColor': 'red' } : {}}
            />
            {errors.categoryTag && <span className={styles.workshopError}>{errors.categoryTag.message}</span>}
            {errors.root && <div className={styles.mainError}>{errors.root.message}</div>}
            {!errors.root && created && <div className={styles.mainSuccess} onClick={() => setCreated(null)}>{created} (закрыть)</div>}
            <button className={styles.workshopButton + ' ' + themeTernary}>{isSubmitting ? 'Загрузка...' : 'Добавить категорию'}</button>
        </form>
    )
}

export default CreateCategory