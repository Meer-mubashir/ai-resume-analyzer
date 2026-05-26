export default function SuggestionsPanel({ suggestions }) {
  if (!suggestions || suggestions.length === 0) {
    return (
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-100">Suggestions</h3>
        </div>
        <p className="text-gray-400 text-sm">No suggestions available.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
          <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-100">Improvement Suggestions</h3>
      </div>
      <ul className="space-y-3">
        {suggestions.map((s, i) => (
          <li key={i} className="flex gap-3 p-3 rounded-xl bg-dark-700/30 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
            <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500/30 to-cyan-500/30 text-violet-300 flex items-center justify-center text-sm font-bold">
              {i + 1}
            </span>
            <span className="text-gray-300 text-sm leading-relaxed">{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
