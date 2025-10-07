import { Ticket } from "@/types/ticket";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Wrench, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface TicketCardProps {
  ticket: Ticket;
  onEdit?: (ticket: Ticket) => void;
}

const statusColors = {
  ABERTO: "bg-info text-info-foreground",
  EM_EXECUCAO: "bg-warning text-warning-foreground",
  EXECUTADO: "bg-success text-success-foreground",
  CANCELADO: "bg-destructive text-destructive-foreground",
};

const priorityColors = {
  BAIXA: "bg-muted text-muted-foreground",
  MEDIA: "bg-info text-info-foreground",
  ALTA: "bg-warning text-warning-foreground",
  EMERGENCIAL: "bg-destructive text-destructive-foreground",
};

const serviceTypeLabels = {
  ENERGIA: "⚡ Energia",
  AR_CONDICIONADO: "❄️ Ar Condicionado",
  FORRO: "🏗️ Forro",
  VAZAMENTO: "💧 Vazamento",
  OUTROS: "🔧 Outros",
};

export function TicketCard({ ticket, onEdit }: TicketCardProps) {
  return (
    <Card className="hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {ticket.ticketNumber && (
                <Badge variant="outline" className="font-mono">
                  #{ticket.ticketNumber}
                </Badge>
              )}
              <Badge className={priorityColors[ticket.priority]}>
                {ticket.priority}
              </Badge>
            </div>
            <CardTitle className="text-lg">{ticket.title}</CardTitle>
            <CardDescription>{ticket.description}</CardDescription>
          </div>
          <Badge className={statusColors[ticket.status]}>
            {ticket.status.replace(/_/g, " ")}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Wrench className="h-4 w-4" />
          <span>{serviceTypeLabels[ticket.serviceType]}</span>
        </div>

        {ticket.storeName && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4" />
            <span>Loja: {ticket.storeName}</span>
          </div>
        )}

        {ticket.triloggerName && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>Responsável: {ticket.triloggerName}</span>
          </div>
        )}

        {ticket.deadline && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              Prazo: {format(new Date(ticket.deadline), "dd/MM/yyyy", { locale: ptBR })}
            </span>
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          Criado em: {format(new Date(ticket.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
        </div>

        {onEdit && (
          <Button onClick={() => onEdit(ticket)} className="w-full">
            Editar Ticket
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
