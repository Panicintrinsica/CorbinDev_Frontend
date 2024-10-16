export interface Article {
  id: string;
  slug: string;
  title: string;
  aboveFold: string;
  content: string;
  tags: string[];
  category: string;
  xata: {
    createdAt: string;
    updatedAt: string;
    version: number;
  };
}

export interface ArticlePage {
  meta: {
    page: {
      cursor: string;
      more: boolean;
      size: number;
    };
  };
  records: Partial<Article>[];
}

export interface ArticleSearchResults {
  totalCount: number;
  records: Partial<Article>[];
}
