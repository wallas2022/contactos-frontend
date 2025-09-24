// ContactList.tsx
import type { Contact } from "../api/api";

interface Props {
  contacts: Contact[];        
  onSelect: (c: Contact) => void;
}

export default function ContactList({ contacts, onSelect }: Props) {
  return (
    <table className="w-full bg-white shadow rounded">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="p-2">Nombre</th>
          <th className="p-2">Email</th>
          <th className="p-2">Teléfono</th>
          <th className="p-2">Etiquetas</th>
          <th className="p-2"></th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((c) => (
          <tr key={c.id} className="border-b hover:bg-gray-50">
            <td className="p-2">{c.nombres} {c.apellidos}</td>
            <td className="p-2">{c.email || "-"}</td>
            <td className="p-2">{c.telefono || "-"}</td>
            <td className="p-2">{c.etiquetas?.join(", ")}</td>
            <td className="p-2 text-right">
              <button className="text-blue-600" onClick={() => onSelect(c)}>
                Ver detalle
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
