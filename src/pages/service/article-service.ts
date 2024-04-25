import type { Article } from "../../schema/articleSchemas";
import articles from "../../../data/articles.json";

class ArticleService {
  private map: Map<string, Article>;
  private categories: Array<string>;
  constructor() {
    this.map = new Map(articles.map((article) => [article.title, article]));
    this.categories = [];
    articles.forEach((article: Article) => {
      if (article.content.relatedArticles.length > 3)
        console.warn(`Article ${article.title} has more than 3 related articles`);
      article.content.relatedArticles.forEach((relatedArticle) => {
        const relatedArticleData = this.map.get(relatedArticle.title);
        if (relatedArticleData && relatedArticleData.content.mainContentArray.length > 0) {
          relatedArticle.description = relatedArticleData.content.mainContentArray[0].text;
        } else {
          relatedArticle.description = "Description not available";
        }
        if (!this.categories.includes(article.category)) {
          this.categories.push(article.category);
        }
      });
    });
  }

  getAllArticles() {
    return articles;
  }

  getArticlesByTitle(query: string) {
    let filteredArticles = articles.filter((article: Article) =>
      article.title.toLowerCase().includes(query.toLowerCase())
    );
    return filteredArticles;
  }

  getArticlesOfCategory(category: string, limit: number) {
    let filteredArticles = articles.filter((article: Article) => article.category === category).slice(0, limit);
    return filteredArticles;
  }

  //TODO: Deprecate, add pagination
  getAllArticlesOfCategory(category: string) {
    let filteredArticles = articles.filter((article: Article) => article.category === category);
    return filteredArticles;
  }

  getCategories() {
    return this.categories;
  }
}

export const articleService = new ArticleService();
