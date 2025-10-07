export type TicketStatus = "ABERTO" | "EM_EXECUCAO" | "EXECUTADO" | "CANCELADO";
export type TicketPriority = "BAIXA" | "MEDIA" | "ALTA" | "EMERGENCIAL";
export type ServiceType = "ENERGIA" | "AR_CONDICIONADO" | "FORRO" | "VAZAMENTO" | "OUTROS";

export interface Ticket {
  id: number;
  ticketNumber?: string;
  storeId: number;
  storeName?: string;
  title: string;
  description: string;
  serviceType: ServiceType;
  status: TicketStatus;
  priority: TicketPriority;
  triloggerId?: number;
  triloggerName?: string;
  providerId?: number;
  providerName?: string;
  deadline?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTicketDTO {
  storeId: number;
  title: string;
  description: string;
  serviceType: ServiceType;
}

export interface UpdateTicketDTO {
  ticketNumber?: string;
  triloggerId?: number;
  providerId?: number;
  deadline?: string;
  status?: TicketStatus;
  priority?: TicketPriority;
  title?: string;
  description?: string;
  serviceType?: ServiceType;
}
