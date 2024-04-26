import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function AddCocktailForm() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [formData, setFormData] = useState({
        cocktailName: '',
        ingredients: '',
        method: '',
        cocktailImage: '',
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
            router.push('/mycocktails');
        } catch (error) {
            console.error("Error adding cocktail:", error);
        }
    };
    

    return (
        <form className="addCocktailForm">
            <label htmlFor="cocktailName">Cocktail Name</label>
            <input className='formInput' type="text" name="cocktailName" value={formData.cocktailName} onChange={handleChange}></input>
            <label htmlFor="ingredients">Ingredients</label>
            <input className='formInput' type="text" name="ingredients" value={formData.ingredients} onChange={handleChange}></input>
            <label htmlFor="method">Method</label>
            <input className='formInput' type="text" name="method" value={formData.method} onChange={handleChange}></input>
            <label htmlFor="cocktailImage">Image Upload</label>
            <input className='formInput' type="text" name="cocktailImage" onChange={handleChange} value={formData.cocktailImage}></input>
            <button type="button" className='addCocktailFormButton' onClick={handleAddCocktail}>Add Cocktail</button>
        </form>
    );
}
