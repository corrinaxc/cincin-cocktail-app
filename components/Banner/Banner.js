import cocktailImage from "../../public/resources/cocktail-svgrepo-com.svg"
import Link from 'next/link'

export default function Banner() {
    return (
        <Link href={'/'}>
        <div className="banner"> 
            <img className="w-10 text-center " src="/resources/cocktail.png" alt="cocktail-icon"/>
            <h1>   Cin-Cin   </h1>
            <img className="w-10" src="/resources/cocktail.png" alt="cocktail-icon"/>
        </div>
        </Link>
    )
}