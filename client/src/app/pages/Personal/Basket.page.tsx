import type { FC } from 'react'
import styles from './personal.module.scss'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectorGeneral } from '../../../redux/general/general.selector'
import { ColorThemeEnum } from '../../../redux/general/general.types'
import PersonalCard from '../../components/personalCard/PersonalCard.component'

const BasketPage: FC = () => {
    const { theme } = useSelector(selectorGeneral)
    const themeTernary = theme === ColorThemeEnum.LIGHT ? styles.light : styles.dark

    return (
        <section className={styles.personal}>
            <div className={styles.container}>
                <div className={styles.personalHeading}>
                    <span>Корзина</span>
                    <Link className={themeTernary} to='/profile/1'>Вернуться в профиль</Link>
                </div>
                <div className={styles.personalContent}>
                    <PersonalCard />
                    <PersonalCard />
                    <PersonalCard />
                </div>
            </div>
        </section>
    )
}

export default BasketPage