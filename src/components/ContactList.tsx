import { useEffect, useState } from "react";
import ContactForm from "./ContactForm";

type Etiqueta = {
  id: number;
  nombre: string;
  color: string;
};

type Contact = {
  id: number;
  nombres: string;
  apellidos: string;
  email?: string;
  etiquetas?: Etiqueta[]; // 👈 ahora cada contacto puede traer sus etiquetas
};

interface Props {
  onSelect: (contact: Contact) => void;
}

export default function ContactList({ onSelect }: Props) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [allTags, setAllTags] = useState<Etiqueta[]>([]);
  const [showForm, setShowForm] = useState(false);
  const limit = 15;

  const loadContacts = async () => {
    let url = `http://localhost:4000/contactos?_page=${page}&_limit=${limit}`;
    if (search) url += `&q=${encodeURIComponent(search)}`;

    const res = await fetch(url);
    const total = res.headers.get("X-Total-Count");
    if (total) setTotalPages(Math.ceil(parseInt(total) / limit));
    let data: Contact[] = await res.json();

    // Traer todas las etiquetas
    const etiquetas: Etiqueta[] = await fetch(
      "http://localhost:4000/etiquetas"
    ).then((r) => r.json());
    setAllTags(etiquetas);

    // Traer relaciones contacto-etiqueta
    const relaciones = await fetch(
      "http://localhost:4000/contactoEtiquetas"
    ).then((r) => r.json());

    // Enriquecer cada contacto con sus etiquetas
    data = data.map((c) => {
      const rels = relaciones.filter((r: any) => r.contactoId === c.id);
      const tags = etiquetas.filter((t) =>
        rels.some((r: any) => r.etiquetaId === t.id)
      );
      return { ...c, etiquetas: tags };
    });

    // Filtrar por etiqueta si corresponde
    if (filterTag) {
      data = data.filter((c) =>
        c.etiquetas?.some((tag) => tag.nombre === filterTag)
      );
    }

    setContacts(data);
  };

  useEffect(() => {
    loadContacts();
  }, [page, search, filterTag]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Listado de Contactos</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Nuevo contacto
        </button>
      </div>

      {/* Buscador + Filtro de etiquetas */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border rounded px-3 py-2 w-1/2"
        />
        <select
          value={filterTag}
          onChange={(e) => {
            setFilterTag(e.target.value);
            setPage(1);
          }}
          className="border rounded px-3 py-2"
        >
          <option value="">Todas las etiquetas</option>
          {allTags.map((tag) => (
            <option key={tag.id} value={tag.nombre}>
              {tag.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Tabla */}
      <table className="w-full border border-gray-200 mb-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Nombre</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Etiquetas</th>
            <th className="p-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c.id} className="border-t hover:bg-gray-50">
              <td className="p-2">
                {c.nombres} {c.apellidos}
              </td>
              <td className="p-2">{c.email}</td>
              <td className="p-2">
                <div className="flex flex-wrap gap-1">
                  {c.etiquetas && c.etiquetas.length > 0 ? (
                    c.etiquetas.map((tag) => (
                      <span
                        key={tag.id}
                        className="px-2 py-1 text-xs rounded text-white"
                        style={{ backgroundColor: tag.color }}
                      >
                        {tag.nombre}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </div>
              </td>
              <td className="p-2">
                <button
                  className="text-blue-600 underline"
                  onClick={() => onSelect(c)}
                >
                  Ver detalle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="flex justify-between items-center">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          ← Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Siguiente →
        </button>
      </div>

      {/* Modal de nuevo contacto */}
      {showForm && (
        <ContactForm
          onClose={() => setShowForm(false)}
          onSaved={() => {
            setPage(1); // siempre regresa a la primera página
            loadContacts();
          }}
        />
      )}
    </div>
  );
}
