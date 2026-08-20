"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CATEGORY_COLORS } from "@/lib/colors";
import { formatCurrency } from "@/lib/format";
import type { TransactionCategory } from "@/lib/types";

type Slice = { category: TransactionCategory; amount: number };

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { name: string; value: number }[];
}) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-md border bg-popover px-3 py-2 text-sm text-popover-foreground shadow-md">
      <p className="font-medium">{item.name}</p>
      <p className="text-muted-foreground">{formatCurrency(item.value)}</p>
    </div>
  );
}

export function CategoryPieChart({
  data,
  title = "Despesas por categoria",
  emptyMessage = "Nenhuma despesa registrada neste período.",
}: {
  data: Slice[];
  title?: string;
  emptyMessage?: string;
}) {
  const total = data.reduce((sum, d) => sum + d.amount, 0);
  const sorted = [...data].sort((a, b) => b.amount - a.amount);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {total === 0 ? (
          <p className="py-12 text-center text-sm text-muted-foreground">
            {emptyMessage}
          </p>
        ) : (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="h-56 w-full sm:w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sorted}
                    dataKey="amount"
                    nameKey="category"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={2}
                    cornerRadius={4}
                    stroke="var(--card)"
                    strokeWidth={2}
                  >
                    {sorted.map((entry) => (
                      <Cell
                        key={entry.category}
                        fill={CATEGORY_COLORS[entry.category]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="flex w-full flex-col gap-2 text-sm sm:w-1/2">
              {sorted.map((entry) => (
                <li
                  key={entry.category}
                  className="flex items-center justify-between gap-2"
                >
                  <span className="flex items-center gap-2 text-foreground">
                    <span
                      className="size-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: CATEGORY_COLORS[entry.category] }}
                    />
                    {entry.category}
                  </span>
                  <span className="tabular-nums text-muted-foreground">
                    {formatCurrency(entry.amount)}
                    <span className="ml-1.5 text-xs">
                      ({Math.round((entry.amount / total) * 100)}%)
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
