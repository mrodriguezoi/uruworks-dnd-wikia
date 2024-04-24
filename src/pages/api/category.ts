import { type APIRoute } from "astro";
import { articleService } from "./service/article-service";

export const POST: APIRoute = async ({ request }: { request: Request }): Promise<Response> => {
  const body = await request.json();
  if (body.category) {
    if (body.limit) {
      return new Response(JSON.stringify(articleService.getArticlesOfCategory(body.category, body.limit)), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new Response(JSON.stringify(articleService.getAllArticlesOfCategory(body.category)), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } else {
    return new Response("Bad Request", { status: 400, headers: { "Content-Type": "text/plain" } });
  }
};
