
type Props = {
  contactId: number;
  setLogs: (logs: any[]) => void;
};

export default function TabActividades({ contactId: _contactId, setLogs: _setLogs }: Props) {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Actividades</h2>
      <p>Aquí se mostrarán las actividades del contacto.</p>
    </div>
  );
}
