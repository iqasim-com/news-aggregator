import React, { useEffect, useState } from "react";
import { fetchArticlesService } from "../../services/articleService";
import CardComponent from "../../components/card/card";
import { truncateDescription } from "../../utils/helpers";
import { useUser } from "../../context/context.tsx";


const Dashboard = () => {
  const {user} = useUser();
  const { articles, setArticles, setFilterData } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    console.log('user', user);
    if(user) {
      fetchArticles()
    }
  }, [user]);

  const fetchArticles = async (searchTerm?: string) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const { articles: fetchedArticles, filterData: fetchedFilterData } = await fetchArticlesService(searchTerm);

      // Filter articles based on preferences
      const filteredArticles = fetchedArticles.filter((article) => {
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

      setArticles(filteredArticles); // Update articles in context
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
