export const normalizeArticles = (articles, source) => {
  return articles
    .map((article) => {
      if (source === "newsApi" && article.title !== "[Removed]") {
        getAuthorsGategoriesAndSources(article.author || "Unknown", 'author')
        getAuthorsGategoriesAndSources(article.category || "Unknown", 'category')
        getAuthorsGategoriesAndSources(article.source || "Unknown", 'source')
        return {
          title: article.title || "Default Title", // Map from newsApi's structure
          description: article.description || "No description available",
          imageUrl: article.urlToImage || "https://placehold.co/400",
          link: article.url || "#",
          author: article.author || "Unknown",
          category: article.category || "Unknown",
          source: article.source?.name || "Unknown",
          publishedAt: formatDate(article.publishedAt) || "Unknown",
        };
      } else if (source === "guardianApi") {
        getAuthorsGategoriesAndSources(article.fields != undefined ? article.fields.byline : "Unknown", 'author')
        getAuthorsGategoriesAndSources(article.pillarName || "Unknown", 'category')
        getAuthorsGategoriesAndSources(getSource(article.webUrl) || "Unknown", 'source')
        return {
          title: article.webTitle || "Default Title", // Map from guardianApi's structure
          description: article.fields?.trailText || "No description available",
          imageUrl: article.fields?.thumbnail || "https://placehold.co/400", // Adding placeholder image if not found
          link: article.webUrl || "#",
          author: article.fields != undefined ? article.fields.byline : "Unknown",
          category: article.pillarName || "Unknown",
          source: getSource(article.webUrl) || "Unknown",
          publishedAt: formatDate(article.webPublicationDate) || "Unknown",
        };
      } else if (source === "nytApi") {
        getAuthorsGategoriesAndSources(article.byline.original || "Unknown", 'author')
        getAuthorsGategoriesAndSources(article.news_desk || "Unknown", 'category')
        getAuthorsGategoriesAndSources(article.source || "Unknown", 'source');
        return {
          title: article.headline.main || "Default Title", // Map from guardianApi's structure
          description: article.abstract || "No description available",
          imageUrl: article.fields?.thumbnail || "https://placehold.co/400",
          link: article.web_url || "#",
          author: article.byline.original || "Unknown",
          category: article.section_name || "Unknown",
          source: article.source || "Unknown",
          publishedAt: formatDate(article.pub_date) || "Unknown",
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
}

function getSource(url: string) {
  const regex = /https?:\/\/(?:www\.)?([^\/]+)/;
  const match = url.match(regex);
  return match ? match[1] : "Unknown";
}

function formatDate(isoString) {
  const date = new Date(isoString); // Convert ISO string to Date object
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based, add 1
  const day = String(date.getDate()).padStart(2, "0"); // Day of the month
  const year = date.getFullYear(); // Full year

  return `${day}/${month}/${year}`; // Return formatted date
}

export const collection = {
  authors: new Set<string>(), // Using Set to prevent duplicates
  categories: new Set<string>(),
  sources: new Set<string>(),
};

export const getAuthorsGategoriesAndSources = (data: string | null | undefined, type: "author" | "category" | "source") => {
  if (!data) return; // Ignore null or undefined values
  switch (type) {
    case "author":
      collection.authors.add(data.trim()); // Add to Set, auto-handling duplicates
      break;
    case "category":
      collection.categories.add(data.trim());
      break;
    case "source":
      collection.sources.add(data.name ? data.name.trim(): data.trim());
      break;
    default:
      throw new Error(`Unknown type: ${type}`);
  }
};