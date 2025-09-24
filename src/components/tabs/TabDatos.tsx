import type { Contact } from "../../api/api";

export default function TabDatos({ contact }: { contact: Contact }) {
  return (
    <div className="space-y-2">
      <p>
        <b>Email:</b> {contact.email || "-"}
      </p>
      <p>
        <b>Teléfono:</b> {contact.phone || "-"}
      </p>
      <p>
        <b>Categorías:</b>{" "}
        {contact.etiquetas && contact.etiquetas.length > 0 ? (
          <span className="flex flex-wrap gap-1">
            {contact.etiquetas.map((tag) => (
              <span
                key={tag.id}
                className="px-2 py-1 text-xs rounded text-white"
                style={{ backgroundColor: tag.color }}
              >
                {tag.nombre}
              </span>
            ))}
          </span>
        ) : (
          "-"
        )}
      </p>
    </div>
  );
}
