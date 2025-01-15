import {Article} from "./types.ts";

/**
 * Normalizes and transforms a collection of article objects from various APIs into a consistent structure.
 *
 * @description
 * - Processes articles from three supported APIs (`newsApi`, `guardianApi`, and `nytApi`) to create a unified data structure.
 * - Filters out articles with incomplete or invalid data (e.g., when the title is marked as "[Removed]").
 * - Extracts and maps specific properties from the API response to a predefined schema for consistent downstream usage.
 * - Gathers metadata such as author, category, and source using helper functions (`getAuthorsGategoriesAndSources`).
 * - Applies formatting utilities (`formatDate`) for the published date values where applicable.
 */
export const normalizeArticles = (articles: Article[], source: string) => {
  return articles
    .map((article: any) => {
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

/**
 * Truncates a given text to a specified word limit and appends ellipsis
 * if the text exceeds the limit.
 *
 * @param {string | undefined} text
 * @param {number} wordLimit
 * @returns {string}
 */
export const truncateDescription = (text: string | undefined, wordLimit: number): string => {
  if (!text) return ""; // Handle undefined text
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
}

/**
 * Extracts the source domain from a given URL.
 *
 * @param {string} url The URL string from which the source domain will be extracted.
 * @return {string} The extracted source domain if a match is found, otherwise returns "Unknown".
 */
function getSource(url: string) {
  // eslint-disable-next-line no-useless-escape
  const regex = /https?:\/\/(?:www\.)?([^\/]+)/;
  const match = url.match(regex);
  return match ? match[1] : "Unknown";
}

/**
 * Formats an ISO 8601 date string into a DD/MM/YYYY format.
 *
 * @param {string} isoString - The ISO 8601 formatted date string to be converted.
 * @return {string} The formatted date string in DD/MM/YYYY format.
 */
export function formatDate(isoString: string) {
  const date = new Date(isoString); // Convert ISO string to Date object
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based, add 1
  const day = String(date.getDate()).padStart(2, "0"); // Day of the month
  const year = date.getFullYear(); // Full year

  return `${day}/${month}/${year}`; // Return formatted date
}

/**
 * A collection object that organizes sets of unique data.
 *
 * @property {Set<string>} authors
 * @property {Set<string>} categories
 * @property {Set<string>} sources
 */
export const collection = {
  authors: new Set<string>(), // Using Set to prevent duplicates
  categories: new Set<string>(),
  sources: new Set<string>(),
}

/**
 * Processes and adds data to the appropriate collection based on the specified type.
 *
 * @param {string | { name?: string } | null | undefined} data
 * @param {"author" | "category" | "source"} type
 * @throws {Error} Throws an error if the specified type is not recognized.
 */
export const getAuthorsGategoriesAndSources = (
  data: string | { name?: string } | null | undefined,
  type: "author" | "category" | "source"
) => {
  if (!data) return; // Ignore null or undefined values
  switch (type) {
    case "author":
      collection.authors.add((typeof data === "string" ? data : data.name || "").trim());
      break;
    case "category":
      collection.categories.add((typeof data === "string" ? data : data.name || "").trim());
      break;
    case "source":
      collection.sources.add((typeof data === "string" ? data : data.name || "").trim());
      break;
    default:
      throw new Error(`Unknown type: ${type}`);
  }
}
