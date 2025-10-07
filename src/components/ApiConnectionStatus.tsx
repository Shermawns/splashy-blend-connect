import { useQuery } from "@tanstack/react-query";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

export function ApiConnectionStatus() {
  const { data: isConnected, isLoading } = useQuery({
    queryKey: ["api-health"],
    queryFn: async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
        const response = await fetch(`${apiUrl}/tickets`, { 
          method: 'HEAD',
          mode: 'no-cors' 
        });
        return true;
      } catch {
        return false;
      }
    },
    retry: 1,
    refetchInterval: 10000,
  });

  if (isLoading) {
    return (
      <Alert>
        <Loader2 className="h-4 w-4 animate-spin" />
        <AlertTitle>Verificando conexão com o backend...</AlertTitle>
      </Alert>
    );
  }

  if (!isConnected) {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
    return (
      <Alert variant="destructive">
        <XCircle className="h-4 w-4" />
        <AlertTitle>Backend não conectado</AlertTitle>
        <AlertDescription className="space-y-2">
          <p>Não foi possível conectar ao backend em: <code className="text-xs">{apiUrl}</code></p>
          <div className="text-sm mt-2">
            <strong>Soluções:</strong>
            <ol className="list-decimal list-inside mt-1 space-y-1">
              <li>Certifique-se que o backend Spring Boot está rodando</li>
              <li>Configure CORS no backend para permitir requisições de: <code className="text-xs">{window.location.origin}</code></li>
              <li>Ou use ngrok/túnel para expor o backend publicamente</li>
            </ol>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="border-success/50 bg-success/10">
      <CheckCircle2 className="h-4 w-4 text-success" />
      <AlertTitle className="text-success">Backend conectado</AlertTitle>
      <AlertDescription>Sistema operando normalmente</AlertDescription>
    </Alert>
  );
}
