import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/authStore";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass rounded-2xl p-8 animate-slide-up">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-100">Welcome Back</h2>
        <p className="text-gray-400 text-sm mt-1">Sign in to your account</p>
      </div>
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-300 p-3 rounded-xl mb-4 text-sm animate-slide-down">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
            placeholder="you@example.com"
            className="input-dark" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
            placeholder="••••••••"
            className="input-dark" />
        </div>
        <button type="submit" disabled={loading} className="gradient-btn w-full py-2.5">
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              Signing in...
            </span>
          ) : "Sign In"}
        </button>
      </form>
      <p className="text-center text-sm text-gray-400 mt-6">
        Don't have an account?{" "}
        <Link to="/register" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">Sign up</Link>
      </p>
    </div>
  );
}
