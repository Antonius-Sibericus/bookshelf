import { useEffect, useState, type FC } from 'react'
import styles from '../workshop.module.scss'
import { z } from 'zod'
import { useSelector } from 'react-redux'
import { selectorGeneral } from '../../../../redux/general/general.selector'
import { selectorCategoriesAndThemes } from '../../../../redux/categoriesAndThemes/categoriesAndThemes.selector'
import { useAppDispatch } from '../../../../redux/store.redux'
import { ColorThemeEnum } from '../../../../redux/general/general.types'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { DefaultResponseType } from '../../../../types/responsesTypes/defaultResponse.type'
import type { AxiosError } from 'axios'
import { fetchCategories, fetchThemes } from '../../../../redux/categoriesAndThemes/categoriesAndThemes.async'
import BooksService from '../../../services/books.service'
import type { BookResponseType } from '../../../../types/responsesTypes/bookResponse.type'

const createBookSchema = z.object({
    heading: z.string().nonempty({ message: 'Обязательное поле' }).max(63, { message: 'Название не может быть длиннее 63 символов' }).regex(/^[a-zA-Zа-яёА-ЯЁ\s]{1,63}$/, { message: 'Название может содержать только буквы' }),
    tag: z.string().nonempty({ message: 'Обязательное поле' }).max(63, { message: 'Тэг не может быть длиннее 63 символов' }).regex(/^[a-zA-Z-]{1,63}$/, { message: 'Тэг может содержать только латинские буквы' }),
    author: z.string().nonempty({ message: 'Обязательное поле' }).max(63, { message: 'Имя не может быть длиннее 63 символов' }).regex(/^[a-zA-Zа-яёА-ЯЁ\s]{1,63}$/, { message: 'Имя автора может содержать только буквы' }),
    description: z.string().nonempty({ message: 'Обязательное поле' }).max(1023, { message: 'Описание не может быть длиннее 1023 символов' }).regex(/^[a-zA-Zа-яёА-ЯЁ0-9\s]{1,1023}$/, { message: 'Описание может содержать только буквы и цифры' }),
    pages: z.number(),
    isInStock: z.boolean(),
    year: z.number(),
    isbn: z.number(),
    isSoftCover: z.boolean(),
    categoryTag: z.string().nonempty({ message: 'Обязательное поле' }).max(63, { message: 'Тэг не может быть длиннее 63 символов' }).regex(/^[a-zA-Z-]{1,63}$/, { message: 'Тэг может содержать только латинские буквы' }),
    themeTag: z.string().nonempty({ message: 'Обязательное поле' }).max(63, { message: 'Тэг не может быть длиннее 63 символов' }).regex(/^[a-zA-Z-]{1,63}$/, { message: 'Тэг может содержать только латинские буквы' })
})

type CreateBookValuesType = z.infer<typeof createBookSchema>

