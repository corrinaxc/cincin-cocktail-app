import dbConnect from "@/db/connect";
import Favourite from "@/db/models/favourites";

export default async function handler(request, response) {
    await dbConnect();

    if (request.method === "POST") {
        try {
            const favouriteData = request.body;
            await Favourite.create(favouriteData);
            response.status(201).json({ status: "Added to Favourites"});
        } catch (error) {
            console.log(error);
            response.status(400).json({error: error.message});
        }
    } else if (request.method === "GET") {
        try {
            const favourites = await Favourite.find();
            console.log('=====',favourites)
            response.status(200).json(favourites);
        } catch (error) {
            console.log(error);
            response.status(500).json({ error: error.message });
        }
    } else if (request.method === "DELETE") {
            await Favourite.findByIdAndDelete(id);
            response.status(200).json({ status: `Joke ${id} successfully deleted.` });
          }
    else {
        response.status(405).json({ message: "Method not allowed" });
    }}