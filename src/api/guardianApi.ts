import axios from 'axios';
import { DEFAULT_CONFIG } from "../config/config.ts";

// Default config
const CONFIG = DEFAULT_CONFIG.guardian;

/**
 * Function for fetching Guardian articles with a query and additional params
 * @param query - User input for search
 * @param params - Additional parameters for filtering
 */
export const fetchGuardianArticles = (query: string, params: any) => {
  const url = `${CONFIG.baseUrl}/${CONFIG.endpoints.search}`;

  return axios.get(url, {
    params: { ...params, q: query, 'api-key': CONFIG.apiKey }, // Merge params
  }).then((response) => response.data.response.results);
};