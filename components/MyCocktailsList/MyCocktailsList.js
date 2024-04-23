import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MyCocktails() {
  const [myCocktails, setMyCocktails] = useState([]);

  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        const response = await fetch(`/api/mycocktails`, {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          setMyCocktails(data);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCocktails();
  }, []);

  console.log(myCocktails);

    return (
          <>
            {myCocktails?.map((myCocktail) => (
              <div className="cocktailListDetail" key={myCocktail.id}>
                <h2>{myCocktail.strDrink}</h2>
                <Link href={`/mycocktails/${myCocktail._id}`}>
                  <img className="w-28" src={myCocktail.strDrinkThumb} alt={myCocktail.strDrink} />
                </Link>
                {/* <FavouriteButton name={favourite.name}
                id={favourite._id}
                idDrink={favourite.idDrink}
                image={favourite.strDrinkThumb}
                mutate={mutate}
                favourites={favourites}/> */}
              </div>
            ))}
          </>      
          );
    }