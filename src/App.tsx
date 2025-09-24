import { useState } from "react";
import ContactDetail from "./components/ContactDetail";

type Contact = {
  id: number;
  nombres: string;
  apellidos: string;
  email?: string;
};

export default function App() {
  // Estado de contactos
  const [contacts] = useState<Contact[]>([
    { id: 1, nombres: "Ana", apellidos: "Pérez", email: "ana@ejemplo.com" },
    { id: 2, nombres: "Luis", apellidos: "Gómez", email: "luis@ejemplo.com" },
  ]);

  // Estado de contacto seleccionado
  const [selected, setSelected] = useState<Contact | null>(null);

  if (selected) {
    return (
      <ContactDetail
        contact={selected}
        onBack={() => setSelected(null)}
      />
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Listado de Contactos</h1>
      <div className="bg-white shadow rounded divide-y">
        {contacts.map((c) => (
          <div
            key={c.id}
            className="p-4 hover:bg-gray-50 cursor-pointer"
            onClick={() => setSelected(c)}
          >
            <p className="font-semibold">
              {c.nombres} {c.apellidos}
            </p>
            <p className="text-gray-600 text-sm">{c.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
