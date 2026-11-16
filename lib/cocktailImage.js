// TheCocktailDB serves smaller copies of every photo at /small (~200px) and
// /medium (~350px). The full-size originals are 700px and ~3x the file size,
// which is far bigger than anything the app displays.
export function sizedThumb(url, size = "medium") {
  if (!url || !url.includes("thecocktaildb.com/images/")) return url;
  if (/\/(small|medium|large)$/.test(url)) return url;
  return `${url}/${size}`;
}
