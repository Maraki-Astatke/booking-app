const express = require('express');
const app = express();

const PORT = process.env.PORT || 5001;

app.get('/', (req, res) => {
  res.send('Railway backend is working!');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
});