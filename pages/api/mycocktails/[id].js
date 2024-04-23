import MyCocktail from "@/db/models/mycocktails";
import dbConnect from "@/db/connect";

export default async function handler(request, response) {
    await dbConnect();

    if (request.method === "GET") {
        try { 
            const { id } = request.query;
            const myCocktail = await MyCocktail.findById(id);
            if (!myCocktail) {
                return response.status(404).json({ status: "Not Found" });
            }
            console.log(myCocktail);
            response.status(200).json(myCocktail);
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        }
    } else {
        response.status(405).json({ message: "Method not allowed" });
    }
}