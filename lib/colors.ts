import type { TransactionCategory } from "@/lib/types";

// Fixed categorical order (never cycled) — validated for adjacent-pair
// colorblind safety. "Outros" is intentionally a neutral, not a hue slot.
export const CATEGORY_COLORS: Record<TransactionCategory, string> = {
  Moradia: "#2a78d6",
  Alimentação: "#eb6834",
  Transporte: "#1baf7a",
  Lazer: "#eda100",
  Saúde: "#e87ba4",
  Educação: "#008300",
  Salário: "#4a3aa7",
  Freelance: "#e34948",
  Outros: "#898781",
};
