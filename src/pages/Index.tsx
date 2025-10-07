import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Ticket, CreateTicketDTO, UpdateTicketDTO, TicketStatus } from "@/types/ticket";
import { TicketCard } from "@/components/TicketCard";
import { CreateTicketDialog } from "@/components/CreateTicketDialog";
import { EditTicketDialog } from "@/components/EditTicketDialog";
import { ApiConnectionStatus } from "@/components/ApiConnectionStatus";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wrench, Loader2 } from "lucide-react";

const Index = () => {
  const queryClient = useQueryClient();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<TicketStatus | "TODOS">("TODOS");

  const { data: tickets, isLoading } = useQuery({
    queryKey: ["tickets"],
    queryFn: api.getTickets,
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateTicketDTO) => api.createTicket(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateTicketDTO }) => api.updateTicket(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
  });

  const handleEdit = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setEditDialogOpen(true);
  };

  const filteredTickets = tickets?.filter((ticket) =>
    statusFilter === "TODOS" ? true : ticket.status === statusFilter
  ) || [];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <header className="bg-gradient-primary py-12 px-4 shadow-elegant">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Wrench className="h-10 w-10 text-primary-foreground" />
                <h1 className="text-4xl font-bold text-primary-foreground">
                  BuildingMaintenance
                </h1>
              </div>
              <p className="text-lg text-primary-foreground/90">
                Sistema de Gerenciamento de Manutenção Predial
              </p>
            </div>
            <CreateTicketDialog onSubmit={async (data) => createMutation.mutateAsync(data)} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Connection Status */}
        <div className="mb-6">
          <ApiConnectionStatus />
        </div>

        {/* Filters */}
        <Tabs value={statusFilter} onValueChange={(value) => setStatusFilter(value as TicketStatus | "TODOS")} className="mb-8">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger value="TODOS">Todos</TabsTrigger>
            <TabsTrigger value="ABERTO">Abertos</TabsTrigger>
            <TabsTrigger value="EM_EXECUCAO">Em Execução</TabsTrigger>
            <TabsTrigger value="EXECUTADO">Executados</TabsTrigger>
            <TabsTrigger value="CANCELADO">Cancelados</TabsTrigger>
          </TabsList>

          <TabsContent value={statusFilter} className="mt-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredTickets.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Wrench className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Nenhum ticket encontrado</h3>
                <p className="text-muted-foreground mb-4">
                  {statusFilter === "TODOS" 
                    ? "Crie um novo ticket para começar"
                    : `Não há tickets com status "${statusFilter.replace(/_/g, " ").toLowerCase()}"`
                  }
                </p>
                {statusFilter === "TODOS" && (
                  <CreateTicketDialog onSubmit={async (data) => createMutation.mutateAsync(data)} />
                )}
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredTickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} onEdit={handleEdit} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Edit Dialog */}
      <EditTicketDialog
        ticket={selectedTicket}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSubmit={async (id, data) => updateMutation.mutateAsync({ id, data })}
      />
    </div>
  );
};

export default Index;
