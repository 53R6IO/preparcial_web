"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      pathname === href ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="mx-auto max-w-4xl flex items-center justify-between px-4 py-3">
        <h1 className="text-lg font-bold text-blue-700">Bookstore CRUD</h1>
        <nav className="flex gap-2">
          <Link href="/authors" className={linkClass("/authors")}>
            Lista de Autores
          </Link>
          <Link href="/crear" className={linkClass("/crear")}>
            Crear Autor
          </Link>
        </nav>
      </div>
    </header>
  );
}