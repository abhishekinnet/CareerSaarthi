import React, { useState } from 'react';
import api from '../utils/api';
import { 
  Sparkles, 
  MapPin, 
  ArrowRight, 
  ArrowLeft, 
  Compass, 
  Award, 
  GraduationCap, 
  BookOpen, 
  Clock, 
  Briefcase 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CareerPredictor() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    interests: '',
    skills: '',
    gradeLevel: 'Undergraduate',
    stream: 'Science',
    percentageOrGpa: 80,
    favoriteSubjects: '',
    targetSalaryRange: '6-12 LPA',
    maxHigherEducationBudget: 500000,
  });

  const [report, setReport] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep(s => s + 1);
  const handlePrev = () => setStep(s => s - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Structure inputs
      const payload = {
        interests: formData.interests.split(',').map(s => s.trim()).filter(Boolean),
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
        academicPerformance: {
          gradeLevel: formData.gradeLevel,
          stream: formData.stream,
          percentageOrGpa: Number(formData.percentageOrGpa),
          favoriteSubjects: formData.favoriteSubjects.split(',').map(s => s.trim()).filter(Boolean),
          maxHigherEducationBudget: Number(formData.maxHigherEducationBudget),
        },
        careerGoals: [],
        financialGoals: {
          targetSalaryRange: formData.targetSalaryRange,
        }
      };

      const res = await api.post('/ai/predict-career', payload);
      if (res.data.success) {
        setReport(res.data.report);
        setStep(4); // Move to results step
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch (error) {
      console.error("AI career prediction query failed: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Headings */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-white flex items-center justify-center space-x-2">
          <Compass className="h-7 w-7 text-primary-500" />
          <span>AI Career Predictor & Planner</span>
        </h1>
        <p className="text-slate-400 text-sm mt-2">Map interests and academic parameters to curated roadmap milestones.</p>
      </div>

      {loading ? (
        <div className="glass-card p-16 text-center space-y-6">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 border-4 border-primary-500/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-primary-400 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Analyzing profile indicators...</h3>
            <p className="text-xs text-slate-500 mt-2">Invoking Gemini model to outline skills, colleges, and scholarships.</p>
          </div>
        </div>
      ) : step === 4 && report ? (
        /* Prediction Results view */
        <div className="space-y-8">
          <div className="glass-card p-8 border-primary-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary-600/10 border-l border-b border-primary-500/20 px-4 py-1.5 rounded-bl-xl text-xs font-semibold text-primary-400 uppercase tracking-wider">
              Prediction Model Complete
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Recommended Career Matches</h2>
            <p className="text-slate-400 text-xs">Based on analytical stream matching & student targets.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {report.recommendedCareers.map((career, idx) => (
                <div key={idx} className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700 transition-colors">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-bold text-white">{career.title}</h3>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                      {career.matchPercentage}% Match
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mt-3 leading-relaxed">{career.description}</p>
                  
                  {/* Phase Roadmap timeline */}
                  <div className="mt-6 space-y-4">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Milestone Roadmap</p>
                    {career.roadmap?.map((phase, pIdx) => (
                      <div key={pIdx} className="border-l-2 border-primary-500/30 pl-4 py-1 relative">
                        <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 bg-primary-500 rounded-full"></div>
                        <p className="text-xs font-bold text-white flex items-center space-x-1">
                          <Clock className="h-3 w-3 text-slate-400" />
                          <span>{phase.phase} ({phase.estimatedTime})</span>
                        </p>
                        <p className="text-xs text-slate-400 mt-1">{phase.description}</p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {phase.skillsToAcquire?.map((s, sIdx) => (
                            <span key={sIdx} className="text-[10px] bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded-md">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Colleges & Scholarships references */}
                  <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-800/60 text-xs">
                    <div>
                      <p className="font-bold text-slate-500 mb-2">Recommended Institutions</p>
                      <ul className="space-y-1 list-disc pl-3 text-slate-400">
                        {career.colleges?.slice(0,2).map((col, cIdx) => <li key={cIdx}>{col}</li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="font-bold text-slate-500 mb-2">Matching Scholarships</p>
                      <ul className="space-y-1 list-disc pl-3 text-slate-400">
                        {career.scholarships?.slice(0,2).map((sch, sIdx) => <li key={sIdx}>{sch}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <button 
                onClick={() => { setReport(null); setStep(1); }}
                className="bg-slate-900 border border-slate-850 hover:bg-slate-850 text-slate-300 hover:text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors"
              >
                Run Another Prediction
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Wizard Steps */
        <form onSubmit={handleSubmit} className="glass-card p-8 border-slate-800/80">
          <div className="flex justify-between items-center mb-8 border-b border-slate-850 pb-4">
            <span className="text-xs font-semibold text-slate-500 uppercase">Step {step} of 3</span>
            <div className="flex space-x-1">
              {[1, 2, 3].map(s => (
                <div key={s} className={`h-1.5 w-8 rounded-full ${s <= step ? 'bg-primary-500' : 'bg-slate-800'}`}></div>
              ))}
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-primary-400" />
                <span>Interests & Skills Portfolio</span>
              </h3>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Core Interests</label>
                <input
                  type="text"
                  required
                  name="interests"
                  value={formData.interests}
                  onChange={handleInputChange}
                  placeholder="Coding, UI/UX Design, Entrepreneurship, Space Research"
                  className="w-full input-field"
                />
                <p className="text-xs text-slate-500 mt-2">Enter keywords separated by commas.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Skills you already have</label>
                <input
                  type="text"
                  required
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  placeholder="JavaScript, Python, Figma, HTML, Mathematics, Communication"
                  className="w-full input-field"
                />
                <p className="text-xs text-slate-500 mt-2">List any current technical or soft skills.</p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <GraduationCap className="h-5 w-5 text-primary-400" />
                <span>Academic Record & Performance</span>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Grade Level</label>
                  <select
                    name="gradeLevel"
                    value={formData.gradeLevel}
                    onChange={handleInputChange}
                    className="w-full input-field"
                  >
                    <option>10th Standard</option>
                    <option>12th Standard</option>
                    <option>Undergraduate</option>
                    <option>Postgraduate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Academic Stream</label>
                  <select
                    name="stream"
                    value={formData.stream}
                    onChange={handleInputChange}
                    className="w-full input-field"
                  >
                    <option>Science</option>
                    <option>Commerce</option>
                    <option>Arts</option>
                    <option>Vocational</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Percentage / GPA</label>
                  <input
                    type="number"
                    required
                    name="percentageOrGpa"
                    value={formData.percentageOrGpa}
                    onChange={handleInputChange}
                    placeholder="85"
                    className="w-full input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Favorite Subjects</label>
                  <input
                    type="text"
                    required
                    name="favoriteSubjects"
                    value={formData.favoriteSubjects}
                    onChange={handleInputChange}
                    placeholder="Physics, Mathematics, Computer Science"
                    className="w-full input-field"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <Briefcase className="h-5 w-5 text-primary-400" />
                <span>Financial & Salary Ambitions</span>
              </h3>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Target Salary Package</label>
                <select
                  name="targetSalaryRange"
                  value={formData.targetSalaryRange}
                  onChange={handleInputChange}
                  className="w-full input-field"
                >
                  <option>3-6 LPA</option>
                  <option>6-12 LPA</option>
                  <option>12-25 LPA</option>
                  <option>25+ LPA</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Higher Education Budget (INR)</label>
                <input
                  type="number"
                  required
                  name="maxHigherEducationBudget"
                  value={formData.maxHigherEducationBudget}
                  onChange={handleInputChange}
                  placeholder="500000"
                  className="w-full input-field"
                />
                <p className="text-xs text-slate-500 mt-2">Maximum affordable budget for tuition and college enrollment.</p>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-850">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="flex items-center space-x-1.5 text-slate-400 hover:text-white text-sm font-semibold transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Previous</span>
              </button>
            ) : (
              <div></div>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="glow-btn-primary flex items-center space-x-1.5"
              >
                <span>Continue</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="glow-btn-accent flex items-center space-x-1.5"
              >
                <Sparkles className="h-4 w-4" />
                <span>Generate Roadmap</span>
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
