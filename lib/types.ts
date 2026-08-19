export const TRANSACTION_CATEGORIES = [
  "Alimentação",
  "Transporte",
  "Moradia",
  "Lazer",
  "Saúde",
  "Educação",
  "Salário",
  "Freelance",
  "Outros",
] as const;

export type TransactionCategory = (typeof TRANSACTION_CATEGORIES)[number];

export const TRANSACTION_TYPES = ["receita", "despesa"] as const;

export type TransactionType = (typeof TRANSACTION_TYPES)[number];

export type Transaction = {
  id: string;
  user_id: string;
  description: string;
  amount: number;
  date: string;
  type: TransactionType;
  category: TransactionCategory;
  created_at: string;
  updated_at: string;
};

export type TransactionInput = {
  description: string;
  amount: number;
  date: string;
  type: TransactionType;
  category: TransactionCategory;
};
