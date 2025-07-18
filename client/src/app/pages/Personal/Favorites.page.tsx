import type { FC } from 'react'
import styles from './personal.module.scss'
import { Link } from 'react-router-dom'
import PersonalCard from '../../components/personalCard/PersonalCard.component'
import { useSelector } from 'react-redux'
import { selectorGeneral } from '../../../redux/general/general.selector'
import { ColorThemeEnum } from '../../../redux/general/general.types'
import { selectorFavorites } from '../../../redux/favorites/favorites.selector'
import { useAppDispatch } from '../../../redux/store.redux'
import FavoritesService from '../../services/favorites.service'
import type { BookResponseType } from '../../../types/responsesTypes/bookResponse.type'
import { fetchFavorites } from '../../../redux/favorites/favorites.async'
import type { DefaultResponseType } from '../../../types/responsesTypes/defaultResponse.type'
import type { AxiosError } from 'axios'

const FavoritesPage: FC = () => {
    const { theme, currentUser } = useSelector(selectorGeneral)
    const { favorites } = useSelector(selectorFavorites)
    const themeTernary = theme === ColorThemeEnum.LIGHT ? styles.light : styles.dark
    const dispath = useAppDispatch()

    const removeFromFav = async (tag: string) => {
        try {
            const result = await FavoritesService.removeFavorite(tag)
            const response = result.data

            if (response as BookResponseType) {
                console.log(response.message)
            }

            dispath(fetchFavorites())
        } catch (err) {
            const customErrorData: DefaultResponseType = (err as AxiosError).response?.data as DefaultResponseType
            console.error(customErrorData ? customErrorData.message : err)
        }
    }

    return (
        <section className={styles.personal}>
            <div className={styles.container}>
                <div className={styles.personalHeading}>
                    <span>Избранное</span>
                    <Link className={themeTernary} to={`/profile/${currentUser.id}`}>Вернуться в профиль</Link>
                </div>
                <div className={styles.personalContent}>
                    {favorites.map(item => (
                        <PersonalCard key={item.id} {...item} remove={(bookTag: string) => removeFromFav(bookTag)} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FavoritesPage