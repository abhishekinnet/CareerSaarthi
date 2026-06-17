// CareerSaathi India-Wide Opportunity Ecosystem Database

export const stages = [
  { id: 'class-1-5', label: 'Class 1-5', badge: 'Primary' },
  { id: 'class-6-8', label: 'Class 6-8', badge: 'Middle School' },
  { id: 'class-9-10', label: 'Class 9-10', badge: 'High School' },
  { id: 'class-11-12', label: 'Class 11-12', badge: 'Senior Secondary' },
  { id: 'diploma', label: 'Diploma', badge: 'Vocational' },
  { id: 'graduation', label: 'Graduation', badge: 'UG Degree' },
  { id: 'post-graduation', label: 'Post Graduation', badge: 'PG & PhD' },
  { id: 'research-jobs-startup', label: 'Careers & Startups', badge: 'Next Steps' },
];

export const class1to5Data = {
  benefits: [
    { title: 'Mid-Day Meal Scheme (PM POSHAN)', desc: 'Provides free hot cooked meals daily in all government and government-aided primary schools to improve nutrition and attendance.' },
    { title: 'Free Textbooks & Uniforms', desc: 'Direct state education department distribution of syllabus textbooks and two sets of uniforms for primary level students.' },
    { title: 'RTE Section 12(1)(c) Benefits', desc: 'Mandatory 25% admission quota in private unaided schools for children from disadvantaged and EWS families, funded by government.' },
    { title: 'Free School Bags & Writing Kits', desc: 'State-sponsored distribution of educational starter packs containing notebooks, pencils, school bags, and primary supplies.' }
  ],
  competitions: [
    { title: 'National Art & Painting Olympiad', desc: 'Talent hunt program fostering creative visualization and expressions through national painting competitions.' },
    { title: 'Science Club Quiz Competitions', desc: 'District-level interactive puzzles and general knowledge quizzes designed to spark scientific curiosity in children.' },
    { title: 'National Spelling Bee Junior', desc: 'Spelling championship targeting phonetics, vocabulary build-ups, and early public confidence.' }
  ],
  scholarships: [
    { title: 'Pre-Matric State Scholarships', desc: 'Financial scholarship of ₹1,500/year to support writing materials and tuition costs for lower-income categories.' },
    { title: 'Merit-cum-Means Primary Grants', desc: 'Special assistance awarded to top-performing students in block-level primary assessments.' }
  ],
  skills: [
    { title: 'Visual Coding for Kids (Scratch)', desc: 'Introduction to logic, loops, and conditional reasoning through block-based game design.' },
    { title: 'Junior Public Speaking', desc: 'Storytelling exercises, poems recital, and voice modulation workshops to eliminate stage fright early.' },
    { title: 'Creativity & Origami Programs', desc: 'Enhancing cognitive and fine motor coordination skills through paper architecture and model crafts.' }
  ]
};

export const class6to8Data = {
  scholarships: [
    { title: 'National Means-cum-Merit Scholarship (NMMS)', desc: 'Scholarship of ₹12,000 per year from Class 9 to 12 based on an entrance exam conducted in Class 8.' },
    { title: 'Savitribai Phule Girl Student Grant', desc: 'Special financial assistance awarded to girl students from disadvantaged backgrounds to prevent drop-outs.' },
    { title: 'State Backward Class Educational Stipends', desc: 'Targeted grants covering learning aids and tuition fees for SC, ST, and OBC middle-school students.' }
  ],
  exams: [
    { title: 'NSTSE (Science & Mathematics)', desc: 'National Level Science Talent Search Examination focusing on logical thinking and concept application.' },
    { title: 'Asset Talent Search (ATS)', desc: 'Diagnostic testing program identifying academically gifted children and recommending advanced courses.' },
    { title: 'SOF Olympiads (NSO, IMO, IEO)', desc: 'Subject-specific olympiads evaluating concepts in Science, Math, English, and General Knowledge.' }
  ],
  schemes: [
    { title: 'Beti Bachao Beti Padhao School Kits', desc: 'Free distribution of digital education tabs, notebooks, and learning packages for girl children.' },
    { title: 'Free Cycle Distribution Scheme', desc: 'State-level scheme giving bicycles to rural middle school students to ease long-distance school commutes.' },
    { title: 'PM-SHRI School Quality Resources', desc: 'Upgraded infrastructure, smart classrooms, and laboratory access for students in designated PM-SHRI schools.' }
  ],
  skills: [
    { title: 'Basic Electronics & Robotics', desc: 'Assembling simple motors, battery configurations, breadboards, and introductory robot kits.' },
    { title: 'Vedic Maths & Abacus Calculations', desc: 'Fostering calculation speed and mental math tricks through ancient Vedic mathematical principles.' },
    { title: 'Digital Literacy & Typing Essentials', desc: 'Comprehensive typing certifications, document formats, and safe internet browsing habits.' }
  ]
};

export const class9to10Data = {
  science: {
    overview: 'Builds analytical bases. Essential for pursuing engineering, medicine, space sciences, and quantitative research.',
    careers: ['Software Developer', 'Cardiologist', 'Aerospace Engineer', 'Data Scientist', 'AI Researcher'],
    scholarships: ['NTSE Merit Scholarship', 'INSPIRE Awards-MANAK (₹10,000 prototype grant)', 'Vidyadhan Scholarship'],
    schemes: ['RTE Free Education Extension', 'State Science Talent Promotion Funds'],
    exams: ['NTSE Stage I & II', 'National Science Olympiad (NSO)', 'National Standard Examination in Astronomy'],
    salary: '₹6 - ₹32 LPA',
    colleges: 'IITs, AIIMS, NITs, IISc Bangalore, BITS Pilani'
  },
  commerce: {
    overview: 'Develops understanding of trade, business administration, capital flows, accounting standards, and market economics.',
    careers: ['Chartered Accountant (CA)', 'Investment Banker', 'Corporate Attorney', 'Portfolio Manager', 'Financial Auditor'],
    scholarships: ['Commerce Talent Search Scholarships', 'National Merit-cum-Means Scholarships'],
    schemes: ['Skill India Financial Literacy Grants', 'Pradhan Mantri Kaushal Vikas Yojana accounting courses'],
    exams: ['CA Foundation exam', 'CUET Commerce Foundation', 'ICSI CSEET (Company Secretary)'],
    salary: '₹5 - ₹25 LPA',
    colleges: 'Shri Ram College of Commerce (SRCC), Lady Shri Ram College (LSR), Christ University'
  },
  arts: {
    overview: 'Provides deep perspectives in human behavior, public policy, humanities, legal frameworks, media, and design disciplines.',
    careers: ['Civil Servant (IAS/IFS)', 'Product Designer', 'International Relations Consultant', 'Journalist', 'UX/UI Designer'],
    scholarships: ['Cultural Talent Search Scholarship', 'State Humanities Grants', 'Sahu Jain Trust Scholarships'],
    schemes: ['Lalit Kala Akademi Young Artist Support', 'National Bal Shree Awards'],
    exams: ['CLAT (Law Entrance)', 'NIFT Design Entrance', 'NID DAT Entrance'],
    salary: '₹4 - ₹20 LPA',
    colleges: 'Lady Shri Ram College, National Institute of Design (NID), NLUs, St. Stephen’s College'
  }
};

