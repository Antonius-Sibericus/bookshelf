import type { FC } from 'react'
import styles from './auth.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthed } from '../../../redux/general/general.slice'
import { selectorGeneral } from '../../../redux/general/general.selector'

const LoginPage: FC = () => {
    const { isAuthed } = useSelector(selectorGeneral)
    const dispatch = useDispatch()
    const changeAuth = () => {
        dispatch(setAuthed(!isAuthed))
    }
    return (
        <button onClick={changeAuth}>Auth</button>
    )
}

export default LoginPage