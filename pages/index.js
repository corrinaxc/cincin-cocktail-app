import { Inter } from "next/font/google";
import HomePageForm from "@/components/HomepageForm/HomepageForm";
import Banner from "@/components/Banner/Banner";
import Nav from "@/components/Nav/Nav";
import cocktailImage from "../public/resources/cocktail.png"


const inter = Inter({ subsets: ["latin"] });

export default function Home( {handleInputChange, handleIngredientChange} ) {
  console.log(cocktailImage)
  return (
    <>
    <Banner />
    <HomePageForm 
    handleInputChange={handleInputChange}
    handleIngredientChange={handleIngredientChange} />
    </>
  );
}
