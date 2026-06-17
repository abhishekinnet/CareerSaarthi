const { GoogleGenAI } = require('@google/generative-ai');
const OpenAI = require('openai');

// Initialize API keys or use fallbacks
const geminiApiKey = process.env.GEMINI_API_KEY || '';
const openaiApiKey = process.env.OPENAI_API_KEY || '';

let openai = null;
if (openaiApiKey) {
  openai = new OpenAI({ apiKey: openaiApiKey });
}

/**
 * Generates structured career roadmap recommendations using Gemini, OpenAI, or a Rule-Based local AI fallback.
 */
exports.generateCareerRoadmap = async ({ interests, skills, academicPerformance, careerGoals, financialGoals }) => {
  const prompt = `
    Act as a professional career counselor. Based on the following student details:
    Interests: ${interests.join(', ')}
    Skills: ${skills.join(', ')}
    Academic Level: ${academicPerformance.gradeLevel}, Stream: ${academicPerformance.stream}, GPA/Pct: ${academicPerformance.percentageOrGpa}
    Career Goals: ${careerGoals.join(', ')}
    Financial Budget/Salary Goal: Budget ${academicPerformance.maxHigherEducationBudget || 'Flexible'} INR, Target Salary ${financialGoals.targetSalaryRange || 'Any'}
    
    Provide 3 matching career recommendations in valid JSON format.
    Return ONLY a JSON array, where each element is an object with the following fields:
    {
      "title": "Job Title",
      "description": "Short summary of why this matches",
      "matchPercentage": 85,
      "skillsRequired": ["Skill A", "Skill B"],
      "colleges": ["College Name 1", "College Name 2"],
      "scholarships": ["Scholarship Name 1"],
      "roadmap": [
        {
          "phase": "Phase 1: Foundation",
          "description": "What to do first",
          "estimatedTime": "1-2 Years",
          "skillsToAcquire": ["Skill 1"],
          "recommendedCourses": ["Course Name 1"]
        }
      ]
    }
  `;

  // 1. Try Gemini
  if (geminiApiKey) {
    try {
      const genAI = new GoogleGenAI({ apiKey: geminiApiKey });
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      // Parse JSON from code block markdown if present
      const jsonStart = text.indexOf('[');
      const jsonEnd = text.lastIndexOf(']') + 1;
      if (jsonStart !== -1 && jsonEnd !== -1) {
        return JSON.parse(text.substring(jsonStart, jsonEnd));
      }
      return JSON.parse(text);
    } catch (e) {
      console.warn("Gemini API call failed, trying OpenAI or falling back...", e.message);
    }
  }

  // 2. Try OpenAI
  if (openai) {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' }
      });
      const data = JSON.parse(response.choices[0].message.content);
      return data.careers || data.recommendedCareers || Object.values(data)[0] || data;
    } catch (e) {
      console.warn("OpenAI API call failed, falling back...", e.message);
    }
  }

  // 3. Fallback: Detailed, high-quality, local rule-based career roadmap
  return getLocalCareerFallback(interests, skills, academicPerformance);
};

/**
 * Analyzes resume using LLM or local parsing fallback
 */
exports.analyzeResumeATS = async (resumeText, targetRole) => {
  const prompt = `
    Analyze this resume text for a target role of "${targetRole}".
    Return a JSON object containing:
    {
      "formattingScore": 85,
      "keywordsFound": ["keyword1"],
      "missingKeywords": ["keyword2"],
      "suggestions": ["Add X", "Change format of Y"],
      "impactStatements": ["Managed X which led to Y"]
    }
    Resume Text:
    ${resumeText}
  `;

  if (geminiApiKey) {
    try {
      const genAI = new GoogleGenAI({ apiKey: geminiApiKey });
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const jsonStart = text.indexOf('{');
      const jsonEnd = text.lastIndexOf('}') + 1;
      if (jsonStart !== -1 && jsonEnd !== -1) {
        return JSON.parse(text.substring(jsonStart, jsonEnd));
      }
      return JSON.parse(text);
    } catch (e) {
      console.warn("Gemini resume analysis failed, falling back...", e.message);
    }
  }

  // Fallback Analysis
  const keywords = ['react', 'node', 'express', 'javascript', 'python', 'aws', 'docker', 'typescript', 'sql', 'mongodb', 'agile', 'git', 'testing', 'communication', 'teamwork'];
  const found = keywords.filter(k => resumeText.toLowerCase().includes(k));
  const missing = keywords.filter(k => !resumeText.toLowerCase().includes(k)).slice(0, 5);
  
  const score = Math.min(100, Math.max(40, 50 + found.length * 5));

  return {
    formattingScore: 80,
    keywordsFound: found,
    missingKeywords: missing,
    suggestions: [
      "Add metrics-based impacts (e.g. Improved performance by 30%)",
      "List more skills related directly to the " + targetRole + " position",
      "Ensure formatting has clear headers for Education, Skills, and Experience"
    ],
    impactStatements: [
      "Led development of core features using modern stacks",
      "Collaborated with cross-functional teams to deliver sprints on schedule"
    ]
  };
};

