import { Inter } from "next/font/google";
import useSWR from "swr";
import HomePageForm from "@/components/HomepageForm/HomepageForm";
import Banner from "@/components/Banner/Banner";
import Nav from "@/components/Nav/Nav";

const inter = Inter({ subsets: ["latin"] });

const fetcher = async (url) => await fetch(url).then((res) => res.json());

export default function Home() {

  const {
    data: cocktail,
    error,
    isLoading,
  } = useSWR(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`, fetcher);
  if (error) return <div>Failed to Load</div>;
  if (isLoading) return <div>loading...</div>
  console.log(cocktail);

  return (
    <>
    <Banner />
    <HomePageForm />
    <Nav />
    </>
  );
}
