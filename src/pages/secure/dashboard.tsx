import React, {useEffect, useState} from "react";
import {fetchArticlesService} from "../../services/articleService";
import CardComponent from "../../components/card/card";
import {truncateDescription} from "../../utils/helpers";
import {useUser} from "../../context/context.tsx";

const Dashboard = () => {
  const {user} = useUser();
  const {articles, setArticles, setFilterData} = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user) {
      fetchArticles();
    }
  }, [user]);

  const fetchArticles = async (searchTerm) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const {articles: fetchedArticles, filterData: fetchedFilterData} =
        await fetchArticlesService(searchTerm);

      let filteredArticles = fetchedArticles;

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

      setArticles(filteredArticles);
      setFilterData(fetchedFilterData);
    } catch (error) {
      setErrorMessage(
        error.message || "Failed to fetch articles. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container custom-top-padding">
      <div className="row justify-content-lg-center">
        <div className="col-lg-6">
          <div>
            <h1>Current Customization</h1>
          </div>
          <div className="preferences d-flex flex-column">
          {user?.preferences?.authors?.length > 0 && (
              <div className="mb-2">
                <strong>Authors:</strong>
                {user.preferences.authors.map((author, index) => (
                  <span key={index} className="badge badge-primary m-1">
                  {author}
                </span>
                ))}
              </div>
            )}
            {user?.preferences?.categories?.length > 0 && (
              <div className="mb-2">
                <strong>Categories:</strong>
                {user.preferences.categories.map((category, index) => (
                  <span key={index} className="badge badge-secondary m-1">
                  {category}
                </span>
                ))}
              </div>
            )}
            {user?.preferences?.sources?.length > 0 && (
              <div className="mb-2">
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
        <div className="col col-md-6 col-lg-6">
          <div className="mb-3">
            <h1>News Feed</h1>
          </div>
          <div>
            {isLoading && (
              <div>
                <p className="loading text-center">Loading articles...</p>
              </div>
            )}
            {errorMessage && (
              <div>
                <p className="error text-center">{errorMessage}</p>
              </div>
            )}
            {!isLoading &&
              articles.map((article, index) => (
                <div key={index} className="mb-4">
                  <CardComponent
                    title={
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover-shadow"
                      >
                        <h3>{article.title}</h3>
                      </a>
                    }
                    description={truncateDescription(article.description, 20)}
                    imageUrl={article.imageUrl}
                    footer={
                      <span className="badge badge-info">{article.source}</span>
                    }
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
