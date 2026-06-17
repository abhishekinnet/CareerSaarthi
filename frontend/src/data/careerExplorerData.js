export const class10Streams = [
  {
    id: 'science-stream',
    title: 'Science Stream',
    route: '/explore/career/streams/science-stream',
    badge: 'PCM / PCB / PCMB',
    overview: 'Ideal for students who enjoy logic, experimentation, technology, medicine, and research-led problem solving.',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science'],
    futureDegrees: ['B.Tech', 'MBBS', 'B.Sc', 'BCA', 'B.Des'],
    opportunities: ['AI Engineer', 'Doctor', 'Data Scientist', 'Research Associate', 'Product Developer'],
    averageSalary: '₹6 - ₹24 LPA',
    growthPotential: 'Very High',
    skills: ['Analytical Thinking', 'Problem Solving', 'Research', 'Numeracy', 'Digital Fluency'],
    accent: 'primary',
  },
  {
    id: 'commerce-stream',
    title: 'Commerce Stream',
    route: '/explore/career/streams/commerce-stream',
    badge: 'Accountancy / Finance / Business Studies',
    overview: 'Best for students who want a pathway into finance, business management, operations, consulting, and entrepreneurship.',
    subjects: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics', 'Statistics'],
    futureDegrees: ['B.Com', 'BBA', 'CA Foundation', 'CS', 'MBA'],
    opportunities: ['Chartered Accountant', 'Financial Analyst', 'Business Consultant', 'Banking Analyst', 'Entrepreneur'],
    averageSalary: '₹5 - ₹22 LPA',
    growthPotential: 'High',
    skills: ['Numerical Ability', 'Communication', 'Business Sense', 'Decision Making', 'Attention to Detail'],
    accent: 'accent',
  },
  {
    id: 'arts-humanities-stream',
    title: 'Arts / Humanities Stream',
    route: '/explore/career/streams/arts-humanities-stream',
    badge: 'Psychology / Sociology / Design / Law',
    overview: 'Perfect for students who want to explore society, media, design, law, communication, and human behavior.',
    subjects: ['Psychology', 'Sociology', 'Journalism', 'Political Science', 'History'],
    futureDegrees: ['BA', 'LLB', 'B.Des', 'BJMC', 'B.A. Psychology'],
    opportunities: ['Journalist', 'Psychologist', 'Designer', 'Lawyer', 'Policy Analyst'],
    averageSalary: '₹4 - ₹20 LPA',
    growthPotential: 'High',
    skills: ['Creativity', 'Writing', 'Empathy', 'Research', 'Public Speaking'],
    accent: 'cyan',
  },
];

export const after12thSections = [
  {
    id: 'engineering',
    title: 'Engineering',
    description: 'Deep technical pathways from core engineering to next-gen computing and infrastructure roles.',
    routeBase: '/explore/career/engineering',
    items: ['B.Tech', 'B.E.', 'Computer Science', 'AI & ML', 'Data Science', 'Cyber Security', 'Mechanical', 'Civil', 'Electrical', 'Electronics'],
    accent: 'primary',
  },
  {
    id: 'medical',
    title: 'Medical',
    description: 'Health, clinical care, therapy, and pharmaceutical education pathways.',
    routeBase: '/explore/career/medical',
    items: ['MBBS', 'BDS', 'BAMS', 'BHMS', 'Nursing', 'Physiotherapy', 'Pharmacy'],
    accent: 'rose',
  },
  {
    id: 'commerce',
    title: 'Commerce',
    description: 'Finance, accounting, business, and management opportunities with strong corporate demand.',
    routeBase: '/explore/career/commerce',
    items: ['B.Com', 'CA', 'CS', 'CMA', 'BBA', 'MBA', 'Banking'],
    accent: 'amber',
  },
  {
    id: 'arts',
    title: 'Arts',
    description: 'Creative, social science, legal, and human-centered careers with diverse scope.',
    routeBase: '/explore/career/arts',
    items: ['BA', 'Journalism', 'Design', 'Psychology', 'Law', 'Hotel Management'],
    accent: 'purple',
  },
  {
    id: 'government',
    title: 'Government Sector',
    description: 'Competitive exam and public administration tracks for national and state-level service.',
    routeBase: '/explore/career/government',
    items: ['UPSC', 'BPSC', 'SSC', 'Railway', 'Banking', 'NDA', 'CDS', 'Defence', 'State PCS'],
    accent: 'emerald',
  },
  {
    id: 'entrepreneurship',
    title: 'Entrepreneurship',
    description: 'Start, validate, and scale ideas with product, funding, and execution milestones.',
    routeBase: '/explore/career/entrepreneurship',
    items: ['Startup Roadmap', 'Business Planning', 'Funding', 'MVP Development'],
    accent: 'cyan',
  },
];

