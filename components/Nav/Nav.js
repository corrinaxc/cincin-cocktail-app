import Link from 'next/link';


export default function Nav() {
    return(
        <footer>
        <nav className="bg-white mt-3 w-screen text-center rounded-md">
            <p>Nav Links to Go Here</p>
            <Link href={'/'}>Home</Link>
            <Link href={'/favourites'}>❤️</Link>
        </nav>
        </footer>
    )
}