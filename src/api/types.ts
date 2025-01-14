export interface GuardianParams {
  section?: string;
  page?: number;
  pageSize?: number;
  orderBy?: 'newest' | 'oldest' | 'relevance'; // Specify valid values
  [key: string]: string | number | undefined; // Allow additional properties
}

// Define type for params for News API
export interface NewsApiParams {
  language?: string;
  sortBy?: 'relevancy' | 'popularity' | 'publishedAt'; // Specify valid values
  page?: number;
  pageSize?: number;
  [key: string]: string | number | undefined; // Allow additional properties
}

export interface NYTApiParams {
  fq?: string; // Filter query field (e.g., section, source, etc.)
  sort?: 'newest' | 'oldest' | 'relevance'; // Valid sort options
  page?: number;
  begin_date?: string; // Date should be in 'YYYYMMDD' format
  end_date?: string; // Date should be in 'YYYYMMDD' format
  [key: string]: string | number | undefined; // Allow additional properties
}
