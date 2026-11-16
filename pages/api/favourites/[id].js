import mongoose from "mongoose";
import dbConnect from "@/db/connect";
import Favourite from "@/db/models/favourites";
import { requireUserId } from "@/lib/requireUser";

export default async function handler(request, response) {
    const userId = await requireUserId(request, response);
    if (!userId) return;

    if (request.method !== "DELETE") {
        return response.status(405).json({ message: "Method not allowed" });
    }

    const { id } = request.query;
    // Someone else's favourite looks the same as a missing one (404)
    if (!mongoose.isValidObjectId(id)) {
        return response.status(404).json({ error: "Favourite not found." });
    }

    await dbConnect();

    try {
        const deleted = await Favourite.findOneAndDelete({ _id: id, userId });
        if (!deleted) {
            return response.status(404).json({ error: "Favourite not found." });
        }
        response.status(200).json({ status: "Favourite removed." });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Could not remove this favourite." });
    }
}
