import { useEffect, useState } from "react";
import { api, type Interaccion } from "../../api/api";



interface Props {
  contactId: number;
}

export default function TabInteracciones({ contactId }: Props) {
  const [interacciones, setInteracciones] = useState<Interaccion[]>([]);
  const [tipo, setTipo] = useState("LLAMADA");
  const [canal, setCanal] = useState("");
  const [notas, setNotas] = useState("");

  // 🔄 cargar interacciones al montar
  useEffect(() => {
    loadInteracciones();
  }, [contactId]);

  const loadInteracciones = async () => {
    try {
      const data = await api.getInteracciones(contactId);
      setInteracciones(data);
    } catch (err) {
      console.error("Error al cargar interacciones:", err);
    }
  };

  const handleAdd = async () => {
    const nueva: Interaccion = {
      contactoId: contactId,
      tipo,
      canal,
      notas,
      ocurridaEn: new Date().toISOString(),
    };

    try {
      // 1. Guardar la interacción
      const saved = await api.createInteraccion(nueva);

      // 2. Log de actividad
      await api.logActividad({
        contactoId: contactId,
        tipo: "NEW_INTERACTION",
        detalle: `Se registró una ${saved.tipo} por ${saved.canal || "N/A"}`,
        ocurridaEn: new Date().toISOString(),
      });

      // 3. Refrescar lista
      await loadInteracciones();

      // 4. Limpiar form
      setCanal("");
      setNotas("");
      setTipo("LLAMADA");
    } catch (err) {
      console.error("Error al crear interacción:", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Interacciones</h2>

      {/* Formulario */}
      <div className="flex gap-2 mb-4">
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="LLAMADA">Llamada</option>
          <option value="CORREO">Correo</option>
          <option value="MEETING">Reunión</option>
          <option value="OTHER">Otro</option>
        </select>

        <input
          value={canal}
          onChange={(e) => setCanal(e.target.value)}
          placeholder="Canal (Zoom, Teléfono, Gmail...)"
          className="border p-2 rounded flex-1"
        />

        <input
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
          placeholder="Notas"
          className="border p-2 rounded flex-1"
        />

        <button
          onClick={handleAdd}
          className="px-3 py-2 bg-blue-600 text-white rounded"
        >
          + Agregar
        </button>
      </div>

      {/* Listado */}
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Tipo</th>
            <th className="p-2">Canal</th>
            <th className="p-2">Notas</th>
            <th className="p-2">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {interacciones.map((i) => (
            <tr key={i.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{i.tipo}</td>
              <td className="p-2">{i.canal || "-"}</td>
              <td className="p-2">{i.notas || "-"}</td>
              <td className="p-2">
                {new Date(i.ocurridaEn).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
