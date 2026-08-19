"use client";

import { useMemo, useState } from "react";
import { useTransactions } from "@/lib/hooks/use-transactions";
import { MonthSelector, type MonthValue } from "@/components/month-selector";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { CategoryPieChart } from "@/components/dashboard/category-pie-chart";
import { Skeleton } from "@/components/ui/skeleton";
import type { TransactionCategory } from "@/lib/types";

export function DashboardClient() {
  const { transactions, loading, error } = useTransactions();
  const now = new Date();
  const [month, setMonth] = useState<MonthValue>({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  });

  const monthTransactions = useMemo(() => {
    const prefix = `${month.year}-${String(month.month).padStart(2, "0")}`;
    return transactions.filter((t) => t.date.startsWith(prefix));
  }, [transactions, month]);

  const income = useMemo(
    () =>
      monthTransactions
        .filter((t) => t.type === "receita")
        .reduce((sum, t) => sum + t.amount, 0),
    [monthTransactions],
  );

  const expense = useMemo(
    () =>
      monthTransactions
        .filter((t) => t.type === "despesa")
        .reduce((sum, t) => sum + t.amount, 0),
    [monthTransactions],
  );

  const expenseByCategory = useMemo(() => {
    const totals = new Map<TransactionCategory, number>();
    for (const t of monthTransactions) {
      if (t.type !== "despesa") continue;
      totals.set(t.category, (totals.get(t.category) ?? 0) + t.amount);
    }
    return Array.from(totals, ([category, amount]) => ({ category, amount }));
  }, [monthTransactions]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Resumo das suas finanças no período selecionado.
          </p>
        </div>
        <MonthSelector value={month} onChange={setMonth} />
      </div>

      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Erro ao carregar transações: {error}
        </p>
      )}

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-28 w-full" />
          ))}
        </div>
      ) : (
        <>
          <SummaryCards income={income} expense={expense} />
          <CategoryPieChart data={expenseByCategory} />
        </>
      )}
    </div>
  );
}
