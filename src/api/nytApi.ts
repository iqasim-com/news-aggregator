import axios from 'axios';
import { DEFAULT_CONFIG } from "../config/config.ts";
import {NYTApiParams} from "./types.ts";

const CONFIG = DEFAULT_CONFIG.nyt;

/**
 * Function for fetching NYT articles with a query and additional params
 * @param query - User input for search
 * @param params - Additional parameters for filtering
 */
export const fetchNYTArticles = (query?: string, params?: NYTApiParams) => {
  const url = `${CONFIG.baseUrl}/articlesearch.json`;

  return axios.get(url, {
    params: { ...params, q: query, 'api-key': CONFIG.apiKey }, // Merge params
  }).then((response) => response.data.response.docs);
};
