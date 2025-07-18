import { useRef, type FC } from 'react'
import styles from '../personalCard.module.scss'
import { useAppDispatch } from '../../../../redux/store.redux'
import { useSelector } from 'react-redux'
import { selectorGeneral } from '../../../../redux/general/general.selector'
import { ColorThemeEnum } from '../../../../redux/general/general.types'
import BooksService from '../../../services/books.service'
import type { BookResponseType } from '../../../../types/responsesTypes/bookResponse.type'
import { fetchPublished } from '../../../../redux/published/published.async'
import { fetchFavorites } from '../../../../redux/favorites/favorites.async'
import { fetchBasket } from '../../../../redux/basket/basket.async'
import type { DefaultResponseType } from '../../../../types/responsesTypes/defaultResponse.type'
import type { AxiosError } from 'axios'

type deleteBookModalProps = {
    setAreYouSure: (type: boolean) => void,
    tag: string
}

const DeleteBookModal: FC<deleteBookModalProps> = ({ setAreYouSure, tag }) => {
    const { theme } = useSelector(selectorGeneral)
    const themeTernary = theme === ColorThemeEnum.LIGHT ? styles.light : styles.dark
    const modal = useRef<HTMLDivElement>(null)

    const dispatch = useAppDispatch()

    const deleteBook = async () => {
        try {
            const result = await BooksService.deleteBook(tag)
            const response = result.data

            if (response as BookResponseType) {
                console.log(response.message)
            }

            dispatch(fetchPublished())
            dispatch(fetchFavorites())
            dispatch(fetchBasket())
        } catch (err) {
            const customErrorData: DefaultResponseType = (err as AxiosError).response?.data as DefaultResponseType
            console.error(customErrorData ? customErrorData.message : err)
        }
    }

    return (
        <div className={styles.modalWrapper}>
            <div className={styles.modalContainer + ' ' + themeTernary} ref={modal}>
                <div>Вы уверены?</div>
                <div>Данные будут потеряны!</div>
                <button className={styles.deleteButton} onClick={deleteBook}>Удалить</button>
                <button className={styles.cancelButton} onClick={() => setAreYouSure(false)}>Отменить</button>
            </div>
        </div>
    )
}

export default DeleteBookModal