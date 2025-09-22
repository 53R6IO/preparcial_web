const BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:8080/api";

export const api = {
  authors: `${BASE}/authors`,
};