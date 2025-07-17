import { useEffect, useState, type FC } from 'react'
import styles from './bookEdit.module.scss'
import { ColorThemeEnum } from '../../../redux/general/general.types'
import { selectorGeneral } from '../../../redux/general/general.selector'
import { useSelector } from 'react-redux'
import { selectorCategoriesAndThemes } from '../../../redux/categoriesAndThemes/categoriesAndThemes.selector'
import { useForm, type SubmitHandler } from 'react-hook-form'
import type { DefaultResponseType } from '../../../types/responsesTypes/defaultResponse.type'
import type { AxiosError } from 'axios'
import { useAppDispatch } from '../../../redux/store.redux'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import BooksService from '../../services/books.service'
import { useParams } from 'react-router-dom'
import type { BookResponseType } from '../../../types/responsesTypes/bookResponse.type'
import type { BookType } from '../../../types/entitiesTypes/book.type'

const updateBookSchema = z.object({
    heading: z.string().nonempty({ message: 'Обязательное поле' }).max(63, { message: 'Название не может быть длиннее 63 символов' }).regex(/^[-.,a-zA-Zа-яёА-ЯЁ\s0-9]{1,63}$/, { message: 'Название может содержать только буквы и цифры' }),
    author: z.string().nonempty({ message: 'Обязательное поле' }).max(63, { message: 'Имя не может быть длиннее 63 символов' }).regex(/^[a-zA-Zа-яёА-ЯЁ\s]{1,63}$/, { message: 'Имя автора может содержать только буквы' }),
    description: z.string().nonempty({ message: 'Обязательное поле' }).max(1023, { message: 'Описание не может быть длиннее 1023 символов' }).regex(/^[-.,:;a-zA-Zа-яёА-ЯЁ0-9\s]{1,1023}$/, { message: 'Описание может содержать только буквы и цифры' }),
    pages: z.number({ message: 'Обязательное поле' }).positive({ message: 'Обязательное поле' }),
    isInStock: z.boolean(),
    year: z.number({ message: 'Обязательное поле' }).positive({ message: 'Обязательное поле' }).min(1300, { message: 'Введите правильный год' }),
    isbn: z.number({ message: 'Обязательное поле' }).positive({ message: 'Обязательное поле' }),
    isSoftCover: z.boolean(),
    categoryTag: z.string().nonempty({ message: 'Обязательное поле' }).max(63, { message: 'Тэг не может быть длиннее 63 символов' }).regex(/^[a-zA-Z-]{1,63}$/, { message: 'Тэг может содержать только латинские буквы' }),
    themeTag: z.string().nonempty({ message: 'Обязательное поле' }).max(63, { message: 'Тэг не может быть длиннее 63 символов' }).regex(/^[a-zA-Z-]{1,63}$/, { message: 'Тэг может содержать только латинские буквы' }),
    image: z.instanceof(FileList)
})

type UpdateBookValuesType = z.infer<typeof updateBookSchema>

