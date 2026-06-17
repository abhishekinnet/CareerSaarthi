# Deployment Guide - CareerSaathi

This guide maps out the environment variables, production build compiling, and cloud deployment steps for the **CareerSaathi** platform.

---

## 1. Environment Variables Configuration

Create a `.env` file inside the `backend/` directory:

```env
# Server Config
PORT=5000
NODE_ENV=production

# Database Config
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/careersaathi?retryWrites=true&w=majority

# Security (Replace with long random hashes)
JWT_SECRET=super_secret_key_production_hash_192830a
JWT_EXPIRE=30d

# LLM APIs Configuration (Provide keys to trigger live AI models)
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here

# Notification Emails (SMTP configuration)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@careersaathi.in
SMTP_PASS=app_password_here
FROM_EMAIL="CareerSaathi Support" <noreply@careersaathi.in>
```

---

## 2. Frontend Deployment - Vercel

1. Log into [Vercel](https://vercel.com).
2. Connect your GitHub repository containing the codebase.
3. Import the `frontend` subfolder.
4. Set the following settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**.

---

## 3. Backend Deployment - Railway / Render

1. Log into [Railway](https://railway.app) or [Render](https://render.com).
2. Create a new service pointing to your repository.
3. Set the root directory configuration to `backend/`.
4. Define the Environment Variables matching the `.env` checklist above.
5. Set start command to `node server.js` or let Railway read the `package.json` configurations.
6. Click **Deploy**.

---

## 4. Local Deployment - Docker Compose

If you have Docker installed, you can bootstrap the database, backend API gateway, and frontend web server instantly:

```bash
# Navigate to the deployment folder
cd CI-CD/deployment

# Build and run containers
docker-compose up --build
```

Access the frontend app at `http://localhost` and API routes at `http://localhost:5000`.
