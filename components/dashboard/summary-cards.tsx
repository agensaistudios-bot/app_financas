import { ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";

export function SummaryCards({
  income,
  expense,
}: {
  income: number;
  expense: number;
}) {
  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Receita total
          </CardTitle>
          <ArrowUpCircle className="size-4 text-income" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold tabular-nums text-income">
            {formatCurrency(income)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Despesa total
          </CardTitle>
          <ArrowDownCircle className="size-4 text-expense" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold tabular-nums text-expense">
            {formatCurrency(expense)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Saldo
          </CardTitle>
          <Wallet className="size-4 text-primary" />
        </CardHeader>
        <CardContent>
          <p
            className={cn(
              "text-2xl font-semibold tabular-nums",
              balance >= 0 ? "text-foreground" : "text-expense",
            )}
          >
            {formatCurrency(balance)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
