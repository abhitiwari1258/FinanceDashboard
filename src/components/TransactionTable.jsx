import { useState } from "react";
import { useApp } from "../context/AppContext";

const TransactionTable = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editAmount, setEditAmount] = useState("");
  const [newTransaction, setNewTransaction] = useState({
    date: "",
    category: "",
    type: "expense",
    amount: "",
  });

  const { transactions, role, loading, addTransaction, editTransaction, removeTransaction } = useApp();

  let filteredData = transactions.filter((t) => {
    const matchesSearch = t.category.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" ? true : t.type === filter;
    return matchesSearch && matchesFilter;
  });

  filteredData.sort((a, b) =>
    sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount
  );

  const handleAdd = async () => {
    if (!newTransaction.date || !newTransaction.category || !newTransaction.amount) return;
    await addTransaction({ ...newTransaction, amount: Number(newTransaction.amount) });
    setShowForm(false);
    setNewTransaction({ date: "", category: "", type: "expense", amount: "" });
  };

  const handleEdit = async (id) => {
    if (!editAmount) return;
    await editTransaction(id, Number(editAmount));
    setEditId(null);
    setEditAmount("");
  };

  const inputCls =
    "w-full border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-[13px] text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-400 transition-colors";

  return (
    <div className="bg-white dark:bg-slate-800/80 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.07)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] p-4 md:p-6 mt-6 transition-colors duration-200">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-[17px] font-bold text-slate-900 dark:text-slate-100 m-0">
            Transactions
          </h2>
          {role !== "admin" && (
            <p className="text-[12px] text-slate-400 mt-1 mb-0">🔒 Viewer mode — read-only</p>
          )}
        </div>
        {role === "admin" && (
          <button
            onClick={() => setShowForm((v) => !v)}
            className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white border-none rounded-lg px-4 py-2 font-semibold text-[13px] cursor-pointer hover:opacity-90 transition-opacity"
          >
            {showForm ? "✕ Cancel" : "+ Add Transaction"}
          </button>
        )}
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 mb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Date</label>
            <input type="date" className={inputCls} value={newTransaction.date}
              onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })} />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Category</label>
            <input type="text" placeholder="e.g. Food" className={inputCls} value={newTransaction.category}
              onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })} />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Amount</label>
            <input type="number" placeholder="0" className={inputCls} value={newTransaction.amount}
              onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })} />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Type</label>
            <select className={inputCls} value={newTransaction.type}
              onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <button
            onClick={handleAdd}
            disabled={loading}
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-none rounded-lg px-4 py-2 font-semibold text-[13px] cursor-pointer disabled:opacity-70 hover:opacity-90 transition-opacity h-[38px]"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap gap-2.5 mb-4">
        <input
          type="text"
          placeholder="🔍 Search category..."
          className={`${inputCls} flex-1 min-w-[160px]`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className={`${inputCls} w-auto min-w-[110px]`} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select className={`${inputCls} w-auto min-w-[110px]`} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Amount ↑</option>
          <option value="desc">Amount ↓</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto -mx-4 md:-mx-6 px-4 md:px-6">
        <table className="w-full border-collapse text-[13.5px] min-w-[480px]">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900/50">
              {["Date", "Category", "Type", "Amount", ...(role === "admin" ? ["Actions"] : [])].map((h) => (
                <th
                  key={h}
                  className="px-3.5 py-2.5 text-left text-slate-500 dark:text-slate-400 font-bold text-[11px] uppercase tracking-[0.6px] border-b-2 border-slate-200 dark:border-slate-700 whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((t, i) => (
                <tr
                  key={t.id}
                  className={`border-b border-slate-100 dark:border-slate-700/50 transition-colors hover:bg-indigo-50/60 dark:hover:bg-indigo-900/20 ${
                    i % 2 === 0 ? "bg-white dark:bg-transparent" : "bg-slate-50/60 dark:bg-slate-900/20"
                  }`}
                >
                  <td className="px-3.5 py-3 text-slate-500 dark:text-slate-400 whitespace-nowrap">{t.date}</td>
                  <td className="px-3.5 py-3">
                    <span className="bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 px-2.5 py-0.5 rounded-full text-[12px] font-semibold whitespace-nowrap">
                      {t.category}
                    </span>
                  </td>
                  <td className="px-3.5 py-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[12px] font-semibold capitalize whitespace-nowrap ${
                      t.type === "income"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
                        : "bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400"
                    }`}>
                      {t.type === "income" ? "↑" : "↓"} {t.type}
                    </span>
                  </td>
                  <td className="px-3.5 py-3">
                    {editId === t.id ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          value={editAmount}
                          onChange={(e) => setEditAmount(e.target.value)}
                          className={`${inputCls} w-24`}
                          autoFocus
                        />
                        <button onClick={() => handleEdit(t.id)}
                          className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-none rounded-lg px-2.5 py-1.5 text-[12px] font-bold cursor-pointer hover:opacity-90">
                          ✓
                        </button>
                        <button onClick={() => setEditId(null)}
                          className="border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-lg px-2.5 py-1.5 text-[12px] font-bold cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                          ✕
                        </button>
                      </div>
                    ) : (
                      <span className={`font-bold text-sm whitespace-nowrap ${
                        t.type === "income"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-rose-600 dark:text-rose-400"
                      }`}>
                        ₹ {t.amount.toLocaleString("en-IN")}
                      </span>
                    )}
                  </td>
                  {role === "admin" && (
                    <td className="px-3.5 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setEditId(t.id); setEditAmount(t.amount); }}
                          className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white border-none rounded-lg px-3 py-1 text-[12px] font-semibold cursor-pointer hover:opacity-90 transition-opacity"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => removeTransaction(t.id)}
                          disabled={loading}
                          className="bg-gradient-to-r from-rose-500 to-rose-600 text-white border-none rounded-lg px-3 py-1 text-[12px] font-semibold cursor-pointer disabled:opacity-70 hover:opacity-90 transition-opacity"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={role === "admin" ? 5 : 4}
                  className="py-10 text-center text-slate-400 dark:text-slate-500">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;



