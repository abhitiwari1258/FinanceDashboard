import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useApp } from "../context/AppContext";

function Insights() {
  const { transactions } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (transactions.length === 0) {
    return (
      <div className="flex h-screen bg-slate-100 dark:bg-slate-950 transition-colors duration-200">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex flex-col flex-1 min-w-0">
          <Navbar onMenuClick={() => setSidebarOpen(true)} />
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center">
              <div className="text-5xl mb-3">📊</div>
              <p className="text-slate-400 text-base font-medium">No insights available yet</p>
              <p className="text-slate-500 text-[13px] mt-1">Add transactions to see analytics</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Highest spending category
  const categoryMap = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    }
  });
  const categories = Object.keys(categoryMap);
  const highestCategory =
    categories.length > 0
      ? categories.reduce((a, b) => (categoryMap[a] > categoryMap[b] ? a : b))
      : "No Data";
  const highestAmount = categoryMap[highestCategory] || 0;

  // Monthly comparison
  const currentMonth = new Date().getMonth();
  const lastMonth = currentMonth - 1;
  let currentTotal = 0;
  let lastTotal = 0;
  transactions.forEach((t) => {
    const month = new Date(t.date).getMonth();
    if (t.type === "expense") {
      if (month === currentMonth) currentTotal += t.amount;
      if (month === lastMonth) lastTotal += t.amount;
    }
  });
  const difference = currentTotal - lastTotal;
  const percentChange =
    lastTotal > 0 ? ((difference / lastTotal) * 100).toFixed(1) : "N/A";

  // Savings rate
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((a, c) => a + c.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, c) => a + c.amount, 0);
  const savingsRate =
    totalIncome > 0
      ? (((totalIncome - totalExpense) / totalIncome) * 100).toFixed(1)
      : 0;

  const insightCards = [
    {
      icon: "🏆",
      label: "Top Spending",
      value: highestCategory,
      sub: `₹ ${highestAmount.toLocaleString("en-IN")} total`,
      valueColor: "text-slate-900 dark:text-slate-100",
    },
    {
      icon: "📅",
      label: "This Month",
      value: `₹ ${currentTotal.toLocaleString("en-IN")}`,
      sub: "Total expenses",
      valueColor: "text-slate-900 dark:text-slate-100",
    },
    {
      icon: difference > 0 ? "📈" : "📉",
      label: "vs Last Month",
      value: `${difference > 0 ? "+" : ""}₹ ${Math.abs(difference).toLocaleString("en-IN")}`,
      sub: percentChange !== "N/A" ? `${percentChange}% change` : "No previous data",
      valueColor: difference > 0 ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400",
    },
    {
      icon: "💰",
      label: "Savings Rate",
      value: `${savingsRate}%`,
      sub: "Of total income",
      valueColor: savingsRate >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400",
    },
  ];

  const barColors = ["#6366f1", "#10b981", "#f59e0b", "#f43f5e", "#06b6d4"];

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-950 transition-colors duration-200">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-7">

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-[22px] font-extrabold tracking-tight text-slate-900 dark:text-slate-100 m-0">
              Insights
            </h1>
            <p className="text-slate-400 text-[13px] mt-1 mb-0">
              Your spending patterns and financial health
            </p>
          </div>

          {/* Insight Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {insightCards.map((card, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-800/80 rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 transition-transform duration-200"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="text-[22px]">{card.icon}</span>
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.5px]">
                    {card.label}
                  </span>
                </div>
                <p className={`text-xl font-extrabold m-0 mb-1 ${card.valueColor}`}>
                  {card.value}
                </p>
                <p className="text-[13px] text-slate-400 m-0">{card.sub}</p>
              </div>
            ))}
          </div>

          {/* Category breakdown */}
          {categories.length > 0 && (
            <div className="bg-white dark:bg-slate-800/80 rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
              <h3 className="text-[15px] font-bold text-slate-900 dark:text-slate-100 mb-4 mt-0">
                Spending by Category
              </h3>
              <div className="flex flex-col gap-3">
                {categories
                  .sort((a, b) => categoryMap[b] - categoryMap[a])
                  .map((cat, i) => {
                    const pct = ((categoryMap[cat] / totalExpense) * 100).toFixed(1);
                    const color = barColors[i % barColors.length];
                    return (
                      <div key={cat}>
                        <div className="flex justify-between mb-1.5 flex-wrap gap-1">
                          <span className="text-[13px] font-semibold text-slate-700 dark:text-slate-200">
                            {cat}
                          </span>
                          <span className="text-[13px] text-slate-500 dark:text-slate-400">
                            ₹ {categoryMap[cat].toLocaleString("en-IN")} ({pct}%)
                          </span>
                        </div>
                        <div className="bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${pct}%`, background: color }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Insights;
