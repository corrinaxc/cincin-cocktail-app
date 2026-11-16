import dbConnect from "@/db/connect";
import Favourite from "@/db/models/favourites";
import { requireUserId } from "@/lib/requireUser";

export default async function handler(request, response) {
    const userId = await requireUserId(request, response);
    if (!userId) return;

    await dbConnect();

    if (request.method === "POST") {
        const { idDrink, strDrink, strDrinkThumb } = request.body;
        if (!idDrink || !strDrink) {
            return response.status(400).json({ error: "Missing drink details." });
        }
        try {
            // One database round trip: create the favourite, or return the existing
            // one if this drink is already saved (so double-clicks can't make duplicates).
            // The owner always comes from the session, never from the request body.
            const favourite = await Favourite.findOneAndUpdate(
                { idDrink, userId },
                { $setOnInsert: { idDrink, strDrink, strDrinkThumb, userId } },
                { upsert: true, new: true }
            );
            response.status(200).json(favourite);
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
