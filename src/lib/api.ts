import { Ticket, CreateTicketDTO, UpdateTicketDTO } from "@/types/ticket";

const API_BASE_URL = "http://localhost:8080/api";

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
