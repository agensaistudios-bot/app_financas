"use client";

import { Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Transaction } from "@/lib/types";

export function TransactionTable({
  transactions,
  onEdit,
  onDelete,
}: {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
}) {
  if (transactions.length === 0) {
    return (
      <div className="rounded-lg border border-dashed py-16 text-center text-sm text-muted-foreground">
        Nenhuma transação encontrada para os filtros selecionados.
      </div>
    );
  }

  return (
    <>
      <div className="hidden overflow-hidden rounded-lg border sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead className="text-right">Valor</TableHead>
              <TableHead className="w-20 text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="whitespace-nowrap tabular-nums text-muted-foreground">
                  {formatDate(t.date)}
                </TableCell>
                <TableCell className="font-medium">{t.description}</TableCell>
                <TableCell>
                  <Badge variant="outline">{t.category}</Badge>
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "text-xs font-medium",
                      t.type === "receita" ? "text-income" : "text-expense",
                    )}
                  >
                    {t.type === "receita" ? "Receita" : "Despesa"}
                  </span>
                </TableCell>
                <TableCell
                  className={cn(
                    "text-right tabular-nums font-medium",
                    t.type === "receita" ? "text-income" : "text-expense",
                  )}
                >
                  {t.type === "receita" ? "+" : "-"}
                  {formatCurrency(t.amount)}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => onEdit(t)}
                      aria-label="Editar"
                    >
                      <Pencil className="size-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => onDelete(t)}
                      aria-label="Excluir"
                    >
                      <Trash2 className="size-3.5 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ul className="flex flex-col gap-2 sm:hidden">
        {transactions.map((t) => (
          <li key={t.id} className="rounded-lg border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col gap-0.5">
                <span className="font-medium">{t.description}</span>
                <span className="text-xs text-muted-foreground">
                  {formatDate(t.date)} · {t.category}
                </span>
              </div>
              <span
                className={cn(
                  "shrink-0 tabular-nums font-medium",
                  t.type === "receita" ? "text-income" : "text-expense",
                )}
              >
                {t.type === "receita" ? "+" : "-"}
                {formatCurrency(t.amount)}
              </span>
            </div>
            <div className="mt-2 flex justify-end gap-1 border-t pt-2">
              <Button variant="ghost" size="sm" onClick={() => onEdit(t)}>
                <Pencil className="size-3.5" />
                Editar
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onDelete(t)}>
                <Trash2 className="size-3.5 text-destructive" />
                Excluir
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
