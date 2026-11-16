import dbConnect from "@/db/connect";
import Favourite from "@/db/models/favourites";
import { requireUserId } from "@/lib/requireUser";

export default async function handler(request, response) {
    const userId = await requireUserId(request, response);
    if (!userId) return;

    await dbConnect();

    if (request.method === "POST") {
        const { idDrink, strDrink, strDrinkThumb } = request.body;
        try {
            const existingFavourite = await Favourite.findOne({ idDrink, userId });
            if (existingFavourite) {
                return response.status(409).json({ message: 'This drink is already in your favourites!' });
            }
            // The owner always comes from the session, never from the request body
            const newFavourite = await Favourite.create({ idDrink, strDrink, strDrinkThumb, userId });
            response.status(201).json(newFavourite);
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: "Could not save this favourite." });
        }
    } else if (request.method === "GET") {
        try {
            // Newest first (MongoDB ids start with their creation time)
            const favourites = await Favourite.find({ userId }).sort({ _id: -1 });
            response.status(200).json(favourites);
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: "Could not load your favourites." });
        }
    } else {
        response.setHeader('Allow', ['POST', 'GET']);
        response.status(405).end(`Method ${request.method} Not Allowed`);
    }
}
