import { Ticket, CreateTicketDTO, UpdateTicketDTO } from "@/types/ticket";

// IMPORTANTE: Atualize esta URL para o endereço do seu backend em produção
// Exemplos:
// - Ngrok: "https://abc123.ngrok.io/api"
// - Heroku: "https://seu-app.herokuapp.com/api"
// - Railway: "https://seu-app.railway.app/api"
// - Render: "https://seu-app.onrender.com/api"
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

console.log("🔗 API conectando em:", API_BASE_URL);

export const api = {
  // Tickets
  async getTickets(): Promise<Ticket[]> {
    const response = await fetch(`${API_BASE_URL}/tickets`);
    if (!response.ok) throw new Error("Failed to fetch tickets");
    return response.json();
  },

  async getTicket(id: number): Promise<Ticket> {
    const response = await fetch(`${API_BASE_URL}/tickets/${id}`);
    if (!response.ok) throw new Error("Failed to fetch ticket");
    return response.json();
  },

  async createTicket(data: CreateTicketDTO): Promise<Ticket> {
    const response = await fetch(`${API_BASE_URL}/tickets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create ticket");
    return response.json();
  },

  async updateTicket(id: number, data: UpdateTicketDTO): Promise<Ticket> {
    const response = await fetch(`${API_BASE_URL}/tickets/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update ticket");
    return response.json();
  },

  async deleteTicket(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/tickets/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete ticket");
  },
};
