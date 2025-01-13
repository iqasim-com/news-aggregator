// src/components/Search.tsx
import { useState } from "react";
import { fetchArticlesService } from "../../services/articleService";
import InputComponent from "../../components/input/inputComponent";
import CardComponent from "../../components/card/card";
import { useUser } from "../../context/context";
import FilterComponent from "../../components/filters/filters";
import { truncateDescription } from "../../utils/helpers";

const Search = () => {
  const { user } = useUser();
  const [filters, setFilters] = useState({ date: "", author: "", category: "", source: "" });
  const [filterData, setFilterData] = useState({ authors: [], categories: [], sources: [] });
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchArticles = async (searchTerm?: string) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const { articles, filterData } = await fetchArticlesService(searchTerm);
      setArticles(articles);
      setFilterData(filterData);
    } catch (error) {
      setErrorMessage(error.message || "Failed to fetch articles. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  const filteredArticles = articles.filter((article) => {
    const { date, author, category, source } = filters;
    return (
      (!date || article.publishedAt.startsWith(date)) &&
      (!author || article.author === author) &&
      (!category || article.category === category) &&
      (!source || article.source === source)
    );
  });

  return user ? (
    <div className="container-fluid">
      <div className="content">
        <div className="text-center">
          <h1>Search Articles</h1>
          <InputComponent
            name="searchNews"
            placeholder="Search for Articles"
            onChange={(e) => fetchArticles(e.target.value)}
            debounceDelay={2000}
            inputClass="input-styles w-50"
            isLoading={isLoading}
          />
        </div>
        {articles.length > 0 && (
          <FilterComponent
            onFilterChange={(selectedFilters) => setFilters(selectedFilters)}
            fetchAuthors={filterData.authors}
            fetchCategories={filterData.categories}
            fetchSources={filterData.sources}
          />
        )}
      </div>
      <div className="content search-results">
        {isLoading ? (
          <p>Loading articles...</p>
        ) : errorMessage ? (
          <p className="error-message">{errorMessage}</p>
        ) : filteredArticles.length === 0 ? (
          <p>No articles found for your search.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "16px",
              gridTemplateColumns: "repeat(3, 1fr)",
            }}
          >
            {filteredArticles.map((article, index) => (
              <CardComponent
                key={index}
                title={
                  <a href={article.link} target="_blank" rel="noopener noreferrer">
                    <h3>{article.title}</h3>
                  </a>
                }
                description={truncateDescription(article.description, 20)}
                imageUrl={article.imageUrl}
                footer={
                  <>
                    <p>Author: {article.author}</p>
                    <p>Category: {article.category}</p>
                    <p>Published At: {article.publishedAt}</p>
                    <p>Source: {article.source}</p>
                  </>
                }
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
