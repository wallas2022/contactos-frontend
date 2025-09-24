import { useState } from "react";
import TabDatos from "./tabs/TabDatos";
import TabInteracciones from "./tabs/TabInteracciones";
import TabEtiquetas from "./tabs/TabEtiquetas";
import TabPreferencias from "./tabs/TabPreferencias";
import TabPerfiles from "./tabs/TabPerfiles";
import TabActividades from "./tabs/TabActividades";
import type { Contact } from "../api/api";

interface Props {
  contact: Contact;
  onBack: () => void;
}

export default function ContactDetail({ contact, onBack }: Props) {
  const [tab, setTab] = useState("datos");

  const tabs = [
    { key: "datos", label: "Datos" },
    { key: "interacciones", label: "Interacciones" },
    { key: "etiquetas", label: "Etiquetas" },
    { key: "preferencias", label: "Preferencias" },
    { key: "perfiles", label: "Perfiles Sociales" },
    { key: "actividades", label: "Actividades" },
  ];

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-lg font-semibold mb-4">
        {contact.nombres} {contact.apellidos}
      </h2>

      {/* Tabs header */}
      <div className="flex gap-2 border-b mb-4">
        {tabs.map((t) => (
          <button
            key={t.key}
            className={`px-3 py-2 ${
              tab === t.key
                ? "border-b-2 border-blue-600 font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tabs content */}
      {tab === "datos" && <TabDatos contact={contact} />}
      {tab === "interacciones" && <TabInteracciones contactId={contact.id} />}
      {tab === "etiquetas" && <TabEtiquetas contact={contact} />}
      {tab === "preferencias" && (
        <TabPreferencias contactId={contact.id ?? 0} />
      )}
      {tab === "perfiles" && <TabPerfiles contactId={contact.id ?? 0} />}
      {tab === "actividades" && (
        <TabActividades contactId={contact.id ?? 0} setLogs={() => {}} />
      )}

      <div className="mt-4">
        <button
          className="bg-gray-200 px-3 py-2 rounded"
          onClick={onBack}
        >
          Volver
        </button>
      </div>
    </div>
  );
}
