import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useSWRConfig } from 'swr';
import { takePendingFavourite } from '@/lib/pendingFavourite';
import styles from './PendingFavourite.module.css';

// After signing in, saves the favourite the user tapped while signed out
// (see FavouriteButton) and shows a little confirmation.
export default function PendingFavourite() {
    const { status } = useSession();
    const { mutate } = useSWRConfig();
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (status !== 'authenticated') return;
        const pending = takePendingFavourite();
        if (!pending) return;

        const { idDrink, strDrink, strDrinkThumb } = pending;
        fetch('/api/favourites', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idDrink, strDrink, strDrinkThumb }),
        })
            .then((response) => {
                if (!response.ok) throw new Error();
                return response.json();
            })
            .then((saved) => {
                // Show the filled heart everywhere without reloading the list
                mutate(
                    '/api/favourites',
                    (current) => [saved, ...(Array.isArray(current) ? current : []).filter((fav) => fav.idDrink !== idDrink)],
                    { revalidate: false }
                );
                setToast({ text: `Saved ${strDrink} to your favourites`, ok: true });
            })
            .catch(() => {
                setToast({ text: `Couldn't save ${strDrink} – tap the ♡ to try again`, ok: false });
            });
    }, [status, mutate]);

    useEffect(() => {
        if (!toast) return;
        const timer = setTimeout(() => setToast(null), 4000);
        return () => clearTimeout(timer);
    }, [toast]);

    if (!toast) return null;

    return (
        <div className={`${styles.toast} ${toast.ok ? '' : styles.error}`} role="status">
            <span className={styles.icon} aria-hidden="true">{toast.ok ? '♥' : '!'}</span>
            {toast.text}
        </div>
    );
}
