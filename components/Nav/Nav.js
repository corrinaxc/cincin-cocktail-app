import Link from 'next/link';


export default function Nav() {
    return(
        <footer>
        <nav className="bg-white mt-3 w-screen text-center display: flex justify-center gap-7 h-16 nav">
            <Link className="homeIcon" href={'/'}><img src='/resources/icons8-home-50.png'></img></Link>
            <Link href={'/favourites'}>❤️</Link>
            <Link href={'/account'}>
                <img className='profileButton' src='/resources/profile.png' />
            </Link>
        </nav>
        </footer>
    )
}

// className="w-14"