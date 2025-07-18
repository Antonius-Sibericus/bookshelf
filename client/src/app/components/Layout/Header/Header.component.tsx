import { useCallback, useEffect, useRef, useState, type ChangeEvent, type FC } from 'react'
import styles from './header.module.scss'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ColorThemeEnum } from '../../../../redux/general/general.types'
import { setTheme } from '../../../../redux/general/general.slice'
import { selectorGeneral } from '../../../../redux/general/general.selector'
import logo from '../../../../assets/images/logo-bookshelf.jpg'
import { useAppDispatch } from '../../../../redux/store.redux'
import { fetchCategories } from '../../../../redux/categoriesAndThemes/categoriesAndThemes.async'
import { selectorCategoriesAndThemes } from '../../../../redux/categoriesAndThemes/categoriesAndThemes.selector'
import { setCategoryFilter, setSearchFilter } from '../../../../redux/filter/filter.slice'
import debounce from 'lodash.debounce'
import { fetchBasket } from '../../../../redux/basket/basket.async'
import { selectorBasket } from '../../../../redux/basket/basket.selector'
import { selectorFavorites } from '../../../../redux/favorites/favorites.selector'
import { fetchFavorites } from '../../../../redux/favorites/favorites.async'
import { loginPath, signupPath } from '../../../../utils/consts.utils'

