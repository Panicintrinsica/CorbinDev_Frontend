export interface Article {
  title: string;
  shortContent: string;
  fullContent: string;
  category: string;
  tags: string[];
  slug: string;
  isPublished: boolean;
  author: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ArticleStub {
  title: string;
  shortContent: string;
  category: string;
  slug: string;
  isPublished: boolean;
}

export interface ArticlePage {
  Articles: ArticleStub[];
  count: string;
}