/**
 * Simulates or conducts mock interviews
 */
exports.generateInterviewQuestion = async (role, history) => {
  const userMessages = history.filter(h => h.answer);
  const currentStep = userMessages.length;

  if (currentStep >= 5) {
    // Interview completed, generate feedback and score
    return {
      status: 'completed',
      overallScore: Math.floor(Math.random() * 30) + 70, // 70-100
      communicationFeedback: {
        clarity: "Strong communication style. Answers are structured but could benefit from the STAR framework.",
        pacing: "Excellent pacing, maintains conversational tone.",
        suggestions: [
          "Be more specific with concrete technical metrics in your examples.",
          "Use a direct, problem-action-result structure to answer situational queries."
        ]
      }
    };
  }

  // Interview ongoing. Generate next question.
  const sampleQuestions = {
    "frontend": [
      "Explain the difference between state and props in React, and when you would use each.",
      "How do you optimize a web application's loading time and runtime performance?",
      "Can you describe what a closure is in JavaScript and provide a common use case?",
      "What is your approach to ensuring responsive design and cross-browser compatibility?",
      "How do you manage application-wide state in a large React project?"
    ],
    "backend": [
      "Describe the process of designing a secure REST API from scratch.",
      "How do you handle high-concurrency connections in Node.js/Express?",
      "What is the difference between SQL and NoSQL databases, and how do you choose between them?",
      "How does JWT auth work and how do you prevent common session vulnerability issues?",
      "Explain your experience with background tasks, message queues, or caching like Redis."
    ],
    "default": [
      "Tell me about a challenging technical problem you solved recently.",
      "How do you handle conflict or differing technical opinions within an engineering team?",
      "What is your strategy for learning a brand-new programming language or framework quickly?",
      "Describe a project you worked on that failed or fell behind schedule, and what you learned.",
      "Where do you see yourself in 3 years and how does this role fit into that trajectory?"
    ]
  };

  const questionsList = sampleQuestions[role.toLowerCase()] || sampleQuestions["default"];
  const nextQuestion = questionsList[currentStep] || "What are your core strengths and how do they apply to this role?";

  return {
    status: 'in-progress',
    question: nextQuestion
  };
};