export const class11to12Data = {
  science: {
    exams: ['JEE Main & Advanced', 'NEET UG', 'BITSAT', 'VITEEE', 'IISER IAT', 'NDA'],
    scholarships: ['INSPIRE Scholarship (₹80,000/yr)', 'Central Sector Scheme of Scholarships (MHRD)', 'L\'Oréal India For Young Women In Science Scholarship'],
    schemes: ['Free State Coaching for JEE/NEET (e.g. Super 30, Akanksha)', 'Prime Minister Scholarship Scheme (PMSS)'],
    skills: ['Python Coding & Data Structures', 'IoT & Arduino Prototyping', 'Full Stack Web Basics', 'AI/ML Foundations'],
    roadmaps: ['Class 12th -> JEE -> B.Tech Computer Science -> Software Engineer -> CTO', 'Class 12th -> NEET -> MBBS -> MD Specialization -> Surgeon'],
    colleges: ['IITs', 'NITs', 'BITS Pilani', 'AIIMS Delhi', 'IISc Bangalore', 'IISERs']
  },
  commerce: {
    exams: ['CUET UG', 'CA Foundation', 'IPMAT (IIM Integrated MBA Entrance)', 'CLAT', 'NPAT', 'SET'],
    scholarships: ['ICAI Commerce Merit Scholarships', 'National Merit Scholarships', 'Sitaram Jindal Foundation Scholarship'],
    schemes: ['National Apprenticeship Training Scheme (NATS)', 'State Digital Skills Incentive Programs'],
    skills: ['Advanced Microsoft Excel & Visualizations', 'Financial Modeling & Valuation', 'Intro to Capital Markets & Equity Research', 'Corporate Auditing Basics'],
    roadmaps: ['Class 12th -> B.Com (Hons) -> CA -> Corporate Audit Lead -> CFO', 'Class 12th -> IPMAT -> Integrated BBA+MBA at IIM -> Investment Banker'],
    colleges: ['SRCC Delhi', 'St. Xavier\'s College Mumbai', 'Christ University Bangalore', 'IIM Indore (IPM)', 'LSR Delhi']
  },
  arts: {
    exams: ['CUET UG (Arts & Humanities)', 'CLAT (Law)', 'NID DAT (Design)', 'NIFT GAT', 'NCHMCT JEE (Hotel Management)'],
    scholarships: ['Sahu Jain Trust Scholarships', 'National Scholarship for Students with Disabilities', 'CCRT Cultural Scholarship'],
    schemes: ['Pradhan Mantri Kaushal Vikas Yojana courses', 'State Youth Leadership Camps & Travel Grants'],
    skills: ['UI/UX Design tools (Figma)', 'Digital Journalism, SEO & Copywriting', 'Foreign Language Certification (French/German)', 'Public Relations & Branding'],
    roadmaps: ['Class 12th -> CLAT -> BA LLB (5-Year) -> Corporate Law Associate -> Partner', 'Class 12th -> NID -> B.Des Product Design -> Lead UX Designer'],
    colleges: ['St. Stephen\'s College Delhi', 'JNU Delhi', 'NALSAR Hyderabad', 'NID Ahmedabad', 'NIFT Delhi']
  }
};

export const diplomaData = {
  polytechnic: {
    schemes: 'AICTE Pragati Scholarship for Girls, Post-Matric Scholarship for Technical Students, Saksham Scholarship for differently-abled.',
    scholarships: 'AICTE Tuition Fee Waiver Scheme (TFW), State Technical Board Merit Awards.',
    internships: 'National Apprenticeship Scheme (NATS) with ₹8,000 - ₹12,000/month government stipend.',
    jobs: 'Junior Engineer (JE) in Indian Railways, State Electricity Boards, PWD, and private builders.'
  },
  iti: {
    schemes: 'PM-KVY Skill Certification Incentives, Apprentice Protsahan Yojana, National Apprenticeship Promotion Scheme (NAPS).',
    scholarships: 'NTPC Scholarship for ITI students, state vocational assistance schemes.',
    internships: 'Industrial apprenticeships in PSU workshops (ISRO, BHEL, DRDO, Indian Railways).',
    jobs: 'Technician, Electrician, Machinist, Fitter in government workshops, defense factories, and auto manufacturers.'
  },
  paramedical: {
    schemes: 'National Health Mission training grants, state paramedical stipend pools.',
    scholarships: 'Merit-cum-Means health assistant scholarship, private medical college trust aids.',
    internships: 'Clinical assistants and training technicians in government district hospitals and diagnostics labs.',
    jobs: 'Lab Technician, Dialysis Assistant, Radiographer, OT Assistant, ECG technician in public and private hospitals.'
  },
  design: {
    schemes: 'National Handicraft and Handloom Development Schemes, young designer state grants.',
    scholarships: 'State Board of Technical Education creative scholarships, private design academy waivers.',
    internships: 'Apprenticeships in craft clusters, textile factories, and UI agency studios.',
    jobs: 'Assistant Fashion Designer, CAD Operator, Creative Executive, Graphic Assistant in design houses.'
  },
  agriculture: {
    schemes: 'RKVY-RAFTAAR incubation training grants, PM Formalisation of Micro Food Processing Enterprises (PMFME).',
    scholarships: 'ICAR Junior fellowships, state agricultural university stipends.',
    internships: 'Apprenticeships in state seed corporations, organic farms, and fertilizer firms.',
    jobs: 'Agriculture Extension Officer, Soil Analyst, Farm Supervisor, Horticulture Technician in govt/private farms.'
  }
};

