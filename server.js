const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Structure Active'))
  .catch(err => console.error('Database connection error:', err));

// Route Definitions
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/trips', require('./routes/trips.js'));

app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server executing on port ${PORT}`));
}

module.exports = app;