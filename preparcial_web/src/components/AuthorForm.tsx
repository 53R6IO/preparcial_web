"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Author } from "@/types/Author";

const schema = z.object({
  name: z.string().min(2, "Nombre muy corto"),
  birthDate: z.string().min(1, "Fecha requerida"),
  description: z.string().min(5, "Descripción muy corta"),
  image: z.string().url("Debe ser una URL válida").optional().or(z.literal("")),
});

export type AuthorFormValues = z.infer<typeof schema>;

export default function AuthorForm({
  defaultValues,
  submitText = "Guardar",
  onSubmit,
}: {
  defaultValues?: Partial<Author>;
  submitText?: string;
  onSubmit: (data: AuthorFormValues) => Promise<void> | void;
}) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<AuthorFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", birthDate: "", description: "", image: "" },
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        name: defaultValues.name ?? "",
        birthDate: defaultValues.birthDate ?? "",
        description: defaultValues.description ?? "",
        image: defaultValues.image ?? "",
      });
    }
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 max-w-xl">
      <div>
        <label className="block text-sm font-medium">Nombre</label>
        <input className="mt-1 w-full rounded border p-2" {...register("name")} />
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Fecha de nacimiento</label>
        <input type="date" className="mt-1 w-full rounded border p-2" {...register("birthDate")} />
        {errors.birthDate && <p className="text-sm text-red-600">{errors.birthDate.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Descripción</label>
        <textarea className="mt-1 w-full rounded border p-2" rows={4} {...register("description")} />
        {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Imagen (URL)</label>
        <input className="mt-1 w-full rounded border p-2" {...register("image")} />
        {errors.image && <p className="text-sm text-red-600">{errors.image.message}</p>}
      </div>

      <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">{submitText}</button>
    </form>
  );
}
