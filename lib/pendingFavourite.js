// Remembers a favourite that a signed-out user tried to save, so it can be
// saved automatically once they come back from signing in.
//
// sessionStorage survives the round trip to Google and back in the same tab,
// and is cleared when the tab is closed. Storage can be unavailable (private
// mode, blocked site data), so every access is wrapped in try/catch.

const KEY = "cincin:pendingFavourite";
const MAX_AGE_MS = 30 * 60 * 1000; // ignore anything older than 30 minutes

export function rememberPendingFavourite({ idDrink, strDrink, strDrinkThumb }) {
    try {
        sessionStorage.setItem(KEY, JSON.stringify({ idDrink, strDrink, strDrinkThumb, savedAt: Date.now() }));
    } catch {
        // Storage unavailable – the user just has to tap the heart again after signing in
    }
}

export function takePendingFavourite() {
    try {
        const raw = sessionStorage.getItem(KEY);
        if (!raw) return null;
        sessionStorage.removeItem(KEY);
        const pending = JSON.parse(raw);
        if (!pending?.idDrink || Date.now() - pending.savedAt > MAX_AGE_MS) return null;
        return pending;
    } catch {
        return null;
    }
}
