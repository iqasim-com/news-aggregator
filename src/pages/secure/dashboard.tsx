import {useEffect, useState} from "react";
import {fetchArticlesService} from "../../services/articleService";
import CardComponent from "../../components/card/card";
import {truncateDescription} from "../../utils/helpers";
import {useUser} from "../../context/context.tsx";
import PreferencesDisplay from "../../components/preferenceDisplay/preferenceDisplay.tsx";
import {Article} from "../../utils/types.ts";

/**
 * The Dashboard component is responsible for rendering a customized dashboard
 * displaying user preferences and a news feed. It enables users to view their
 * preferred authors, categories, and sources and provides a news feed filtered
 * based on these preferences.
 */
const Dashboard = () => {
  const { user, articles, setArticles, setFilterData } = useUser()!;
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user) {
      fetchArticles();
    }
  }, [user]);

  /**
   * Asynchronously fetches articles based on the provided search term and user preferences.
   * Updates the loading state, error message, fetched articles, and filter data.
   * Filters the fetched articles according to the user's preferences for authors, categories, and sources if any preferences are set.
   *
   * @param {string} [searchTerm] - An optional search term used to query the articles.
   * @returns {Promise<void>} A promise that represents the completion of the fetch operation.
   */
  const fetchArticles = async (searchTerm?: string) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const {articles: fetchedArticles, filterData: fetchedFilterData} =
        await fetchArticlesService(searchTerm);

      let filteredArticles: any = fetchedArticles;

      if (
        user?.preferences &&
        (user.preferences.authors.length > 0 ||
          user.preferences.categories.length > 0 ||
          user.preferences.sources.length > 0)
      ) {
        filteredArticles = fetchedArticles.filter((article: any) => {
          const matchesAuthor = user.preferences.authors.some((author: string) =>
            article.authors?.includes(author)
          );
          const matchesCategory = user.preferences.categories.some((category: string) =>
            article.categories?.includes(category)
          );
          const matchesSource = user.preferences.sources.some((source: string) =>
            article.source?.includes(source)
          );
          return matchesAuthor || matchesCategory || matchesSource;
        });
      }

      setArticles(filteredArticles);
      setFilterData(fetchedFilterData);
    } catch (error) {
      setErrorMessage(
        "Failed to fetch articles. Please try again later."
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
            <div className="preferences d-flex flex-column">
              <PreferencesDisplay
                label="Authors"
                values={user?.preferences?.authors}
                badgeClass="badge-primary"
              />
              <PreferencesDisplay
                label="Categories"
                values={user?.preferences?.categories}
                badgeClass="badge-secondary"
              />
              <PreferencesDisplay
                label="Sources"
                values={user?.preferences?.sources}
                badgeClass="badge-info"
              />
            </div>
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
              articles.map((article: Article, index) => (
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
