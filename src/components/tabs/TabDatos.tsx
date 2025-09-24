import type { Contact } from "../../api/api";


export default function TabDatos({ contact }: { contact: Contact }) {
  return (
    <div className="space-y-2">
      <p><b>Email:</b> {contact.email || "-"}</p>
      <p><b>Teléfono:</b> {contact.telefono || "-"}</p>
      <p><b>Categoria:</b> {contact.etiquetas || "-"}</p>
  
    </div>
  );
}
