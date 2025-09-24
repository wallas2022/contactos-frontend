import { useState } from "react";

interface Perfil {
  id: number;
  red: string;
  url: string;
}

export default function TabPerfiles({ contactId }: { contactId: number }) {
  const [perfiles, setPerfiles] = useState<Perfil[]>([]);

  const add = () => {
    const red = prompt("Red (linkedin, x, fb):");
    const url = prompt("URL:");
    if (red && url) setPerfiles([...perfiles, { id: Date.now(), red, url }]);
  };

  return (
    <div>
      <button className="bg-blue-600 text-white px-3 py-1 rounded mb-2" onClick={add}>
        + Perfil
      </button>
      <ul>
        {perfiles.map(p => (
          <li key={p.id}>{p.red}: <a href={p.url} className="text-blue-600 underline">{p.url}</a></li>
        ))}
      </ul>
    </div>
  );
}