export const examSections = [
  {
    id: 'engineering-exams',
    title: 'Engineering Exams',
    routeBase: '/explore/exam/engineering',
    items: ['JEE Main', 'JEE Advanced', 'BITSAT', 'VITEEE', 'WBJEE', 'COMEDK'],
    accent: 'primary',
  },
  {
    id: 'medical-exams',
    title: 'Medical Exams',
    routeBase: '/explore/exam/medical',
    items: ['NEET UG', 'AIIMS', 'JIPMER'],
    accent: 'rose',
  },
  {
    id: 'government-exams',
    title: 'Government Exams',
    routeBase: '/explore/exam/government',
    items: ['UPSC', 'SSC CGL', 'SSC CHSL', 'Banking PO', 'Banking Clerk', 'Railway', 'NDA', 'CDS'],
    accent: 'emerald',
  },
];

export const interviewCategories = [
  { id: 'technical-interview', title: 'Technical Interview', slug: 'technical-interview', summary: 'Core hiring questions, problem solving, and domain depth.' },
  { id: 'hr-interview', title: 'HR Interview', slug: 'hr-interview', summary: 'Behavioral questions, values, and communication readiness.' },
  { id: 'group-discussion', title: 'Group Discussion', slug: 'group-discussion', summary: 'Structured thinking, clarity, and collaborative presence.' },
  { id: 'communication-skills', title: 'Communication Skills', slug: 'communication-skills', summary: 'Speak with confidence, precision, and audience awareness.' },
  { id: 'aptitude-preparation', title: 'Aptitude Preparation', slug: 'aptitude-preparation', summary: 'Quant, reasoning, and data interpretation essentials.' },
  { id: 'coding-interview', title: 'Coding Interview', slug: 'coding-interview', summary: 'DSA, coding rounds, and whiteboard problem solving.' },
  { id: 'mock-interview', title: 'Mock Interview', slug: 'mock-interview', summary: 'Practice end-to-end interview flow with feedback loops.' },
];

export const timelineTemplates = {
  streams: [
    { title: 'Foundation', detail: 'Understand stream subjects and short-list aligned careers.' },
    { title: 'Skill Build', detail: 'Strengthen core subjects, communication, and analytical thinking.' },
    { title: 'Decision', detail: 'Compare degrees, colleges, scholarships, and salary trajectories.' },
  ],
  careers: [
    { title: 'Foundation', detail: 'Clarify the domain and required competencies.' },
    { title: 'Qualification Roadmap', detail: 'Choose the right degree, entrance exams, and colleges.' },
    { title: 'Execution', detail: 'Follow internships, projects, certifications, and application strategy.' },
  ],
  exams: [
    { title: 'Eligibility', detail: 'Confirm age, educational qualification, and attempt limits.' },
    { title: 'Pattern', detail: 'Map subjects, marking scheme, and stage-wise selection.' },
    { title: 'Preparation', detail: 'Set study cycles, revision checkpoints, and mock tests.' },
  ],
  interview: [
    { title: 'Learn', detail: 'Study the core question bank and role expectations.' },
    { title: 'Practice', detail: 'Apply deliberate practice with mock sessions and recordings.' },
    { title: 'Refine', detail: 'Improve presence, structure, and question handling.' },
  ],
};

