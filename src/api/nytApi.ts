import axios from 'axios';
import {DEFAULT_CONFIG} from "../config/config.ts";

const CONFIG = DEFAULT_CONFIG.nyt

export const fetchNYTArticles = (
  query: string,
) => {
  const url = `${CONFIG}/articlesearch.json?q=${query}&api-key=${CONFIG}`;
  return axios.get(url).then((response) => response.data.response.docs);
}
