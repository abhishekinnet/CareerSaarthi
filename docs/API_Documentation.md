# API Documentation - CareerSaathi

Base URL: `/api` (local default: `http://localhost:5000/api`)

---

## 1. Authentication Router

### Register User
- **Endpoint**: `POST /auth/register`
- **Access**: Public
- **Body Parameters**:
  ```json
  {
    "name": "Aarav Mehta",
    "email": "aarav@example.com",
    "password": "strong_password_123",
    "role": "student"
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Registration successful. Verification OTP sent to your email.",
    "userId": "usr_6198d02"
  }
  ```

### Verify OTP
- **Endpoint**: `POST /auth/verify-otp`
- **Access**: Public
- **Body Parameters**:
  ```json
  {
    "email": "aarav@example.com",
    "otp": "123456"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "usr_6198d02",
      "name": "Aarav Mehta",
      "email": "aarav@example.com",
      "role": "student"
    }
  }
  ```

### Login User
- **Endpoint**: `POST /auth/login`
- **Access**: Public
- **Body Parameters**:
  ```json
  {
    "email": "aarav@example.com",
    "password": "strong_password_123"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "usr_6198d02",
      "name": "Aarav Mehta",
      "email": "aarav@example.com",
      "role": "student"
    }
  }
  ```

---

## 2. AI & Predictor Services Router

### Predict Career & Generate Roadmap
- **Endpoint**: `POST /ai/predict-career`
- **Access**: Private (Student role)
- **Headers**: `Authorization: Bearer <token>`
- **Body Parameters**:
  ```json
  {
    "interests": ["Coding", "UI/UX Design"],
    "skills": ["JavaScript", "Figma"],
    "academicPerformance": {
      "gradeLevel": "Undergraduate",
      "stream": "Science",
      "percentageOrGpa": 88,
      "favoriteSubjects": ["Computer Science", "Mathematics"]
    },
    "careerGoals": [],
    "financialGoals": {
      "targetSalaryRange": "12-25 LPA",
      "maxHigherEducationBudget": 400000
    }
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "report": {
      "student": "usr_6198d02",
      "inputs": { ... },
      "recommendedCareers": [
        {
          "title": "Full Stack Software Developer",
          "matchPercentage": 92,
          "description": "...",
          "skillsRequired": ["React", "Node.js"],
          "colleges": ["IIT Bombay"],
          "roadmap": [
            {
              "phase": "Phase 1",
              "description": "Learn HTML/CSS",
              "estimatedTime": "6 Months"
            }
          ]
        }
      ]
    }
  }
  ```

### Analyze ATS Resume
- **Endpoint**: `POST /ai/analyze-resume`
- **Access**: Private (Student role)
- **Headers**: `Authorization: Bearer <token>`
- **Content-Type**: `multipart/form-data`
- **Body Parameters**:
  - `resume`: File Binary (PDF/TXT)
  - `targetRole`: string (e.g. "Frontend Engineer")
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "resume": {
      "student": "usr_6198d02",
      "filename": "resume.pdf",
      "atsScore": 80,
      "analysis": {
        "formattingScore": 80,
        "keywordsFound": ["React", "CSS"],
        "missingKeywords": ["Docker"],
        "suggestions": ["Add metrics-based impacts"]
      }
    }
  }
  ```

---

## 3. Mentor Marketplace Router

### Book Mentorship Session
- **Endpoint**: `POST /mentors/book`
- **Access**: Private (Student role)
- **Headers**: `Authorization: Bearer <token>`
- **Body Parameters**:
  ```json
  {
    "mentorId": "men_918231a",
    "slot": "Monday, 14:00 - 15:00",
    "notes": "Would like feedback on my portfolio page layouts."
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Mentorship session booked and payment processed successfully.",
    "bookingId": "bk_192830f"
  }
  ```
