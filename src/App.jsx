import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./context/ThemeContext";
import Dashboard from "./pages/Dashboard";
import Insights from "./pages/Insights";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;

