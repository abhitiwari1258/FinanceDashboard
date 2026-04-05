import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import { useApp } from "../context/AppContext";
import LineChartComponent from "../components/Charts/LineChart";
import PieChartComponent from "../components/Charts/PieChart";
import TransactionTable from "../components/TransactionTable";
import { USE_MOCK } from "../api/transactionApi";

const Dashboard = () => {
  const { transactions, loadTransactions, loading } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = income - expense;

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-950 transition-colors duration-200">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 md:p-7">

          {/* Page Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <h1 className="text-[22px] font-extrabold tracking-tight text-slate-900 dark:text-slate-100 m-0">
                Dashboard
              </h1>
              <p className="text-slate-400 text-[13px] mt-1 mb-0">Your financial overview</p>
            </div>
            <button
              onClick={loadTransactions}
              disabled={loading}
              className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white border-none rounded-[10px] px-5 py-2.5 font-semibold text-[13px] cursor-pointer shadow-[0_4px_12px_rgba(99,102,241,0.3)] disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              {loading ? "⟳ Syncing..." : USE_MOCK ? "⟳ Sync (Mock)" : "⟳ Sync from API"}
            </button>
          </div>

          {/* Mock mode banner */}
          {USE_MOCK && (
            <div className="flex items-start gap-2.5 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-[10px] px-4 py-2.5 mb-5 text-[13px] text-amber-800 dark:text-amber-300 flex-wrap">
              <span>⚠️</span>
              <span>
                <strong>Offline / Mock mode</strong> — No backend connected. Data is saved locally.
                Add{" "}
                <code className="bg-amber-100 dark:bg-amber-900/40 px-1.5 py-0.5 rounded text-xs">
                  VITE_API_URL=http://localhost:5000/api
                </code>{" "}
                to your{" "}
                <code className="bg-amber-100 dark:bg-amber-900/40 px-1.5 py-0.5 rounded text-xs">.env</code>{" "}
                file to connect.
              </span>
            </div>
          )}

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-7">
            <SummaryCard title="Total Balance" amount={balance} />
            <SummaryCard title="Income" amount={income} />
            <SummaryCard title="Expenses" amount={expense} />
          </div>

          {/* Charts */}
          <h2 className="text-[15px] font-bold text-slate-700 dark:text-slate-300 mb-4">Analytics</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-2">
            <LineChartComponent />
            <PieChartComponent />
          </div>

          {/* Table */}
          <h2 className="text-[15px] font-bold text-slate-700 dark:text-slate-300 mt-3">
            Recent Transactions
          </h2>
          <TransactionTable />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

