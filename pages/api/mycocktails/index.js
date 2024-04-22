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
    }
  }
    