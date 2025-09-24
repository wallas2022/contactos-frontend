

type Props = {
  contactId: number;
};

export default function TabPerfiles({ contactId: _contactId }: Props) {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Perfiles Sociales</h2>
      <p>Aquí podrás vincular perfiles como LinkedIn, Facebook, etc.</p>
    </div>
  );
}

