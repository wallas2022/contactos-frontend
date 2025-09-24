import { useState } from "react";

interface Props {
  contactId: number;
  onClose: () => void;
  onSaved: () => void;
}

export default function AddInteractionModal({ contactId, onClose, onSaved }: Props) {
  const [tipo, setTipo] = useState("LLAMADA");
  const [canal, setCanal] = useState("");
  const [notas, setNotas] = useState("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const nueva = {
      contactoId: contactId,
      tipo,
      canal,
      notas,
      fecha: new Date().toISOString().split("T")[0]
    };
    await fetch("http://localhost:4000/interacciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nueva)
    });
    onSaved(); // vuelve a cargar la lista
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Nueva Interacción</h2>
        <form onSubmit={handleSave} className="space-y-4">
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="LLAMADA">Llamada</option>
            <option value="CORREO">Correo</option>
            <option value="MEETING">Reunión</option>
            <option value="OTHER">Otro</option>
          </select>
          <input
            type="text"
            placeholder="Canal (Teléfono, Zoom, Gmail...)"
            value={canal}
            onChange={(e) => setCanal(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
          <textarea
            placeholder="Notas"
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
