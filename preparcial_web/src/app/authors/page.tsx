"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useAuthorsStore } from "@/lib/store";

export default function AuthorsPage() {
  const { authors, loading, fetchAuthors, deleteAuthor } = useAuthorsStore();

  useEffect(() => { fetchAuthors(); }, [fetchAuthors]);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Autores</h1>

      {loading && <p>Cargando...</p>}
      {!loading && authors.length === 0 && <p>No hay autores.</p>}

      <ul className="grid gap-3">
        {authors.map(a => (
          <li key={a.id} className="rounded border bg-white p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium">{a.name}</p>
                <p className="text-sm text-gray-600">{a.birthDate}</p>
                <p className="mt-1 text-sm">{a.description}</p>
              </div>
              <div className="flex gap-2">
                <Link className="rounded border px-3 py-1" href={`/authors/${a.id}`}>Editar</Link>
                <button className="rounded border px-3 py-1 text-red-600"
                        onClick={() => deleteAuthor(a.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
