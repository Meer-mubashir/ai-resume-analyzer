const STOP_WORDS = new Set([
  "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for",
  "of", "with", "by", "from", "as", "is", "was", "are", "were", "be",
  "been", "being", "have", "has", "had", "do", "does", "did", "will",
  "would", "can", "could", "should", "may", "might", "shall", "this",
  "that", "these", "those", "i", "me", "my", "we", "our", "you", "your",
  "he", "she", "it", "they", "them", "their", "its", "about", "just",
  "also", "very", "too", "not", "no", "if", "so", "up", "out", "all",
  "each", "every", "own", "same", "other", "more", "most", "such", "than",
  "into", "over", "after", "before", "between", "under", "above", "below",
]);

export function cleanText(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s#+.]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function extractKeywords(text) {
  const cleaned = cleanText(text);
  return cleaned
    .split(" ")
    .filter((word) => word.length > 1 && !STOP_WORDS.has(word));
}
