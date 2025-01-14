import React, { useEffect, useState } from "react";
import { fetchArticlesService } from "../../services/articleService";
import CardComponent from "../../components/card/card";
import { truncateDescription } from "../../utils/helpers";
import { useUser } from "../../context/context.tsx";

const Dashboard = () => {
  const { user } = useUser();
  const { articles, setArticles, setFilterData } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user) {
      fetchArticles();
    }
  }, [user]);

  const fetchArticles = async (searchTerm?: string) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const { articles: fetchedArticles, filterData: fetchedFilterData } =
        await fetchArticlesService(searchTerm);

      let filteredArticles = fetchedArticles;

      // Check if preferences exist and are not empty
      if (
        user.preferences &&
        (user.preferences.authors.length > 0 ||
          user.preferences.categories.length > 0 ||
          user.preferences.sources.length > 0)
      ) {
        filteredArticles = fetchedArticles.filter((article) => {
          const matchesAuthor = user.preferences.authors.some((author) =>
            article.authors?.includes(author)
          );
          const matchesCategory = user.preferences.categories.some((category) =>
            article.categories?.includes(category)
          );
          const matchesSource = user.preferences.sources.some((source) =>
            article.source?.includes(source)
          );
          return matchesAuthor || matchesCategory || matchesSource;
        });
      }

      setArticles(filteredArticles); // Update articles in context
      setFilterData(fetchedFilterData); // Update filterData in context
    } catch (error) {
      setErrorMessage(
        error.message || "Failed to fetch articles. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div>
        <h1>News Feed</h1>
        <p>News being filtered based on your current customization:</p>
        <div className="preferences">
          {user?.preferences?.authors?.length > 0 && (
            <div>
              <strong>Authors:</strong>
              {user.preferences.authors.map((author, index) => (
                <span key={index} className="badge badge-primary m-1">
                  {author}
                </span>
              ))}
            </div>
          )}
          {user?.preferences?.categories?.length > 0 && (
            <div>
              <strong>Categories:</strong>
              {user.preferences.categories.map((category, index) => (
                <span key={index} className="badge badge-secondary m-1">
                  {category}
                </span>
              ))}
            </div>
          )}
          {user?.preferences?.sources?.length > 0 && (
            <div>
              <strong>Sources:</strong>
              {user.preferences.sources.map((source, index) => (
                <span key={index} className="badge badge-info m-1">
                  {source}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="feed">
        {isLoading && <p className="loading">Loading articles...</p>}
        {errorMessage && <p className="error">{errorMessage}</p>}
        {!isLoading &&
          articles.map((article, index) => (
            <CardComponent
              key={index}
              className="mb-4"
              title={
                <a href={article.link} target="_blank" rel="noopener noreferrer">
                  <h3>{article.title}</h3>
                </a>
              }
              description={truncateDescription(article.description, 20)}
              imageUrl={article.imageUrl}
              footer={
                <span className="badge badge-info">{article.source}</span>
              }
            />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
