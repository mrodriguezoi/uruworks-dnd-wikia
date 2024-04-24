const vercelUrl = import.meta.env.VERCEL_URL || null;
const localHost = import.meta.env.VITE_LOCAL_HOST || null;
const host = `http${vercelUrl ? "s" : ""}://${vercelUrl ? vercelUrl : localHost}/api`;

class ApiHeader extends Headers {
  constructor(aditionalHeaders?: Record<string, string>) {
    super();
    this.append("Content-Type", "application/json");
    if (aditionalHeaders) {
      for (const [key, value] of Object.entries(aditionalHeaders)) {
        this.append(key, value);
      }
    }
  }
}

function newRequestInit(method: string, body?: string, aditionalHeaders?: Record<string, string>): RequestInit {
  return {
    method: method,
    headers: new ApiHeader(aditionalHeaders),
    body: body,
    redirect: "follow",
  };
}

export async function getArticlesOfCategory(category: string, limit?: number) {
  let body: { category: string; limit?: number } = { category: category };
  if (limit) {
    body.limit = limit;
  }
  const raw = JSON.stringify(body);
  const response = await fetch(`${host}/category`, newRequestInit("POST", raw));
  return await response.json();
}

export async function queryArticles(query: string) {
  let body = { query: query };
  const raw = JSON.stringify(body);
  const response = await fetch(`${host}/query-articles`, newRequestInit("POST", raw));
  return await response.json();
}

export async function getCategories() {
  const response = await fetch(`${host}/get-categories`, newRequestInit("GET"));
  return await response.json();
}

export async function getAllArticles() {
  const response = await fetch(`${host}/all-articles`, newRequestInit("GET"));
  return await response.json();
}
