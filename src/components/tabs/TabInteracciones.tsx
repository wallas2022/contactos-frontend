import { useEffect, useState } from "react";
import AddInteractionModal from "../AddInteractionModal";

type Interaccion = {
  id: number;
  contactoId: number;
  tipo: string;
  canal: string;
  notas: string;
  fecha: string;
};

type Props = { contactId: number };

export default function TabInteracciones({ contactId }: Props) {
  const [items, setItems] = useState<Interaccion[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  const load = async () => {
    let url = `http://localhost:4000/interacciones?contactoId=${contactId}&_page=${page}&_limit=${limit}&_sort=fecha&_order=desc`;
    if (search) url += `&q=${encodeURIComponent(search)}`;

    const res = await fetch(url);
    const total = res.headers.get("X-Total-Count");
    if (total) setTotalPages(Math.ceil(parseInt(total) / limit));

    setItems(await res.json());
  };

  useEffect(() => {
    load();
  }, [contactId, page, search]);

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:4000/interacciones/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Interacciones</h3>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          + Agregar
        </button>
      </div>

      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar por notas, tipo o canal..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="border rounded px-3 py-2 mb-4 w-full"
      />

      {/* Lista */}
      {items.length === 0 ? (
        <p className="text-gray-500">Sin interacciones.</p>
      ) : (
        <ul className="divide-y">
          {items.map((i) => (
            <li key={i.id} className="py-3">
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">{i.tipo}</p>
                  <p className="text-sm text-gray-600">
                    {i.fecha} — {i.canal || "—"}
                  </p>
                  {i.notas && <p className="text-sm mt-1">{i.notas}</p>}
                </div>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleDelete(i.id)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Paginación */}
      <div className="flex justify-between items-center mt-4">
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

      {/* Modal agregar */}
      {showModal && (
        <AddInteractionModal
          contactId={contactId}
          onClose={() => setShowModal(false)}
          onSaved={load}
        />
      )}
    </div>
  );
}
