// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const reportRoutes = require('./routes/reportRoutes');
const templateRoutes = require('./routes/templateRoutes');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory data store for development purposes
const inMemoryDB = {
  'web-vulnerabilities': [],
  'network-vulnerabilities': [],
  'report-details': {
    web: {},
    network: {},
  },
  'templates': [],
};

// Use routes
app.use('/api', reportRoutes(inMemoryDB));
app.use('/api', templateRoutes(inMemoryDB));

app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});
