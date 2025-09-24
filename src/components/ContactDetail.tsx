import { useState } from "react";
import Tabs from "./ui/Tabs";
import type { TabItem } from "./ui/Tabs";
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
  const [tab, setTab] = useState<string>("datos");

  const items: TabItem[] = [
    { key: "datos",         label: "Datos" },
    { key: "interacciones", label: "Interacciones" },
    { key: "etiquetas",     label: "Etiquetas" },
    { key: "preferencias",  label: "Preferencias" },
    { key: "perfiles",      label: "Perfiles Sociales" },
    { key: "actividades",   label: "Actividades" }
  ];

  return (
    <div className="bg-white shadow rounded p-4">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">
            {contact.nombres} {contact.apellidos}
          </h2>
          {contact.email && <p className="text-gray-600 text-sm">{contact.email}</p>}
        </div>
        <button className="bg-gray-200 px-3 py-2 rounded" onClick={onBack}>
          Volver
        </button>
      </div>

      <Tabs value={tab} onChange={setTab} items={items} className="mb-4" />

      {/* Panels */}
      <div
        id={`panel-${tab}`}
        role="tabpanel"
        aria-labelledby={`tab-${tab}`}
        className="mt-2"
      >
        {tab === "datos"         && <TabDatos contact={contact} />}
        {tab === "interacciones" && <TabInteracciones contactId={contact.id ?? 0} />}
        {tab === "etiquetas"     && <TabEtiquetas contact={contact} />}
        {tab === "preferencias"  && <TabPreferencias contactId={contact.id ?? 0} />}
        {tab === "perfiles"      && <TabPerfiles contactId={contact.id ?? 0} />}
        {tab === "actividades"   && <TabActividades contactId={contact.id ?? 0} setLogs={() => {}} />}
      </div>
    </div>
  );
}
