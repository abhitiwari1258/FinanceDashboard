import { createContext, useContext, useState, useEffect } from "react";
import { transactions as initialData } from "../data/mockData";
import {
  fetchTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  USE_MOCK,
} from "../api/transactionApi";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [role, setRole] = useState("viewer");
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : initialData;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Persist to localStorage on change
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // ── Axios: Fetch all transactions 

  const loadTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchTransactions(transactions); // passes local data for mock mode
      if (USE_MOCK) {
        // Mock mode: just re-confirm local state (no change)
        setTransactions(res.data);
      } else {
        // Real API: use server response directly
        setTransactions(res.data);
      }
    } catch (err) {
      setError("Failed to fetch transactions. Make sure your backend is running.");
    } finally {
      setLoading(false);
    }
  };

  // ── Axios: Add transaction ──────────────────────
  const addTransaction = async (newTxn) => {
    setLoading(true);
    try {
      const res = await createTransaction(newTxn);
      // In a real API: use res.data.id. Here we use Date.now() for demo
      setTransactions((prev) => [...prev, { ...newTxn, id: Date.now() }]);
    } catch (err) {
      setError("Failed to add transaction.");
    } finally {
      setLoading(false);
    }
  };

  // ── Axios: Update transaction amount ─────────────────
  const editTransaction = async (id, updatedAmount) => {
    setLoading(true);
    try {
      await updateTransaction(id, { amount: updatedAmount });
      setTransactions((prev) =>
        prev.map((t) => (t.id === id ? { ...t, amount: updatedAmount } : t))
      );
    } catch (err) {
      setError("Failed to update transaction.");
    } finally {
      setLoading(false);
    }
  };

  // ── Axios: Delete transaction ──────────────
  const removeTransaction = async (id) => {
    setLoading(true);
    try {
      await deleteTransaction(id);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError("Failed to delete transaction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        transactions,
        setTransactions,
        loading,
        error,
        loadTransactions,
        addTransaction,
        editTransaction,
        removeTransaction,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
