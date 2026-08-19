"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useTransactions } from "@/lib/hooks/use-transactions";
import {
  TransactionFilters,
  type TransactionFiltersState,
} from "@/components/transactions/transaction-filters";
import { TransactionTable } from "@/components/transactions/transaction-table";
import { TransactionFormDialog } from "@/components/transactions/transaction-form-dialog";
import { DeleteTransactionDialog } from "@/components/transactions/delete-transaction-dialog";
import { ExportCsvButton } from "@/components/transactions/export-csv-button";
import type { Transaction, TransactionInput } from "@/lib/types";

export function TransactionsClient() {
  const {
    transactions,
    loading,
    error,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactions();

  const now = new Date();
  const [filters, setFilters] = useState<TransactionFiltersState>({
    month: { year: now.getFullYear(), month: now.getMonth() + 1 },
    category: "all",
    search: "",
  });

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [deleting, setDeleting] = useState<Transaction | null>(null);

  const filtered = useMemo(() => {
    const prefix = `${filters.month.year}-${String(filters.month.month).padStart(2, "0")}`;
    const search = filters.search.trim().toLowerCase();

    return transactions.filter((t) => {
      if (!t.date.startsWith(prefix)) return false;
      if (filters.category !== "all" && t.category !== filters.category)
        return false;
      if (search && !t.description.toLowerCase().includes(search))
        return false;
      return true;
    });
  }, [transactions, filters]);

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(transaction: Transaction) {
    setEditing(transaction);
    setFormOpen(true);
  }

  async function handleSubmit(input: TransactionInput) {
    if (editing) {
      await updateTransaction(editing.id, input);
      toast.success("Transação atualizada.");
    } else {
      await createTransaction(input);
      toast.success("Transação criada.");
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteTransaction(id);
      toast.success("Transação excluída.");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Erro ao excluir transação.",
      );
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Transações
          </h1>
          <p className="text-sm text-muted-foreground">
            Gerencie suas receitas e despesas.
          </p>
        </div>
        <div className="flex gap-2">
          <ExportCsvButton transactions={filtered} />
          <Button onClick={openCreate}>
            <Plus className="size-4" />
            Nova transação
          </Button>
        </div>
      </div>

      <TransactionFilters value={filters} onChange={setFilters} />

      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Erro ao carregar transações: {error}
        </p>
      )}

      {loading ? (
        <div className="flex flex-col gap-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : (
        <TransactionTable
          transactions={filtered}
          onEdit={openEdit}
          onDelete={setDeleting}
        />
      )}

      <TransactionFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        transaction={editing}
        onSubmit={handleSubmit}
      />

      <DeleteTransactionDialog
        transaction={deleting}
        onOpenChange={(open) => !open && setDeleting(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
