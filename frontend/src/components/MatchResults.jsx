export default function MatchResults({ score, matchedSkills }) {
  const config =
    score >= 70
      ? { ring: "ring-emerald-500/30", bg: "from-emerald-500/10", text: "text-emerald-300", label: "Strong match!", desc: "Your resume aligns well with this role." }
      : score >= 40
      ? { ring: "ring-amber-500/30", bg: "from-amber-500/10", text: "text-amber-300", label: "Moderate match", desc: "Consider addressing the gaps below." }
      : { ring: "ring-rose-500/30", bg: "from-rose-500/10", text: "text-rose-300", label: "Low match", desc: "Review suggestions to improve alignment." };

  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className={`card bg-gradient-to-br ${config.bg} to-transparent border-0 ${config.ring} ring-1`}>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-100 mb-4">Match Score</h3>
        <div className="relative w-40 h-40 mx-auto mb-4">
          <svg className="w-40 h-40 -rotate-90" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r={radius} fill="none" stroke="currentColor" strokeWidth="8"
              className="text-dark-600/50" />
            <circle cx="80" cy="80" r={radius} fill="none" stroke="currentColor" strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className={`transition-all duration-1000 ease-out ${score >= 70 ? "text-emerald-400" : score >= 40 ? "text-amber-400" : "text-rose-400"}`}
              style={{ filter: "drop-shadow(0 0 6px currentColor)" }} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-4xl font-extrabold ${config.text}`}>{score}%</span>
          </div>
        </div>
        <p className="text-lg font-semibold text-gray-200">{config.label}</p>
        <p className="text-sm text-gray-400 mt-1">{config.desc}</p>
      </div>
      {matchedSkills?.length > 0 && (
        <div className="mt-6 pt-6 border-t border-dark-600/30">
          <h4 className="font-medium text-gray-300 mb-3 text-sm uppercase tracking-wider">Matched Skills</h4>
          <div className="flex flex-wrap gap-2">
            {matchedSkills.map((skill, i) => (
              <span key={i} className="tag-skill animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