export const graduationData = {
  BTech: {
    overview: '4-Year Engineering program focusing on technology innovation, coding, circuitry, and machine structures.',
    schemes: 'AICTE Pragati & Saksham Scholarships, National Education Loan Interest Subsidy Scheme.',
    scholarships: 'Reliance Foundation Undergrad Scholarship (₹2 Lakhs), Tata Trust Undergrad Scholarship, Siemens Scholarship.',
    internships: 'Google STEP Internship, Microsoft Engage, Amazon WOW, AICTE Chanakya Research Internships.',
    exams: 'GATE (for PG), UPSC Civil Services, State PCS, PSU Direct recruitments, Defense (UES/SSC).',
    govtJobs: 'Assistant Engineer (AE) in PWD/Electricity boards, Scientist-B at DRDO/ISRO, PSU Executive Trainee (via GATE).',
    privateJobs: 'Software Engineer, Systems Architect, VLSI Design Engineer, Data Analyst, Product Manager.',
    higherEd: 'M.Tech in IITs (via GATE), MS in US/Europe (via GRE/IELTS), MBA in IIMs (via CAT).',
    international: 'DAAD Scholarship (Germany), Eiffel Excellence Scholarship (France), Monbukagakusho (MEXT) (Japan).',
    salary: '₹6 - ₹35 LPA',
    growth: 'Software Engineer -> Tech Lead -> Engineering Manager -> VP of Engineering -> CTO'
  },
  BCA: {
    overview: '3-Year Computer Applications degree focused on software building, database management, and web dev.',
    schemes: 'NSP Digital India Training credits, State student laptop distribution programs.',
    scholarships: 'Aura Undergrad Support, Sitaram Jindal Foundation Grants, state EWS scholarship portals.',
    internships: 'Web dev in startup incubators, local software house trainees, IT support interns.',
    exams: 'NIMCET (for MCA at NITs), CUET PG, Bank Specialist Officer (SO) exams.',
    govtJobs: 'IT Assistant in banks, System Administrator in local municipality boards, Railway Junior IT Assistant.',
    privateJobs: 'Front-End Developer, QA Test Engineer, Database Executive, Technical Support Analyst.',
    higherEd: 'MCA (Master of Computer Applications), M.Sc Computer Science, MBA.',
    international: 'MS in Cloud Computing/Data Analytics in UK or Ireland.',
    salary: '₹4 - ₹12 LPA',
    growth: 'Junior Developer -> Full-Stack Developer -> Lead Architect -> Director of IT'
  },
  BBA: {
    overview: '3-Year Business Administration program preparing students for corporate leadership and operations management.',
    schemes: 'National Apprenticeship Training Scheme (NATS), Skill India loan models.',
    scholarships: 'OP Jindal Management Scholarship, Aditya Birla Group Scholarship, state merit awards.',
    internships: 'Sales Trainee, HR Associate in startups, operations intern in logistics firms.',
    exams: 'CAT, XAT, SNAP, GMAT, SSC CGL, Banking Exams.',
    govtJobs: 'Executive Trainee (HR/Marketing) in PSUs, Administrative Officer, Junior Accountant.',
    privateJobs: 'Business Development Associate, HR Recruiter, Marketing Specialist, Operations Analyst.',
    higherEd: 'MBA from top business schools, PGDM, Master in Management (MiM).',
    international: 'MiM programs in UK/France (e.g. HEC Paris, LBS).',
    salary: '₹4.5 - ₹15 LPA',
    growth: 'Management Trainee -> Assistant Manager -> Director of Operations -> Chief Operating Officer (COO)'
  },
  BCom: {
    overview: '3-Year Commerce degree teaching accounting principles, tax laws, business math, and auditing.',
    schemes: 'National Apprenticeship Training Scheme, Skill India banking certifications.',
    scholarships: 'ICAI Merit Scholarships, Sahu Jain Trust Undergrad Scholarships, state post-matric schemes.',
    internships: 'Tax consulting intern, accounts executive trainee, bank clerk intern.',
    exams: 'CA (Chartered Accountancy), CS (Company Secretary), CMA, CUET PG, Banking PO, SSC CGL.',
    govtJobs: 'Accounts Officer in government departments, Auditor in CAG (via SSC CGL), Bank PO.',
    privateJobs: 'Tax Analyst, Accountant, Internal Auditor, Financial Analyst, Treasury Assistant.',
    higherEd: 'M.Com, MBA Finance, CA Professional Level, ACCA / CFA.',
    international: 'CFA (US), ACCA (UK) global qualifications, Master in Finance in Europe.',
    salary: '₹4 - ₹15 LPA',
    growth: 'Accounts Executive -> Finance Manager -> VP Finance -> CFO'
  },
  BA: {
    overview: '3-Year Arts degree specializing in English, History, Sociology, Political Science, or Psychology.',
    schemes: 'State Post-Matric Humanities support, Lalit Kala Akademi scholarships.',
    scholarships: 'Cultural Talent Search Scholarship, CCRT Grants, private family foundation scholarships.',
    internships: 'Social media copywriter, content writer, NGO policy researcher, museum curator trainee.',
    exams: 'UPSC Civil Services, State PCS, SSC CGL, UGC NET, B.Ed Entrances.',
    govtJobs: 'IAS/IFS Officer (via UPSC), Content Creator for Prasar Bharati, State Publicity Officer.',
    privateJobs: 'Content Writer, PR Representative, HR Executive, Policy Researcher, Editor.',
    higherEd: 'MA, B.Ed (for teaching), LLB (Law), Master of Social Work (MSW).',
    international: 'Fulbright Foreign Student Program (US), Commonwealth Scholarships (UK).',
    salary: '₹3 - ₹10 LPA',
    growth: 'Content Executive -> Content Manager -> Communication Director -> Head of PR'
  },
  BSc: {
    overview: '3-Year Bachelor of Science focusing on Physics, Chemistry, Mathematics, Botany, or Zoology.',
    schemes: 'INSPIRE Scholarship for Higher Education (SHE) - ₹80,000/year for science learners.',
    scholarships: 'IASc-INSA-NASI Summer Research Fellowship, private pharmaceutical sponsor awards.',
    internships: 'Lab technician trainee, summer research fellow in national institutes (IISER, CSIR).',
    exams: 'IIT JAM (for M.Sc), CUET PG, CSIR NET, Forest Service Exam (IFS).',
    govtJobs: 'Scientific Assistant (IMD/ISRO), Lab In-charge in state testing facilities, Forest Officer.',
    privateJobs: 'Research Assistant, Lab Chemist, Quality Control Specialist, Clinical Data Analyst.',
    higherEd: 'M.Sc, Integrated Ph.D., B.Ed, Master in Data Science.',
    international: 'Erasmus Mundus Joint Masters, DAAD Masters Scholarships.',
    salary: '₹3.5 - ₹12 LPA',
    growth: 'Lab Assistant -> Senior Researcher -> R&D Manager -> Chief Scientist'
  },
  BEd: {
    overview: '2-Year Teacher Education program mandatory for teaching in high schools and higher secondary levels.',
    schemes: 'NCTE integrated teacher training models, state teacher welfare schemes.',
    scholarships: 'State teacher education aid, Central sector scholarship for pedagogical studies.',
    internships: 'Student-teacher placements in government senior secondary and private schools.',
    exams: 'CTET (Central Teacher Eligibility Test), State TET, TGT/PGT recruitment exams.',
    govtJobs: 'Government School Teacher (Primary/TGT/PGT), Educational Administrator in block offices.',
    privateJobs: 'High School Teacher, Curriculum Developer, Educational Consultant, Online Educator.',
    higherEd: 'M.Ed (Master of Education), MA Education, Ph.D. in Education.',
    international: 'Teaching assistantships under Fulbright, international IB school positions.',
    salary: '₹4 - ₹9 LPA',
    growth: 'School Teacher -> Senior Coordinator -> Vice Principal -> School Principal'
  },
  BJMC: {
    overview: '3-Year Journalism and Mass Communication program covering reporting, broadcasting, PR, and digital media.',
    schemes: 'Digital Media young fellowship grants, state media subsidy channels.',
    scholarships: 'Times Group Press Scholarships, regional media club student awards.',
    internships: 'Reporting intern in newspapers, video editor in TV channels, PR executive at agencies.',
    exams: 'IIMC Entrance Exam, Jamia Millia Media Entrance, UGC NET.',
    govtJobs: 'Information Officer in PIB (Press Information Bureau), Doordarshan News Anchor, Radio Jockey.',
    privateJobs: 'Reporter, News Editor, PR Specialist, Media Planner, Video Producer.',
    higherEd: 'Master of Journalism, MA Mass Communication, PG Diploma in Broadcast Journalism.',
    international: 'Chevening Scholarships (UK) for media practitioners, MS in Media in US.',
    salary: '₹3.5 - ₹12 LPA',
    growth: 'Reporter -> Senior Correspondent -> Bureau Chief -> Editor-in-Chief'
  },
  Law: {
    overview: '5-Year Integrated (BA LLB) or 3-Year LLB program covering civil, criminal, corporate, and constitutional laws.',
    schemes: 'National Bar Council student welfare schemes, legal aid clinic internships.',
    scholarships: 'Aditya Birla Group Law Scholarship, LexisNexis Legal Scholarships.',
    internships: 'Law firm litigation trainee, judicial clerkship under Supreme Court/High Court judges.',
    exams: 'CLAT PG (for LLM), AIBE (All India Bar Exam), Judicial Services Exam.',
    govtJobs: 'Civil Judge (via Judicial Services), Legal Advisor in PSUs, Public Prosecutor (Government Lawyer).',
    privateJobs: 'Corporate Legal Associate, Compliance Officer, Legal Consultant, Arbitrator.',
    higherEd: 'LLM (Master of Laws), MBA in Business Law, Ph.D. in Law.',
    international: 'Rhodes Scholarship (Oxford), LLM in Harvard/Cambridge.',
    salary: '₹5 - ₹22 LPA',
    growth: 'Associate -> Senior Associate -> Counsel -> Legal Director / Law Firm Partner'
  },
  Nursing: {
    overview: '4-Year B.Sc Nursing degree training professional registered nurses in healthcare systems and clinical care.',
    schemes: 'National Health Mission rural placements incentives, state nursing stipends.',
    scholarships: 'TNAI (Trained Nurses Association) Scholarships, military nursing student sponsorships.',
    internships: 'Clinical rotatory intern in government and corporate multi-specialty hospitals.',
    exams: 'AIIMS Nursing Officer Exam, State Staff Nurse recruitment entrances, NCLEX (for US).',
    govtJobs: 'Staff Nurse in AIIMS/ESIC hospitals, Community Health Officer (CHO), Military Nursing Officer.',
    privateJobs: 'Registered Nurse (ICU/OT), Nurse Educator, Home Health Nurse, Medical Coordinator.',
    higherEd: 'M.Sc Nursing, Post Basic Specialization (Cardiology/Oncology), Master in Hospital Admin.',
    international: 'Direct nursing career placement in UK (NHS), USA, or Middle East via IELTS/NCLEX.',
    salary: '₹4 - ₹15 LPA',
    growth: 'Staff Nurse -> Ward In-charge -> Nursing Superintendent -> Director of Nursing'
  },
  Pharmacy: {
    overview: '4-Year Bachelor of Pharmacy covering drug synthesis, pharmaceutical chemistry, pharmacology, and formulation.',
    schemes: 'NIPER pharmacy student research incentives, state technical board scholarships.',
    scholarships: 'GPAT Scholarships (for M.Pharm), private pharmaceutical trust grants.',
    internships: 'Formulation trainee in pharma plants (Cipla/Sun Pharma), clinical research assistant.',
    exams: 'GPAT (Graduate Pharmacy Aptitude Test), Drug Inspector Recruitment exams.',
    govtJobs: 'Drug Inspector, Government Hospital Pharmacist, Scientific Officer in pharmacopoeia commission.',
    privateJobs: 'Formulation Chemist, Medical Representative, Pharmacovigilance Officer, Drug Safety Associate.',
    higherEd: 'M.Pharm, MBA Pharma, Pharm.D (Doctor of Pharmacy), Ph.D.',
    international: 'MS in Pharmacology/Toxicology in Germany or Canada.',
    salary: '₹4 - ₹12 LPA',
    growth: 'Quality Analyst -> R&D Associate -> Formulation Lead -> R&D Director'
  },
  HotelManagement: {
    overview: '3 to 4-Year Hospitality Administration degree covering front office, culinary arts, housekeeping, and F&B service.',
    schemes: 'Ministry of Tourism Hunar se Rozgar Tak certifications, skill loans.',
    scholarships: 'FHRAI (Federation of Hotels) Scholarships, IHC (Indian Hotels Co) merit grants.',
    internships: 'Industrial training at 5-star hotel groups (Taj, Marriott, Oberoi, Hyatt).',
    exams: 'NCHMCT JEE, NCHMCT PG Entrance, MBA entrances.',
    govtJobs: 'Catering Manager in IRCTC, Hospitality manager in PSU guest houses, Air Force mess officer.',
    privateJobs: 'Front Office Manager, Chef de Partie, Restaurant Manager, Guest Relations Executive, Event Planner.',
    higherEd: 'Master in Hospitality Administration, MBA in Tourism & Hospitality.',
    international: 'Management Trainee placements in Dubai, Singapore, Europe cruise liners.',
    salary: '₹3.5 - ₹10 LPA',
    growth: 'Operations Trainee -> Assistant Manager -> General Manager (GM) of Hotel'
  }
};

