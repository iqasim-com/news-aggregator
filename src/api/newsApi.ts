import axios from 'axios';
import { DEFAULT_CONFIG } from "../config/config.ts";

const CONFIG = DEFAULT_CONFIG.news;

export const fetchNewsArticles = (query: string) => {
  const url = `${CONFIG.baseUrl}/${CONFIG.endpoints.everything}?q=${query}&apiKey=${CONFIG.apiKey}`;
  return axios.get(url).then((response) => response.data.articles);
}
