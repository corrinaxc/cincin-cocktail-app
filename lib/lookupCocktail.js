// Fetches full details for one drink from TheCocktailDB, remembering results so
// repeat views are instant. Never throws: a failed lookup resolves to null (the
// card then just shows without ingredients) and is retried next time.
const lookupCache = new Map();

export function lookupCocktail(idDrink) {
    if (!lookupCache.has(idDrink)) {
        const request = fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`)
            .then((res) => (res.ok ? res.json() : null))
            .catch(() => null)
            .then((data) => {
                if (!data) lookupCache.delete(idDrink);
                return data;
            });
        lookupCache.set(idDrink, request);
    }
    return lookupCache.get(idDrink);
}
