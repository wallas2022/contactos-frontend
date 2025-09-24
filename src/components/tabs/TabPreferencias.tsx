import { useState } from "react";

export default function TabPreferencias({ contactId }: { contactId: number }) {
  const [prefer, setPrefer] = useState({
    metodo: "EMAIL",
    horario: "09:00-12:00",
    noContactar: false,
  });

  return (
    <div className="space-y-2">
      <div>
        <label>Método preferido: </label>
        <select
          value={prefer.metodo}
          onChange={e => setPrefer({ ...prefer, metodo: e.target.value })}
          className="border p-1"
        >
          <option>EMAIL</option>
          <option>TELEFONO</option>
          <option>SMS</option>
          <option>WHATSAPP</option>
          <option>NONE</option>
        </select>
      </div>
      <div>
        <label>Horario: </label>
        <input
          value={prefer.horario}
          onChange={e => setPrefer({ ...prefer, horario: e.target.value })}
          className="border p-1"
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={prefer.noContactar}
            onChange={e => setPrefer({ ...prefer, noContactar: e.target.checked })}
          /> No contactar
        </label>
      </div>
    </div>
  );
}
