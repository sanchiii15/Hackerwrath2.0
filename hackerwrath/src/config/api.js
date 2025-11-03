const BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://surgeless-mckenzie-moodier.ngrok-free.dev";

export async function apiFetch(path, options = {}) {
  const url = path.startsWith("http") ? path : `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  const defaultHeaders = {
    "ngrok-skip-browser-warning": "69420",
  };

  const merged = {
    method: options.method || "GET",
    mode: "cors",
    credentials: "omit",
    cache: "no-cache",
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
    body: options.body,
  };

  // Ensure Content-Type for JSON bodies
  if (merged.body && typeof merged.body === "string" && !merged.headers["Content-Type"]) {
    merged.headers["Content-Type"] = "application/json";
  }

  return fetch(url, merged);
}