export const postGraduationData = {
  MBA: {
    fellowships: 'IIM Doctoral Fellowships (FPM), AICTE research fellowships.',
    scholarships: 'Aditya Birla Scholarship, OP Jindal Scholar Award (₹1.5 Lakhs), central sector PG merit awards.',
    schemes: 'National Education Loan Interest Subsidy, Startup India seed grants.',
    international: 'Erasmus Mundus PG exchanges, Fulbright-Nehru Master Fellowships (USA), Chevening Scholarships (UK).',
    internships: 'Management Associate in MNC banks, Strategy intern in FMCG brands, Product intern.',
    jobs: 'Management Consultant, Investment Associate, Brand Manager, Product Manager, Strategy Lead.',
    startups: 'Incubation facilities at IIM T-Hub, seed funding support under Startup India (₹10 - ₹25 Lakhs).'
  },
  MCA: {
    fellowships: 'DST/CSIR Junior Research Fellowship (JRF), state technical department stipends.',
    scholarships: 'AICTE PG Scholarship, private IT trust corporate scholarships.',
    schemes: 'Digital India young engineer initiatives, state student laptop support.',
    international: 'Research internships in Singapore or Japan labs, MS joint degree pathways.',
    internships: 'Software engineering intern in MNCs, full-stack dev in college incubators.',
    jobs: 'Software Engineer, Systems Analyst, Cloud Engineer, Database Administrator, Tech Consultant.',
    startups: 'MeitY Startup Hub seed grants, university incubation workspace waivers.'
  },
  MTech: {
    fellowships: 'MHRD/AICTE GATE stipend (₹12,400/month for all qualified candidates in recognized programs).',
    scholarships: 'Prime Minister Research Fellowship (PMRF - up to ₹70,000/month), CSIR JRF Fellowship.',
    schemes: 'DST (Department of Science & Technology) young scientist grant, state innovation funds.',
    international: 'DAAD Scholarship (Germany), MEXT Scholarship (Japan), research exchange under Commonwealth.',
    internships: 'R&D intern at Intel, Nvidia, Samsung, ISRO research centers.',
    jobs: 'Research & Development Engineer, VLSI Architect, Assistant Professor, Principal Data Scientist.',
    startups: 'DST BIRAC biotechnology incubation, patent registration financial assistance.'
  },
  MA: {
    fellowships: 'UGC Junior Research Fellowship (JRF) - ₹37,000/month, ICSSR fellowships.',
    scholarships: 'Indira Gandhi Single Girl Child PG Scholarship, central sector minority PG awards.',
    schemes: 'Ministry of Culture research fellowships, state arts promotion grants.',
    international: 'Commonwealth Scholarship (UK), French Government Charpak scholarships.',
    internships: 'Policy intern in think tanks (Observer Research Foundation), social research trainee at NGOs.',
    jobs: 'Research Analyst, Public Policy Consultant, Corporate Communications Specialist, Senior Editor.',
    startups: 'Social entrepreneurship funding (Aavishkaar Group), creative agency incubators.'
  },
  MSc: {
    fellowships: 'CSIR-UGC NET JRF stipend (₹37,000/month), INSPIRE Fellowship for Doctoral research.',
    scholarships: 'Indira Gandhi PG Scholarship, IASc Summer research awards.',
    schemes: 'DST women scientist scheme (WOS-A), state research excellence allowances.',
    international: 'Monbukagakusho (MEXT) Japan, Eiffel Excellence Scholarship France.',
    internships: 'Research trainee at CSIR labs, formulation intern in pharmaceutical giants.',
    jobs: 'Scientific Officer, Research Scientist, Clinical trial monitor, Lecturer.',
    startups: 'Biotech startup incubation (BIRAC BIG), seed grants for lab commercialization.'
  },
  LLM: {
    fellowships: 'UGC NET JRF, research fellowships in National Law Universities.',
    scholarships: 'Inlaks Shivdasani Foundation Scholarships, JN Tata Endowment Loan Scholarships.',
    schemes: 'Department of Justice legal research projects, state legal services panels.',
    international: 'Felix Scholarships (Oxford), NYU Haas global fellowship programs.',
    internships: 'Associate intern in Supreme Court legal aid cell, research associate at law commissions.',
    jobs: 'Corporate Legal Counsel, Judicial Officer, Assistant Professor of Law, Legal Editor.',
    startups: 'LegalTech startup seed funds (creating contract automation modules).'
  },
  PhD: {
    fellowships: 'PMRF (₹70,000 - ₹80,000/month), CSIR/UGC JRF, ICMR/DBT Junior Research Fellowships.',
    scholarships: 'TCS Research Fellowship for IT, Fulbright-Nehru Doctoral Fellowships.',
    schemes: 'DST INSPIRE Fellowship, ICSSR Doctoral Fellowship, State University Ph.D. contingency grants.',
    international: 'Marie Skłodowska-Curie Actions (Europe), Newton-Bhabha PhD placement (UK).',
    internships: 'Postdoctoral research assistant in global universities, corporate R&D lab consultant.',
    jobs: 'University Professor, Senior Scientist, Principal Investigator, Director of Research.',
    startups: 'DeepTech startup incubation under BIRAC/DST, venture capital funding for patents.'
  }
};

