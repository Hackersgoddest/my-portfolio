// filters.js
export const truncateText = (text, numWords) => {
    const words = text.trim().split(/\s+/);
    const truncatedWords = words.slice(0, numWords);
    return truncatedWords.join(' ');
  };
  