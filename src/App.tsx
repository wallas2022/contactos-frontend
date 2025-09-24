import { useState } from "react";
import ContactList from "./components/ContactList";
import ContactDetail from "./components/ContactDetail";
import type { Contact } from "./api/api";
import { Toaster } from "react-hot-toast";

export default function App() {
  const [selected, setSelected] = useState<Contact | null>(null);

  return (
    <div>
      <Toaster position="top-right" />
      {selected ? (
        <ContactDetail contact={selected} onBack={() => setSelected(null)} />
      ) : (
        <ContactList onSelect={(c) => setSelected(c)} />
      )}
    </div>
  );
}
