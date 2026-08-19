"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MonthSelector, type MonthValue } from "@/components/month-selector";
import { TRANSACTION_CATEGORIES } from "@/lib/types";

export type TransactionFiltersState = {
  month: MonthValue;
  category: string;
  search: string;
};

export function TransactionFilters({
  value,
  onChange,
}: {
  value: TransactionFiltersState;
  onChange: (value: TransactionFiltersState) => void;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <MonthSelector
          value={value.month}
          onChange={(month) => onChange({ ...value, month })}
        />
        <Select
          value={value.category}
          onValueChange={(category) =>
            onChange({ ...value, category: category ?? "all" })
          }
        >
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas categorias</SelectItem>
            {TRANSACTION_CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="relative w-full sm:w-64">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={value.search}
          onChange={(e) => onChange({ ...value, search: e.target.value })}
          placeholder="Buscar por descrição..."
          className="pl-8"
        />
      </div>
    </div>
  );
}
