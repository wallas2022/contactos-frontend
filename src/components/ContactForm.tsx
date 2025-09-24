import { useState, useEffect } from "react";
import toast from "react-hot-toast";

type Etiqueta = {
  id: number;
  nombre: string;
  color: string;
};

interface Props {
  onClose: () => void;
  onSaved: () => void;
}

export default function ContactForm({ onClose, onSaved }: Props) {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [etiquetas, setEtiquetas] = useState<Etiqueta[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/etiquetas")
      .then((res) => res.json())
      .then(setEtiquetas);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newContact = { nombres, apellidos, email };
    const res = await fetch("http://localhost:4000/contactos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContact),
    });

    if (!res.ok) {
      toast.error("❌ Error al crear contacto");
      return;
    }

    const saved = await res.json();

    for (const tagId of selectedTags) {
      await fetch("http://localhost:4000/contactoEtiquetas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactoId: saved.id, etiquetaId: tagId }),
      });
    }

    toast.success("✅ Contacto creado exitosamente");

    onSaved();
    onClose();
  };

  const toggleTag = (id: number) => {
    setSelectedTags((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Nuevo Contacto</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nombres"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Apellidos"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />

          <div>
            <p className="mb-2 font-semibold">Etiquetas:</p>
            <div className="flex flex-wrap gap-2">
              {etiquetas.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => toggleTag(tag.id)}
                  className={`px-3 py-1 rounded ${
                    selectedTags.includes(tag.id)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {tag.nombre}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
