import { NavLink } from "react-router-dom";

const navItems = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    to: "/insights",
    label: "Insights",
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M3 20h18M5 20V10l7-7 7 7v10" />
        <path d="M9 20v-5h6v5" />
      </svg>
    ),
  },
];

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50 md:z-10
          w-60 min-h-screen flex flex-col
          bg-gradient-to-b from-slate-950 to-slate-900
          dark:from-[#060a10] dark:to-slate-950
          shadow-[4px_0_24px_rgba(0,0,0,0.25)]
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="px-6 py-7 border-b border-white/[0.07]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-[0_4px_12px_rgba(99,102,241,0.4)] shrink-0">
              <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
            </div>
            <div>
              <div className="text-slate-100 font-bold text-[15px] tracking-tight">FinanceIQ</div>
              <div className="text-slate-500 text-[11px] mt-0.5">Personal Finance</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4">
          <div className="text-slate-600 text-[10px] font-bold tracking-[1.2px] uppercase px-3 mb-2">
            Menu
          </div>
          <ul className="flex flex-col gap-1 list-none m-0 p-0">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm no-underline transition-all duration-200 ${
                      isActive
                        ? "font-semibold text-white bg-gradient-to-r from-indigo-500/25 to-violet-500/15 border-l-[3px] border-indigo-500"
                        : "font-normal text-slate-400 hover:text-slate-200 hover:bg-white/5 border-l-[3px] border-transparent"
                    }`
                  }
                >
                  <span className="opacity-90">{item.icon}</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/[0.07]">
          <div className="text-slate-600 text-[11px] text-center">v1.0 · FinanceIQ</div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;

