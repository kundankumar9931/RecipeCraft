require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');

const { connectDB, disconnectDB } = require('./config/database');
const config = require('./config/env');
const { errorHandler } = require('./middleware/errorHandler');

// Import routes
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const mealPlanRoutes = require('./routes/mealPlanRoutes');

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketIO(server, {
  cors: {
    origin: config.corsOrigin,
    credentials: true,
  },
});

// Middleware
app.use(compression()); // Compress responses
app.use(morgan('dev')); // Logging
app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

// Session middleware
app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: config.nodeEnv === 'production',
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
  })
);

// ==================== Socket.IO Setup ====================

// Store active users
const activeUsers = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // User joins
  socket.on('user-join', (userId) => {
    activeUsers.set(socket.id, userId);
    io.emit('user-status', {
      event: 'user-joined',
      totalActive: activeUsers.size,
      userId,
    });
  });

  // Recipe shared
  socket.on('share-recipe', (data) => {
    io.emit('recipe-shared', {
      from: data.userId,
      recipe: data.recipe,
      timestamp: new Date(),
    });
  });

  // Meal plan shared
  socket.on('share-meal-plan', (data) => {
    io.emit('meal-plan-shared', {
      from: data.userId,
      mealPlan: data.mealPlan,
      timestamp: new Date(),
    });
  });

  // Chat message
  socket.on('chat-message', (data) => {
    io.emit('message-broadcast', {
      userId: data.userId,
      message: data.message,
      timestamp: new Date(),
    });
  });

  // Real-time notifications
  socket.on('send-notification', (data) => {
    io.emit('notification', {
      from: data.userId,
      message: data.message,
      type: data.type,
      timestamp: new Date(),
    });
  });

  // User disconnects
  socket.on('disconnect', () => {
    const userId = activeUsers.get(socket.id);
    activeUsers.delete(socket.id);
    console.log('User disconnected:', socket.id);
    io.emit('user-status', {
      event: 'user-left',
      totalActive: activeUsers.size,
      userId,
    });
  });
});

// ==================== API Routes ====================

app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/meal-plans', mealPlanRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date(),
  });
});

// Serve static assets in production
if (config.nodeEnv === 'production') {
  const path = require('path');
  app.use(express.static(path.join(__dirname, '../../my-app/build')));

  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api/')) {
      res.sendFile(path.resolve(__dirname, '../../', 'my-app', 'build', 'index.html'));
    } else {
      res.status(404).json({
        success: false,
        message: 'API Route not found',
      });
    }
  });
}

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// ==================== Start Server ====================

const PORT = config.port;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start HTTP server
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${config.nodeEnv}`);
      console.log(`Socket.IO listening on ${config.corsOrigin}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(async () => {
    console.log('HTTP server closed');
    await disconnectDB();
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(async () => {
    console.log('HTTP server closed');
    await disconnectDB();
    process.exit(0);
  });
});

// Start the server
startServer();

module.exports = { app, server, io };
