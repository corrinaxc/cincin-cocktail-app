import dbConnect from "@/db/connect";
import Favourite from "@/db/models/favourites";

export default async function handler(request, response) {
    await dbConnect();

    if (request.method === "POST") {
        try {
            const favouriteData = request.body
            await Favourite.create(favouriteData);
            response.status(201).json({ status: "Added to Favourites"});
        } catch (error) {
            console.log(error);
            response.status(400).json({error: error.message});
        }
    }
}