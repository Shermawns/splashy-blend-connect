import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Ticket, TicketStatus, TicketPriority } from "@/types/ticket";
import { toast } from "sonner";

interface EditTicketDialogProps {
  ticket: Ticket | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (id: number, data: any) => Promise<any>;
}

export function EditTicketDialog({ ticket, open, onOpenChange, onSubmit }: EditTicketDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    ticketNumber: "",
    status: "" as TicketStatus,
    priority: "" as TicketPriority,
    triloggerId: "",
    providerId: "",
    deadline: "",
  });

  useEffect(() => {
    if (ticket) {
      setFormData({
        ticketNumber: ticket.ticketNumber || "",
        status: ticket.status,
        priority: ticket.priority,
        triloggerId: ticket.triloggerId?.toString() || "",
        providerId: ticket.providerId?.toString() || "",
        deadline: ticket.deadline || "",
      });
    }
  }, [ticket]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticket) return;

    setLoading(true);
    try {
      await onSubmit(ticket.id, {
        ticketNumber: formData.ticketNumber || undefined,
        status: formData.status,
        priority: formData.priority,
        triloggerId: formData.triloggerId ? parseInt(formData.triloggerId) : undefined,
        providerId: formData.providerId ? parseInt(formData.providerId) : undefined,
        deadline: formData.deadline || undefined,
      });
      toast.success("Ticket atualizado com sucesso!");
      onOpenChange(false);
    } catch (error) {
      toast.error("Erro ao atualizar ticket");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!ticket) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Editar Ticket #{ticket.ticketNumber || ticket.id}</DialogTitle>
            <DialogDescription>
              Atualize as informações do ticket (apenas Triloggers).
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="ticketNumber">Número do Ticket</Label>
              <Input
                id="ticketNumber"
                placeholder="Ex: 2025-001"
                value={formData.ticketNumber}
                onChange={(e) => setFormData({ ...formData, ticketNumber: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value as TicketStatus })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ABERTO">Aberto</SelectItem>
                  <SelectItem value="EM_EXECUCAO">Em Execução</SelectItem>
                  <SelectItem value="EXECUTADO">Executado</SelectItem>
                  <SelectItem value="CANCELADO">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="priority">Prioridade</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value as TicketPriority })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BAIXA">Baixa</SelectItem>
                  <SelectItem value="MEDIA">Média</SelectItem>
                  <SelectItem value="ALTA">Alta</SelectItem>
                  <SelectItem value="EMERGENCIAL">Emergencial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="triloggerId">ID do Trilogger Responsável</Label>
              <Input
                id="triloggerId"
                type="number"
                placeholder="ID do Trilogger"
                value={formData.triloggerId}
                onChange={(e) => setFormData({ ...formData, triloggerId: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="providerId">ID do Prestador</Label>
              <Input
                id="providerId"
                type="number"
                placeholder="ID do Prestador"
                value={formData.providerId}
                onChange={(e) => setFormData({ ...formData, providerId: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="deadline">Prazo (Deadline)</Label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