const CreateBook: FC = () => {
    const { theme, currentUser } = useSelector(selectorGeneral)
    const { categories, themes } = useSelector(selectorCategoriesAndThemes)
    const [created, setCreated] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    const themeTernary = theme === ColorThemeEnum.LIGHT ? styles.light : styles.dark

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<CreateBookValuesType>({
        resolver: zodResolver(createBookSchema)
    })

    const onSubmit: SubmitHandler<CreateBookValuesType> = async data => {
        try {
            const result = await BooksService.createBook(data.heading, data.tag, data.author, data.description, data.pages, data.isInStock, data.year, data.isbn, data.isSoftCover, data.categoryTag, data.themeTag)
            const response = result.data

            if (response as BookResponseType) {
                setCreated(true)
            }
        } catch (err) {
            const customErrorData: DefaultResponseType = (err as AxiosError).response!.data as DefaultResponseType
            setError('root', {
                message: customErrorData ? customErrorData.message : 'Непредвиденная ошибка. Обратитесь в поддержку'
            })
        }
    }

    const [cat, setCat] = useState<string | null>(null)
    const filteredThemes = cat ? themes.filter(item => item.categoryTag === cat) : themes

    return (
        <form className={styles.createBookForm} onSubmit={handleSubmit(onSubmit)}>
            <h3 className={styles.workshopHeading}>Добавить книгу</h3>
            <div className={styles.createBookGroup}>
                <label htmlFor="heading" className={styles.workshopLabel + ' ' + themeTernary}>
                    Название книги
                </label>
                <input
                    {...register('heading')}
                    placeholder='Наедине с собой'
                    type="text"
                    id='heading'
                    name='heading'
                    className={styles.workshopInput + ' ' + themeTernary}
                    style={errors.heading ? { 'borderColor': 'red' } : {}}
                />
                {errors.heading && <span className={styles.workshopError}>{errors.heading.message}</span>}
            </div>
            <div className={styles.createBookGroup}>
                <label htmlFor="tag" className={styles.workshopLabel + ' ' + themeTernary}>
                    Тэг книги
                </label>
                <input
                    {...register('tag')}
                    placeholder='najedinje-s-soboj'
                    type="text"
                    id='tag'
                    name='tag'
                    className={styles.workshopInput + ' ' + themeTernary}
                    style={errors.tag ? { 'borderColor': 'red' } : {}}
                />
                {errors.tag && <span className={styles.workshopError}>{errors.tag.message}</span>}
            </div>
            <div className={styles.createBookGroup}>
                <label htmlFor="author" className={styles.workshopLabel + ' ' + themeTernary}>
                    Автор
                </label>
                <input
                    {...register('author')}
                    placeholder='Марк Аврелий Антонин'
                    type="text"
                    id='author'
                    name='author'
                    className={styles.workshopInput + ' ' + themeTernary}
                    style={errors.author ? { 'borderColor': 'red' } : {}}
                />
                {errors.author && <span className={styles.workshopError}>{errors.author.message}</span>}
            </div>
            <div className={styles.createBookGroup}>
                <label htmlFor="description" className={styles.workshopLabel + ' ' + themeTernary}>
                    Описание
                </label>
                <textarea
                    {...register('description')}
                    placeholder='Философские размышления римского императора и философа'
                    id='description'
                    name='description'
                    className={styles.workshopInput + ' ' + themeTernary}
                    style={errors.description ? { 'borderColor': 'red' } : {}}
                />
                {errors.description && <span className={styles.workshopError}>{errors.description.message}</span>}
            </div>
            <div className={styles.createBookGroup}>
                <label htmlFor="pages" className={styles.workshopLabel + ' ' + themeTernary}>
                    Число страниц
                </label>
                <input
                    {...register('pages',
                        {
                            valueAsNumber: true
                        }
                    )}
                    placeholder='519'
                    type="number"
                    id='pages'
                    name='pages'
                    className={styles.workshopInput + ' ' + themeTernary}
                    style={errors.pages ? { 'borderColor': 'red' } : {}}
                />
                {errors.pages && <span className={styles.workshopError}>{errors.pages.message}</span>}
            </div>
            <div className={styles.createBookGroup}>
                <label htmlFor="year" className={styles.workshopLabel + ' ' + themeTernary}>
                    Год выпуска
                </label>
                <input
                    {...register('year',
                        {
                            valueAsNumber: true
                        }
                    )}
                    placeholder='2025'
                    type="number"
                    id='year'
                    name='year'
                    className={styles.workshopInput + ' ' + themeTernary}
                    style={errors.year ? { 'borderColor': 'red' } : {}}
                />
                {errors.year && <span className={styles.workshopError}>{errors.year.message}</span>}
            </div>
            <div className={styles.createBookGroup}>
                <label htmlFor="isbn" className={styles.workshopLabel + ' ' + themeTernary}>
                    ISBN
                </label>
                <input
                    {...register('isbn',
                        {
                            valueAsNumber: true
                        }
                    )}
                    placeholder='123123123123'
                    type="number"
                    id='isbn'
                    name='isbn'
                    className={styles.workshopInput + ' ' + themeTernary}
                    style={errors.isbn ? { 'borderColor': 'red' } : {}}
                />
                {errors.isbn && <span className={styles.workshopError}>{errors.isbn.message}</span>}
            </div>
            <div className={styles.createBookGroup}>
                <label htmlFor="categoryTag" className={styles.workshopLabel + ' ' + themeTernary}>Выбрать Категорию</label>
                <select
                    {...register('categoryTag')}
                    onChange={(e) => setCat(e.target.value)}
                    name="categoryTag"
                    id="categoryTag"
                    className={styles.workshopSelect + ' ' + themeTernary}
                    style={errors.categoryTag ? { 'borderColor': 'red' } : {}}
                >
                    <option value='' className={styles.workshopOption + ' ' + themeTernary}>-- Выберите --</option>
                    {categories.map(item => (
                        <option key={item.id} value={item.tag} className={styles.workshopOption + ' ' + themeTernary}>{item.title}</option>
                    ))
                    }
                </select>
                {errors.categoryTag && <span className={styles.workshopError}>{errors.categoryTag.message}</span>}
            </div>
            {cat && <div className={styles.createBookGroup}>
                <label htmlFor="themeTag" className={styles.workshopLabel + ' ' + themeTernary}>Выбрать тему</label>
                <select
                    {...register('themeTag')}
                    name="themeTag"
                    id="themeTag"
                    className={styles.workshopSelect + ' ' + themeTernary}
                    style={errors.themeTag ? { 'borderColor': 'red' } : {}}
                >
                    {filteredThemes.map(item => (
                        <option key={item.id} value={item.tag} className={styles.workshopOption + ' ' + themeTernary}>{item.title}</option>
                    ))
                    }
                </select>
                {errors.themeTag && <span className={styles.workshopError}>{errors.themeTag.message}</span>}
            </div>}
            <div className={styles.checkbox}>
                <input
                    {...register('isInStock')}
                    type="checkbox"
                    id='isInStock'
                    name='isInStock'
                    className={styles.workshopInput + ' ' + themeTernary}
                    style={errors.isInStock ? { 'borderColor': 'red' } : {}}
                />
                <label htmlFor="isInStock" className={styles.workshopLabel + ' ' + themeTernary}>
                    В наличии на складе
                </label>
                {errors.isInStock && <span className={styles.workshopError}>{errors.isInStock.message}</span>}
            </div>
            <div className={styles.checkbox}>
                <input
                    {...register('isSoftCover')}
                    type="checkbox"
                    id='isSoftCover'
                    name='isSoftCover'
                    className={styles.workshopInput + ' ' + themeTernary}
                    style={errors.isSoftCover ? { 'borderColor': 'red' } : {}}
                />
                <label htmlFor="isSoftCover" className={styles.workshopLabel + ' ' + themeTernary}>
                    Мягкая обложка
                </label>
                {errors.isSoftCover && <span className={styles.workshopError}>{errors.isSoftCover.message}</span>}
            </div>
            {errors.root && <div className={styles.mainError}>{errors.root.message}</div>}
            {!errors.root && created && <div className={styles.mainSuccess} onClick={() => setCreated(false)}>Книга добавлена (закрыть)</div>}
            <button
                type='submit'
                className={styles.workshopButton + ' ' + themeTernary}
            >
                {isSubmitting ? 'Данные обрабатываются...' : 'Сохранить профиль'}
            </button>
        </form>
    )
}

export default CreateBook