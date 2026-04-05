import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from "recharts";
import { useApp } from "../../context/AppContext";
import { useTheme } from "../../context/ThemeContext";

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#f43f5e", "#06b6d4"];

function PieChartComponent() {
  const { transactions } = useApp();
  const { isDark } = useTheme();

  const categoryMap = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const data = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  const tooltipBg     = isDark ? "#1e293b" : "#ffffff";
  const tooltipBorder = isDark ? "#334155" : "#e2e8f0";
  const legendColor   = isDark ? "#94a3b8" : "#64748b";

  return (
    <div className="bg-white dark:bg-slate-800/80 p-4 md:p-5 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] transition-colors duration-200">
      <h2 className="mb-4 font-semibold text-slate-800 dark:text-slate-100 text-[15px]">
        Spending Breakdown
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={85}
            innerRadius={40}
            paddingAngle={3}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
                stroke="none"
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: tooltipBg,
              border: `1px solid ${tooltipBorder}`,
              borderRadius: "10px",
              fontSize: "13px",
              color: isDark ? "#e2e8f0" : "#334155",
              boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            }}
            formatter={(value) => [`₹ ${value.toLocaleString("en-IN")}`, "Amount"]}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: "12px", color: legendColor }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieChartComponent;


