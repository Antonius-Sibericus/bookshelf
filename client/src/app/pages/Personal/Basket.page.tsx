import { useState, type FC } from 'react'
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
import type { DefaultResponseType } from '../../../types/responsesTypes/defaultResponse.type'
import type { AxiosError } from 'axios'
import CreateOrderModal from './personalComponents/PersonalModal.component'

const BasketPage: FC = () => {
    const { theme, currentUser } = useSelector(selectorGeneral)
    const { basket } = useSelector(selectorBasket)
    const themeTernary = theme === ColorThemeEnum.LIGHT ? styles.light : styles.dark
    const dispatch = useAppDispatch()
    const [areYouSure, setAreYouSure] = useState<boolean>(false)

    const removeFromCart = async (tag: string) => {
        try {
            const result = await BasketService.removeFromBasket(tag)
            const response = result.data

            if (response as BooksResponseType) {
                console.log(response.message)
            }

            dispatch(fetchBasket())
        } catch (err) {
            const customErrorData: DefaultResponseType = (err as AxiosError).response?.data as DefaultResponseType
            console.error(customErrorData ? customErrorData.message : err)
        }
    }

    return (
        <section className={styles.personal}>
            {areYouSure &&
                <CreateOrderModal setAreYouSure={setAreYouSure} basket={basket} />
            }
            <div className={styles.container}>
                <div className={styles.personalHeading}>
                    <span>Корзина ({basket.length} книг{basket.length % 10 === 1 ? 'а' : basket.length % 10 === 2 ? 'и' : basket.length % 10 === 3 ? 'и' : basket.length % 10 === 4 ? 'и' : ''})</span>
                    <Link className={themeTernary} to={`/profile/${currentUser.id}`}>Вернуться в профиль</Link>
                </div>
                <div className={styles.personalContent}>
                    {basket.map(item => (
                        <PersonalCard key={item.id} {...item} remove={(bookTag: string) => removeFromCart(bookTag)} />
                    ))}
                </div>
                <button className={styles.personalButton + ' ' + themeTernary} onClick={() => setAreYouSure(prev => !prev)}>Заказать</button>
            </div>
        </section>
    )
}

export default BasketPage