// src/services/articleService.ts
import { fetchNewsArticles } from "../api/newsApi";
import { fetchGuardianArticles } from "../api/guardianApi";
import { fetchNYTArticles } from "../api/nytApi";
import { normalizeArticles, collection } from "../utils/helpers";

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
