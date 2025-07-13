import ContentLoader from 'react-content-loader'
import styles from './bookCard.module.scss'

const BookSceleton = () => (
    <ContentLoader
        // className={styles.bookBlock}
        speed={2}
        width={260}
        height={475}
        viewBox="0 0 260 475"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="12" y="12" rx="10" ry="10" width="236" height="21" />
        <rect x="12" y="45" rx="10" ry="10" width="236" height="15" />
        <rect x="12" y="72" rx="10" ry="10" width="236" height="300" />
        <rect x="12" y="384" rx="10" ry="10" width="236" height="39" />
        <rect x="12" y="435" rx="10" ry="10" width="236" height="39" />
    </ContentLoader>
)

export default BookSceleton