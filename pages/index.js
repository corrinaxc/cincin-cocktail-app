import { Josefin_Sans } from "next/font/google";
import HomePageForm from "@/components/HomepageForm/HomepageForm";
import Banner from "@/components/Banner/Banner";
import Nav from "@/components/Nav/Nav";
import cocktailImage from "../public/resources/cocktail.png"
import AddCocktailButton from "@/components/AddCocktailButton/AddCocktailButton";


const inter = Josefin_Sans({ subsets: ["latin"] });

export default function Home( {handleInputChange, handleIngredientChange, cocktails} ) {
  console.log(cocktails);
  return (
    <>
    <HomePageForm 
    handleInputChange={handleInputChange}
    handleIngredientChange={handleIngredientChange} />
    <AddCocktailButton />
    </>
  );
}
