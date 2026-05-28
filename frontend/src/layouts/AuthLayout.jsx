import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/authStore";
import Footer from "../components/Footer";

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/" replace />;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden bg-dark-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-dark-900 to-dark-900" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
      <div className="w-full max-w-md relative animate-fade-in flex-1 flex flex-col justify-center">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold gradient-text tracking-tight">ResumeAI</h1>
          <p className="text-gray-400 mt-2 text-sm">AI-Powered Resume Analysis</p>
        </div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
