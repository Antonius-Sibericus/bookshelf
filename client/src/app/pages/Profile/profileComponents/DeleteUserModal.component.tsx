import type { FC } from 'react'
import styles from '../profile.module.scss'
import { ColorThemeEnum } from '../../../../redux/general/general.types'
import { selectorGeneral } from '../../../../redux/general/general.selector'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../../../redux/store.redux'
import { setSignedUp } from '../../../../redux/general/general.slice'
import UsersService from '../../../services/users.service'
import type { UserType } from '../../../../types/entitiesTypes/user.type'
import type { UserResponseType } from '../../../../types/responsesTypes/userResponse.type'
import type { DefaultResponseType } from '../../../../types/responsesTypes/defaultResponse.type'
import type { AxiosError } from 'axios'

type deleteUserModalProps = {
    setAreYouSure: (type: boolean) => void,
    currentUser: UserType
}

const DeleteUserModal: FC<deleteUserModalProps> = ({ setAreYouSure, currentUser }) => {
    const { theme } = useSelector(selectorGeneral)
    const themeTernary = theme === ColorThemeEnum.LIGHT ? styles.light : styles.dark

    const dispatch = useAppDispatch()

    const deleteUser = async () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('userId')
        dispatch(setSignedUp(false))
        try {
            const result = await UsersService.deleteUser(currentUser.id)
            const response = result.data

            if (response as UserResponseType) {
                console.log(response.message)
            }
        } catch (err) {
            const customErrorData: DefaultResponseType = (err as AxiosError).response?.data as DefaultResponseType
            console.error(customErrorData ? customErrorData.message : err)
        }
    }

    return (
        <div className={styles.modalWrapper}>
            <div className={styles.modalContainer + ' ' + themeTernary}>
                <div>Вы уверены?</div>
                <div>Данные будут потеряны!</div>
                <button className={styles.deleteButton} onClick={deleteUser}>Удалить</button>
                <button className={styles.cancelButton} onClick={() => setAreYouSure(false)}>Отменить</button>
            </div>
        </div>
    )
}

export default DeleteUserModal