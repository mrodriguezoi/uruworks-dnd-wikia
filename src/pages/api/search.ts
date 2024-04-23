import type { Article } from "../../schema/articleSchemas";
import articles from "../../data/articles.json";
import { type APIRoute } from "astro";

export const POST: APIRoute = async ({ request }: { request: Request }): Promise<Response> => {
  const body = await request.json();
  const query = body.query;
  const all = body.all;

  const articleMap = new Map(articles.map((article) => [article.title, article]));

  // Iterate over each article and populate descriptions for related articles
  articles.forEach((article: Article) => {
    article.content.relatedArticles.forEach((relatedArticle) => {
      const relatedArticleData = articleMap.get(relatedArticle.title);
      if (relatedArticleData && relatedArticleData.content.mainContentArray.length > 0) {
        relatedArticle.description = relatedArticleData.content.mainContentArray[0].text;
      } else {
        relatedArticle.description = "Description not available";
      }
    });
  });

  if (query) {
    // Filter articles based on the query
    let filteredArticles = articles.filter((article: Article) =>
      article.title.toLowerCase().includes(query.toLowerCase())
    );
    return new Response(JSON.stringify(filteredArticles), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else if (all) {
    // Return all articles if the all query is present
    return new Response(JSON.stringify(articles), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    // Return a 400 Bad Request response if the query is absent or invalid
    return new Response("Bad Request", {
      status: 400,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
};
