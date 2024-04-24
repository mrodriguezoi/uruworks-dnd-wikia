import { type APIRoute } from "astro";
import { articleService } from "./service/article-service";

export const POST: APIRoute = async ({ request }: { request: Request }): Promise<Response> => {
  const body = await request.json();
  if (body.query) {
    return new Response(JSON.stringify(articleService.getArticlesByTitle(body.query)), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    return new Response("Bad Request", { status: 400, headers: { "Content-Type": "text/plain" } });
  }
};
