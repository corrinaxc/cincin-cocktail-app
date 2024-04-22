import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function AddCocktailForm() {
    const { data: session, status } = useSession();
    const [formData, setFormData] = useState({
        cocktailName: '',
        ingredients: '',
        method: '',
        cocktailImage: null
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    console.log(formData)

      const handleAddCocktail = async () => {
        try {
            const response = await fetch("/api/mycocktails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    strDrink: formData.cocktailName,
                    strDrinkThumb: formData.cocktailImage,
                    ingredients: formData.ingredients,
                    method: formData.method,
                    userId: session.user.id
                }),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error adding cocktail:", error);
        }
    };
    

    return (
        <form className="display: flex, flex-col bg-white gap-2.5">
            <label htmlFor="cocktailName">Cocktail Name</label>
            <input type="text" name="cocktailName" value={formData.cocktailName} onChange={handleChange}></input>
            <label htmlFor="ingredients">Ingredients</label>
            <input type="text" name="ingredients" value={formData.ingredients} onChange={handleChange}></input>
            <label htmlFor="method">Method</label>
            <input type="text" name="method" value={formData.method} onChange={handleChange}></input>
            <label htmlFor="cocktailImage">Image Upload</label>
            <input type="file" name="cocktailImage" onChange={(e) => setFormData({ ...formData, cocktailImage: e.target.files[0] })}></input>
            <button type="button" onClick={handleAddCocktail}>Add Cocktail</button>
        </form>
    );
}
