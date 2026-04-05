import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { useApp } from "../../context/AppContext";
import { useTheme } from "../../context/ThemeContext";

function LineChartComponent() {
  const { transactions } = useApp();
  const { isDark } = useTheme();

  const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

  let balance = 0;
  const data = sorted.map((t) => {
    if (t.type === "income") balance += t.amount;
    else balance -= t.amount;
    return {
      date: new Date(t.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
      balance,
    };
  });

  const gridColor  = isDark ? "#334155" : "#e2e8f0";
  const axisColor  = isDark ? "#64748b" : "#94a3b8";
  const tooltipBg  = isDark ? "#1e293b" : "#ffffff";
  const tooltipBorder = isDark ? "#334155" : "#e2e8f0";

  return (
    <div className="bg-white dark:bg-slate-800/80 p-4 md:p-5 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] transition-colors duration-200">
      <h2 className="mb-4 font-semibold text-slate-800 dark:text-slate-100 text-[15px]">
        Balance Trend
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey="date"
            tick={{ fill: axisColor, fontSize: 11 }}
            axisLine={{ stroke: gridColor }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: axisColor, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={60}
          />
          <Tooltip
            contentStyle={{
              background: tooltipBg,
              border: `1px solid ${tooltipBorder}`,
              borderRadius: "10px",
              fontSize: "13px",
              color: isDark ? "#e2e8f0" : "#334155",
              boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            }}
          />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#6366f1"
            strokeWidth={2.5}
            dot={{ r: 3, fill: "#6366f1", strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChartComponent;


