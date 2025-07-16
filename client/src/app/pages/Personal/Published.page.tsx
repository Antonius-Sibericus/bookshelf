import { useEffect, type FC } from 'react'
import styles from './personal.module.scss'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectorGeneral } from '../../../redux/general/general.selector'
import { ColorThemeEnum } from '../../../redux/general/general.types'
import PersonalCard from '../../components/personalCard/PersonalCard.component'
import { selectorPublished } from '../../../redux/published/published.selector'
import { useAppDispatch } from '../../../redux/store.redux'
import { fetchPublished } from '../../../redux/published/published.async'
import { fetchCategories, fetchThemes } from '../../../redux/categoriesAndThemes/categoriesAndThemes.async'
import BooksService from '../../services/books.service'
import type { BookResponseType } from '../../../types/responsesTypes/bookResponse.type'
import { fetchFavorites } from '../../../redux/favorites/favorites.async'
import { fetchBasket } from '../../../redux/basket/basket.async'

const PublishedPage: FC = () => {
    const { theme, currentUser } = useSelector(selectorGeneral)
    const { published } = useSelector(selectorPublished)
    const dispatch = useAppDispatch()
    const themeTernary = theme === ColorThemeEnum.LIGHT ? styles.light : styles.dark

    useEffect(() => {
        dispatch(fetchPublished())
        dispatch(fetchCategories())
        dispatch(fetchThemes())
    }, [])

    // const deleteBook = async (tag: string) => {
    //     try {
    //         const result = await BooksService.deleteBook(tag)
    //         const response = result.data

    //         if (response as BookResponseType) {
    //             console.log('dccdcdc')
    //         }

    //         dispatch(fetchPublished())
    //         dispatch(fetchFavorites())
    //         dispatch(fetchBasket())
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    return (
        <section className={styles.personal}>
            <div className={styles.container}>
                <div className={styles.personalHeading}>
                    <span>Опубликованное</span>
                    <Link className={themeTernary} to={`/profile/${currentUser.id}`}>Вернуться в профиль</Link>
                </div>
                <div className={styles.personalContent}>
                    {published.map(item => (
                        <PersonalCard key={item.id} {...item} />
                        // <PersonalCard key={item.id} {...item} remove={(bookTag: string) => deleteBook(bookTag)} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PublishedPage