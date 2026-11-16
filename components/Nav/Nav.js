import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Nav.module.css';

function HomeIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 10.5 12 3l9 7.5" />
            <path d="M5.5 9v11h13V9" />
            <path d="M10 20v-6h4v6" />
        </svg>
    );
}

function HeartIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 20s-7.5-4.6-9-9.2C2 7.6 4 4.5 7.2 4.5c2 0 3.6 1.1 4.8 2.9 1.2-1.8 2.8-2.9 4.8-2.9C20 4.5 22 7.6 21 10.8 19.5 15.4 12 20 12 20Z" />
        </svg>
    );
}

function AccountIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20.5c1.2-3.8 4.3-5.5 8-5.5s6.8 1.7 8 5.5" />
        </svg>
    );
}

const links = [
    { href: '/', label: 'Home', Icon: HomeIcon, isActive: (path) => path === '/' },
    { href: '/favourites', label: 'Favourites', Icon: HeartIcon, isActive: (path) => path.startsWith('/favourites') },
    {
        href: '/account',
        label: 'Account',
        Icon: AccountIcon,
        isActive: (path) => ['/account', '/login', '/mycocktails', '/addcocktail'].some((p) => path.startsWith(p)),
    },
];

export default function Nav() {
    const { pathname } = useRouter();

    return (
        <footer className={styles.footer}>
            <nav className={styles.nav} aria-label="Main">
                {links.map(({ href, label, Icon, isActive }) => {
                    const active = isActive(pathname);
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`${styles.link} ${active ? styles.active : ''}`}
                            aria-current={active ? 'page' : undefined}
                        >
                            <span className={styles.iconWrap}><Icon /></span>
                            <span className={styles.label}>{label}</span>
                        </Link>
                    );
                })}
            </nav>
        </footer>
    );
}
