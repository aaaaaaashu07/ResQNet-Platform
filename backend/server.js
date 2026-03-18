require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const apiRoutes = require('./routes/api');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

app.use(cors());
app.use(express.json({ limit: '10mb' })); // Allow robust payload sizes for base64 photo uploads

// Optional: Graceful fallback if MongoDB is not running locally.
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected to', process.env.MONGO_URI))
  .catch(err => console.error('MongoDB connection error (ensure mongodb is running natively!):', err.message));

// Bind socket io to req to use within routes (for broadcasting updates)
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Assign routing
app.use('/api', apiRoutes);

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`ResQNet backend API running on port ${PORT}`);
});