const Header: FC = () => {
    const { theme, isSignedUp, currentUser } = useSelector(selectorGeneral)
    const { categories } = useSelector(selectorCategoriesAndThemes)
    const { basket } = useSelector(selectorBasket)
    const { favorites } = useSelector(selectorFavorites)
    const location = useLocation()
    
    const themeTernary = theme === ColorThemeEnum.LIGHT ? styles.light : styles.dark
    const dispatch = useAppDispatch()
    
    const [searchValue, setSearchValue] = useState<string>('')
    const inputRef = useRef<HTMLInputElement>(null)

    const onClickClear = () => {
        dispatch(setSearchFilter(''));
        setSearchValue('');
        inputRef.current?.focus();
    }

    const updateSearchValue = useCallback(
        debounce(
            (str: string) => dispatch(setSearchFilter(str)), 250
        ), []
    )

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
        setSearchValue(e.target.value)
        updateSearchValue(e.target.value)
    }

    const changeTheme = () => {
        dispatch(theme === ColorThemeEnum.LIGHT ? setTheme(ColorThemeEnum.DARK) : setTheme(ColorThemeEnum.LIGHT))
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(fetchBasket())
        dispatch(fetchFavorites())
    }, [])


    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link to='/'>
                    <div className={styles.logo}>
                        <img width='120' src={logo} alt='Bookshelf Logo' />
                    </div>
                </Link>
                <div className={styles.headerContent}>
                    <div className={styles.headerTop}>
                        <div className={styles.headerTopMenu}>
                            <nav>
                                <ul>
                                    <li><Link to='/' className={themeTernary}>Главная</Link></li>
                                    <li><Link to='/catalog' className={themeTernary}>Каталог</Link></li>
                                    <li><Link to={currentUser.isActivated && isSignedUp ? '/workshop' : isSignedUp && !currentUser.isActivated ? `${signupPath}` : `${loginPath}`} className={themeTernary}>Мастерская</Link></li>
                                    <li><Link to={currentUser.isActivated && isSignedUp ? `/profile/${currentUser.id}/published` : isSignedUp && !currentUser.isActivated ? `${signupPath}` : `${loginPath}`} className={themeTernary}>Опубликованное</Link></li>
                                </ul>
                            </nav>
                        </div>
                        <div className={styles.headerPhoneAndActions}>
                            <a className={styles.headerTopPhone + ' ' + themeTernary} href='tel:+375299182888'>8 (800) 555-35-35</a>
                            <div className={styles.headerTopActions}>
                                {theme === ColorThemeEnum.LIGHT ?
                                    <a onClick={changeTheme}>
                                        <svg fill='#011a1f' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512'>
                                            <path d='M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z' />
                                        </svg>
                                    </a> :
                                    <a onClick={changeTheme}>
                                        <svg fill='#229fb8' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                                            <path d='M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z' />
                                        </svg>
                                    </a>
                                }
                                {currentUser.isActivated && isSignedUp ?
                                    <Link to={`/profile/${currentUser.id}`}>
                                        <svg className={themeTernary} fill='none' width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                                            <path
                                                d='M12.1207 12.78C12.0507 12.77 11.9607 12.77 11.8807 12.78C10.1207 12.72 8.7207 11.28 8.7207 9.50998C8.7207 7.69998 10.1807 6.22998 12.0007 6.22998C13.8107 6.22998 15.2807 7.69998 15.2807 9.50998C15.2707 11.28 13.8807 12.72 12.1207 12.78Z'
                                                strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
                                            <path
                                                d='M18.7398 19.3801C16.9598 21.0101 14.5998 22.0001 11.9998 22.0001C9.39977 22.0001 7.03977 21.0101 5.25977 19.3801C5.35977 18.4401 5.95977 17.5201 7.02977 16.8001C9.76977 14.9801 14.2498 14.9801 16.9698 16.8001C18.0398 17.5201 18.6398 18.4401 18.7398 19.3801Z'
                                                strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
                                            <path
                                                d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
                                                strokeWidth='1.3' strokeLinecap='round' strokeLinejoin='round' />
                                        </svg>
                                    </Link> :
                                    <Link to={isSignedUp ? '/signup' : '/login'}>
                                        <svg className={themeTernary} width='23' height='23' viewBox='0 0 23 23' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                            <path
                                                d='M8.5293 7.24498C8.82638 3.79498 10.5993 2.38623 14.4805 2.38623H14.6051C18.8889 2.38623 20.6043 4.10165 20.6043 8.3854V14.6337C20.6043 18.9175 18.8889 20.6329 14.6051 20.6329H14.4805C10.628 20.6329 8.85513 19.2433 8.53888 15.8508'
                                                strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                                            <path d='M1.91699 11.5H14.2603' strokeWidth='1.5' strokeLinecap='round'
                                                strokeLinejoin='round' />
                                            <path d='M12.123 8.28955L15.3335 11.5L12.123 14.7104' strokeWidth='1.5'
                                                strokeLinecap='round' strokeLinejoin='round' />
                                        </svg>
                                    </Link>
                                }
                                <a onClick={() => setIsMenuOpen(prevState => !prevState)} className={styles.headerBurger}>
                                    <svg width='24' height='24' fill={theme === ColorThemeEnum.LIGHT ? '#072e36' : '#229fb8'} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
                                        <path d='M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z' />
                                    </svg>
                                </a>
                                {currentUser.isActivated && isSignedUp &&
                                    <Link to={`/profile/${currentUser.id}/favorites`}>
                                        <svg width='24' height='24' viewBox='0 0 24 24' fill={theme === ColorThemeEnum.LIGHT ? '#072e36' : '#229fb8'} xmlns='http://www.w3.org/2000/svg'>
                                            <path
                                                d='M11.9997 20.846C11.7155 20.846 11.4405 20.8093 11.2113 20.7268C7.70967 19.526 2.14551 15.2635 2.14551 8.96596C2.14551 5.75763 4.73967 3.1543 7.92967 3.1543C9.47884 3.1543 10.9272 3.7593 11.9997 4.84096C13.0722 3.7593 14.5205 3.1543 16.0697 3.1543C19.2597 3.1543 21.8538 5.7668 21.8538 8.96596C21.8538 15.2726 16.2897 19.526 12.788 20.7268C12.5588 20.8093 12.2838 20.846 11.9997 20.846ZM7.92967 4.5293C5.50051 4.5293 3.52051 6.51846 3.52051 8.96596C3.52051 15.2268 9.54301 18.7101 11.6605 19.4343C11.8255 19.4893 12.183 19.4893 12.348 19.4343C14.4563 18.7101 20.488 15.236 20.488 8.96596C20.488 6.51846 18.508 4.5293 16.0788 4.5293C14.6855 4.5293 13.393 5.18013 12.5588 6.30763C12.3022 6.65596 11.7155 6.65596 11.4588 6.30763C10.6063 5.17096 9.32301 4.5293 7.92967 4.5293Z'
                                            />
                                        </svg>
                                        <span className={themeTernary}>{favorites.length}</span>
                                    </Link>}
                                {currentUser.isActivated && isSignedUp &&
                                    <Link to={`/profile/${currentUser.id}/basket`}>
                                        <svg width='24' height='24' viewBox='0 0 24 24' fill={theme === ColorThemeEnum.LIGHT ? '#072e36' : '#229fb8'} xmlns='http://www.w3.org/2000/svg'>
                                            <path
                                                d='M6.32507 7.31686C6.16673 7.31686 6.00007 7.2502 5.8834 7.13353C5.64173 6.89186 5.64173 6.49186 5.8834 6.2502L8.9084 3.2252C9.15007 2.98353 9.55007 2.98353 9.79173 3.2252C10.0334 3.46686 10.0334 3.86686 9.79173 4.10853L6.76673 7.13353C6.64173 7.2502 6.4834 7.31686 6.32507 7.31686Z'
                                            />
                                            <path
                                                d='M17.6753 7.31686C17.5169 7.31686 17.3586 7.25853 17.2336 7.13353L14.2086 4.10853C13.9669 3.86686 13.9669 3.46686 14.2086 3.2252C14.4503 2.98353 14.8503 2.98353 15.0919 3.2252L18.1169 6.2502C18.3586 6.49186 18.3586 6.89186 18.1169 7.13353C18.0003 7.2502 17.8336 7.31686 17.6753 7.31686Z'
                                            />
                                            <path
                                                d='M18.842 10.8333C18.7837 10.8333 18.7253 10.8333 18.667 10.8333H18.4753H5.33366C4.75033 10.8417 4.08366 10.8417 3.60033 10.3583C3.21699 9.98333 3.04199 9.4 3.04199 8.54167C3.04199 6.25 4.71699 6.25 5.51699 6.25H18.4837C19.2837 6.25 20.9587 6.25 20.9587 8.54167C20.9587 9.40833 20.7837 9.98333 20.4003 10.3583C19.967 10.7917 19.3837 10.8333 18.842 10.8333ZM5.51699 9.58333H18.6753C19.0503 9.59167 19.4003 9.59167 19.517 9.475C19.5753 9.41667 19.7003 9.21667 19.7003 8.54167C19.7003 7.6 19.467 7.5 18.4753 7.5H5.51699C4.52533 7.5 4.29199 7.6 4.29199 8.54167C4.29199 9.21667 4.42533 9.41667 4.47533 9.475C4.59199 9.58333 4.95033 9.58333 5.31699 9.58333H5.51699Z'
                                            />
                                            <path
                                                d='M10.1338 17.2498C9.79212 17.2498 9.50879 16.9665 9.50879 16.6248V13.6665C9.50879 13.3248 9.79212 13.0415 10.1338 13.0415C10.4755 13.0415 10.7588 13.3248 10.7588 13.6665V16.6248C10.7588 16.9748 10.4755 17.2498 10.1338 17.2498Z'
                                            />
                                            <path
                                                d='M13.9668 17.2498C13.6251 17.2498 13.3418 16.9665 13.3418 16.6248V13.6665C13.3418 13.3248 13.6251 13.0415 13.9668 13.0415C14.3085 13.0415 14.5918 13.3248 14.5918 13.6665V16.6248C14.5918 16.9748 14.3085 17.2498 13.9668 17.2498Z'
                                            />
                                            <path
                                                d='M14.4083 20.9581H9.38329C6.39996 20.9581 5.73329 19.1831 5.47496 17.6415L4.29996 10.4331C4.24162 10.0915 4.47496 9.7748 4.81662 9.71646C5.15829 9.65813 5.47496 9.89146 5.53329 10.2331L6.70829 17.4331C6.94996 18.9081 7.44996 19.7081 9.38329 19.7081H14.4083C16.55 19.7081 16.7916 18.9581 17.0666 17.5081L18.4666 10.2165C18.5333 9.87479 18.8583 9.6498 19.2 9.7248C19.5416 9.79146 19.7583 10.1165 19.6916 10.4581L18.2916 17.7498C17.9666 19.4415 17.425 20.9581 14.4083 20.9581Z'
                                            />
                                        </svg>
                                        <span className={themeTernary}>{basket.length}</span>
                                    </Link>}
                            </div>
                        </div>
                    </div>
                    {
                        !location.pathname.startsWith('/profile') &&
                        <div className={styles.headerBottom}>
                            <div className={styles.headerBottomMenu + ' ' + (isMenuOpen ? styles.open : styles.closed)}>
                                <nav>
                                    <ul>
                                        {categories.map(item => (
                                            <li onClick={() => dispatch(setCategoryFilter(item.tag))} key={item.id}><Link to={`/catalog`} className={themeTernary}>{item.title}</Link></li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                            {location.pathname.startsWith('/catalog') && !location.pathname.includes('book') && <div className={styles.headerBottomSearch}>
                                <input type='text' placeholder='Начните искать' className={themeTernary} ref={inputRef} value={searchValue} onChange={onChangeInput} />
                                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' className={styles.search + ' ' + themeTernary}>
                                    <path d='M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z' />
                                </svg>
                                <svg
                                    onClick={onClickClear}
                                    className={styles.clear}
                                    viewBox='0 0 20 20'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path d='M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z' />
                                </svg>
                            </div>}
                        </div>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header