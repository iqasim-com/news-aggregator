import React, { useEffect, useState } from "react";
import { fetchArticlesService } from "../../services/articleService";
import CardComponent from "../../components/card/card";
import { truncateDescription } from "../../utils/helpers";
import {useUser} from "../../context/context.tsx";

const Dashboard = () => {
  const { articles, setArticles, setFilterData } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchArticles = async (searchTerm?: string) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const { articles: fetchedArticles, filterData: fetchedFilterData } = await fetchArticlesService(searchTerm);
      setArticles(fetchedArticles); // Update articles in context
      setFilterData(fetchedFilterData); // Update filterData in context
    } catch (error) {
      setErrorMessage(error.message || "Failed to fetch articles. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="container">
      <h1>News Feed</h1>
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
            />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
