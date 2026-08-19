"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { monthLabel } from "@/lib/format";

export type MonthValue = { year: number; month: number };

export function MonthSelector({
  value,
  onChange,
}: {
  value: MonthValue;
  onChange: (value: MonthValue) => void;
}) {
  function shift(delta: number) {
    const date = new Date(value.year, value.month - 1 + delta, 1);
    onChange({ year: date.getFullYear(), month: date.getMonth() + 1 });
  }

  return (
    <div className="flex items-center gap-1">
      <Button variant="outline" size="icon" onClick={() => shift(-1)} aria-label="Mês anterior">
        <ChevronLeft className="size-4" />
      </Button>
      <span className="w-36 text-center text-sm font-medium capitalize">
        {monthLabel(value.year, value.month)}
      </span>
      <Button variant="outline" size="icon" onClick={() => shift(1)} aria-label="Próximo mês">
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}
