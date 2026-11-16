import { useEffect } from 'react';
import { useRouter } from 'next/router';

// 🍒 Easter egg: clicking any of the loose cherries in the background
// wallpaper opens /easter-egg.
//
// The wallpaper (body::before in globals.css) is one 1200×1200 image drawn with
// `background-size: cover`, centred and fixed to the viewport. That means we
// can work out where each cherry is on screen from the window size alone.

const IMAGE_SIZE = 1200;

// Centres and hit radii of the cherries, in wallpaper image pixels
const CHERRIES = [
    { x: 310, y: 100, r: 45 },  // pair, top left
    { x: 1114, y: 418, r: 28 }, // single, right
    { x: 409, y: 578, r: 28 },  // single, middle left
    { x: 802, y: 1016, r: 28 }, // single, bottom middle
    { x: 400, y: 1070, r: 45 }, // pair, bottom left
];

// Only clicks on the bare background count – not on cards, buttons or text
function isBackground(target) {
    return (
        target === document.documentElement ||
        target === document.body ||
        target?.id === '__next'
    );
}

function isOverCherry(clientX, clientY) {
    const width = document.documentElement.clientWidth;
    const height = window.innerHeight;
    const scale = Math.max(width, height) / IMAGE_SIZE; // "cover" for a square image
    const offsetX = (width - IMAGE_SIZE * scale) / 2;
    const offsetY = (height - IMAGE_SIZE * scale) / 2;
    const x = (clientX - offsetX) / scale;
    const y = (clientY - offsetY) / scale;
    return CHERRIES.some((cherry) => Math.hypot(cherry.x - x, cherry.y - y) <= cherry.r);
}

export default function CherryEasterEgg() {
    const router = useRouter();

    useEffect(() => {
        function handleClick(event) {
            if (isBackground(event.target) && isOverCherry(event.clientX, event.clientY)) {
                router.push('/easter-egg');
            }
        }

        // A subtle hint: the cursor turns into a pointer over a cherry
        function handleMove(event) {
            const over = isBackground(event.target) && isOverCherry(event.clientX, event.clientY);
            document.body.style.cursor = over ? 'pointer' : '';
        }

        document.addEventListener('click', handleClick);
        document.addEventListener('mousemove', handleMove);
        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('mousemove', handleMove);
            document.body.style.cursor = '';
        };
    }, [router]);

    return null;
}
