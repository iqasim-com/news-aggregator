export const DEFAULT_CONFIG = {
  news: {
    baseUrl: import.meta.env.VITE_NEWS_BASE_URL, // Base URL for News API
    apiKey: import.meta.env.VITE_NEWS_API_KEY, // API Key for News API
    endpoints: {
      everything: 'everything', // Endpoint for fetching all news
    },
  },
  guardian: {
    baseUrl: import.meta.env.VITE_THE_GUARDIAN_BASE_URL, // Base URL for The Guardian API
    apiKey: import.meta.env.VITE_THE_GUARDIAN_API_KEY, // API Key for The Guardian API
    endpoints: {
      search: 'search', // Endpoint for searching articles
      sections: 'sections', // Endpoint for retrieving sections,
    },
  },
  nyt: {
    baseUrl: import.meta.env.VITE_NEW_YORK_TIMES_BASE_URL, // Base URL for New York Times API
    apiKey: import.meta.env.VITE_NEW_YORK_TIMES_API_KEY, // API Key for New York Times API
    endpoints: {
      articles: 'articlesearch', // Endpoint for retrieving articles
    },
  },
  ui: {
    inputDebounceDelay: 2000
  }
}
