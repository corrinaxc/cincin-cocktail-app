import styles from './EmptyState.module.css';

// A knocked-over martini glass, its last drops spilling and the olive rolling away
function SpilledGlass() {
    return (
        <svg className={styles.art} viewBox="0 0 160 110" aria-hidden="true">
            {/* table line */}
            <path className={styles.table} d="M6 96 H154" />
            {/* spill puddle */}
            <path className={styles.puddle} d="M6 96 c4 -6 18 -7 30 -5 c8 1 14 2 18 5 Z" />
            {/* martini glass lying on its side: rim and foot both resting on the table */}
            <g className={styles.glass} transform="translate(112 96) rotate(-75) translate(-38 -90)">
                <path d="M22 30 H82 L52 62 Z" />
                <path d="M52 62 V88" />
                <path d="M38 90 H66" />
            </g>
            {/* last drops */}
            <circle className={`${styles.drop} ${styles.drop1}`} cx="44" cy="84" r="3" />
            <circle className={`${styles.drop} ${styles.drop2}`} cx="36" cy="88" r="2.2" />
            {/* olive rolling away */}
            <g className={styles.olive}>
                <circle cx="138" cy="88" r="7.5" />
                <circle className={styles.pimento} cx="140" cy="86" r="2.4" />
            </g>
        </svg>
    );
}

// Friendly "nothing here" card in the same style as the recipe cards.
// `children` is for suggestion pills or a call-to-action button.
export default function EmptyState({ title, message, hint, children }) {
    return (
        <section className={styles.card} role="status">
            <SpilledGlass />
            <h2 className={styles.title}>{title}</h2>
            {message && <p className={styles.message}>{message}</p>}
            {hint && <p className={styles.hint}>{hint}</p>}
            {children && <div className={styles.actions}>{children}</div>}
        </section>
    );
}

export { styles as emptyStateStyles };
