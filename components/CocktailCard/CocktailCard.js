import FavouriteButton from "../FavouriteButton/FavouriteButton";
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import CocktailDetailCard from "../CocktailDetailCard/CocktailDetailCard";

const fetcher = async (url) => await fetch(url).then((res) => res.json());

export default function CocktailCard({
    name,
    method,
    image,
    ingredients,
    cocktailsInfo,
    idDrink
}) {
    const { data: session, status } = useSession();
    const { data: favourites, mutate } = useSWR(
        status === 'authenticated' ? `/api/favourites?userId=${session.user.id}` : null,
        fetcher
    );

    return (
        <CocktailDetailCard
            name={name}
            image={image}
            method={method}
            ingredients={(ingredients ?? []).map(({ measure, ingredient }) =>
                [measure, ingredient].map((part) => part?.trim()).filter(Boolean).join(' ')
            )}
            action={
                <FavouriteButton
                    name={name}
                    image={image}
                    cocktailsInfo={cocktailsInfo}
                    idDrink={idDrink}
                    mutate={mutate}
                    favourites={favourites ?? []}
                />
            }
        />
    );
}
