"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TRANSACTION_CATEGORIES,
  type Transaction,
  type TransactionCategory,
  type TransactionInput,
  type TransactionType,
} from "@/lib/types";

const emptyForm = {
  description: "",
  amount: "",
  date: new Date().toISOString().slice(0, 10),
  type: "despesa" as TransactionType,
  category: "Outros" as TransactionCategory,
};

export function TransactionFormDialog({
  open,
  onOpenChange,
  transaction,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: Transaction | null;
  onSubmit: (input: TransactionInput) => Promise<void>;
}) {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    if (transaction) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reset form to match the transaction being edited when the dialog opens
      setForm({
        description: transaction.description,
        amount: String(transaction.amount),
        date: transaction.date,
        type: transaction.type,
        category: transaction.category,
      });
    } else {
      setForm(emptyForm);
    }
    setError(null);
  }, [open, transaction]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const amount = Number(form.amount.replace(",", "."));

    if (!form.description.trim()) {
      setError("Informe uma descrição.");
      return;
    }
    if (!Number.isFinite(amount) || amount <= 0) {
      setError("Informe um valor válido maior que zero.");
      return;
    }
    if (!form.date) {
      setError("Informe uma data.");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      await onSubmit({
        description: form.description.trim(),
        amount,
        date: form.date,
        type: form.type,
        category: form.category,
      });
      onOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar transação.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {transaction ? "Editar transação" : "Nova transação"}
            </DialogTitle>
            <DialogDescription>
              Preencha os dados da receita ou despesa.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="Ex: Supermercado"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="amount">Valor (R$)</Label>
                <Input
                  id="amount"
                  inputMode="decimal"
                  value={form.amount}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, amount: e.target.value }))
                  }
                  placeholder="0,00"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="date">Data</Label>
                <Input
                  id="date"
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, date: e.target.value }))
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="type">Tipo</Label>
                <Select
                  value={form.type}
                  onValueChange={(value) =>
                    setForm((f) => ({ ...f, type: value as TransactionType }))
                  }
                >
                  <SelectTrigger id="type" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="receita">Receita</SelectItem>
                    <SelectItem value="despesa">Despesa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="category">Categoria</Label>
                <Select
                  value={form.category}
                  onValueChange={(value) =>
                    setForm((f) => ({
                      ...f,
                      category: value as TransactionCategory,
                    }))
                  }
                >
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TRANSACTION_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
