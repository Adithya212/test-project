
import dotenv from 'dotenv';
import express from 'express';
import fetch from 'node-fetch';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;


const JIRA_EMAIL = 'aadithyasunil488@gmail.com';
const JIRA_API_TOKEN = 'ATATT3xFfGF0u1PUN3MXLZbuGeMIrIz0nuqqNAhqJSmPSXEax6bwZs0s3fKfWxN776fBQ8p9jdLvpxY-h9G1QPfqNff4R_OQqRBnRThewobdRAEFD9HkZeooNd_qBhw8tqJZfwuZFvJe-qBxxNY-P7tOF8RsV3cEiat4amT3InGTnE-TUDA_XHQ=30F6A7EA';
const JIRA_DOMAIN = 'adithya488.atlassian.net';


// const JIRA_EMAIL = process.env.JIRA_EMAIL;
// const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
// const JIRA_DOMAIN = process.env.JIRA_DOMAIN;

app.get('/jira-tasks', async (req, res) => {
    try {
      // Default to "MBA-7" if not specified
      const issueKey = req.query.issue || 'MBA-7';
  
      // Jira API endpoint for searching by JQL
      const jql = `key=${issueKey}`; // filter by specific issue key
      const url = `https://${JIRA_DOMAIN}/rest/api/3/search?jql=${encodeURIComponent(jql)}`;
  
      console.log("Requesting Jira URL:", url);
      console.log("---- DEBUG ----");
      console.log("Issue Key:", issueKey);
      console.log("Jira Domain:", JIRA_DOMAIN);
      console.log("Jira Email:", JIRA_EMAIL);
      console.log("Jira API Token:", JIRA_API_TOKEN ? "Token Loaded" : "Token MISSING");
      console.log("----------------");
  
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString('base64')}`,
          'Accept': 'application/json'
        }
      });
  
      const data = await response.json();
      console.log("Jira raw response:", data);
  
      res.json(data);
  
    } catch (error) {
      console.error("Error fetching Jira task:", error);
      res.status(500).json({ error: error.message });
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Try: http://localhost:${PORT}/jira-tasks?issue=MBA-7`);
  });
