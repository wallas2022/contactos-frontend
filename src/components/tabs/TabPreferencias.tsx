type Props = {
  contactId: number;
};

export default function TabPreferencias({ contactId: _contactId }: Props) {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Preferencias</h2>
      <p>Se configurarán las preferencias de contacto (método, horario, etc.).</p>
    </div>
  );
}
