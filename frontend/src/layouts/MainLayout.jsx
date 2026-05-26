import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../store/authStore";
import { useState } from "react";

export default function MainLayout() {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const nav = [
    { to: "/", label: "Dashboard", icon: "◈" },
    { to: "/history", label: "History", icon: "◇" },
  ];

  return (
    <div className="min-h-screen bg-dark-900">
      <header className="sticky top-0 z-50 glass border-b border-dark-600/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xl font-extrabold gradient-text tracking-tight">ResumeAI</Link>
            <nav className="hidden md:flex items-center gap-1">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    location.pathname === n.to
                      ? "bg-violet-500/15 text-violet-300 shadow-sm shadow-violet-500/10"
                      : "text-gray-400 hover:text-gray-200 hover:bg-dark-700/50"
                  }`}
                >
                  <span className="mr-1.5">{n.icon}</span>
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-gray-400">{user?.email}</span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">
              {user?.email?.charAt(0).toUpperCase() || "U"}
            </div>
            <button
              onClick={logout}
              className="text-sm text-gray-400 hover:text-rose-400 font-medium transition-colors px-3 py-1.5 rounded-lg hover:bg-rose-500/10"
            >
              Logout
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-gray-400 hover:text-white p-1"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-dark-600/30 px-4 py-3 animate-slide-down">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg text-sm mb-1 ${
                  location.pathname === n.to ? "bg-violet-500/15 text-violet-300" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {n.icon} {n.label}
              </Link>
            ))}
          </div>
        )}
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
        <Outlet />
      </main>
    </div>
  );
}