export const governmentSchemes = [
  {
    id: 'pm-vidyalakshmi',
    title: 'Pradhan Mantri Vidya Lakshmi Loan Scheme',
    category: 'Education Loan Schemes',
    gender: 'All',
    classLevel: 'Graduation',
    course: 'BTech',
    state: 'Central',
    income: 'Under 8 LPA',
    minority: 'All',
    benefits: 'Single portal access to query education loans up to ₹7.5 Lakhs without collateral. Includes 4% interest subsidy for students from weaker economic sections.',
    eligibility: 'Indian citizen who has secured admission to professional/technical courses in India or abroad through standard entrance examinations.',
    documents: 'College Admission Letter, Breakup of Course Fees, Pan Card & Aadhar Card of parents/co-borrower, Parent Income Certificate.',
    applyProcess: 'Register on Vidya Lakshmi portal, fill out the Common Educational Loan Application Form (CELAF), search and apply to target banks.',
    website: 'https://www.vidyalakshmi.co.in'
  },
  {
    id: 'pragati-girls',
    title: 'AICTE Pragati Scholarship Scheme for Girls',
    category: 'Women Schemes',
    gender: 'Female',
    classLevel: 'Graduation',
    course: 'BTech',
    state: 'Central',
    income: 'Under 8 LPA',
    minority: 'All',
    benefits: '₹50,000 per annum for tuition fees, purchase of technical books, equipment, laptops, and study aids.',
    eligibility: 'Maximum two girl children per family, enrolled in the first year of degree/diploma programs in AICTE-approved colleges.',
    documents: 'Class 10 & 12 mark sheets, Income Certificate, College admission receipt, Tuition fee invoice, Aadhaar details.',
    applyProcess: 'Submit applications through the National Scholarship Portal (NSP) under the AICTE section.',
    website: 'https://scholarships.gov.in'
  },
  {
    id: 'shreyas-apprentice',
    title: 'SHREYAS Apprenticeship Scheme',
    category: 'Skill India',
    gender: 'All',
    classLevel: 'Graduation',
    course: 'BA',
    state: 'Central',
    income: 'All',
    minority: 'All',
    benefits: 'Stipend support of ₹6,000 to ₹10,000/month during industry-linked apprenticeship courses with private firms.',
    eligibility: 'Non-technical graduation students (BA, B.Sc, B.Com) currently in final year or passed out.',
    documents: 'Graduation Certificate / Bonafide Student Certificate, Aadhaar Card, Active bank account details.',
    applyProcess: 'Register on the NATS/NAPS portal, build a candidate profile, and apply for apprenticeship listings.',
    website: 'https://www.nats.education.gov.in'
  },
  {
    id: 'post-matric-sc',
    title: 'Post Matric Scholarship for SC/ST Students',
    category: 'SC/ST/OBC Schemes',
    gender: 'All',
    classLevel: 'Graduation',
    course: 'BCom',
    state: 'Central',
    income: 'Under 2.5 LPA',
    minority: 'All',
    benefits: '100% tuition fee reimbursement and academic maintenance allowance of up to ₹13,500/year directly to student accounts.',
    eligibility: 'Belonging to Scheduled Caste (SC) or Scheduled Tribe (ST), enrolled in recognized post-matric/post-secondary courses.',
    documents: 'Caste Certificate, Income Certificate, College Marksheets, Aadhaar-linked Bank Passbook.',
    applyProcess: 'Apply online on the state scholarship portal or National Scholarship Portal (NSP).',
    website: 'https://scholarships.gov.in'
  },
  {
    id: 'digital-india-fellowship',
    title: 'Digital India Young Engineer Fellowship',
    category: 'Digital India',
    gender: 'All',
    classLevel: 'Post Graduation',
    course: 'MCA',
    state: 'Central',
    income: 'All',
    minority: 'All',
    benefits: 'Research stipend of ₹25,000/month and mentoring by senior MeitY scientists to deploy rural tech initiatives.',
    eligibility: 'B.Tech or MCA passout with minimum 75% marks; interests in web architecture or rural e-gov applications.',
    documents: 'Degree Certificate, Aadhaar, Research Proposal, Recommendation Letters.',
    applyProcess: 'Apply online on Ministry of Electronics & IT portal during call for proposals.',
    website: 'https://www.meity.gov.in'
  },
  {
    id: 'startup-india-seed',
    title: 'Startup India Seed Fund Scheme (SISFS)',
    category: 'Startup India',
    gender: 'All',
    classLevel: 'Post Graduation',
    course: 'PhD',
    state: 'Central',
    income: 'All',
    minority: 'All',
    benefits: 'Up to ₹20 Lakhs grant for proof of concept/prototype development, and up to ₹50 Lakhs for market entry/commercialization.',
    eligibility: 'Recognized startup with a business model based on technology, active for less than 2 years.',
    documents: 'DPIIT Registration, MVP Details, Audited Balance Sheet (if any), Pitch Deck.',
    applyProcess: 'Apply online via Startup India portal choosing preference of local incubators.',
    website: 'https://www.startupindia.gov.in'
  },
  {
    id: 'pm-fellowship-minority',
    title: 'Maulana Azad National Fellowship for Minorities',
    category: 'Minority Schemes',
    gender: 'All',
    classLevel: 'Post Graduation',
    course: 'PhD',
    state: 'Central',
    income: 'Under 6 LPA',
    minority: 'Minority',
    benefits: 'Stipend of ₹31,000/month (JRF) + HRA for PhD research scholars from minority groups.',
    eligibility: 'Belonging to Muslim, Christian, Sikh, Buddhist, Parsi, or Jain communities, qualified UGC NET.',
    documents: 'Minority Community Declaration, Income Certificate, UGC NET Certificate, University Admission.',
    applyProcess: 'Apply online via NSP portal following publication of UGC merit notification.',
    website: 'https://scholarships.gov.in'
  },
  {
    id: 'rythu-bima-scholar',
    title: 'Rythu Bandhu Educational Assistance for Farmers Children',
    category: 'Farmer Schemes',
    gender: 'All',
    classLevel: 'Graduation',
    course: 'BSc',
    state: 'State Government',
    income: 'Under 3 LPA',
    minority: 'All',
    benefits: 'Annual scholarship of ₹10,000 to cover agricultural college tuition and study resources.',
    eligibility: 'Children of registered farmers, enrolled in state-run agriculture universities.',
    documents: 'Farmer land passbook copy, Income Certificate, Bonafide Student receipt.',
    applyProcess: 'Submit offline forms through block development offices or upload on state portals.',
    website: 'https://agri.telangana.gov.in'
  }
];

