-- CareerSaathi: Database Schema Blueprint (Conceptual SQL Model)

-- Users Table
CREATE TABLE Users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'student' CHECK (role IN ('student', 'mentor', 'admin', 'superadmin')),
    isVerified BOOLEAN DEFAULT FALSE,
    otp VARCHAR(6) DEFAULT NULL,
    otpExpires TIMESTAMP DEFAULT NULL,
    avatar VARCHAR(255) DEFAULT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Students Table
CREATE TABLE Students (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) UNIQUE REFERENCES Users(id) ON DELETE CASCADE,
    interests TEXT, -- JSON Array of interest topics
    skills TEXT, -- JSON Array of skills
    gradeLevel VARCHAR(50),
    stream VARCHAR(50),
    percentageOrGpa DECIMAL(5,2),
    favoriteSubjects TEXT, -- JSON Array of subjects
    targetSalaryRange VARCHAR(50),
    maxHigherEducationBudget DECIMAL(12,2),
    resumeUrl VARCHAR(255) DEFAULT NULL,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Mentors Table
CREATE TABLE Mentors (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) UNIQUE REFERENCES Users(id) ON DELETE CASCADE,
    bio TEXT NOT NULL,
    company VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    specialties TEXT, -- JSON Array of focus areas
    experience INT NOT NULL,
    pricing DECIMAL(10,2) DEFAULT 99.00,
    rating DECIMAL(3,2) DEFAULT 5.00,
    reviewsCount INT DEFAULT 0,
    availability TEXT, -- JSON Array of availability schedules
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'suspended')),
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Scholarships Table
CREATE TABLE Scholarships (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    provider VARCHAR(255) NOT NULL,
    amount VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    eligibility TEXT, -- JSON Array of guidelines
    category VARCHAR(100) NOT NULL,
    deadline TIMESTAMP NOT NULL,
    applicationLink VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings Table
CREATE TABLE Bookings (
    id VARCHAR(36) PRIMARY KEY,
    student_id VARCHAR(36) REFERENCES Users(id) ON DELETE RESTRICT,
    mentor_id VARCHAR(36) REFERENCES Users(id) ON DELETE RESTRICT,
    slot VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    paymentStatus VARCHAR(50) DEFAULT 'pending' CHECK (paymentStatus IN ('pending', 'paid', 'refunded')),
    meetingLink VARCHAR(255) DEFAULT '',
    notes TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments Table
CREATE TABLE Payments (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) REFERENCES Users(id),
    booking_id VARCHAR(36) REFERENCES Bookings(id),
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    transactionId VARCHAR(100) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('success', 'pending', 'failed')),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CareerReports Table
CREATE TABLE CareerReports (
    id VARCHAR(36) PRIMARY KEY,
    student_id VARCHAR(36) REFERENCES Users(id),
    inputs TEXT, -- JSON representation of form data
    recommendedCareers TEXT, -- JSON representation of roadmap and details
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Resumes Table
CREATE TABLE Resumes (
    id VARCHAR(36) PRIMARY KEY,
    student_id VARCHAR(36) REFERENCES Users(id),
    filename VARCHAR(255) NOT NULL,
    fileUrl VARCHAR(255) NOT NULL,
    targetRole VARCHAR(100) DEFAULT 'Software Engineer',
    atsScore INT DEFAULT 0,
    analysis TEXT, -- JSON string detailing warnings and metrics
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Interviews Table
CREATE TABLE Interviews (
    id VARCHAR(36) PRIMARY KEY,
    student_id VARCHAR(36) REFERENCES Users(id),
    role VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'in-progress' CHECK (status IN ('in-progress', 'completed')),
    history TEXT, -- JSON representation of conversation questions & user answers
    overallScore INT DEFAULT 0,
    communicationFeedback TEXT, -- JSON feedback object
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications Table
CREATE TABLE Notifications (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) REFERENCES Users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'info',
    isRead BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
