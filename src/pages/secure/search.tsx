import { useLocation } from "react-router-dom";
import { useState } from "react";
import { fetchNewsArticles } from "../../api/newsApi.ts";
import { fetchGuardianArticles } from "../../api/guardianApi.ts";
import { fetchNYTArticles } from "../../api/nytApi.ts";
import { normalizeArticles, truncateDescription } from "../../utils/helpers.ts";
import InputComponent from "../../components/input/inputComponent.tsx";
import CardComponent from "../../components/card/card.tsx";
import {useUser} from "../../context/context.tsx";

const Search = () => {
  const {user} = useUser()

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Handle errors in the UI

  const fetchArticles = async (searchTerm: string) => {
    if (!searchTerm) {
      setArticles([]);
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    try {
      const [newsApiResponse, guardianResponse, nytResponse] = await Promise.all([
        fetchNewsArticles(searchTerm, {}),
        fetchGuardianArticles(searchTerm, {}),
        fetchNYTArticles(searchTerm, {}),
      ]);

      // Normalize the data from all APIs
      const newsApiArticles = normalizeArticles(newsApiResponse, "newsApi");
      const guardianArticles = normalizeArticles(guardianResponse, "guardianApi");
      const nytArticles = normalizeArticles(nytResponse, "nytApi");

      debugger;

      // Combine all articles
      setArticles([...newsApiArticles, ...guardianArticles, ...nytArticles]);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setErrorMessage("Failed to fetch articles. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return user ? (
    <div className="container">
      <div className="content">
        <div className="text-center">
          <h1>Search News</h1>
          <InputComponent
            name="searchNews"
            placeholder="Search for news"
            onChange={(e) => fetchArticles(e.target.value)}
            debounceDelay={2000}
            inputClass="input-styles w-50"
            isLoading={isLoading}
          />
        </div>
      </div>
      <div className="content search-results">
        {isLoading ? (
          <p>Loading articles...</p>
        ) : errorMessage ? (
          <p className="error-message">{errorMessage}</p>
        ) : articles.length === 0 ? (
          <p>No articles found for your search.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "16px",
              gridTemplateColumns: "repeat(3, 1fr)",
            }}
          >
            {articles.map((article, index) => (
              <CardComponent
                key={index}
                title={
                  <a href={article.link} target="_blank" rel="noopener noreferrer">
                    <h3>{article.title}</h3>
                  </a>
                }
                description={truncateDescription(article.description, 20)}
                imageUrl={article.imageUrl}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  ) : (
    <p>User not found. Please log in to access the dashboard.</p>
  );
};

export default Search;