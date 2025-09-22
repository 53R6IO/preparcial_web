"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AuthorForm, { AuthorFormValues } from "@/components/AuthorForm";
import { useAuthorsStore } from "@/lib/store";
import type { Author } from "@/types/Author";

export default function EditAuthorPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { getAuthor, updateAuthor } = useAuthorsStore();
  const [author, setAuthor] = useState<Author | null>(null);

  useEffect(() => {
    const id = Number(params.id);
    if (!id) return;
    (async () => setAuthor(await getAuthor(id)))();
  }, [params.id, getAuthor]);

  const onSubmit = async (data: AuthorFormValues) => {
    const id = Number(params.id);
    await updateAuthor(id, data);
    router.push("/authors");
  };

  if (!author) return <p>Cargando autor...</p>;

  return (
    <>
      <h1 className="mb-4 text-2xl font-semibold">Editar Autor</h1>
      <AuthorForm defaultValues={author} onSubmit={onSubmit} submitText="Actualizar" />
    </>
  );
}
