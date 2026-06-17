require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');

const authRoutes = require('./src/routes/auth.routes');
const aiRoutes = require('./src/routes/ai.routes');
const mentorRoutes = require('./src/routes/mentor.routes');
const scholarshipRoutes = require('./src/routes/scholarship.routes');
const adminRoutes = require('./src/routes/admin.routes');
const errorHandler = require('./src/middleware/error');

const app = express();
const server = http.createServer(app);

// Socket.io integration for chat
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Create uploads and logs directories if not exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Serving Static Uploads
app.use('/uploads', express.static(uploadsDir));

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Routes mounting
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/scholarships', scholarshipRoutes);
app.use('/api/admin', adminRoutes);

// Base Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to CareerSaathi AI API' });
});

// Error handling middleware
app.use(errorHandler);

// Socket.io connection mapping
io.on('connection', (socket) => {
  console.log('New Socket.io client connected: ', socket.id);

  socket.on('join_room', ({ roomId }) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  socket.on('send_message', ({ roomId, sender, message }) => {
    io.to(roomId).emit('new_message', { sender, message, timestamp: new Date() });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected: ', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/careersaathi';

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('MongoDB Atlas Connected Successfully');
    server.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed. Running server in offline-mock mode.', err.message);
    // Graceful fallback for testing without running Mongo local server
    server.listen(PORT, () => {
      console.log(`Server running without database (mock-mode) on port ${PORT}`);
    });
  });
