import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { ServiceType } from "@/types/ticket";
import { toast } from "sonner";

interface CreateTicketDialogProps {
  onSubmit: (data: { storeId: number; title: string; description: string; serviceType: ServiceType }) => Promise<any>;
}

export function CreateTicketDialog({ onSubmit }: CreateTicketDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    storeId: "",
    title: "",
    description: "",
    serviceType: "" as ServiceType,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.storeId || !formData.title || !formData.description || !formData.serviceType) {
      toast.error("Preencha todos os campos");
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        storeId: parseInt(formData.storeId),
        title: formData.title,
        description: formData.description,
        serviceType: formData.serviceType,
      });
      toast.success("Ticket criado com sucesso!");
      setOpen(false);
      setFormData({ storeId: "", title: "", description: "", serviceType: "" as ServiceType });
    } catch (error) {
      toast.error("Erro ao criar ticket");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="mr-2 h-4 w-4" />
          Novo Ticket
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Criar Novo Ticket</DialogTitle>
            <DialogDescription>
              Preencha as informações para criar uma nova solicitação de manutenção.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="storeId">ID da Loja</Label>
              <Input
                id="storeId"
                type="number"
                placeholder="Digite o ID da loja"
                value={formData.storeId}
                onChange={(e) => setFormData({ ...formData, storeId: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                placeholder="Digite o título da demanda"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                placeholder="Descreva o problema detalhadamente"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="serviceType">Tipo de Serviço</Label>
              <Select
                value={formData.serviceType}
                onValueChange={(value) => setFormData({ ...formData, serviceType: value as ServiceType })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de serviço" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ENERGIA">⚡ Energia</SelectItem>
                  <SelectItem value="AR_CONDICIONADO">❄️ Ar Condicionado</SelectItem>
                  <SelectItem value="FORRO">🏗️ Forro</SelectItem>
                  <SelectItem value="VAZAMENTO">💧 Vazamento</SelectItem>
                  <SelectItem value="OUTROS">🔧 Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Criando..." : "Criar Ticket"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
