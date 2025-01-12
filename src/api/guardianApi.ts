// Imports
import axios from 'axios';
import {DEFAULT_CONFIG} from "../config/config.ts";

// Default config
const CONFIG = DEFAULT_CONFIG.guardian

/**
 * Function for fetching articles, expecting following
 * @param query
 */
export const fetchGuardianArticles = (
  query: string
) => {
  const url = `${CONFIG.baseUrl}/${CONFIG.endpoints.search}?q=${query}&api-key=${CONFIG.apiKey}`;
  return axios.get(url).then((response) => response.data.response.results);
}
