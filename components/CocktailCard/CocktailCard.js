
export default function CocktailCard( {
    name,
    method
}) {

    return (
        <>
        {/* <Link> */}
        <button>Back</button>
        {/* </Link> */}
        <button>Add to Favourites</button>
        <img />
        <h2>{name}</h2>
        <ul>
        <li>Ingredient</li>
        </ul>
        <p>{method}</p>
        </>
)
}