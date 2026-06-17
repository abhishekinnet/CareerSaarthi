require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Mentor = require('../models/Mentor');
const Scholarship = require('../models/Scholarship');

const seedData = async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/careersaathi';
  
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected for seeding...');

    // Clear existing data for these collections
    await User.deleteMany({ role: { $in: ['mentor', 'admin'] } });
    await Mentor.deleteMany({});
    await Scholarship.deleteMany({});

    console.log('Cleaned old mentors, admins, and scholarships.');

    // 1. Create Admins and Mentors Users
    const salt = await require('bcryptjs').genSalt(10);
    const passwordHash = await require('bcryptjs').hash('123456', salt);

    const users = await User.create([
      {
        name: 'Aarav Mehta',
        email: 'aarav@careersaathi.in',
        password: 'will_be_rehashed_in_pre_save_but_explicit_for_bulk',
        role: 'mentor',
        isVerified: true
      },
      {
        name: 'Dr. Priya Sharma',
        email: 'priya@careersaathi.in',
        password: 'will_be_rehashed_in_pre_save_but_explicit_for_bulk',
        role: 'mentor',
        isVerified: true
      },
      {
        name: 'Vikram Aditya',
        email: 'vikram@careersaathi.in',
        password: 'will_be_rehashed_in_pre_save_but_explicit_for_bulk',
        role: 'mentor',
        isVerified: true
      },
      {
        name: 'Admin User',
        email: 'admin@careersaathi.in',
        password: 'will_be_rehashed_in_pre_save_but_explicit_for_bulk',
        role: 'admin',
        isVerified: true
      }
    ]);

    // Force passwords update due to re-hashing trigger in create
    for (let u of users) {
      u.password = passwordHash;
      await u.save();
    }

    // 2. Create Mentor Profile Details
    await Mentor.create([
      {
        user: users[0]._id,
        bio: 'Senior Technical Lead with 10+ years of experience in distributed systems, full stack development, and cloud databases. Loves helping students launch engineering careers.',
        company: 'Google India',
        role: 'Staff Software Engineer',
        specialties: ['Web Development', 'System Design', 'Algorithms', 'Interview Preparation'],
        experience: 10,
        pricing: 99,
        rating: 4.9,
        reviewsCount: 42,
        availability: [
          { day: 'Monday', slots: ['14:00 - 15:00', '16:00 - 17:00'] },
          { day: 'Wednesday', slots: ['17:00 - 18:00'] }
        ],
        status: 'approved'
      },
      {
        user: users[1]._id,
        bio: 'Academic researcher and admissions guide. Former professor at IIT Delhi. Specialize in study abroad admissions, research fellowships, and stream selection guidelines.',
        company: 'Ex-Professor IIT Delhi',
        role: 'Principal Advisor',
        specialties: ['Admissions Counselling', 'Research Fellowships', 'Scholarship Pathways'],
        experience: 15,
        pricing: 149,
        rating: 4.8,
        reviewsCount: 38,
        availability: [
          { day: 'Tuesday', slots: ['10:00 - 11:00', '11:00 - 12:00'] },
          { day: 'Thursday', slots: ['15:00 - 16:00'] }
        ],
        status: 'approved'
      },
      {
        user: users[2]._id,
        bio: 'Startup founder and incubation mentor. Ex-Product Lead. Passionate about guiding young minds looking to start businesses, prototype MVPs, or transition to Product Management.',
        company: 'Veloce Startups',
        role: 'Founder & CEO',
        specialties: ['Entrepreneurship', 'Product Management', 'Venture Funding'],
        experience: 8,
        pricing: 199,
        rating: 5.0,
        reviewsCount: 19,
        availability: [
          { day: 'Friday', slots: ['16:00 - 17:00', '18:00 - 19:00'] }
        ],
        status: 'approved'
      }
    ]);

    // 3. Create Scholarships
    await Scholarship.create([
      {
        title: 'National Merit Scholarship Program 2026',
        provider: 'Ministry of Education, Government of India',
        amount: '₹50,000 / Year',
        description: 'Financial assistance for top rankers in class 12 board examinations pursuing regular graduate and post-graduate courses in recognized colleges.',
        eligibility: ['Class 12 board rank in top 80th percentile', 'Family income below ₹4.5 Lakhs per annum', 'Must be enrolled in a regular degree program'],
        category: 'Government',
        deadline: new Date('2026-10-31'),
        applicationLink: 'https://scholarships.gov.in'
      },
      {
        title: 'L’Oréal India For Young Women in Science Scholarship',
        provider: 'L’Oréal India',
        amount: '₹2,50,000 Total',
        description: 'Aiming to encourage young women to pursue scientific education, supporting their university tuition fees for science-based streams.',
        eligibility: ['Female students only', 'Class 12 score above 85% in PCM/PCB', 'Family income below ₹6 Lakhs per annum'],
        category: 'Women Merit',
        deadline: new Date('2026-09-15'),
        applicationLink: 'https://www.loreal.com/en/india'
      },
      {
        title: 'Aditya Birla Scholarship Scheme',
        provider: 'Aditya Birla Group',
        amount: '₹1,00,000 / Year',
        description: 'Merit-based financial aid for engineering, management, and law programs in selected premier institutions (IITs, IIMs, BITS, National Law Universities).',
        eligibility: ['Top rankers in JEE Advanced or CAT exams', 'Admission to designated premier institutes in India'],
        category: 'Merit-Based',
        deadline: new Date('2026-08-30'),
        applicationLink: 'https://www.adityabirlascholars.net'
      },
      {
        title: 'EWS Higher Studies Grant',
        provider: 'Global Foundation for Education',
        amount: 'Full Tuition Waiver',
        description: 'Full college fee support for economically weaker section students showing outstanding promise in commerce, arts, or basic sciences.',
        eligibility: ['Family income below ₹2.5 Lakhs per annum', 'Minimum 75% marks in class 12'],
        category: 'EWS',
        deadline: new Date('2026-07-20'),
        applicationLink: 'https://www.globalfoundationews.org'
      }
    ]);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