export const collegesByTheme = {
  engineering: ['IITs', 'NITs', 'BITS Pilani', 'IIITs', 'VIT', 'Manipal Institute of Technology'],
  medical: ['AIIMS', 'JIPMER', 'CMC Vellore', 'KGMU', 'MAMC', 'AFMC'],
  commerce: ['SRCC', 'Christ University', 'NMIMS', 'St. Xavier’s College', 'Symbiosis', 'Loyola College'],
  arts: ['LAD College', 'LSR', 'Flame University', 'NID', 'NLU', 'XIC'],
  government: ['Lal Bahadur Shastri Academy', 'National Defence Academy', 'State Administrative Academies'],
  entrepreneurship: ['IIT Madras Incubation Cell', 'NSRCEL IIM Bangalore', 'T-Hub', 'CIIE IIM Ahmedabad'],
};

export function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function titleCaseFromSlug(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
    .replace(/ And /g, ' & ');
}

export function buildDetail(type, group, slug) {
  const title = titleCaseFromSlug(slug);
  const lowerSlug = slug.toLowerCase();
  const lowerGroup = (group || '').toLowerCase();

  const isEngineering = lowerGroup.includes('engineering') || /tech|computer|data|ai|cyber|electrical|electronics|mechanical|civil/.test(lowerSlug);
  const isMedical = lowerGroup.includes('medical') || /mbbs|bds|bams|bhms|nursing|physio|pharmacy|medical/.test(lowerSlug);
  const isCommerce = lowerGroup.includes('commerce') || /commerce|ca|cs|cma|bba|mba|banking|finance/.test(lowerSlug);
  const isArts = lowerGroup.includes('arts') || /arts|journalism|design|psychology|law|hotel/.test(lowerSlug);
  const isGov = lowerGroup.includes('government') || /upsc|bpsc|ssc|railway|nda|cds|defence|state-pcs|banking/.test(lowerSlug);
  const isEntrepreneurship = lowerGroup.includes('entrepreneur') || /startup|business|funding|mvp/.test(lowerSlug);
  const isExam = type === 'exam';
  const isInterview = type === 'interview';

  const theme = isMedical
    ? 'medical'
    : isCommerce
      ? 'commerce'
      : isArts
        ? 'arts'
        : isGov
          ? 'government'
          : isEntrepreneurship
            ? 'entrepreneurship'
            : 'engineering';

  const overviewMap = {
    engineering: `${title} is a high-utility path for students who like logic, systems, and building real-world products or infrastructure.`,
    medical: `${title} is a care-driven path for students interested in health, diagnosis, clinical service, and patient outcomes.`,
    commerce: `${title} builds a foundation in business, accounting, finance, analytics, and management.`,
    arts: `${title} supports careers in communication, policy, design, law, psychology, and human-centered work.`,
    government: `${title} prepares you for public service, administration, defense, and competitive examination tracks.`,
    entrepreneurship: `${title} is ideal for students who want to build, validate, and scale ideas into sustainable businesses.`,
  };

  const skillMap = {
    engineering: ['Problem Solving', 'Mathematics', 'Technical Design', 'Debugging', 'Systems Thinking'],
    medical: ['Biology', 'Empathy', 'Attention to Detail', 'Clinical Reasoning', 'Communication'],
    commerce: ['Numerical Aptitude', 'Finance', 'Strategy', 'Communication', 'Decision Making'],
    arts: ['Writing', 'Research', 'Creativity', 'Communication', 'Critical Thinking'],
    government: ['Reading Comprehension', 'Reasoning', 'Discipline', 'General Awareness', 'Time Management'],
    entrepreneurship: ['Leadership', 'Execution', 'Customer Discovery', 'Fundraising', 'Product Thinking'],
  };

  const degreeMap = {
    engineering: ['B.Tech', 'B.E.', 'M.Tech', 'M.S.'],
    medical: ['MBBS', 'BDS', 'BAMS', 'BHMS', 'BPT', 'B.Pharm'],
    commerce: ['B.Com', 'BBA', 'CA', 'CS', 'MBA'],
    arts: ['BA', 'MA', 'LLB', 'BJMC', 'B.Des'],
    government: ['Graduation + Competitive Exam', 'Specialized Diplomas', 'Public Administration Tracks'],
    entrepreneurship: ['BBA', 'B.Com', 'B.Tech', 'MBA', 'Start-up Accelerators'],
  };

  const examMap = {
    engineering: ['JEE Main', 'JEE Advanced', 'BITSAT', 'WBJEE'],
    medical: ['NEET UG', 'AIIMS', 'JIPMER'],
    commerce: ['CUET', 'CA Foundation', 'CS Executive'],
    arts: ['CUET', 'CLAT', 'NID DAT'],
    government: ['UPSC', 'SSC CGL', 'NDA', 'CDS'],
    entrepreneurship: ['Startup Pitch', 'Incubator Demo Day', 'Investor Review'],
  };

  const colleges = collegesByTheme[theme] || collegesByTheme.engineering;

  const salaryMap = {
    engineering: '₹6 - ₹30 LPA',
    medical: '₹5 - ₹35 LPA',
    commerce: '₹5 - ₹25 LPA',
    arts: '₹4 - ₹20 LPA',
    government: '₹6 - ₹28 LPA',
    entrepreneurship: 'Varies with scale; high upside',
  };

  const demandMap = {
    engineering: 'Very High',
    medical: 'Very High',
    commerce: 'High',
    arts: 'Rising',
    government: 'Highly Competitive',
    entrepreneurship: 'High Variance',
  };

  const futureScopeMap = {
    engineering: 'AI, SaaS, cloud, robotics, infrastructure, and sustainable technology continue to expand demand.',
    medical: 'Healthcare digitization, preventive medicine, and research-driven specializations are growing quickly.',
    commerce: 'Finance, fintech, consulting, and analytics are creating strong career mobility.',
    arts: 'Content, policy, design, law, UX, and behavioral science are becoming more interdisciplinary.',
    government: 'Public service, defense, and state governance remain prestigious, stable, and impactful.',
    entrepreneurship: 'Product-led startups and digital businesses enable rapid growth when execution is strong.',
  };

  const aiScoreSeed = [...slug].reduce((score, char) => score + char.charCodeAt(0), 0);
  const aiScore = 78 + (aiScoreSeed % 18);

  const detailTypeLabel = isExam ? 'Exam Detail' : isInterview ? 'Interview Detail' : 'Career Detail';

  // Exam specific maps
  const eligibilityMap = {
    engineering: 'Class 12 passed or appearing in the current academic year with Physics, Chemistry, and Mathematics as core subjects (typically requiring 60% to 75% marks depending on the institute).',
    medical: 'Class 12 passed or appearing with Physics, Chemistry, Biology/Biotechnology, and English as core subjects, with minimum 50% marks for General category (40% for SC/ST/OBC).',
    commerce: 'Class 12 passed or appearing from a recognized board in any stream (Commerce with Math is preferred for top finance/accounting degrees).',
    arts: 'Class 12 passed or appearing from any recognized board in any stream.',
    government: 'A bachelor\'s degree in any discipline from a recognized university. Candidates in their final year of graduation are also eligible to apply.',
    entrepreneurship: 'No formal academic qualification required; open to all passionate builders, founders, and innovators.'
  };

  const ageCriteriaMap = {
    engineering: 'Generally no upper age limit for JEE Main. For JEE Advanced, candidates should be within 25 years (relaxable by 5 years for SC/ST/PwD). Max 2 attempts in consecutive years.',
    medical: 'Minimum age of 17 years as of December 31 of the year of admission. There is no upper age limit for appearing in NEET UG.',
    commerce: 'Usually no age limit for B.Com/BBA. For professional programs like CA, CS, and CMA, there is no age restriction.',
    arts: 'Varies. Most universities have no upper age limit for BA. For CLAT (Law), there is no upper age limit.',
    government: 'Typically 21 to 32 years as of August 1 of the exam year. Upper age relaxation exists for SC/ST (5 years), OBC (3 years), and PwD candidates.',
    entrepreneurship: 'No age limit. Innovation and enterprise can be started at any stage of life.'
  };

  const examPatternMap = {
    engineering: 'Computer Based Test (CBT) consisting of Multiple Choice Questions (MCQs) and Numerical Value Questions. Duration: 3 hours. Negative marking: -1 for incorrect answers.',
    medical: 'Pen & Paper-based test (OMR sheet) containing 200 Multiple Choice Questions (MCQs), out of which 180 must be answered. Total time: 3 hours 20 minutes.',
    commerce: 'Combination of computer-based entrance exams (like CUET) and stage-wise descriptive/objective papers for CA/CS foundations.',
    arts: 'Computer-based aptitude tests containing English, General Knowledge, Quantitative Aptitude, Logical Reasoning, and Subject-Specific questions.',
    government: 'Three stages: 1. Preliminary Exam (Objective MCQs), 2. Main Exam (Subjective/Written essays and papers), 3. Personality Test/Interview.',
    entrepreneurship: 'Pitch deck review, incubation selection rounds, business viability evaluation, and customer discovery reviews.'
  };

  const syllabusMap = {
    engineering: 'NCERT Physics (Mechanics, Electromagnetism, Modern Physics), Chemistry (Physical, Organic, Inorganic), and Mathematics (Calculus, Algebra, Coordinate Geometry, Vectors).',
    medical: 'NCERT Physics (Mechanics, Thermodynamics, Optics, Modern Physics), Chemistry (Organic, Inorganic, Physical), and Biology (Diversity, Cell Structure, Plant & Human Physiology, Genetics, Ecology).',
    commerce: 'Accountancy, Business Studies, Micro & Macro Economics, Mathematics/Statistics, and General English Aptitude.',
    arts: 'English Comprehension, Legal Aptitude, Logical Reasoning, Current Affairs, History, Sociology, Political Science, and General Studies.',
    government: 'History of India, Geography, Indian Polity, Economy, Science & Tech, Environment, Current Affairs, CSAT (Aptitude & English comprehension), and Optional Subject papers.',
    entrepreneurship: 'Problem validation, market research, unit economics, MVP development, marketing and sales channels, funding models, and business pitch structure.'
  };

  const selectionProcessMap = {
    engineering: 'JEE Main Score -> Counselling -> Allotment. For IITs: JEE Main qualified -> JEE Advanced score -> JoSAA counselling -> Seat allocation.',
    medical: 'NEET UG merit rank -> MCC central counselling (15% All India Quota) and State counselling (85% State Quota) -> Medical college seat allocation.',
    commerce: 'University entrance score (e.g. CUET) -> Merit lists -> College admissions. For CA/CS: Foundation -> Intermediate -> Articleship training -> Final Exam.',
    arts: 'Entrance exam scores or Class 12 board merit -> University counselling -> Selection and admission.',
    government: 'Clear Prelims -> Qualify for Mains (Written exam) -> Qualify for Interview/Personality Test -> Final merit ranking based on Mains + Interview score.',
    entrepreneurship: 'Application screening -> Initial pitch round -> Demo Day / Investor Panel presentation -> Funding offer and incubation enrollment.'
  };

  const careerGrowthMap = {
    engineering: 'Junior Developer / Engineer -> Senior Engineer -> Tech Lead -> Engineering Manager / Principal Architect -> CTO / VP of Engineering.',
    medical: 'Junior Resident -> Senior Resident -> Assistant Professor -> Associate Professor / Senior Consultant -> Head of Department -> Medical Director.',
    commerce: 'Financial Analyst / Accountant -> Finance Manager -> Director of Finance -> Chief Financial Officer (CFO) / Partner at firm.',
    arts: 'Associate -> Researcher / Designer -> Consultant -> Senior Advisor -> Executive Director / Policy Advisor / Creative Director.',
    government: 'Assistant Commissioner / Sub-Divisional Magistrate -> Joint Secretary -> Secretary -> Cabinet Secretary / Director General.',
    entrepreneurship: 'Solopreneur / Founder -> CEO -> Managing Director -> Chairman / Board Member -> Serial Investor.'
  };

  const previousYearTrendsMap = {
    engineering: 'Increasing cutoff percentiles. Computer Science seats at top NITs require a JEE Main percentile of 99.2+, while IIT CS seats require JEE Advanced ranks under 1000.',
    medical: 'Cutoff scores for government MBBS seats have risen to 610+ out of 720 in general categories due to heightened competition and high-scoring papers.',
    commerce: 'CUET cutoffs for Commerce in premier colleges (like SRCC) have stayed near 99-100 percentile in general categories.',
    arts: 'Increasing demand for Law and Design. CLAT cutoff ranks for top NLUs have become extremely competitive, requiring extensive current affairs preparation.',
    government: 'UPSC cutoffs hover around 45-50% in Prelims and Mains. The GS papers have become more analytical and contemporary, testing real-time problem-solving ability.',
    entrepreneurship: 'Shift from growth-at-all-costs to sustainable unit economics. Founders with strong MVPs and customer traction are securing early-stage funding faster.'
  };

  // Interview specific maps
  const commonQuestionsMap = {
    'technical-interview': [
      { q: 'Explain OOP concepts with real-world examples.', a: 'Focus on Abstraction, Encapsulation, Inheritance, and Polymorphism.' },
      { q: 'How do you optimize a slow database query?', a: 'Analyze execution plans, add indexes on frequently searched columns, avoid SELECT *, and implement caching.' },
      { q: 'Explain the difference between SQL and NoSQL databases.', a: 'SQL is relational, structured, and scales vertically. NoSQL is non-relational, flexible, and scales horizontally.' }
    ],
    'hr-interview': [
      { q: 'Tell me about yourself.', a: 'Use the Present-Past-Future formula: talk about your current role, achievements, and why you are excited about this opportunity.' },
      { q: 'Why do you want to join our company?', a: 'Highlight specific things about the company culture, values, or recent product launches that genuinely excite you.' },
      { q: 'How do you handle conflict in a team?', a: 'Give an example using the STAR method (Situation, Task, Action, Result), focusing on empathy, listening, and finding a win-win solution.' }
    ],
    'group-discussion': [
      { q: 'How to initiate a group discussion effectively?', a: 'Start with a strong definition of the topic, quote a relevant statistic or fact, and outline the direction of the discussion.' },
      { q: 'What is the role of digital currency in a global economy?', a: 'Discuss the pros (fast transactions, low fees) and cons (volatility, security risks, lack of regulation).' }
    ],
    'communication-skills': [
      { q: 'How do you structure an elevator pitch?', a: 'Start with the problem, introduce your solution, state your unique value proposition, and close with a clear call to action.' },
      { q: 'How do you handle public speaking anxiety?', a: 'Prepare thoroughly, practice deep breathing, focus on delivering value to the audience, and treat the speech as a conversation.' }
    ],
    'aptitude-preparation': [
      { q: 'What are the main topics in quantitative aptitude?', a: 'Percentage, Profit & Loss, Ratio & Proportion, Time & Work, Time-Speed-Distance, and Data Interpretation.' },
      { q: 'How to improve speed in numerical calculations?', a: 'Learn Vedic math tricks, memorize tables up to 30, squares up to 30, cubes up to 20, and practice mental calculations daily.' }
    ],
    'coding-interview': [
      { q: 'Find the longest palindromic substring.', a: 'Use the "expand around center" approach (O(n^2) time, O(1) space) or Manacher\'s algorithm (O(n) time and space).' },
      { q: 'How do you check if a binary tree is balanced?', a: 'Compute the height of left and right subtrees recursively. If the difference is > 1 at any node, it is unbalanced.' }
    ],
    'mock-interview': [
      { q: 'What is the benefit of mock interviews?', a: 'It simulates the real exam environment, helps identify body language flaws, reduces anxiety, and provides actionable feedback.' },
      { q: 'How should you dress and prepare for a mock interview?', a: 'Dress in professional business attire, test your microphone/camera beforehand, and review the job description.' }
    ]
  };

  const preparationTipsMap = {
    'technical-interview': [
      'Master core CS fundamentals: Operating Systems, Database Management Systems, and Computer Networks.',
      'Be ready to explain every single detail, architecture choice, and line of code on your resume projects.',
      'Solve previous interview questions from target companies.'
    ],
    'hr-interview': [
      'Research the company\'s mission, values, recent funding, or product updates.',
      'Prepare 3-4 STAR stories (Situation, Task, Action, Result) demonstrating leadership, resilience, and team cooperation.',
      'Be honest about your weaknesses but show active steps you are taking to overcome them.'
    ],
    'group-discussion': [
      'Stay updated with current national and international news, social issues, and business trends.',
      'Do not dominate the discussion; speak 2-3 times with high-quality points and invite others to contribute.',
      'Maintain positive body language, eye contact, and active listening gestures.'
    ],
    'communication-skills': [
      'Record yourself speaking for 2 minutes on a random topic and review your filler words (ums, like, you know).',
      'Practice active listening: repeat or summarize what the other person said before responding.',
      'Read books, editorials, or listen to quality podcasts to expand your vocabulary.'
    ],
    'aptitude-preparation': [
      'Solve 20-30 aptitude questions daily under timed conditions to improve speed and accuracy.',
      'Understand the conceptual theory before trying shortcuts or tricks.',
      'Identify your weak areas (e.g., probability or permutations) and dedicate extra hours to solve basic level questions first.'
    ],
    'coding-interview': [
      'Solve 150+ curated DSA questions covering Arrays, Strings, Hashing, Trees, Graphs, and Dynamic Programming.',
      'Think out loud: explain your approach, time complexity, and edge cases to the interviewer before coding.',
      'Practice writing dry-run code on a physical whiteboard or a plain Google Doc without autocomplete.'
    ],
    'mock-interview': [
      'Schedule at least 3-4 mock interviews with peers, mentors, or online platforms before the actual interview.',
      'Record your sessions and review them to check your speaking pace, eye contact, and facial expressions.',
      'Treat every mock session with the same seriousness as a real hiring round.'
    ]
  };

  const videoResourcesMap = {
    engineering: [
      { title: 'Tech Interview Mastery: System Design & DSA Prep', duration: '15 mins', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=350' },
      { title: 'Cracking the Coding Interview: Tips from Experts', duration: '22 mins', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&q=80&w=350' }
    ],
    medical: [
      { title: 'NEET UG Prep: Strategy to Score 650+ in First Attempt', duration: '18 mins', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=350' },
      { title: 'Life as a Medical Student at AIIMS New Delhi', duration: '14 mins', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=350' }
    ],
    commerce: [
      { title: 'CA Foundation: Complete Syllabus & Study Plan', duration: '16 mins', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=350' },
      { title: 'Corporate Careers: Finance vs Consulting', duration: '20 mins', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=350' }
    ],
    government: [
      { title: 'UPSC Civil Services: How to Start Preparation from Scratch', duration: '25 mins', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=350' },
      { title: 'NDA & Defence Exam Preparation Strategy', duration: '19 mins', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=350' }
    ],
    arts: [
      { title: 'Design Careers: Preparing NID & NIFT Portfolios', duration: '15 mins', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=350' },
      { title: 'Psychology Careers & Future Scope', duration: '12 mins', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=350' }
    ],
    entrepreneurship: [
      { title: 'How to Build a Startup from Scratch (Y Combinator Guide)', duration: '30 mins', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=350' },
      { title: 'MVP Development & Customer Validation Guide', duration: '21 mins', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=350' }
    ]
  };

  return {
    type: detailTypeLabel,
    title,
    group: group ? group.replace(/-/g, ' ') : 'Explorer',
    overview: overviewMap[theme],
    requiredSkills: skillMap[theme],
    qualificationRoadmap: [
      { title: 'Discover', detail: `Research ${title} and understand the subject mix, entry barriers, and career upside.` },
      { title: 'Prepare', detail: `Align academics, practice tests, projects, and extracurricular work with the track.` },
      { title: 'Apply', detail: `Target the right colleges, scholarships, or exam registrations at the right time.` },
      { title: 'Grow', detail: `Build internships, certifications, or field exposure to strengthen your profile.` },
    ],
    colleges,
    scholarships: [
      `${title} Merit Scholarship`,
      'National Scholarship Portal schemes',
      'State and private foundation grants',
      'Need-based institutional aid',
    ],
    entranceExams: examMap[theme],
    averageSalary: salaryMap[theme],
    industryDemand: demandMap[theme],
    futureScope: futureScopeMap[theme],
    aiRecommendationScore: aiScore,
    roadmap: timelineTemplates[type === 'exam' ? 'exams' : type === 'interview' ? 'interview' : 'careers'],
    isExam,
    isInterview,
    isCareer: type === 'career',
    label: title,

    // Exam specific properties
    eligibility: eligibilityMap[theme] || 'Class 12 passed from a recognized board.',
    ageCriteria: ageCriteriaMap[theme] || 'No specific age limit.',
    examPattern: examPatternMap[theme] || 'Computer Based Test or Written Examination.',
    syllabus: syllabusMap[theme] || 'Syllabus varies by exam; covers core subject domains.',
    selectionProcess: selectionProcessMap[theme] || 'Entrance Exam followed by Counseling/Merit List.',
    careerGrowth: careerGrowthMap[theme] || 'Entry Level -> Senior Executive -> Manager -> Director.',
    previousYearTrends: previousYearTrendsMap[theme] || 'Cutoffs have been rising steadily; competition is intense.',

    // Interview specific properties
    commonQuestions: commonQuestionsMap[lowerSlug] || commonQuestionsMap['hr-interview'],
    preparationTips: preparationTipsMap[lowerSlug] || preparationTipsMap['hr-interview'],
    videoResources: videoResourcesMap[theme] || videoResourcesMap['engineering']
  };
}

export function buildLocalRecommendations({ interests = [], skills = [], academicScores = '', goals = '' }) {
  const text = [interests, skills, academicScores, goals].flat().join(' ').toLowerCase();

  const catalog = [
    { title: 'Computer Science & AI', degree: 'B.Tech / B.E.', college: 'IIITs, IITs, BITS Pilani', scholarship: 'Merit scholarships + tech foundations', roadmap: ['Strengthen math + coding', 'Build projects', 'Apply for internships'] },
    { title: 'Medical & Clinical Sciences', degree: 'MBBS / BDS / BAMS', college: 'AIIMS, JIPMER, CMC', scholarship: 'National and institutional grants', roadmap: ['NEET prep', 'Biology mastery', 'Clinical exposure'] },
    { title: 'Finance & Analytics', degree: 'B.Com / BBA / MBA / CA', college: 'SRCC, NMIMS, Christ University', scholarship: 'Commerce merit support', roadmap: ['Accounting basics', 'Excel/SQL practice', 'Case studies'] },
    { title: 'Design & UX', degree: 'B.Des / BA Design', college: 'NID, MIT Institute of Design, Srishti', scholarship: 'Design school grants', roadmap: ['Portfolio creation', 'User research', 'Tool mastery'] },
    { title: 'Public Administration & Civil Services', degree: 'Graduation + Competitive Exams', college: 'DU, JNU, state universities', scholarship: 'Govt education schemes', roadmap: ['General awareness', 'Answer writing', 'Mock tests'] },
    { title: 'Entrepreneurship & Product Building', degree: 'BBA / B.Tech / MBA', college: 'IIM incubators, NSRCEL, T-Hub networks', scholarship: 'Startup incubation support', roadmap: ['Problem discovery', 'MVP build', 'Funding pitch'] },
  ];

  const matched = catalog
    .map((item) => {
      let score = 20;
      if (/code|tech|software|ai|computer|data|python|react/.test(text) && /Computer Science|Design|Entrepreneurship/.test(item.title)) score += 35;
      if (/bio|medical|doctor|health|neet|hospital/.test(text) && /Medical/.test(item.title)) score += 40;
      if (/finance|business|account|commerce|econom|ca|bank/.test(text) && /Finance|Public|Entrepreneurship/.test(item.title)) score += 35;
      if (/design|ux|user|creative|art|content|media/.test(text) && /Design/.test(item.title)) score += 40;
      if (/gov|civil|upsc|ssc|defence|service/.test(text) && /Public Administration/.test(item.title)) score += 38;
      if (/startup|founder|build|launch|product/.test(text) && /Entrepreneurship/.test(item.title)) score += 42;
      return { ...item, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((item) => ({
      title: item.title,
      matchPercentage: Math.min(97, item.score + 40),
      degree: item.degree,
      college: item.college,
      scholarship: item.scholarship,
      roadmap: item.roadmap,
    }));

  return matched;
}
