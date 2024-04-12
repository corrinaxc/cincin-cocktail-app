import DetailsList from "../components/SearchPage/DetailsList/DetailsList";

export default function DetailsPage( { cocktails, cocktailSearch } ) {
    return(
        <DetailsList cocktails={cocktails} cocktailSearch={cocktailSearch}/>
    )
}