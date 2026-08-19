"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Transaction, TransactionInput } from "@/lib/types";

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    const { data, error: fetchError } = await supabase
      .from("transactions")
      .select("*")
      .order("date", { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setError(null);
      setTransactions(data as Transaction[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch on mount
    refresh();
  }, [refresh]);

  const createTransaction = useCallback(async (input: TransactionInput) => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Usuário não autenticado.");

    const { error: insertError } = await supabase
      .from("transactions")
      .insert({ ...input, user_id: user.id });

    if (insertError) throw new Error(insertError.message);
    await refresh();
  }, [refresh]);

  const updateTransaction = useCallback(
    async (id: string, input: TransactionInput) => {
      const supabase = createClient();
      const { error: updateError } = await supabase
        .from("transactions")
        .update(input)
        .eq("id", id);

      if (updateError) throw new Error(updateError.message);
      await refresh();
    },
    [refresh],
  );

  const deleteTransaction = useCallback(async (id: string) => {
    const supabase = createClient();
    const { error: deleteError } = await supabase
      .from("transactions")
      .delete()
      .eq("id", id);

    if (deleteError) throw new Error(deleteError.message);
    await refresh();
  }, [refresh]);

  return {
    transactions,
    loading,
    error,
    refresh,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
}
