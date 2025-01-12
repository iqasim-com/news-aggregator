export const normalizeArticles = (articles, source) => {
  return articles
    .map((article) => {
      if (source === "newsApi" && article.title !== "[Removed]") {
        return {
          title: article.title || "Default Title", // Map from newsApi's structure
          description: article.description || "No description available",
          imageUrl: article.urlToImage || "https://placehold.co/400",
          link: article.url || "#",
        };
      } else if (source === "guardianApi") {
        return {
          title: article.webTitle || "Default Title", // Map from guardianApi's structure
          description: article.fields?.trailText || "No description available",
          imageUrl: article.fields?.thumbnail || "https://placehold.co/400",
          link: article.webUrl || "#",
        };
      } else if (source === "nytApi") {
        return {
          title: article.headline.print_headline || "Default Title", // Map from guardianApi's structure
          description: article.abstract || "No description available",
          imageUrl: article.fields?.thumbnail || "https://placehold.co/400",
          link: article.web_url || "#",
        };
      }
      return null; // Use null instead of an empty object
    })
    .filter(Boolean); // Remove any null values from the array
}

export const truncateDescription = (text: string, wordLimit: number) => {
  const words = text.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return text;
};