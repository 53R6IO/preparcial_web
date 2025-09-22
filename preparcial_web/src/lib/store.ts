import { create } from "zustand";
import { Author } from "@/types/Author";
import { api } from "./api";

type State = {
  authors: Author[];
  loading: boolean;
  fetchAuthors: () => Promise<void>;
  getAuthor: (id: number) => Promise<Author | null>;
  createAuthor: (data: Omit<Author, "id">) => Promise<void>;
  updateAuthor: (id: number, data: Omit<Author, "id">) => Promise<void>;
  deleteAuthor: (id: number) => Promise<void>;
};

export const useAuthorsStore = create<State>((set, get) => ({
  authors: [],
  loading: false,

  fetchAuthors: async () => {
    set({ loading: true });
    const res = await fetch(api.authors, { cache: "no-store" });
    const data: Author[] = await res.json();
    set({ authors: data, loading: false });
  },

  getAuthor: async (id) => {
    const local = get().authors.find(a => a.id === id);
    if (local) return local;
    const res = await fetch(`${api.authors}/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as Author;
  },

  createAuthor: async (data) => {
    const res = await fetch(api.authors, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("No se pudo crear el autor");
    await get().fetchAuthors();
  },

  updateAuthor: async (id, data) => {
    const res = await fetch(`${api.authors}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("No se pudo actualizar el autor");
    await get().fetchAuthors();
  },

  deleteAuthor: async (id) => {
    const res = await fetch(`${api.authors}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("No se pudo eliminar el autor");
    set(s => ({ authors: s.authors.filter(a => a.id !== id) }));
  },
}));