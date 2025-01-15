
import { fetchNewsArticles } from "../api/newsApi";
import { fetchGuardianArticles } from "../api/guardianApi";
import { fetchNYTArticles } from "../api/nytApi";
import { normalizeArticles, collection } from "../utils/helpers";

/**
 * Asynchronously fetches and normalizes articles from multiple news APIs based on the provided search term.
 *
 * This function retrieves data from three external APIs (News API, The Guardian API, and New York Times API),
 * normalizes the articles using a common structure, and combines them into a single result set along with filtering data.
 *
 * @param {string} [searchTerm]
 * @returns {Promise<Object>}
 * @throws {Error}
 *
 */
export const fetchArticlesService = async (searchTerm?: string) => {
  try {
    const [newsApiResponse, guardianResponse, nytResponse] = await Promise.all([
      fetchNewsArticles(searchTerm || 'a', {}),
      fetchGuardianArticles(searchTerm, {}),
      fetchNYTArticles(searchTerm, {}),
    ]);

    const newsApiArticles = normalizeArticles(newsApiResponse, "newsApi");
    const guardianArticles = normalizeArticles(guardianResponse, "guardianApi");
    const nytArticles = normalizeArticles(nytResponse, "nytApi");

    // Combine filter data from all APIs
    const authorsArray = Array.from(collection.authors);
    const categoriesArray = Array.from(collection.categories);
    const sourcesArray = Array.from(collection.sources);

    return {
      articles: [...newsApiArticles, ...guardianArticles, ...nytArticles],
      filterData: {
        authors: authorsArray,
        categories: categoriesArray,
        sources: sourcesArray,
      },
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw new Error("Failed to fetch articles. Please try again later.");
  }
};
