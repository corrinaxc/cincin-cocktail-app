import DetailsList from "../components/DetailsList/DetailsList";

export default function DetailsPage( { 
    cocktails, 
    cocktailSearch, 
    onToggleFavourite,
    cocktailsInfo } 
    ) {
    return(
        <DetailsList
        cocktails={cocktails}
        cocktailSearch={cocktailSearch} 
        onToggleFavourite={onToggleFavourite}
        cocktailsInfo={cocktailsInfo}/>
    )
}