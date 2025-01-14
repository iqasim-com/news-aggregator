import React from "react";

export type ArticleType = {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  source: string;
}; // Replace this with the actual structure of your `articles` array if it's different.

export type FilterDataType = {
  authors: string[];
  categories: string[];
  sources: string[];
};

export type UserContextType = {
  user: any; // Replace `any` with a proper type if known
  setUser: React.Dispatch<React.SetStateAction<any>>;
  articles: ArticleType[];
  setArticles: React.Dispatch<React.SetStateAction<ArticleType[]>>;
  filterData: FilterDataType;
  setFilterData: React.Dispatch<React.SetStateAction<FilterDataType>>;
  logout: () => void;
} | null;
