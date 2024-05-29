import Link from 'next/link';
import styles from './Nav.module.css';


export default function Nav() {
    return(
        <footer>
        <nav className={styles.nav}>
            <Link className="homeIcon" href={'/'}><img src='/resources/icons8-home-50.png'></img></Link>
            <Link href={'/favourites'}>❤️</Link>
            <Link href={'/account'}>
                <img className='profileButton' src='/resources/profile.png' />
            </Link>
        </nav>
        </footer>
    )
}
