
import axios from "axios";

const JIRA_EMAIL = 'aadithyasunil488@gmail.com';
const JIRA_API_TOKEN = ' ATATT3xFfGF0zmZ-qvoZqD-UNIJb7xwUPTO5d-TFklRefhHHzKlMREVb-wyrRScUugScKov7C4Iv_tua4DPejzJ75Ssi2i0nBIbSGSKZ2r04QxbD61mcbWDqX2ESj2SMhXoVyZY-0qcLlL8CIoZxRCiAOi8lpvbRi2Hm5_IMRIcmCkhgQ_QGUyQ=729EEF18';
const JIRA_DOMAIN = 'adithya488.atlassian.net';
const PROJECT_KEY = "MBA";

(async () => {
  try {
    console.log("---- DEBUG ----");
    console.log("Project Key:", PROJECT_KEY);
    console.log("Jira Domain:", JIRA_DOMAIN);
    console.log("Jira Email:", JIRA_EMAIL);
    console.log("Jira API Token:", JIRA_API_TOKEN ? "Token Loaded" : "Token MISSING");
    console.log("----------------");

    const url = `https://${JIRA_DOMAIN}/rest/api/3/search`;

    const jqlQuery = `project = "${PROJECT_KEY}"`;
    const response = await axios.get(
        `https://${JIRA_DOMAIN}/rest/api/3/search`,
        {
          params: { jql: `project = "${PROJECT_KEY}"` },
          headers: {
            "Authorization": `Basic ${Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString("base64")}`
          }
        }
      );
      

    console.log("✅ Success:", JSON.stringify(response.data, null, 2));
  } catch (error) {
    if (error.response) {
      console.error("❌ Error:", error.response.status, JSON.stringify(error.response.data, null, 2));
    } else {
      console.error("❌ Error:", error.message);
    }
  }
})();




// import dotenv from 'dotenv';
// import express from 'express';

// import fetch from 'node-fetch';


// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Load credentials from .env
// const JIRA_EMAIL = process.env.JIRA_EMAIL;
// const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
// const JIRA_DOMAIN = process.env.JIRA_DOMAIN;

// // Middleware for CORS (if needed for browser requests)
// // app.use(cors());
// app.get('/jira-tasks', async (req, res) => {
//     try {
//       const projectParam = (req.query.project || 'MBA').trim();
  
//       // ---- Auth headers once ----
//       const authHeader = {
//         'Authorization': `Basic ${Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString('base64')}`,
//         'Accept': 'application/json'
//       };
  
//       // Build JQL robustly:
//       // - If user passes a number (projectId), look up project and use its KEY
//       // - If user passes an UPPERCASE key (MBA, LEARNJIRA), use it directly
//       // - Otherwise treat it as a project NAME and quote it
//       let jql;
//       if (/^\d+$/.test(projectParam)) {
//         // numeric -> resolve to key
//         const projResp = await fetch(`https://${JIRA_DOMAIN}/rest/api/3/project/${projectParam}`, { headers: authHeader });
//         if (!projResp.ok) {
//           const errText = await projResp.text();
//           return res.status(projResp.status).json({ step: 'resolve-project-id', error: errText });
//         }
//         const proj = await projResp.json();
//         jql = `project=${proj.key}`;
//       } else if (/^[A-Z][A-Z0-9_]*$/.test(projectParam)) {
//         // looks like a key
//         jql = `project=${projectParam}`;
//       } else {
//         // treat as name
//         jql = `project="${projectParam}"`;
//       }
  
//       // Send JQL in POST body (no URL encoding weirdness)
//       const searchResp = await fetch(`https://${JIRA_DOMAIN}/rest/api/3/search`, {
//         method: 'POST',
//         headers: {
//           ...authHeader,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           jql,
//           maxResults: 50,
//           fields: ['summary', 'status', 'issuetype', 'assignee', 'priority', 'created', 'updated', 'project']
//         })
//       });
  
//       const data = await searchResp.json();
  
//       if (!searchResp.ok) {
//         // Return Jira’s own error so you can see the exact reason, not a generic 400
//         return res.status(searchResp.status).json({ jql, ...data });
//       }
  
//       return res.json({
//         jql,
//         total: data.total || 0,
//         issues: data.issues || []
//       });
//     } catch (err) {
//       return res.status(500).json({ error: err.message });
//     }
//   });
  

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
//   console.log(`Try: http://localhost:${PORT}/jira-tasks?project=YOURPROJECTKEY`);
// });
// import dotenv from 'dotenv';
// import express from 'express';
// import fetch from 'node-fetch';

// dotenv.config();


// const app = express();
// const PORT = process.env.PORT || 3000;


// const JIRA_EMAIL = 'aadithyasunil488@gmail.com';
// const JIRA_API_TOKEN = ' ATATT3xFfGF0zmZ-qvoZqD-UNIJb7xwUPTO5d-TFklRefhHHzKlMREVb-wyrRScUugScKov7C4Iv_tua4DPejzJ75Ssi2i0nBIbSGSKZ2r04QxbD61mcbWDqX2ESj2SMhXoVyZY-0qcLlL8CIoZxRCiAOi8lpvbRi2Hm5_IMRIcmCkhgQ_QGUyQ=729EEF18';
// const JIRA_DOMAIN = 'adithya488.atlassian.net';

// // const JIRA_EMAIL = process.env.JIRA_EMAIL;
// // const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
// // const JIRA_DOMAIN = process.env.JIRA_DOMAIN;
// app.get('/jira-tasks', async (req, res) => {
//     try {
//       const projectKey = req.query.project || 'MBA';
//       const jql = `project=${projectKey}`;
//     //   const url = `https://${JIRA_DOMAIN}/rest/api/3/search?jql=${encodeURIComponent(jql)}`;
//     const url = 'https://adithya488.atlassian.net/rest/api/3/search?jql=project=MBA';
  
//       console.log("Requesting Jira URL:", url);
//       console.log("---- DEBUG ----");
//       console.log("Project Key:", projectKey);
//       console.log("Jira Domain:", JIRA_DOMAIN);
//       console.log("Jira Email:", JIRA_EMAIL);
//       console.log("Jira API Token:", JIRA_API_TOKEN ? "Token Loaded" : "Token MISSING");
//       console.log("----------------");
//       const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Basic ${Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString('base64')}`,
//           'Accept': 'application/json'
//         }
//       });
  
//       const data = await response.json();
//       console.log("Jira raw response:", data); // 👈 log full response
  
//       res.json(data);
  
//     } catch (error) {
//       console.error("Error fetching Jira tasks:", error);
//       res.status(500).json({ error: error.message });
//     }
//   });
  
  
  
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
//   console.log(`Try: http://localhost:${PORT}/jira-tasks?project=YOURPROJECTKEY`);
// });
