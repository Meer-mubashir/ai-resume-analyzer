import { useState, useEffect } from "react";
import api from "../api/client";

export default function HistoryPage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/match")
      .then(({ data }) => setMatches(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <svg className="animate-spin h-8 w-8 text-violet-400 mx-auto mb-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-gray-400">Loading history...</p>
        </div>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="text-center py-24 animate-fade-in">
        <div className="text-5xl mb-4 opacity-30">◇</div>
        <h2 className="text-2xl font-bold text-gray-300 mb-2">No matches yet</h2>
        <p className="text-gray-500">Upload a resume and run an analysis to see results here.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-100">Match History</h2>
        <p className="text-gray-400 mt-1">Your previous resume analyses.</p>
      </div>
      <div className="space-y-4">
        {matches.map((m, i) => (
          <div
            key={m.id}
            className="glass rounded-2xl p-6 flex items-center justify-between glass-hover animate-slide-up"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${
                m.matchScore >= 70
                  ? "bg-emerald-500/20 text-emerald-300"
                  : m.matchScore >= 40
                  ? "bg-amber-500/20 text-amber-300"
                  : "bg-rose-500/20 text-rose-300"
              }`}>
                {m.matchScore}%
              </div>
              <div>
                <p className="font-semibold text-gray-100">
                  {m.jobDescription?.title || "Untitled Job"}
                </p>
                <p className="text-sm text-gray-400">
                  Resume: {m.resume?.fileName || "N/A"}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {new Date(m.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                </p>
              </div>
            </div>
            <div className={`text-3xl font-extrabold tracking-tight ${
              m.matchScore >= 70 ? "text-emerald-400" : m.matchScore >= 40 ? "text-amber-400" : "text-rose-400"
            }`}>
              {m.matchScore}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
