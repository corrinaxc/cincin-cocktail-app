

export default function DetailsList( {cocktails} ) {
    // map and destructure cocktails here
    
    
    if (!cocktails || !cocktails.drinks) {
        return <div>No cocktails available</div>;
      }
    return (
        <div>
            <ul>
                {cocktails?.map((cocktail) => (
                    <li>{cocktail.strDrink}</li>
                ))}
            </ul>
        </div>
    )
}

{/* <div className="colorDiv">
{colors?.map((color, index) => (
  <Div key={index} color={color}></Div>
))}</div> */}