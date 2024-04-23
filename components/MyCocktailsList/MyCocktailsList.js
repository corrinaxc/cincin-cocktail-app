import Link from 'next/link';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import DeleteButton from '../DeleteButton/DeleteButton';

export default function MyCocktails( {myCocktails}) {

  return (
    <>
      {myCocktails?.map((myCocktail) => (
        <div className="cocktailListDetail" key={myCocktail.id}>
          <h2>{myCocktail.strDrink}</h2>
          <Link href={`/mycocktails/${myCocktail._id}`}>
            <img className="w-28" src={myCocktail.strDrinkThumb} alt={myCocktail.strDrink} />
          </Link>
          <DeleteButton id={myCocktail._id} />
        </div>
      ))}
    </>      
  );
}
