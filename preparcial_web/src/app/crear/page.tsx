"use client";

import { useRouter } from "next/navigation";
import AuthorForm, { AuthorFormValues } from "@/components/AuthorForm";
import { useAuthorsStore } from "@/lib/store";

export default function CrearPage() {
  const router = useRouter();
  const { createAuthor } = useAuthorsStore();

  const onSubmit = async (data: AuthorFormValues) => {
    await createAuthor(data);
    router.push("/authors");
  };

  return (
    <>
      <h1 className="mb-4 text-2xl font-semibold">Crear Autor</h1>
      <AuthorForm onSubmit={onSubmit} submitText="Crear" />
    </>
  );
}
