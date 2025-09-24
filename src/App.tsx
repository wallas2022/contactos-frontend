import { useState, useEffect } from "react";
import { api } from "./api/api";
import type { Contact } from "./api/api";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";
import ContactDetail from "./components/ContactDetail";

type View = "list" | "form" | "detail";

export default function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [view, setView] = useState<View>("list");
  const [selected, setSelected] = useState<Contact | null>(null);

  // 🔄 Cargar contactos al iniciar
  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const data = await api.getContacts();
      setContacts(data);
    } catch (err) {
      console.error("Error cargando contactos", err);
    }
  };

  const handleSaved = (contact: Contact) => {
    setContacts([...contacts, contact]); // actualiza lista local
    setView("list");
  };

  const handleSelect = (contact: Contact) => {
    setSelected(contact);
    setView("detail");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Contactos</h1>

      {view === "list" && (
        <>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
            onClick={() => setView("form")}
          >
            + Nuevo Contacto
          </button>

          <ContactList contacts={contacts} onSelect={handleSelect} />
        </>
      )}

      {view === "form" && (
        <ContactForm
          onSaved={handleSaved}
          onCancel={() => setView("list")}
        />
      )}

      {view === "detail" && selected && (
        <ContactDetail
          contact={selected}
          onBack={() => setView("list")}
        />
      )}
    </div>
  );
}
