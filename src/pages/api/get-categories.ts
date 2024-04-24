import { type APIRoute } from "astro";
import { articleService } from "./service/article-service";

export const GET: APIRoute = async ({ request }: { request: Request }): Promise<Response> =>
  new Response(JSON.stringify(articleService.getCategories()), {
    headers: {
      "Content-Type": "application/json",
    },
  });