export const scholarships = [
  {
    id: 'reliance-foundation',
    title: 'Reliance Foundation Undergrad Scholarships',
    category: 'Merit-Based',
    classLevel: 'Graduation',
    course: 'BTech',
    state: 'All States',
    gender: 'All',
    income: 'Under 15 LPA',
    amount: '₹2,00,000 (over course duration)',
    eligibility: 'Class 12 pass with minimum 60% marks; family income under 15 Lakhs. Enrolled in 1st year full-time UG program.',
    deadline: '2026-10-31',
    applyLink: 'https://www.reliancefoundation.org'
  },
  {
    id: 'inspire-dst',
    title: 'INSPIRE Scholarship for Higher Education',
    category: 'Government',
    classLevel: 'Graduation',
    course: 'BSc',
    state: 'All States',
    gender: 'All',
    income: 'All',
    amount: '₹80,000 per annum',
    eligibility: 'Top 1% in Class 12 board examinations, enrolled in basic or natural science courses (B.Sc, BS).',
    deadline: '2026-11-15',
    applyLink: 'https://www.online-inspire.gov.in'
  },
  {
    id: 'tata-trust-medical',
    title: 'Tata Trust Allied Medical & Tech Scholarships',
    category: 'Need-Based',
    classLevel: 'Graduation',
    course: 'Nursing',
    state: 'All States',
    gender: 'All',
    income: 'Under 4 LPA',
    amount: 'Partial to full tuition coverage (up to ₹60,000/yr)',
    eligibility: 'Enrolled in engineering, medical, or nursing college in India, household income under 4 Lakhs.',
    deadline: '2026-09-30',
    applyLink: 'https://www.tatatrusts.org'
  },
  {
    id: 'daad-germany',
    title: 'DAAD Master Scholarship (Germany)',
    category: 'International',
    classLevel: 'Post Graduation',
    course: 'MTech',
    state: 'All States',
    gender: 'All',
    income: 'All',
    amount: 'Fully Funded (€934/month + Travel + Insurance)',
    eligibility: 'Bachelor degree holders in target engineering or science fields with 2+ years of industry experience.',
    deadline: '2026-10-15',
    applyLink: 'https://www.daad.de'
  },
  {
    id: 'chevening-uk',
    title: 'Chevening Scholarships (United Kingdom)',
    category: 'Fully Funded',
    classLevel: 'Post Graduation',
    course: 'MA',
    state: 'All States',
    gender: 'All',
    income: 'All',
    amount: 'Fully Funded (Tuition fees + monthly stipend + flights)',
    eligibility: 'Excellent undergraduate degree, 2+ years of work experience, leadership potential, applying to UK Masters.',
    deadline: '2026-11-05',
    applyLink: 'https://www.chevening.org'
  },
  {
    id: 'jindal-need-means',
    title: 'Sitaram Jindal Foundation Scholarship',
    category: 'Need-Based',
    classLevel: 'Graduation',
    course: 'BA',
    state: 'All States',
    gender: 'All',
    income: 'Under 2.5 LPA',
    amount: '₹12,000 - ₹30,000 per annum',
    eligibility: 'Class 12 passed with min 60% (boys) or 55% (girls), family income under 2.5 Lakhs per year.',
    deadline: '2026-12-31',
    applyLink: 'http://www.sitaramjindalfoundation.org'
  }
];

