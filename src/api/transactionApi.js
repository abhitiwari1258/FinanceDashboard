import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "";

export const USE_MOCK = !BASE_URL;

const api = axios.create({
  baseURL: BASE_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
  timeout: 5000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.warn("API Error:", error?.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

// ── Mock delay helper ─────────────────────────────────────────────────────
const delay = (ms = 350) => new Promise((res) => setTimeout(res, ms));

// ── CRUD with automatic mock fallback ────────────────────────────────────

export const fetchTransactions = async (localData = []) => {
  if (USE_MOCK) { await delay(); return { data: localData }; }
  return api.get("/transactions");
};

export const createTransaction = async (data) => {
  if (USE_MOCK) { await delay(300); return { data: { ...data, id: Date.now() } }; }
  return api.post("/transactions", data);
};

export const updateTransaction = async (id, data) => {
  if (USE_MOCK) { await delay(300); return { data: { id, ...data } }; }
  return api.put(`/transactions/${id}`, data);
};

export const deleteTransaction = async (id) => {
  if (USE_MOCK) { await delay(300); return { data: { id } }; }
  return api.delete(`/transactions/${id}`);
};

export default api;

