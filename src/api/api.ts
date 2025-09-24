// Cambia la baseURL según uses JSON Server o tu backend NestJS
const baseURL = "http://localhost:4000"; // JSON Server
// const baseURL = "http://localhost:3000/api/v1"; // NestJS real

// ---- Tipos ----
export type Etiqueta = {
  id: number;
  nombre: string;
  color: string;
};

export type Contact = {
  id: number;
  nombres: string;
  apellidos: string;
  email?: string;
  phone?: string;          // 👈 añadido
  etiquetas?: Etiqueta[];  // 👈 etiquetas como objetos completos
};
// ---- Interacciones ----
export interface Interaccion {
  id?: number;
  contactoId: number;
  tipo: string;
  canal?: string;
  notas?: string;
  ocurridaEn: string;
}

export interface Actividad {
  id?: number;
  contactoId: number;
  tipo: string;
  detalle?: string;
  ocurridaEn: string;
}

// ---- API CRUD ----
export const api = {
  // Listar contactos
  async getContacts(): Promise<Contact[]> {
    const res = await fetch(`${baseURL}/contactos`);
    if (!res.ok) throw new Error("Error al cargar contactos");
    return res.json();
  },

  // Obtener un contacto por ID
  async getContact(id: number): Promise<Contact> {
    const res = await fetch(`${baseURL}/contactos/${id}`);
    if (!res.ok) throw new Error("Contacto no encontrado");
    return res.json();
  },

  // Crear contacto
  async createContact(contact: Contact): Promise<Contact> {
    const res = await fetch(`${baseURL}/contactos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    });
    if (!res.ok) throw new Error("Error al crear contacto");
    return res.json();
  },

  // Actualizar contacto
  async updateContact(id: number, contact: Partial<Contact>): Promise<Contact> {
    const res = await fetch(`${baseURL}/contactos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    });
    if (!res.ok) throw new Error("Error al actualizar contacto");
    return res.json();
  },

  // Eliminar contacto
  async deleteContact(id: number): Promise<void> {
    const res = await fetch(`${baseURL}/contactos/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al eliminar contacto");
  },
  

  async getInteracciones(contactoId: number): Promise<Interaccion[]> {
  const res = await fetch(`${baseURL}/interacciones?contactoId=${contactoId}`);
  if (!res.ok) throw new Error("Error al cargar interacciones");
  return res.json();
},
async logActividad(act: Actividad): Promise<Actividad> {
  const res = await fetch(`${baseURL}/actividades`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(act),
  });
  return res.json();
},

async createInteraccion(data: Interaccion): Promise<Interaccion> {
  const res = await fetch(`${baseURL}/interacciones`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear interacción");
  return res.json();
}
};

// ---- Actividades ----
export async function logActividad(act: {
  contactoId: number;
  tipo: string;
  detalle?: string;
  ocurridaEn: string;
}) {
  const res = await fetch(`${baseURL}/actividades`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(act),
  });
  if (!res.ok) throw new Error("Error al registrar actividad");
  return res.json();
}




