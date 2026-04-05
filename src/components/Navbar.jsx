import { useApp } from "../context/AppContext";
import { useTheme } from "../context/ThemeContext";

const Navbar = ({ onMenuClick }) => {
  const { role, setRole, loading } = useApp();
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-3 px-4 md:px-7 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700/60 shadow-sm transition-colors duration-200">

      {/* Left: hamburger + title */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shrink-0"
          aria-label="Open menu"
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
          </svg>
        </button>

        <h2 className="font-bold text-[17px] tracking-tight text-slate-900 dark:text-slate-100 truncate">
          Finance Dashboard
        </h2>

        {loading && (
          <span className="hidden sm:inline-block text-xs font-medium text-indigo-600 bg-indigo-50 dark:bg-indigo-900/40 dark:text-indigo-300 px-3 py-0.5 rounded-full whitespace-nowrap">
            ⟳ Loading...
          </span>
        )}
      </div>

      {/* Right: role badge + switcher + theme toggle */}
      <div className="flex items-center gap-2 md:gap-3 shrink-0">
        {/* Role badge — hidden on xs */}
        <span className={`hidden sm:inline-block text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${
          role === "admin"
            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
            : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400"
        }`}>
          {role === "admin" ? "● Admin" : "● Viewer"}
        </span>

        {/* Role switcher */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="text-sm font-medium border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>

        {/* Dark / Light toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-base"
        >
          {isDark ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
};

export default Navbar;



