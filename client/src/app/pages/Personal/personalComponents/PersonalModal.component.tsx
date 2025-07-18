import { useState, type FC } from 'react'
import styles from '../personal.module.scss'
import { ColorThemeEnum } from '../../../../redux/general/general.types'
import { selectorGeneral } from '../../../../redux/general/general.selector'
import { useSelector } from 'react-redux'
import type { BookType } from '../../../../types/entitiesTypes/book.type'
type createOrderModalProps = {
    setAreYouSure: (type: boolean) => void,
    basket: BookType[]
}

const CreateOrderModal: FC<createOrderModalProps> = ({ setAreYouSure, basket }) => {
    const { theme } = useSelector(selectorGeneral)
    const themeTernary = theme === ColorThemeEnum.LIGHT ? styles.light : styles.dark
    const [isSent, setIsSent] = useState<boolean>(true)

    const sendOrder = async () => {
        setIsSent(prev => !prev)
    }

    return (
        <div className={styles.modalWrapper}>
            <div className={styles.modalContainer + ' ' + themeTernary}>
                {isSent ?
                    <>
                        <div className={styles.modalHeading}>Вы уверены? Проверьте данные</div>
                        {basket.map(item => (
                            <div key={item.id} className={styles.modalItem}>{item.heading}</div>
                        ))}
                    </> :
                    <div className={styles.modalHeading}>Ваш заказ отправлен в обработку</div>
                }
                <button className={styles.sendButton} onClick={sendOrder}>{!isSent ? 'Хорошо' : 'Отправить заказ'}</button>
                <button className={styles.cancelButton} onClick={() => setAreYouSure(false)}>{!isSent ? 'Закрыть' : 'Отменить'}</button>
            </div>
        </div>
    )
}

export default CreateOrderModal