export const internships = [
  {
    id: 'niti-aayog',
    title: 'NITI Aayog Government Internship',
    category: 'Government',
    type: 'Offline',
    stipend: 'Unpaid (Certificate + High Impact policy exposure)',
    duration: '6 weeks to 3 months',
    skills: 'Policy Research, Economics, Data Analytics, Report Writing',
    certificate: 'Yes',
    ppo: 'No'
  },
  {
    id: 'drdo-research-intern',
    title: 'DRDO Scientific Computing Research Internship',
    category: 'Research',
    type: 'Hybrid',
    stipend: '₹12,000 / month',
    duration: '6 months',
    skills: 'C++, MATLAB, Linux administration, cybersecurity protocols',
    certificate: 'Yes',
    ppo: 'Project Extension Possibility'
  },
  {
    id: 'google-step',
    title: 'Google STEP Internship (Software Engineering)',
    category: 'Private',
    type: 'Hybrid',
    stipend: '₹80,000 / month',
    duration: '10 - 12 weeks',
    skills: 'Java/C++, Data Structures, Algorithms, System Design basics',
    certificate: 'Yes',
    ppo: 'High Conversion Rate'
  },
  {
    id: 't-hub-operations',
    title: 'T-Hub Marketing & Incubator Operations',
    category: 'Startup',
    type: 'Remote',
    stipend: '₹15,000 / month',
    duration: '3 months',
    skills: 'Growth hacking, Community Management, Social Media, Sales Pitching',
    certificate: 'Yes',
    ppo: 'Yes'
  },
  {
    id: 'sail-psu-apprentice',
    title: 'SAIL Technical Trainee Apprenticeship',
    category: 'PSU',
    type: 'Offline',
    stipend: '₹10,500 / month',
    duration: '1 Year',
    skills: 'Industrial Safety, Instrumentation, Mechanical controls',
    certificate: 'Yes',
    ppo: 'Apprentice Board Certification'
  }
];

export const exams = [
  {
    id: 'jee-advanced',
    title: 'JEE Advanced',
    category: 'Engineering Exams',
    eligibility: 'Must rank in top 2,50,000 in JEE Main; Class 12 passed with Physics, Chemistry, and Mathematics.',
    syllabus: 'Advanced Physics (Mechanics, Electrodynamics), Chemistry (Physical, Organic, Inorganic), Mathematics (Calculus, Coordinate Geometry, Vectors).',
    pattern: 'Two papers of 3 hours each (Paper 1 & Paper 2) conducted on the same day. Features variable marking and negative scores.',
    previousYearPapers: 'Download links for 2023, 2024, 2025 question bundles available on official site.',
    cutoff: 'Qualified general cutoff is around 30% of total score, varying with paper difficulty.',
    roadmap: 'Phase 1: Clear NCERT concepts in Class 11. Phase 2: Solve complex problems from H.C. Verma/Irodov. Phase 3: Weekly mock test drills.'
  },
  {
    id: 'neet-ug',
    title: 'NEET UG',
    category: 'Medical Exams',
    eligibility: 'Class 12 passed or appearing with Physics, Chemistry, Biology/Biotechnology, and English. Minimum age: 17 years.',
    syllabus: 'NCERT Class 11 & 12 Biology (Botany & Zoology), Chemistry (Organic, Inorganic, Physical), and Physics.',
    pattern: 'Single pen-and-paper test. 200 MCQs (180 to answer). Total marks: 720. Duration: 3h 20m.',
    previousYearPapers: 'Downloadable PDF question papers for past 5 years available on NTA website.',
    cutoff: 'General category government MBBS seat cutoff ranges from 610 to 630 out of 720.',
    roadmap: 'Phase 1: Memorize NCERT Biology textbooks line-by-line. Phase 2: Solve physical chemistry numericals. Phase 3: Attempt 50+ timed full-syllabus mock papers.'
  },
  {
    id: 'clat-ug',
    title: 'CLAT (Common Law Admission Test)',
    category: 'Law Exams',
    eligibility: 'Class 12 passed with minimum 45% marks (40% for SC/ST). No upper age limit.',
    syllabus: 'English Language, Current Affairs including General Knowledge, Legal Reasoning, Logical Reasoning, Quantitative Techniques.',
    pattern: 'CBT exam. 120 objective questions. Duration: 2 hours. Negative marking: 0.25 marks per wrong answer.',
    previousYearPapers: 'Consolidated PDF keys from 2021 to 2025.',
    cutoff: 'Top NLUs require score above 90+ out of 120.',
    roadmap: 'Phase 1: Read national newspapers daily (editorials). Phase 2: Learn basic legal principles and torts/contracts. Phase 3: Master speed-reading mock drills.'
  },
  {
    id: 'cat-exam',
    title: 'CAT (Common Admission Test)',
    category: 'Management Exams',
    eligibility: 'Bachelor\'s degree in any discipline with minimum 50% marks (45% for SC/ST/PwD).',
    syllabus: 'Verbal Ability & Reading Comprehension (VARC), Data Interpretation & Logical Reasoning (DILR), Quantitative Ability (QA).',
    pattern: 'CBT exam. 66 questions to be answered in 120 minutes (40 minutes per section). Features MCQ and TITA questions.',
    previousYearPapers: 'Official CAT shift question documents for past 4 years.',
    cutoff: 'IIM call cutoffs hover around 97 to 99.9 percentile depending on profile.',
    roadmap: 'Phase 1: Clear quantitative concepts. Phase 2: Daily solve 3 DILR sets and 4 RC passages. Phase 3: Sectional mock checks starting August.'
  },
  {
    id: 'upsc-cse',
    title: 'UPSC Civil Services Examination',
    category: 'Government Exams',
    eligibility: 'Indian Citizen; Bachelor\'s degree in any stream. Age: 21 to 32 years (relaxations for reserved categories).',
    syllabus: 'Prelims: GS (History, Polity, Economy, Geography, Science) + CSAT. Mains: Essay, 4 General Studies papers, 2 Optional subject papers.',
    pattern: 'Three stages: 1. Prelims (Objective MCQs). 2. Mains (Written descriptive papers). 3. Personality Test (Face-to-face interview).',
    previousYearPapers: 'UPSC official archives containing GS and Optional exam papers for past decade.',
    cutoff: 'General category prelims cutoff averages around 88-95 marks out of 200 in GS Paper 1.',
    roadmap: 'Phase 1: Study basic NCERTs (Class 6-12). Phase 2: Learn answer writing skills and read current affairs daily. Phase 3: Pick optional early.'
  },
  {
    id: 'ctet-exam',
    title: 'CTET (Central Teacher Eligibility Test)',
    category: 'Teaching Exams',
    eligibility: 'Graduation with B.Ed or Diploma in Elementary Education.',
    syllabus: 'Child Development and Pedagogy, Language I & II, Mathematics, Environmental Studies/Social Sciences.',
    pattern: 'Two objective papers. Paper I (for Class 1-5 teachers), Paper II (for Class 6-8 teachers). 150 MCQs, no negative marking.',
    previousYearPapers: 'Past 5 years solved papers.',
    cutoff: 'Minimum passing marks: 60% (90 out of 150) for General category.',
    roadmap: 'Phase 1: Study child development theories (Piaget, Vygotsky). Phase 2: Solve pedagogy questions. Phase 3: Do grammar and language drills.'
  },
  {
    id: 'nda-exam',
    title: 'NDA (National Defence Academy)',
    category: 'Defence Exams',
    eligibility: 'Unmarried male/female candidates, Class 12 passed/appearing (Physics & Math required for Air Force/Navy). Age: 16.5 to 19.5 years.',
    syllabus: 'Paper 1: Mathematics (Algebra, Calculus, Trig). Paper 2: General Ability Test (English, Physics, Chemistry, GK).',
    pattern: 'Pen-and-paper test. Math: 300 marks. GAT: 600 marks. Followed by 5-day SSB (Services Selection Board) interview.',
    previousYearPapers: 'Solved paper banks for past 10 editions.',
    cutoff: 'Written exam qualifying cutoff averages around 340-360 out of 900.',
    roadmap: 'Phase 1: Master CBSE Class 11/12 Math. Phase 2: Enhance English grammar and GK. Phase 3: Physical fitness training and speech practice.'
  },
  {
    id: 'sbi-po',
    title: 'SBI PO (Probationary Officer)',
    category: 'Banking Exams',
    eligibility: 'Graduation in any discipline from a recognized university. Age: 21 to 30 years.',
    syllabus: 'Prelims: English, Quantitative Aptitude, Reasoning. Mains: Data Analysis, General Banking Awareness, Computer Aptitude, Descriptive Writing.',
    pattern: 'Prelims (100 marks objective) -> Mains (200 marks objective + 50 marks descriptive) -> Group Exercises & Interview.',
    previousYearPapers: 'Memory-based papers from past SBI PO exam sessions.',
    cutoff: 'Prelims cutoff hovers between 58 to 63 marks out of 100.',
    roadmap: 'Phase 1: Speed calculation tricks. Phase 2: Focus on complex puzzles and input-output reasoning. Phase 3: Write weekly bank mocks.'
  },
  {
    id: 'rrb-ntpc',
    title: 'Railway RRB NTPC',
    category: 'Railway Exams',
    eligibility: 'Class 12 passed or Graduate degree depending on post code. Age: 18 to 33 years.',
    syllabus: 'General Awareness (GK, current events), Mathematics (Arithmetic, algebra), General Intelligence and Reasoning.',
    pattern: 'CBT Stage 1 (100 questions) -> CBT Stage 2 (120 questions) -> Typing Test / Aptitude Test -> Document Verification.',
    previousYearPapers: 'Shift-wise actual question papers from RRB exam archives.',
    cutoff: 'Qualified normalized scores average 70-82% depending on region boards.',
    roadmap: 'Phase 1: Practice quantitative arithmetic. Phase 2: Complete previous year railways science questions. Phase 3: Master typing speeds.'
  },
  {
    id: 'ssc-cgl',
    title: 'SSC CGL (Combined Graduate Level)',
    category: 'SSC Exams',
    eligibility: 'Bachelor\'s degree in any stream. Age criteria varies from 18 to 32 years depending on post.',
    syllabus: 'Tier 1: General Intelligence, General Awareness, Quantitative Aptitude, English Comprehension. Tier 2: Mathematical Abilities, Reasoning, English, General Awareness, Computer Knowledge.',
    pattern: 'Tier 1 (Objective Qualifying CBT) -> Tier 2 (Objective Scoring CBT) -> Computer Speed Test.',
    previousYearPapers: 'Shift PDFs from the recent exam editions.',
    cutoff: 'Tier 1 general cutoff varies between 130-150 marks out of 200.',
    roadmap: 'Phase 1: Solve previous years English grammars. Phase 2: Learn mental reasoning structures. Phase 3: Rapid quantitative practice.'
  },
  {
    id: 'appsc-group1',
    title: 'State PSC (APPSC / MPSC / UPPSC Group 1)',
    category: 'State PSC Exams',
    eligibility: 'Bachelor\'s degree in any discipline. Age: 18 to 42 years (varies per state).',
    syllabus: 'Paper 1: History, Polity, Geography, Economy. Paper 2: General Science, Environment, Mental Ability, State-specific history/polity.',
    pattern: 'Screening Test (Objective) -> Written Mains Exam (Descriptive essay + GS papers) -> Personal Interview.',
    previousYearPapers: 'State commission official portal archives.',
    cutoff: 'Screening test cutoffs usually sit around 45-55% of total marks.',
    roadmap: 'Phase 1: Read state history textbooks (SCERT). Phase 2: Daily review state-level newspapers. Phase 3: Regular descriptive writing exercises.'
  },
  {
    id: 'gre-test',
    title: 'GRE (Graduate Record Examination)',
    category: 'International Exams',
    eligibility: 'No specific age or academic restrictions; generally taken by university graduates seeking PG abroad.',
    syllabus: 'Analytical Writing (Essay), Verbal Reasoning (Vocabulary, Reading Comprehension), Quantitative Reasoning (Arithmetic, Algebra, Data Analysis).',
    pattern: 'Computer-delivered test. Sections feature multiple-choice questions and typed essay responses. Score range: 260 - 340.',
    previousYearPapers: 'ETS official powerprep diagnostic practice exams.',
    cutoff: 'Top global university MS departments target GRE scores of 315 to 325+.',
    roadmap: 'Phase 1: Build robust word lists (Barron\'s). Phase 2: Understand math word problems. Phase 3: Write timed essays and check feedback.'
  }
];

