import { useState } from "react";
import type { Contact } from "../api/api";

interface Props {
  onSave: (c: Contact) => void;   // 👈 usamos onSave
  onCancel: () => void;
}

export default function ContactForm({ onSave, onCancel }: Props) {
  const [form, setForm] = useState<Partial<Contact>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const res = await fetch("http://localhost:4000/contactos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const saved = await res.json();
      onSave(saved); // 👈 ya está alineado
    }
  };

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-lg font-semibold mb-4">Nuevo Contacto</h2>

      <div className="grid gap-3">
        <input name="nombres" placeholder="Nombres" className="border p-2" onChange={handleChange} />
        <input name="apellidos" placeholder="Apellidos" className="border p-2" onChange={handleChange} />
        <input name="email" placeholder="Email" className="border p-2" onChange={handleChange} />
        <input name="telefono" placeholder="Teléfono" className="border p-2" onChange={handleChange} />
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button className="px-3 py-2 bg-gray-200 rounded" onClick={onCancel}>Cancelar</button>
        <button className="px-3 py-2 bg-blue-600 text-white rounded" onClick={handleSave}>Guardar</button>
      </div>
    </div>
  );
}
