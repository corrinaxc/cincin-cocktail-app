import dbConnect from "@/db/connect";
import Favourite from "@/db/models/favourites";

export default async function handler(request, response) {
    await dbConnect();
    if (request.method === "DELETE") {
        try {
            const { id } = request.query;
            const deletedFavourite = await Favourite.findByIdAndDelete(id);
            if (!deletedFavourite) {
                return response.status(404).json({ error: `Favourite ${id} not found.` });
            }
            response.status(200).json({ status: `Favourite ${id} successfully deleted.` });
        } catch (error) {
            console.log(error);
            response.status(500).json({ error: error.message });
        }
    } else {
        response.status(405).json({ message: "Method not allowed" });
        }}

