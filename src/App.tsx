import { useState } from "react";
import TabActividades from "./components/tabs/TabActividades";
import TabPerfiles from "./components/tabs/TabPerfiles";
import TabPreferencias from "./components/tabs/TabPreferencias";

type Contact = {
  id: number;
  nombres: string;
  apellidos: string;
  email?: string;
};

export default function App() {
  const [selectedTab, setSelectedTab] = useState("actividades");
  const [selectedContact] = useState<Contact>({
    id: 1,
    nombres: "Ana",
    apellidos: "Pérez",
    email: "ana@ejemplo.com",
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Detalle de Contacto</h1>

      {/* Info del contacto */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <p className="font-semibold">
          {selectedContact.nombres} {selectedContact.apellidos}
        </p>
        <p className="text-gray-600">{selectedContact.email}</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b mb-6">
        <button
          className={`pb-2 ${
            selectedTab === "actividades"
              ? "border-b-2 border-blue-500 font-semibold"
              : "text-gray-500"
          }`}
          onClick={() => setSelectedTab("actividades")}
        >
          Actividades
        </button>
        <button
          className={`pb-2 ${
            selectedTab === "perfiles"
              ? "border-b-2 border-blue-500 font-semibold"
              : "text-gray-500"
          }`}
          onClick={() => setSelectedTab("perfiles")}
        >
          Perfiles Sociales
        </button>
        <button
          className={`pb-2 ${
            selectedTab === "preferencias"
              ? "border-b-2 border-blue-500 font-semibold"
              : "text-gray-500"
          }`}
          onClick={() => setSelectedTab("preferencias")}
        >
          Preferencias
        </button>
      </div>

      {/* Contenido dinámico */}
      <div>
        {selectedTab === "actividades" && (
          <TabActividades
            contactId={selectedContact.id}
            setLogs={() => {}}
          />
        )}
        {selectedTab === "perfiles" && (
          <TabPerfiles contactId={selectedContact.id} />
        )}
        {selectedTab === "preferencias" && (
          <TabPreferencias contactId={selectedContact.id} />
        )}
      </div>
    </div>
  );
}
