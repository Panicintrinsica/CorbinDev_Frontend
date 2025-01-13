export interface Article {
  title: string;
  date: string;
  uri: string;
  aboveFold: string;
  belowFold?: string;
  category: string;
  tags: string[];
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface ArticlePage {
  data: Article[];
  meta: {
    size: number;
    page: number;
    totalPages: number;
    isFirstPage: boolean;
    isLastPage: boolean;
  };
}

export interface ArticleSearchResults {
  totalCount: number;
  records: Article[];
}
