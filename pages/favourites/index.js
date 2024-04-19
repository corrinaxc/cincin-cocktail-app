import FavouriteList from "@/components/FavouriteList/FavouriteList"

export default function Favourites( {
    onInputChange
}) {
    return(
        <FavouriteList
        onInputChange={onInputChange} />
    )
}