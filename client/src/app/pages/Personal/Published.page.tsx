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
import { UserRoles } from '../../../types/user-roles.enum'

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

    return (
        <section className={styles.personal}>
            <div className={styles.container}>
                <div className={styles.personalHeading}>
                    <span>Опубликованное ({published.length} книг{published.length % 10 === 1 ? 'а' : published.length % 10 === 2 ? 'и' : published.length % 10 === 3 ? 'и' : published.length % 10 === 4 ? 'и' : ''})</span>
                    <Link className={themeTernary} to={`/profile/${currentUser.id}`}>Вернуться в профиль</Link>
                </div>
                {currentUser.role === UserRoles.READER ?
                    <div className={styles.personalHeading}>
                        <span>
                            Поменяйте вашу роль на 'Публикатора', чтобы получить возможность создавать новые категории и темы, а также добавлять книги!
                        </span>
                    </div> :
                    <div className={styles.personalContent}>
                        {published.map(item => (
                            <PersonalCard key={item.id} {...item} />
                        ))}
                    </div>
                }
            </div>
        </section>
    )
}

export default PublishedPage