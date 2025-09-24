import { useEffect, useState } from "react";
import type { Contact } from "../../api/api";

type Etiqueta = { id: number; nombre: string; color: string };

type Props = { contact: Contact };

export default function TabEtiquetas({ contact }: Props) {
  const [allTags, setAllTags] = useState<Etiqueta[]>([]);
  const [tags, setTags] = useState<Etiqueta[]>([]);

  const load = async () => {
    const all = await fetch("http://localhost:4000/etiquetas").then((r) => r.json());
    const ce  = await fetch(`http://localhost:4000/contactoEtiquetas?contactoId=${contact.id}`).then((r) => r.json());
    const current = all.filter((t: Etiqueta) => ce.some((x: any) => x.etiquetaId === t.id));
    setAllTags(all);
    setTags(current);
  };

  useEffect(() => { load(); }, [contact.id]);

  const toggle = async (tagId: number) => {
    const exists = tags.some((t) => t.id === tagId);
    if (exists) {
      const ce = await fetch(
        `http://localhost:4000/contactoEtiquetas?contactoId=${contact.id}&etiquetaId=${tagId}`
      ).then((r) => r.json());
      if (ce[0]) {
        await fetch(`http://localhost:4000/contactoEtiquetas/${ce[0].id}`, { method: "DELETE" });
      }
      setTags((prev) => prev.filter((t) => t.id !== tagId));
    } else {
      await fetch("http://localhost:4000/contactoEtiquetas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactoId: contact.id, etiquetaId: tagId })
      });
      const add = allTags.find((t) => t.id === tagId);
      if (add) setTags((prev) => [...prev, add]);
    }
  };

  return (
    <div>
      <h3 className="font-semibold mb-2">Etiquetas</h3>
      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => {
          const active = tags.some((t) => t.id === tag.id);
          return (
            <button
              key={tag.id}
              onClick={() => toggle(tag.id)}
              className={`px-3 py-1 rounded transition-colors ${
                active ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
              }`}
              title={active ? "Quitar" : "Agregar"}
            >
              {tag.nombre}
            </button>
          );
        })}
      </div>
    </div>
  );
}
