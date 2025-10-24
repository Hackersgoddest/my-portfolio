// Text utility functions
export const truncateText = (text, numWords) => {
  if (text.length <= numWords) {
    return text;
  }
  return text.slice(0, numWords) + '...';
};