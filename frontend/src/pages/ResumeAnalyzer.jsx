import React, { useState } from 'react';
import api from '../utils/api';
import { 
  FileText, 
  Sparkles, 
  CheckCircle, 
  AlertTriangle, 
  Send, 
  MessageSquare, 
  BarChart, 
  HelpCircle,
  TrendingUp 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ResumeAnalyzer() {
  const [activeTab, setActiveTab] = useState('ats');
  const [targetRole, setTargetRole] = useState('Frontend Engineer');
  
  // ATS state
  const [file, setFile] = useState(null);
  const [rawText, setRawText] = useState('');
  const [atsLoading, setAtsLoading] = useState(false);
  const [atsResult, setAtsResult] = useState(null);

  // Interview state
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [interviewId, setInterviewId] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [interviewLoading, setInterviewLoading] = useState(false);
  const [interviewFeedback, setInterviewFeedback] = useState(null);

  // Handle ATS upload
  const handleAtsSubmit = async (e) => {
    e.preventDefault();
    setAtsLoading(true);
    setAtsResult(null);

    try {
      const formData = new FormData();
      formData.append('targetRole', targetRole);
      if (file) {
        formData.append('resume', file);
      } else {
        formData.append('resumeText', rawText);
      }

      const res = await api.post('/ai/analyze-resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.data.success) {
        setAtsResult(res.data.resume);
        confetti({
          particleCount: 70,
          spread: 50,
          origin: { y: 0.7 }
        });
      }
    } catch (err) {
      console.error("ATS analysis failed: ", err);
    } finally {
      setAtsLoading(false);
    }
  };

  // Handle Interview Start
  const handleStartInterview = async () => {
    setInterviewLoading(true);
    setInterviewFeedback(null);
    setChatHistory([]);
    try {
      const res = await api.post('/ai/interview/start', { role: targetRole });
      if (res.data.success) {
        setInterviewId(res.data.interviewId);
        setChatHistory([{ type: 'ai', content: res.data.question }]);
        setInterviewStarted(true);
      }
    } catch (err) {
      console.error("Failed to start mock interview session: ", err);
    } finally {
      setInterviewLoading(false);
    }
  };

  // Submit Answer
  const handleSendAnswer = async (e) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;

    const currentAnswer = userAnswer;
    setChatHistory(prev => [...prev, { type: 'user', content: currentAnswer }]);
    setUserAnswer('');
    setInterviewLoading(true);

    try {
      const res = await api.post('/api/ai/interview/submit', {
        interviewId,
        answer: currentAnswer,
      });

      if (res.data.success) {
        if (res.data.status === 'completed') {
          setInterviewFeedback({
            overallScore: res.data.overallScore,
            communicationFeedback: res.data.communicationFeedback,
            history: res.data.history,
          });
          setInterviewStarted(false);
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } else {
          setChatHistory(prev => [
            ...prev,
            { type: 'ai-feedback', content: res.data.previousFeedback },
            { type: 'ai', content: res.data.question }
          ]);
        }
      }
    } catch (err) {
      console.error("Answer submission failed: ", err);
    } finally {
      setInterviewLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
      {/* Header tabs toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-850 pb-4 space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Interview Prep Engine</h1>
          <p className="text-slate-400 text-sm mt-1">Scan resumes against ATS scanners, and run real-time conversational interviews.</p>
        </div>

        <div className="flex space-x-2 bg-slate-950/60 p-1.5 rounded-xl border border-slate-850">
          <button
            onClick={() => setActiveTab('ats')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'ats' ? 'bg-primary-600 text-white shadow-glow-primary' : 'text-slate-400 hover:text-white'
            }`}
          >
            ATS Resume Analyzer
          </button>
          <button
            onClick={() => setActiveTab('mock')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'mock' ? 'bg-primary-600 text-white shadow-glow-primary' : 'text-slate-400 hover:text-white'
            }`}
          >
            AI Mock Interview
          </button>
        </div>
      </div>

      {/* Target role selection */}
      <div className="glass-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-slate-850">
        <div className="flex items-center space-x-3">
          <FileText className="h-5 w-5 text-primary-400" />
          <div>
            <h3 className="font-bold text-white text-sm">Target Career Role</h3>
            <p className="text-xs text-slate-500">Analysis targets will optimize for this position description.</p>
          </div>
        </div>
        <select
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
          className="input-field bg-slate-950/60 w-full sm:w-64"
        >
          <option value="Frontend Engineer">Frontend Engineer</option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="Product Manager">Product Manager</option>
          <option value="Data Scientist">Data Scientist</option>
        </select>
      </div>

      {/* Main content split */}
      {activeTab === 'ats' ? (
        /* ATS Analyzer View */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Inputs card */}
          <div className="glass-card p-6 border-slate-850 h-fit">
            <h2 className="text-lg font-bold text-white mb-4">Upload Resume</h2>
            <form onSubmit={handleAtsSubmit} className="space-y-6">
              <div className="border-2 border-dashed border-slate-800 hover:border-slate-700 transition-colors rounded-xl p-8 text-center cursor-pointer">
                <input
                  type="file"
                  id="resume-file"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <label htmlFor="resume-file" className="cursor-pointer space-y-3 block">
                  <FileText className="h-8 w-8 text-slate-500 mx-auto" />
                  <p className="text-xs text-slate-300 font-semibold">
                    {file ? file.name : "Click to upload file (PDF, TXT)"}
                  </p>
                  <p className="text-[10px] text-slate-500">Max size: 5MB</p>
                </label>
              </div>

              {!file && (
                <div>
                  <div className="text-center text-slate-500 text-xs font-semibold uppercase tracking-wider mb-3">Or Paste Text</div>
                  <textarea
                    rows={6}
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    placeholder="Paste your professional experiences, summary, and skills list here..."
                    className="w-full input-field text-sm"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={atsLoading || (!file && !rawText.trim())}
                className="w-full glow-btn-primary py-3 flex items-center justify-center space-x-1.5 disabled:opacity-50"
              >
                {atsLoading ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Sparkles className="h-4.5 w-4.5" />
                    <span>Run ATS Analysis</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results card */}
          <div className="lg:col-span-2 glass-card p-6 border-slate-850">
            {atsResult ? (
              <div className="space-y-8">
                {/* Score section */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-850">
                  <div>
                    <h2 className="text-xl font-bold text-white">ATS Feedback Analysis</h2>
                    <p className="text-xs text-slate-400 mt-1">Calculated keyword match score for {atsResult.targetRole}.</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl font-extrabold text-white">{atsResult.atsScore}%</span>
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">Good Fit</span>
                  </div>
                </div>

                {/* Suggestions bullets */}
                <div>
                  <h3 className="text-sm font-bold text-white mb-3">Recommended Improvements</h3>
                  <div className="space-y-2">
                    {atsResult.analysis?.suggestions?.map((s, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-sm text-slate-300">
                        <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Keywords comparison lists */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-slate-850">
                  <div>
                    <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">Keywords Found</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {atsResult.analysis?.keywordsFound?.map((key, idx) => (
                        <span key={idx} className="text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-lg">
                          {key}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-3">Missing Keywords</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {atsResult.analysis?.missingKeywords?.map((key, idx) => (
                        <span key={idx} className="text-xs bg-rose-500/10 border border-rose-500/20 text-rose-300 px-2.5 py-1 rounded-lg">
                          {key}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center py-16 text-center text-slate-500 font-medium">
                <FileText className="h-12 w-12 text-slate-700 mb-4" />
                <p>Submit your resume details to populate analysis scorecards.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Mock Interview View */
        <div className="glass-card p-6 border-slate-850">
          {interviewFeedback ? (
            /* Final scorecard */
            <div className="space-y-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="inline-flex items-center space-x-1 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold text-emerald-400 uppercase mb-4">
                  <TrendingUp className="h-4 w-4" />
                  <span>Interview Completed</span>
                </div>
                <h2 className="text-2xl font-bold text-white">Your Interview Assessment</h2>
                <div className="mt-6 flex items-baseline justify-center space-x-2">
                  <span className="text-5xl font-extrabold text-white">{interviewFeedback.overallScore}</span>
                  <span className="text-lg text-slate-500">/ 100</span>
                </div>
              </div>

              {/* Feedback cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-slate-850">
                <div className="bg-slate-950/40 p-5 border border-slate-850 rounded-xl">
                  <h3 className="font-bold text-white text-sm mb-2">Communication Clarity</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{interviewFeedback.communicationFeedback?.clarity}</p>
                </div>
                <div className="bg-slate-950/40 p-5 border border-slate-850 rounded-xl">
                  <h3 className="font-bold text-white text-sm mb-2">Pacing & Pointers</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{interviewFeedback.communicationFeedback?.pacing}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white mb-3">Key Development Recommendations</h3>
                <ul className="space-y-2">
                  {interviewFeedback.communicationFeedback?.suggestions?.map((s, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-sm text-slate-300">
                      <CheckCircle className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-center pt-6">
                <button
                  onClick={handleStartInterview}
                  className="glow-btn-primary py-2.5 px-6 text-xs"
                >
                  Start New Session
                </button>
              </div>
            </div>
          ) : interviewStarted ? (
            /* Live chat timeline */
            <div className="flex flex-col h-[500px]">
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-6 scrollbar-thin">
                {chatHistory.map((chat, idx) => (
                  <div key={idx} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed ${
                      chat.type === 'user' 
                        ? 'bg-primary-600 text-white rounded-tr-none shadow-glow-primary' 
                        : chat.type === 'ai-feedback'
                        ? 'bg-slate-950/40 border border-slate-850 text-slate-400 text-xs'
                        : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow-glass'
                    }`}>
                      {chat.type === 'ai' && <p className="font-bold text-[10px] text-primary-400 uppercase mb-1">AI Interviewer</p>}
                      {chat.type === 'ai-feedback' && <p className="font-bold text-[10px] text-emerald-400 uppercase mb-1">Response Scoring</p>}
                      <p>{chat.content}</p>
                    </div>
                  </div>
                ))}
                
                {interviewLoading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none p-4 flex items-center space-x-1.5">
                      <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleSendAnswer} className="flex items-center space-x-2 border-t border-slate-850 pt-4">
                <input
                  type="text"
                  required
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your response to the question..."
                  className="flex-1 input-field py-3"
                />
                <button
                  type="submit"
                  disabled={interviewLoading || !userAnswer.trim()}
                  className="glow-btn-primary py-3 px-5 flex items-center justify-center shrink-0 disabled:opacity-50"
                >
                  <Send className="h-4.5 w-4.5" />
                </button>
              </form>
            </div>
          ) : (
            /* Start trigger landing */
            <div className="text-center py-16 max-w-md mx-auto space-y-6">
              <MessageSquare className="h-12 w-12 text-primary-500 mx-auto" />
              <div>
                <h2 className="text-xl font-bold text-white">AI Mock Interview Session</h2>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                  Engage in a 5-step conversational assessment tailored to {targetRole}. Get scored on technical completeness and structural style.
                </p>
              </div>
              <button
                onClick={handleStartInterview}
                className="glow-btn-accent w-full py-3 text-sm flex items-center justify-center space-x-1.5"
              >
                <span>Launch Mock Session</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
