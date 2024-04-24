import MyCocktailsList from "@/components/MyCocktailsList/MyCocktailsList"
import AddCocktailButton from "@/components/AddCocktailButton/AddCocktailButton"
import Banner from "@/components/Banner/Banner"
import { useState } from "react";
import { useEffect } from "react";

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
        <MyCocktailsList myCocktails={myCocktails} />
        <AddCocktailButton />
        </>
    )
}