export const mockAiResponses = {
  "Which stream should I choose after Class 10?": "Based on your academic interests:\n- Choose **Science** if you love analytical problem-solving, computing (programming), molecular structures, or medicine.\n- Choose **Commerce** if business math, stock trading, bookkeeping, corporate administration, and tax laws excite you.\n- Choose **Arts** if public policy, writing, psychology, designing, history, or legal research are your primary passions.",
  "Best scholarships for B.Tech students?": "Top scholarships available for B.Tech include:\n1. **Reliance Foundation Undergrad Scholarship**: Offers ₹2,00,000 for full degree support based on merit & income.\n2. **AICTE Pragati Scholarship for Girls**: Provides ₹50,000 per year for tuition and books.\n3. **INSPIRE Higher Education Scholarship**: ₹80,000/year for science-related technical disciplines.\n4. **Tata Trust Undergrad Grants**: Need-based funding covering tuition fees.",
  "Government internship for engineering students?": "High-impact government internships include:\n1. **DRDO Research Internship**: Monthly stipend of ₹12,000 for advanced computing/cybersecurity projects.\n2. **NITI Aayog Internship**: Unpaid but yields prime policy exposure and government recommendation certificates.\n3. **PSU Apprenticeships**: Placements at ISRO, BHEL, ONGC, and NTPC with stipends of ₹10,000 - ₹15,000.",
  "How to prepare for UPSC?": "UPSC Preparation Roadmap:\n1. **NCERT Study**: Master history, geography, polity, and economics from Class 6-12 textbooks.\n2. **Newspaper Analysis**: Read *The Hindu* or *Indian Express* daily for editorials.\n3. **Answer Writing**: Dedicate 1 hour daily to practice descriptive mains-style answer writing.\n4. **Optional Subject**: Select an optional subject early (e.g. History, Anthro, PubAd) and study it deeply."
};
