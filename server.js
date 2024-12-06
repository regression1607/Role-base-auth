const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { router: userRoutes } = require('./routes/user'); // Update import statement
const taskRoutes = require('./routes/task'); // Import task routes

const app = express();
const PORT = process.env.PORT || 2000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes); // Add task routes

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/userdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});