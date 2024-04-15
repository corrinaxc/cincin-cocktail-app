import DetailsList from "../components/DetailsList/DetailsList";

export default function DetailsPage( { cocktails, cocktailSearch, handleInputChange } ) {
    return(
        <DetailsList cocktails={cocktails} cocktailSearch={cocktailSearch} handleInputChange={handleInputChange}/>
    )
}