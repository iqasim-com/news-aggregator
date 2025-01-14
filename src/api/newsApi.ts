import axios from 'axios';
import { DEFAULT_CONFIG } from "../config/config.ts";
import {NewsApiParams} from "./types.ts";

const CONFIG = DEFAULT_CONFIG.news;

export const fetchNewsArticles = (query?: string, params?: NewsApiParams) => {
  const url = `${CONFIG.baseUrl}/${CONFIG.endpoints.everything}`;

  // Attach the query parameter to include user input and other params
  const queryParams = { ...params, q: query, 'apiKey': CONFIG.apiKey };

  return axios.get(url, {
    params: queryParams, // Add all parameters to the API call here
  }).then((response) => response.data.articles);
};
