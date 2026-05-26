import { useState } from "react";
import api from "../api/client";
import ResumeUpload from "../components/ResumeUpload";
import JobInput from "../components/JobInput";
import MatchResults from "../components/MatchResults";
import SkillGapCard from "../components/SkillGapCard";
import SuggestionsPanel from "../components/SuggestionsPanel";
import ReportDownload from "../components/ReportDownload";

export default function DashboardPage() {
  const [resumeId, setResumeId] = useState(null);
  const [jobId, setJobId] = useState(null);
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!resumeId || !jobId) {
      setError("Please upload a resume and enter a job description first");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/match", { resumeId, jobId });
      setMatch(data);
    } catch (err) {
      setError(err.response?.data?.error || "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="animate-fade-in">
        <h2 className="text-3xl font-bold text-gray-100">Dashboard</h2>
        <p className="text-gray-400 mt-1">Upload your resume and compare it against any job description.</p>
      </div>

      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-300 p-4 rounded-xl animate-slide-down">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="animate-slide-up animate-delay-100"><ResumeUpload onUploaded={setResumeId} /></div>
        <div className="animate-slide-up animate-delay-200"><JobInput onCreated={setJobId} /></div>
      </div>

      <div className="flex justify-center animate-fade-in animate-delay-300">
        <button
          onClick={handleAnalyze}
          disabled={loading || !resumeId || !jobId}
          className="gradient-btn px-10 py-3.5 text-lg group"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              Analyzing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              Analyze Match
            </span>
          )}
        </button>
      </div>

      {match && (
        <div className="space-y-6 animate-slide-up">
          <div className="animate-slide-up animate-delay-100"><MatchResults score={match.matchScore} matchedSkills={match.matchedSkills} /></div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="animate-slide-up animate-delay-200"><SkillGapCard missingSkills={match.missingSkills} /></div>
            <div className="animate-slide-up animate-delay-300"><SuggestionsPanel suggestions={match.suggestions} /></div>
          </div>
          <div className="flex justify-center animate-fade-in animate-delay-400">
            <ReportDownload matchId={match.matchId} />
          </div>
        </div>
      )}
    </div>
  );
}
