const cardConfig = {
  "Total Balance": {
    icon: "💼",
    gradient: "from-indigo-500 to-violet-500",
    shadow: "shadow-[0_8px_24px_rgba(99,102,241,0.35)] hover:shadow-[0_12px_32px_rgba(99,102,241,0.5)]",
  },
  Income: {
    icon: "↑",
    gradient: "from-emerald-500 to-emerald-600",
    shadow: "shadow-[0_8px_24px_rgba(16,185,129,0.3)] hover:shadow-[0_12px_32px_rgba(16,185,129,0.45)]",
  },
  Expenses: {
    icon: "↓",
    gradient: "from-rose-500 to-rose-600",
    shadow: "shadow-[0_8px_24px_rgba(244,63,94,0.3)] hover:shadow-[0_12px_32px_rgba(244,63,94,0.45)]",
  },
};

const SummaryCard = ({ title, amount }) => {
  const cfg = cardConfig[title] || cardConfig["Total Balance"];

  return (
    <div className={`relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br ${cfg.gradient} ${cfg.shadow} transition-all duration-200 hover:-translate-y-1 cursor-default`}>
      {/* Decorative circles */}
      <div className="absolute -top-5 -right-5 w-24 h-24 rounded-full bg-white/[0.12]" />
      <div className="absolute -bottom-7 right-7 w-16 h-16 rounded-full bg-white/[0.08]" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white/75 text-[13px] font-medium">{title}</span>
          <span className="w-9 h-9 flex items-center justify-center bg-white/20 rounded-[10px] text-base">
            {cfg.icon}
          </span>
        </div>
        <p className="text-white text-[26px] font-extrabold tracking-tight m-0">
          ₹ {amount.toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;


