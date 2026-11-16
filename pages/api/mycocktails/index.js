import dbConnect from "@/db/connect";
import MyCocktail from "@/db/models/mycocktails";
import { requireUserId } from "@/lib/requireUser";

export default async function handler(request, response) {
    const userId = await requireUserId(request, response);
    if (!userId) return;

    await dbConnect();

    if (request.method === "POST") {
        try {
            const { strDrink, strDrinkThumb, ingredients, method } = request.body;
            // The owner always comes from the session, never from the request body
            await MyCocktail.create({ strDrink, strDrinkThumb, ingredients, method, userId });
            response.status(201).json({ status: "Cocktail created" });
        } catch (error) {
            console.error(error);
            response.status(400).json({ error: error.message });
        }
    } else if (request.method === "GET") {
        try {
            // Newest first (MongoDB ids start with their creation time)
            const mycocktails = await MyCocktail.find({ userId }).sort({ _id: -1 });
            response.status(200).json(mycocktails);
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: "Could not load your cocktails." });
        }
    } else {
        response.status(405).json({ message: "Method not allowed" });
    }
}
