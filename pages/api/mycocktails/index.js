import dbConnect from "@/db/connect";
import MyCocktail from "@/db/models/mycocktails"

export default async function handler(request, response) {
    await dbConnect();

    if (request.method === 'POST') {
        try {
            const myCocktailData = request.body;
            await MyCocktail.create(myCocktailData); // Ensure MyCocktail is correctly imported
            response.status(201).json({ status: 'Cocktail created' });
        } catch (error) {
            console.error(error);
            response.status(400).json({ error: error.message });
        }
    } else if (request.method === "GET") {
        const mycocktails = await MyCocktail.find();
        return response.status(200).json(mycocktails);
    } else {
        return response.status(405).json({ message: "Method not allowed" });
      }
    }
    