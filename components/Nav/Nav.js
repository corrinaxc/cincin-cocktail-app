import Link from 'next/link';


export default function Nav() {
    return(
        <footer>
        <nav className="bg-white mt-3 w-screen text-center rounded-md display: flex justify-center gap-7">
            <Link href={'/'}>Home</Link>
            <Link href={'/favourites'}>❤️</Link>
            <Link href={'/login'}>
                <img className="w-6" src='/resources/profile.png' />
            </Link>
        </nav>
        </footer>
    )
}