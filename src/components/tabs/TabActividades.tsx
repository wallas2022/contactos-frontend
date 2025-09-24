import { useState } from "react";

interface Act {
  id: number;
  tipo: string;
  detalle: string;
  fecha: string;
}

export default function TabActividades({ contactId }: { contactId: number }) {
  const [logs, setLogs] = useState<Act[]>([
    { id: 1, tipo: "CREATED_CONTACT", detalle: "Alta inicial", fecha: new Date().toISOString() }
  ]);

  return (
    <ul className="space-y-2">
      {logs.map(l => (
        <li key={l.id} className="border p-2 rounded">
          <b>{l.tipo}</b> - {l.fecha}
          <p>{l.detalle}</p>
        </li>
      ))}
    </ul>
  );
}
