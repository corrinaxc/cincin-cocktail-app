import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './AddCocktailForm.module.css';

export default function AddCocktailForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        cocktailName: '',
        ingredients: '',
        method: '',
        cocktailImage: '',
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [imageFailed, setImageFailed] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === 'cocktailImage') setImageFailed(false);
    };

    const handleAddCocktail = async (e) => {
        e.preventDefault();
        if (!formData.cocktailName.trim()) {
            setError('Give your cocktail a name first.');
            return;
        }
        setSaving(true);
        setError('');
        try {
            const response = await fetch("/api/mycocktails", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    strDrink: formData.cocktailName.trim(),
                    strDrinkThumb: formData.cocktailImage.trim(),
                    ingredients: formData.ingredients,
                    method: formData.method.trim(),
                }),
            });
            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.error || 'Something went wrong. Please try again.');
            }
            router.push('/mycocktails');
        } catch (err) {
            setError(err.message);
            setSaving(false);
        }
    };

    const ingredientList = formData.ingredients
        .split(',')
        .map((ingredient) => ingredient.trim())
        .filter(Boolean);
    const imageUrl = formData.cocktailImage.trim();
    const showPreview = /^https?:\/\//.test(imageUrl) && !imageFailed;

    return (
        <form className={styles.card} onSubmit={handleAddCocktail} noValidate>
            <header className={styles.header}>
                <Link href="/mycocktails" className={styles.backButton} aria-label="Back to My Cocktails">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 12H5" />
                        <path d="M11 6l-6 6 6 6" />
                    </svg>
                </Link>
                <h1 className={styles.title}>New cocktail</h1>
            </header>

            <div className={styles.field}>
                <label htmlFor="cocktailName" className={styles.label}>Cocktail name</label>
                <input
                    id="cocktailName"
                    className={styles.input}
                    type="text"
                    name="cocktailName"
                    placeholder="e.g. Life's a Beach"
                    value={formData.cocktailName}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="ingredients" className={styles.label}>Ingredients</label>
                <input
                    id="ingredients"
                    className={styles.input}
                    type="text"
                    name="ingredients"
                    placeholder="e.g. rum, mango, soda"
                    value={formData.ingredients}
                    onChange={handleChange}
                    aria-describedby="ingredientsHint"
                    autoComplete="off"
                />
                <p id="ingredientsHint" className={styles.hint}>Separate each ingredient with a comma.</p>
                {ingredientList.length > 0 && (
                    <ul className={styles.pills} aria-label="Ingredients preview">
                        {ingredientList.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                )}
            </div>

            <div className={styles.field}>
                <label htmlFor="method" className={styles.label}>Method</label>
                <textarea
                    id="method"
                    className={`${styles.input} ${styles.textarea}`}
                    name="method"
                    rows={4}
                    placeholder="e.g. Shake everything with ice and strain into a tall glass."
                    value={formData.method}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="cocktailImage" className={styles.label}>Image link</label>
                <input
                    id="cocktailImage"
                    className={styles.input}
                    type="url"
                    name="cocktailImage"
                    placeholder="https://…"
                    value={formData.cocktailImage}
                    onChange={handleChange}
                    aria-describedby="imageHint"
                    autoComplete="off"
                />
                <p id="imageHint" className={styles.hint}>Paste a link to a photo of your cocktail (optional).</p>
                {showPreview && (
                    <img
                        className={styles.preview}
                        src={imageUrl}
                        alt="Preview of your cocktail"
                        onError={() => setImageFailed(true)}
                    />
                )}
                {imageFailed && <p className={styles.hint}>That link doesn't look like an image.</p>}
            </div>

            {error && <p className={styles.error} role="alert">{error}</p>}

            <button type="submit" className={styles.submit} disabled={saving}>
                {saving ? 'Adding…' : <>Add cocktail <span aria-hidden="true">🍸</span></>}
            </button>
        </form>
    );
}
