import type { Article } from "../../schema/articleSchemas";
import articles from "../../data/articles.json";
import { type APIRoute } from "astro";

export const POST: APIRoute = async ({ request }: { request: Request }): Promise<Response> => {
  // const query = request.headers.get("query");
  const body = await request.json();
  const query = body.query;
  if (query) {
    const filteredArticles = articles.filter((article: Article) =>
      article.title.toLowerCase().includes(query.toLowerCase())
    );
    return new Response(JSON.stringify(filteredArticles), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    return new Response("Bad Request", {
      status: 400,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
};
