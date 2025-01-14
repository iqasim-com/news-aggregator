// src/components/Search.tsx
import {useState} from "react";
import {fetchArticlesService} from "../../services/articleService";
import InputComponent from "../../components/input/inputComponent";
import CardComponent from "../../components/card/card";
import {useUser} from "../../context/context";
import FilterComponent from "../../components/filters/filters";
import {truncateDescription} from "../../utils/helpers";
import {Link} from "react-router-dom";
import {Article} from "../../utils/types.ts";

/**
 * The Search component provides functionality to search for articles based on a search term
 * and apply various filters such as date, author, category, and source.
 * It displays the search results along with filter options for further refinement.
 * The component manages state for articles, filters, loading status, and error messages.
 * Users must be logged in to access this functionality.
 */
const Search = () => {
  const {user} = useUser()!;
  const [filters, setFilters] = useState({date: "", author: "", category: "", source: ""});
  const [filterData, setFilterData] = useState({authors: [], categories: [], sources: []});
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Fetches a list of articles based on the provided search term.
   * Sets the application state to handle loading, errors, and fetched data such as articles and filter information.
   *
   * @async
   * @function fetchArticles
   * @param {string} [searchTerm]
   * @returns {Promise<void>}
   * @throws {Error}
   */
  const fetchArticles = async (searchTerm?: string) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const {articles, filterData}: any = await fetchArticlesService(searchTerm);
      setArticles(articles);
      setFilterData(filterData);
    } catch (error) {
      setErrorMessage("Failed to fetch articles. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * A filtered set of articles based on specified filter criteria.
   *
   * The variable `filteredArticles` is derived by applying a filter operation on the `articles` array.
   * It evaluates each article against the provided filters: `date`, `author`, `category`, and `source`.
   *
   * Each filter is optional. If a filter is not provided (falsy value), it is ignored in the filtering process.
   *
   * @type {Array<Object>}
   */
  const filteredArticles = articles.filter((article: any) => {
    const {date, author, category, source} = filters;
    return (
      (!date || article.publishedAt.startsWith(date)) &&
      (!author || article.author === author) &&
      (!category || article.category === category) &&
      (!source || article.source === source)
    );
  });

  return user ? (
    <div className="container custom-top-padding">
      <div className="row">
        <div className="col">
          <div className="text-center mb-3">
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
      </div>
      <div className="row">
        {isLoading ? (
          <p>Loading articles...</p>
        ) : errorMessage ? (
          <p className="error-message">{errorMessage}</p>
        ) : filteredArticles.length === 0 ? (
          <p>No articles found for your search.</p>
        ) : (
          <>
            {filteredArticles.map((article, index) => (
              <div className="col col-lg-6 p-2">
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
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  ) : (
    <>
      <div className="d-flex justify-content-center align-items-center h-100 flex-column">
        <p className="mb-3">User not found. Please log in to access News.</p>
        <Link to={'/login'}>
          <button>Login</button>
        </Link>
      </div>
    </>
  );
};

export default Search;
