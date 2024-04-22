import dbConnect from "@/db/connect";
import Favourite from "@/db/models/favourites";

export default async function handler(request, response) {
    await dbConnect();

    if (request.method === "POST") {
        const { idDrink, userId } = request.body;
        try {
            const existingFavourite = await Favourite.findOne({ idDrink, userId });
            if (existingFavourite) {
                return response.status(409).json({ message: 'This drink is already in your favourites!' });
            }
            const newFavourite = await Favourite.create(request.body);
            response.status(201).json(newFavourite);
        } catch (error) {
            console.log(error);
            response.status(500).json({ error: error.message });
        }
    } 
    else if (request.method === "GET") {
        const { userId } = request.query;
        if (!userId) {
            return response.status(400).json({ message: "Missing userId parameter" });
        }
        try {
            const favourites = await Favourite.find({ userId: userId });
            response.status(200).json(favourites);
        } catch (error) {
            console.log(error);
            response.status(500).json({ error: error.message });
        }
    } 
    else {
        response.setHeader('Allow', ['POST', 'GET']);
        response.status(405).end(`Method ${request.method} Not Allowed`);
    }
}
