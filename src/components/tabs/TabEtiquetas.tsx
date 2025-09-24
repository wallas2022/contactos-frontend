import { useEffect, useState } from "react";
import { api, type Contact } from "../../api/api";


interface Props {
  contact: Contact; // pasamos el contacto completo
}

export default function TabEtiquetas({ contact }: Props) {
  const [etiquetas, setEtiquetas] = useState<string[]>(contact.etiquetas || []);
  const [nueva, setNueva] = useState("");

  // recargar si cambia el contacto
  useEffect(() => {
    setEtiquetas(contact.etiquetas || []);
  }, [contact]);

  const handleAdd = async () => {
    if (!nueva.trim()) return;

    try {
      const updated = await api.updateContact(contact.id!, {
        etiquetas: [...etiquetas, nueva.trim()],
      });
      setEtiquetas(updated.etiquetas || []);
      setNueva("");
    } catch (err) {
      console.error("Error agregando etiqueta:", err);
    }
  };

  const handleRemove = async (tag: string) => {
    try {
      const updated = await api.updateContact(contact.id!, {
        etiquetas: etiquetas.filter((e) => e !== tag),
      });
      setEtiquetas(updated.etiquetas || []);
    } catch (err) {
      console.error("Error eliminando etiqueta:", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Etiquetas</h2>

      <div className="flex gap-2 mb-4">
        <input
          value={nueva}
          onChange={(e) => setNueva(e.target.value)}
          placeholder="Nueva etiqueta"
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={handleAdd}
          className="px-3 py-2 bg-blue-600 text-white rounded"
        >
          + Agregar
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {etiquetas.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-gray-200 rounded-full flex items-center gap-2"
          >
            {tag}
            <button
              onClick={() => handleRemove(tag)}
              className="text-red-500 hover:text-red-700"
              title="Eliminar"
            >
              ✕
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
