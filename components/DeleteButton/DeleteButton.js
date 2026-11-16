import { useEffect, useRef, useState } from 'react';
import styles from './DeleteButton.module.css';

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16" />
      <path d="M9 7V4.5h6V7" />
      <path d="M6 7l1 13h10l1-13" />
      <path d="M10 11v5.5M14 11v5.5" />
    </svg>
  );
}

// First click asks "Delete?", second click deletes. It resets if the user
// clicks away or waits a few seconds, so nothing is removed by accident.
export default function DeleteButton({ onDelete, label = 'cocktail' }) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!confirming) return;
    const timer = setTimeout(() => setConfirming(false), 4000);
    const handleOutside = (event) => {
      if (!buttonRef.current?.contains(event.target)) setConfirming(false);
    };
    document.addEventListener('pointerdown', handleOutside);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('pointerdown', handleOutside);
    };
  }, [confirming]);

  async function handleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    if (!confirming) {
      setConfirming(true);
      return;
    }
    setDeleting(true);
    try {
      await onDelete();
    } finally {
      setDeleting(false);
      setConfirming(false);
    }
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      className={`${styles.button} ${confirming ? styles.confirming : ''}`}
      onClick={handleClick}
      disabled={deleting}
      aria-label={confirming ? `Confirm delete ${label}` : `Delete ${label}`}
      title={confirming ? 'Click again to delete' : 'Delete'}
    >
      <TrashIcon />
      {confirming && <span className={styles.text}>{deleting ? 'Deleting…' : 'Delete?'}</span>}
    </button>
  );
}
