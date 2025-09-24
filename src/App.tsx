import { useState } from "react";
import ContactList from "./components/ContactList";
import ContactDetail from "./components/ContactDetail";
import { Toaster } from "react-hot-toast";
import type { Contact } from "./api/api"; // 👈 ahora con etiquetas?: Etiqueta[]

export default function App() {
  const [selected, setSelected] = useState<Contact | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Toaster position="top-right" />
      {selected ? (
        <ContactDetail contact={selected} onBack={() => setSelected(null)} />
      ) : (
        <ContactList onSelect={(c) => setSelected(c)} />
      )}
    </div>
  );
}
