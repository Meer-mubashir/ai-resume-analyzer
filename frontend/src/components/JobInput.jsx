import { useState } from "react";
import api from "../api/client";

export default function JobInput({ onCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    if (!content.trim()) return;
    setSaving(true);
    try {
      const { data } = await api.post("/job", { title, content });
      onCreated(data.id);
      setSaved(true);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to save job description");
    } finally {
      setSaving(false);
    }
  };

  if (saved) {
    return (
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-100">Job Description</h3>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 p-4 rounded-xl text-sm animate-slide-up">
          <div className="flex items-center gap-2 mb-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            <span className="font-medium">Job description saved</span>
          </div>
          {title && <p className="text-emerald-300/70 text-xs mt-1">{title}</p>}
          <button
            onClick={() => { setSaved(false); setContent(""); setTitle(""); onCreated(null); }}
            className="mt-2 text-sm text-violet-400 hover:text-violet-300 transition-colors"
          >
            Enter a new one
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
          <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-100">Job Description</h3>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Job Title (optional)</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Senior Frontend Developer"
            className="input-dark" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Job Description</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)}
            rows={10} placeholder="Paste the job description here..."
            className="input-dark resize-y min-h-[200px]" />
        </div>
        <button onClick={handleSave} disabled={!content.trim() || saving} className="gradient-btn w-full py-2.5">
          {saving ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              Saving...
            </span>
          ) : "Save Job Description"}
        </button>
      </div>
    </div>
  );
}
