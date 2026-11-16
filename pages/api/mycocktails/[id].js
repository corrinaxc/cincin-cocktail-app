import mongoose from "mongoose";
import dbConnect from "@/db/connect";
import MyCocktail from "@/db/models/mycocktails";
import { requireUserId } from "@/lib/requireUser";

export default async function handler(request, response) {
    const userId = await requireUserId(request, response);
    if (!userId) return;

    const { id } = request.query;
    // Someone else's cocktail looks the same as a missing one (404), so ids can't be probed
    if (!mongoose.isValidObjectId(id)) {
        return response.status(404).json({ error: "Cocktail not found." });
    }

    await dbConnect();

    if (request.method === "GET") {
        try {
            const myCocktail = await MyCocktail.findOne({ _id: id, userId });
            if (!myCocktail) {
                return response.status(404).json({ error: "Cocktail not found." });
            }
            response.status(200).json(myCocktail);
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: "Could not load this cocktail." });
        }
    } else if (request.method === "DELETE") {
        try {
            const deleted = await MyCocktail.findOneAndDelete({ _id: id, userId });
            if (!deleted) {
                return response.status(404).json({ error: "Cocktail not found." });
            }
            response.status(200).json({ status: "Cocktail deleted." });
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: "Could not delete this cocktail." });
        }
    } else {
        response.status(405).json({ message: "Method not allowed" });
    }
}
