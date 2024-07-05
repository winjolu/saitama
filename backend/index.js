const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 5000;

app.use(express.json());

app.get('/api', (req, res) => {
  res.send('Hello from the backend!');
});

app.post('/scan', (req, res) => {
  const { url } = req.body;
  exec(`zap-cli quick-scan ${url}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send('Scan failed');
    }
    res.send(stdout);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
