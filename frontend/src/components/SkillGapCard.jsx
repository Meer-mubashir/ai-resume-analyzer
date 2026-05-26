export default function SkillGapCard({ missingSkills }) {
  if (!missingSkills || missingSkills.length === 0) {
    return (
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-100">Missing Skills</h3>
        </div>
        <p className="text-emerald-300/80 text-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          No critical gaps detected.
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center">
          <svg className="w-4 h-4 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-100">Missing Skills</h3>
      </div>
      <p className="text-sm text-gray-400 mb-4">Consider adding these skills to your resume:</p>
      <div className="flex flex-wrap gap-2">
        {missingSkills.map((skill, i) => (
          <span key={i} className="tag-missing animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