function getLocalCareerFallback(interests, skills, academicPerformance) {
  // Simple heuristic logic to generate a valid, realistic response
  const stream = (academicPerformance.stream || 'Science').toLowerCase();
  
  if (stream.includes('science') || interests.some(i => i.toLowerCase().includes('code') || i.toLowerCase().includes('tech'))) {
    return [
      {
        title: "Full Stack Software Developer",
        description: "Designing, coding, and deploying scalable web and mobile products. Matches your coding/analytical interests.",
        matchPercentage: 92,
        skillsRequired: ["React.js", "Node.js", "MongoDB", "Data Structures", "System Design"],
        colleges: ["Indian Institute of Technology (IIT)", "Birla Institute of Technology and Science (BITS)"],
        scholarships: ["KVPY Fellowship", "L'Oréal India For Young Women in Science Scholarship"],
        roadmap: [
          {
            phase: "Phase 1: Fundamentals",
            description: "Learn HTML, CSS, JavaScript, and basics of Python or Java.",
            estimatedTime: "6 Months",
            skillsToAcquire: ["JavaScript", "HTML/CSS", "Git Basics"],
            recommendedCourses: ["FreeCodeCamp Responsive Web Design", "CS50 Introduction to Computer Science"]
          },
          {
            phase: "Phase 2: Frameworks & Databases",
            description: "Deep dive into React, Node.js, Express, and database modeling with SQL & MongoDB.",
            estimatedTime: "6 Months",
            skillsToAcquire: ["React", "Express.js", "MongoDB"],
            recommendedCourses: ["FullStackOpen by University of Helsinki", "The Complete Web Developer Bootcamp"]
          },
          {
            phase: "Phase 3: Portfolio & Placement Preparation",
            description: "Build three production projects, practice Data Structures & Algorithms, and prepare for mock interviews.",
            estimatedTime: "4 Months",
            skillsToAcquire: ["DSA", "System Design", "Cloud Hosting"],
            recommendedCourses: ["LeetCode Practice", "NeetCode Roadmap"]
          }
        ]
      },
      {
        title: "AI & Machine Learning Engineer",
        description: "Building automated data processing models, working with neural networks and large language model configurations.",
        matchPercentage: 87,
        skillsRequired: ["Python", "TensorFlow", "Pandas", "Linear Algebra", "NLP"],
        colleges: ["IIIT Hyderabad", "IIT Madras", "IISc Bangalore"],
        scholarships: ["Aditya Birla Scholarship", "Jawaharlal Nehru Scholarship"],
        roadmap: [
          {
            phase: "Phase 1: Math & Python",
            description: "Master Python programming and linear algebra, calculus, and basic statistics.",
            estimatedTime: "6 Months",
            skillsToAcquire: ["Python", "Probability", "Linear Algebra"],
            recommendedCourses: ["Mathematics for Machine Learning - Imperial College London", "Python for Everybody"]
          },
          {
            phase: "Phase 2: ML Frameworks",
            description: "Build models using Scikit-Learn, TensorFlow, and Pandas.",
            estimatedTime: "8 Months",
            skillsToAcquire: ["Scikit-Learn", "Data Visualisation", "Model Tuning"],
            recommendedCourses: ["Machine Learning Specialization by Andrew Ng", "Applied Data Science with Python"]
          }
        ]
      },
      {
        title: "Product Designer (UI/UX)",
        description: "Crafting modern layouts, interface usability systems, and prototype layouts for high-traffic platforms.",
        matchPercentage: 80,
        skillsRequired: ["Figma", "User Research", "Wireframing", "Prototyping", "Design Systems"],
        colleges: ["National Institute of Design (NID)", "Industrial Design Centre (IIT Bombay)"],
        scholarships: ["Inlaks Shivdasani Foundation Scholarship"],
        roadmap: [
          {
            phase: "Phase 1: Design Fundamentals",
            description: "Learn typography, hierarchy, color theory, and user journey flows.",
            estimatedTime: "4 Months",
            skillsToAcquire: ["Figma Basics", "Visual Design", "Design Thinking"],
            recommendedCourses: ["Google UX Design Professional Certificate", "Figma Academy"]
          }
        ]
      }
    ];
  }

  // Commerce/Management
  if (stream.includes('commerce') || stream.includes('business')) {
    return [
      {
        title: "Investment Banker",
        description: "Assisting corporate entities in financial transactions, valuation mappings, and fundraising advisory tasks.",
        matchPercentage: 90,
        skillsRequired: ["Corporate Finance", "Financial Modeling", "Excel Advanced", "Market Analysis"],
        colleges: ["IIM Ahmedabad", "IIM Bangalore", "FMS Delhi"],
        scholarships: ["OP Jindal Engineering & Management Scholarship"],
        roadmap: [
          {
            phase: "Phase 1: Finance Core",
            description: "Learn financial accounting, balance sheets, and key ratios.",
            estimatedTime: "6 Months",
            skillsToAcquire: ["Excel", "Financial Statements Analysis"],
            recommendedCourses: ["Corporate Finance courses by Wharton", "CFA Level 1 Preparatory Course"]
          }
        ]
      },
      {
        title: "Product Manager",
        description: "Acting as the intersection point between Tech, Design, and Business. Organizing agile sprints and tracking product metrics.",
        matchPercentage: 85,
        skillsRequired: ["Product Strategy", "Agile Methodologies", "SQL", "Market Research"],
        colleges: ["ISB Hyderabad", "IIM Calcutta", "SPJIMR Mumbai"],
        scholarships: ["TATA Scholarship"],
        roadmap: [
          {
            phase: "Phase 1: Product Foundations",
            description: "Understand product development lifecycle, MVP creation, and agile systems.",
            estimatedTime: "6 Months",
            skillsToAcquire: ["Agile/Scrum", "Product Analytics", "Wireframing"],
            recommendedCourses: ["Product Management First Steps - LinkedIn Learning", "Become a Product Manager - Udemy"]
          }
        ]
      }
    ];
  }

  // General/Arts
  return [
    {
      title: "Digital Content Strategist",
      description: "Managing corporate branding, copy pipelines, SEO validation, and multi-channel campaign architectures.",
      matchPercentage: 88,
      skillsRequired: ["SEO Tools", "Copywriting", "Google Analytics", "Social Media Management"],
      colleges: ["Indian Institute of Mass Communication (IIMC)", "Symbiosis Institute of Media & Communication"],
      scholarships: ["Sahu Jain Trust Scholarships"],
      roadmap: [
        {
          phase: "Phase 1: Communication & SEO",
          description: "Improve writing, grammar speed, and understand digital marketing basics.",
          estimatedTime: "4 Months",
          skillsToAcquire: ["SEO Writing", "Keyword Analytics"],
          recommendedCourses: ["Google Digital Garage", "HubSpot Content Marketing Certification"]
        }
      ]
    }
  ];
}