const BookEditPage: FC = () => {
    const { theme } = useSelector(selectorGeneral)
    const { categories, themes } = useSelector(selectorCategoriesAndThemes)
    const themeTernary = theme === ColorThemeEnum.LIGHT ? styles.light : styles.dark
    const [updated, setUpdated] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const params = useParams()
    const [currentBook, setCurrentBook] = useState<BookType>({} as BookType)

    const bookTag: string = params.bookTag || ''

    const {
        register,
        setValue,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<UpdateBookValuesType>({
        resolver: zodResolver(updateBookSchema),
    })

    const onSubmit: SubmitHandler<UpdateBookValuesType> = async data => {
        try {
            const result = await BooksService.updateBook(bookTag, data.heading, data.author, data.description, data.pages, data.isInStock, data.year, data.isbn, data.isSoftCover, data.categoryTag, data.themeTag, data.image[0])
            const response = result.data

            if (response as BookResponseType) {
                setUpdated(true)
            }
        } catch (err) {
            const customErrorData: DefaultResponseType = (err as AxiosError).response!.data as DefaultResponseType
            setError('root', {
                message: customErrorData ? customErrorData.message : 'Непредвиденная ошибка. Обратитесь в поддержку'
            })
        }
    }

    useEffect(() => {
        const getBook = async () => {
            if (params.bookTag) {
                const result = await BooksService.getOneBook(params.bookTag)
                const response = result.data

                if (response as BookResponseType) {
                    setCurrentBook(response.book)
                }
            }
        }

        getBook()
    }, [])

    useEffect(() => {
        setValue('heading', currentBook.heading, { shouldTouch: true, shouldDirty: true })
        setValue('author', currentBook.author, { shouldTouch: true, shouldDirty: true })
        setValue('description', currentBook.description, { shouldTouch: true, shouldDirty: true })
        setValue('pages', currentBook.pages, { shouldTouch: true, shouldDirty: true })
        setValue('year', currentBook.year, { shouldTouch: true, shouldDirty: true })
        setValue('isbn', currentBook.isbn, { shouldTouch: true, shouldDirty: true })
        setValue('categoryTag', currentBook.categoryTag, { shouldTouch: true, shouldDirty: true })
        setValue('themeTag', currentBook.themeTag, { shouldTouch: true, shouldDirty: true })
        setValue('isInStock', currentBook.isInStock, { shouldTouch: true, shouldDirty: true })
        setValue('isSoftCover', currentBook.isSoftCover, { shouldTouch: true, shouldDirty: true })

        setCat(currentBook.categoryTag)
    }, [currentBook])

    const [cat, setCat] = useState<string | null>(currentBook.categoryTag)
    const filteredThemes = cat ? themes.filter(item => item.categoryTag === cat) : themes

    return (
        <section className={styles.edit + ' ' + themeTernary}>
            <div className={styles.container}>
                <div className={styles.editHeading + ' ' + themeTernary}>Редактировать запись о книге</div>
                <form className={styles.editForm} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.editGroup}>
                        <label htmlFor="heading" className={styles.editLabel + ' ' + themeTernary}>
                            Название книги
                        </label>
                        <input
                            {...register('heading')}
                            placeholder='Наедине с собой'
                            type="text"
                            id='heading'
                            name='heading'
                            className={styles.editInput + ' ' + themeTernary}
                            style={errors.heading ? { 'borderColor': 'red' } : {}}
                        />
                        {errors.heading && <span className={styles.editError}>{errors.heading.message}</span>}
                    </div>
                    <div className={styles.editGroup}>
                        <label htmlFor="author" className={styles.editLabel + ' ' + themeTernary}>
                            Автор
                        </label>
                        <input
                            {...register('author')}
                            defaultValue={currentBook.author}
                            placeholder='Марк Аврелий Антонин'
                            type="text"
                            id='author'
                            name='author'
                            className={styles.editInput + ' ' + themeTernary}
                            style={errors.author ? { 'borderColor': 'red' } : {}}
                        />
                        {errors.author && <span className={styles.editError}>{errors.author.message}</span>}
                    </div>
                    <div className={styles.editGroup}>
                        <label htmlFor="description" className={styles.editLabel + ' ' + themeTernary}>
                            Описание
                        </label>
                        <textarea
                            {...register('description')}
                            defaultValue={currentBook.description}
                            placeholder='Философские размышления римского императора и философа'
                            id='description'
                            name='description'
                            className={styles.editInput + ' ' + themeTernary}
                            style={errors.description ? { 'borderColor': 'red' } : {}}
                        />
                        {errors.description && <span className={styles.editError}>{errors.description.message}</span>}
                    </div>
                    <div className={styles.editGroup}>
                        <label htmlFor="pages" className={styles.editLabel + ' ' + themeTernary}>
                            Число страниц
                        </label>
                        <input
                            {...register('pages',
                                {
                                    valueAsNumber: true
                                }
                            )}
                            defaultValue={currentBook.pages}
                            placeholder='519'
                            type="number"
                            id='pages'
                            name='pages'
                            className={styles.editInput + ' ' + themeTernary}
                            style={errors.pages ? { 'borderColor': 'red' } : {}}
                        />
                        {errors.pages && <span className={styles.editError}>{errors.pages.message}</span>}
                    </div>
                    <div className={styles.editGroup}>
                        <label htmlFor="year" className={styles.editLabel + ' ' + themeTernary}>
                            Год выпуска
                        </label>
                        <input
                            {...register('year',
                                {
                                    valueAsNumber: true
                                }
                            )}
                            defaultValue={currentBook.year}
                            placeholder='2025'
                            type="number"
                            id='year'
                            name='year'
                            className={styles.editInput + ' ' + themeTernary}
                            style={errors.year ? { 'borderColor': 'red' } : {}}
                        />
                        {errors.year && <span className={styles.editError}>{errors.year.message}</span>}
                    </div>
                    <div className={styles.editGroup}>
                        <label htmlFor="isbn" className={styles.editLabel + ' ' + themeTernary}>
                            ISBN
                        </label>
                        <input
                            {...register('isbn',
                                {
                                    valueAsNumber: true
                                }
                            )}
                            defaultValue={currentBook.isbn}
                            placeholder='123123123123'
                            type="number"
                            id='isbn'
                            name='isbn'
                            className={styles.editInput + ' ' + themeTernary}
                            style={errors.isbn ? { 'borderColor': 'red' } : {}}
                        />
                        {errors.isbn && <span className={styles.editError}>{errors.isbn.message}</span>}
                    </div>
                    <div className={styles.editGroup}>
                        <label htmlFor="categoryTag" className={styles.editLabel + ' ' + themeTernary}>Выбрать Категорию</label>
                        <select
                            {...register('categoryTag')}
                            onChange={(e) => setCat(e.target.value)}
                            name="categoryTag"
                            id="categoryTag"
                            className={styles.editSelect + ' ' + themeTernary}
                            style={errors.categoryTag ? { 'borderColor': 'red' } : {}}
                        >
                            <option value='' className={styles.editOption + ' ' + themeTernary}>-- Выберите --</option>
                            {categories.map(item => (
                                <option selected={currentBook.categoryTag === item.tag ? true : false} key={item.id} value={item.tag} className={styles.editOption + ' ' + themeTernary}>{item.title}</option>
                            ))
                            }
                        </select>
                        {errors.categoryTag && <span className={styles.editError}>{errors.categoryTag.message}</span>}
                    </div>
                    {
                        cat &&
                        <div className={styles.editGroup}>
                            <label htmlFor="themeTag" className={styles.editLabel + ' ' + themeTernary}>Выбрать тему</label>
                            <select
                                {...register('themeTag')}
                                name="themeTag"
                                id="themeTag"
                                className={styles.editSelect + ' ' + themeTernary}
                                style={errors.themeTag ? { 'borderColor': 'red' } : {}}
                            >
                                {filteredThemes.map(item => (
                                    <option selected={currentBook.themeTag === item.tag ? true : false} key={item.id} value={item.tag} className={styles.editOption + ' ' + themeTernary}>{item.title}</option>
                                ))
                                }
                            </select>
                            {errors.themeTag && <span className={styles.editError}>{errors.themeTag.message}</span>}
                        </div>
                    }
                    <div className={styles.checkbox}>
                        <input
                            {...register('isInStock')}
                            type="checkbox"
                            id='isInStock'
                            name='isInStock'
                            className={styles.editInput + ' ' + themeTernary}
                            style={errors.isInStock ? { 'borderColor': 'red' } : {}}
                        />
                        <label htmlFor="isInStock" className={styles.editLabel + ' ' + themeTernary}>
                            В наличии на складе
                        </label>
                        {errors.isInStock && <span className={styles.editError}>{errors.isInStock.message}</span>}
                    </div>
                    <div className={styles.checkbox}>
                        <input
                            {...register('isSoftCover')}
                            defaultChecked={currentBook.isSoftCover ? true : false}
                            type="checkbox"
                            id='isSoftCover'
                            name='isSoftCover'
                            className={styles.editInput + ' ' + themeTernary}
                            style={errors.isSoftCover ? { 'borderColor': 'red' } : {}}
                        />
                        <label htmlFor="isSoftCover" className={styles.editLabel + ' ' + themeTernary}>
                            Мягкая обложка
                        </label>
                        {errors.isSoftCover && <span className={styles.editError}>{errors.isSoftCover.message}</span>}
                    </div>
                    <div className={styles.editGroup}>
                        <label htmlFor="image" className={styles.editLabel + ' ' + themeTernary}>
                            Обложка
                        </label>
                        <input
                            {...register('image')}
                            type="file"
                            id='image'
                            name='image'
                            className={styles.editInput + ' ' + themeTernary}
                            style={errors.isSoftCover ? { 'borderColor': 'red' } : {}}
                        />
                        {errors.image && <span className={styles.editError}>{errors.image.message}</span>}
                    </div>
                    {errors.root && <div className={styles.mainError}>{errors.root.message}</div>}
                    {!errors.root && updated && <div className={styles.mainSuccess} onClick={() => setUpdated(false)}>Книга обновлена (закрыть)</div>}
                    <button
                        type='submit'
                        className={styles.editButton + ' ' + themeTernary}
                    >
                        {isSubmitting ? 'Данные обрабатываются...' : 'Обновить книгу'}
                    </button>
                </form>
            </div>
        </section>
    )
}

export default BookEditPage