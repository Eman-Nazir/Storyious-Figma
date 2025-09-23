export const calculateReadTime = (content) => {
  if (!content) return "0 min";

  const text = content.replace(/<[^>]+>/g, "").trim();
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).filter(Boolean).length;

  if (wordCount === 0) return "0 min";

  const time = wordCount / wordsPerMinute;
  return `${time.toFixed(1)} min`; 
};
