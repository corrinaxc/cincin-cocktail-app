// Turns free-form fridge input ("Gin and tonic", "gin lime juice; limes")
// into the comma-separated format TheCocktailDB filter expects
// ("Gin,Tonic_Water" / "Gin,Lime_Juice,Lime").

const HARD_SEPARATORS = /[,;&+/\n|]+/;
const CONNECTOR_WORDS = new Set(["and", "with", "n", "or", "some", "a", "an"]);
const ALIASES = {
  coke: "Coca-Cola",
  cola: "Coca-Cola",
  "7up": "7-up",
  "7 up": "7-up",
  oj: "Orange Juice",
  tonic: "Tonic Water",
  soda: "Soda Water",
  prosecco: "Prosecco",
};

function safeDecode(text) {
  try {
    return decodeURIComponent(text);
  } catch {
    return text; // e.g. "100% juice"
  }
}

function singular(word) {
  if (word.endsWith("ies")) return word.slice(0, -3) + "y"; // cherries -> cherry
  if (word.endsWith("oes")) return word.slice(0, -2); // potatoes -> potato
  if (word.endsWith("s") && !word.endsWith("ss")) return word.slice(0, -1); // limes -> lime
  return word;
}

// Find the canonical name for a single unrecognised word, e.g. "tonic" -> "Tonic Water"
function matchSingleWord(word, lookup, knownNames) {
  for (const candidate of [word, singular(word)]) {
    if (lookup.has(candidate)) return lookup.get(candidate);
  }
  for (const candidate of [word, singular(word)]) {
    const startsWithWord = knownNames
      .filter((name) => name.toLowerCase().split(" ")[0] === candidate)
      .sort((a, b) => a.length - b.length);
    if (startsWithWord.length) return startsWithWord[0];
  }
  return null;
}

export function splitIngredients(input, knownIngredients = []) {
  const lookup = new Map(knownIngredients.map((name) => [name.toLowerCase(), name]));
  for (const [alias, name] of Object.entries(ALIASES)) {
    if (!lookup.has(alias)) lookup.set(alias, name);
  }
  const maxWords = Math.max(1, ...knownIngredients.map((name) => name.split(" ").length));
  const result = [];

  const chunks = safeDecode(input)
    .replace(/_/g, " ")
    .toLowerCase()
    .split(HARD_SEPARATORS);

  for (const chunk of chunks) {
    const words = chunk.trim().split(/\s+/).filter(Boolean);
    let unknown = [];
    const flushUnknown = () => {
      const phrase = unknown.join(" ");
      if (/[a-z]/.test(phrase)) result.push(phrase); // ignore things like "100%"
      unknown = [];
    };

    let i = 0;
    while (i < words.length) {
      // Longest known ingredient starting at this word, e.g. "lime juice" before "lime"
      let matched = null;
      for (let len = Math.min(maxWords, words.length - i); len > 1 && !matched; len--) {
        const phrase = words.slice(i, i + len).join(" ");
        if (lookup.has(phrase)) matched = { name: lookup.get(phrase), len };
      }
      if (!matched && !CONNECTOR_WORDS.has(words[i])) {
        const name = matchSingleWord(words[i], lookup, knownIngredients);
        if (name) matched = { name, len: 1 };
      }

      if (matched) {
        flushUnknown();
        result.push(matched.name);
        i += matched.len;
      } else if (CONNECTOR_WORDS.has(words[i])) {
        flushUnknown();
        i += 1;
      } else {
        unknown.push(words[i]); // keep unrecognised phrases together
        i += 1;
      }
    }
    flushUnknown();
  }

  return [...new Set(result)];
}

export function formatIngredientsQuery(input, knownIngredients) {
  return splitIngredients(input, knownIngredients)
    .map((name) => encodeURIComponent(name.replace(/ /g, "_")))
    .join(",");
}
