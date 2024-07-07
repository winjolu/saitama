const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors'); // Import cors
const dotenv = require('dotenv');

const app = express();
const port = 5000;
const zapApiKey = process.env.ZAP_API_KEY;

app.use(bodyParser.json());
app.use(cors()); // Use cors

app.get('/api', (req, res) => {
  res.send('Hello from the backend!');
});

app.post('/scan', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).send('URL is required');
  }

  try {
    const startSpiderResponse = await axios.get(`http://localhost:8090/JSON/spider/action/scan/`, {
      params: {
        url,
        maxChildren: 0,
        recurse: true,
        apikey: zapApiKey
      }
    });

    const spiderScanId = startSpiderResponse.data.scan;

    let spiderStatus = '0';
    while (spiderStatus !== '100') {
      const spiderStatusResponse = await axios.get(`http://localhost:8090/JSON/spider/view/status/`, {
        params: { scanId: spiderScanId, apikey: zapApiKey }
      });
      spiderStatus = spiderStatusResponse.data.status;
      console.log(`Spider status: ${spiderStatus}%`);
      if (spiderStatus !== '100') {
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }

    const startScanResponse = await axios.get(`http://localhost:8090/JSON/ascan/action/scan/`, {
      params: {
        url,
        recurse: true,
        inScopeOnly: false,
        apikey: zapApiKey
      }
    });

    const scanId = startScanResponse.data.scan;

    let scanStatus = '0';
    while (scanStatus !== '100') {
      const scanStatusResponse = await axios.get(`http://localhost:8090/JSON/ascan/view/status/`, {
        params: { scanId, apikey: zapApiKey }
      });
      scanStatus = scanStatusResponse.data.status;
      console.log(`Scan status: ${scanStatus}%`);
      if (scanStatus !== '100') {
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }

    const scanResults = await axios.get(`http://localhost:8090/JSON/core/view/alerts/`, {
      params: { baseurl: url, apikey: zapApiKey }
    });

    res.send(scanResults.data.alerts);
  } catch (error) {
    console.error(`Scan failed: ${error.message}`);
    res.status(500).send(`Scan failed: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
