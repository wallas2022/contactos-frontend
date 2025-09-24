import { useEffect, useState } from "react";
import ContactForm from "./ContactForm";

type Contact = {
  id: number;
  nombres: string;
  apellidos: string;
  email?: string;
};

interface Props {
  onSelect: (contact: Contact) => void;
}

export default function ContactList({ onSelect }: Props) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [filterTag, _setFilterTag] = useState("");
  const [showForm, setShowForm] = useState(false);
  const limit = 5;

  const loadContacts = () => {
    let url = `http://localhost:4000/contactos?_page=${page}&_limit=${limit}`;
    if (search) url += `&q=${encodeURIComponent(search)}`;

    fetch(url)
      .then((res) => {
        const total = res.headers.get("X-Total-Count");
        if (total) setTotalPages(Math.ceil(parseInt(total) / limit));
        return res.json();
      })
      .then(async (data) => {
        // si hay filtro por etiqueta
        if (filterTag) {
          const ce = await fetch(
            `http://localhost:4000/contactoEtiquetas?etiquetaId=${filterTag}`
          ).then((r) => r.json());
          const ids = ce.map((x: any) => x.contactoId);
          data = data.filter((c: Contact) => ids.includes(c.id));
        }
        setContacts(data);
      });
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

      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="border rounded px-3 py-2 mb-4 w-1/2"
      />

      {/* Tabla */}
      <table className="w-full border border-gray-200 mb-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Nombre</th>
            <th className="p-2 text-left">Email</th>
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
          onSaved={loadContacts}
        />
      )}
    </div>
  );
}
