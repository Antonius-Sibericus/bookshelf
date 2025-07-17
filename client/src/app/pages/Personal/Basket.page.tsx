import type { FC } from 'react'
import styles from './personal.module.scss'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectorGeneral } from '../../../redux/general/general.selector'
import { ColorThemeEnum } from '../../../redux/general/general.types'
import PersonalCard from '../../components/personalCard/PersonalCard.component'
import { selectorBasket } from '../../../redux/basket/basket.selector'
import BasketService from '../../services/basket.service'
import type { BooksResponseType } from '../../../types/responsesTypes/booksResponse.type'
import { useAppDispatch } from '../../../redux/store.redux'
import { fetchBasket } from '../../../redux/basket/basket.async'

const BasketPage: FC = () => {
    const { theme, currentUser } = useSelector(selectorGeneral)
    const { basket } = useSelector(selectorBasket)
    const themeTernary = theme === ColorThemeEnum.LIGHT ? styles.light : styles.dark
    const dispatch = useAppDispatch()
    
    const removeFromCart = async (tag: string) => {
        const result = await BasketService.removeFromBasket(tag)
        const response = result.data

        if (response as BooksResponseType) {
            console.log(response.message)
        }

        dispatch(fetchBasket())
    }

    return (
        <section className={styles.personal}>
            <div className={styles.container}>
                <div className={styles.personalHeading}>
                    <span>Корзина</span>
                    <Link className={themeTernary} to={`/profile/${currentUser.id}`}>Вернуться в профиль</Link>
                </div>
                <div className={styles.personalContent}>
                    {basket.map(item => (
                        <PersonalCard key={item.id} {...item} remove={(bookTag: string) => removeFromCart(bookTag)} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default BasketPage