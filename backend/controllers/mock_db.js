export let reports = [

  {
    id: 1,
    title: "Web Application VAPT - Q3 2025",
    client: "ACME Corp",
    status: "Completed",
    pages: [
      { pageId: 101, title: "Cover Page", type: "Front Matter", content: "..." },
      { pageId: 102, title: "Executive Summary", type: "Front Matter", content: "..." },
      { pageId: 103, title: "Scope of Engagement", type: "Front Matter", content: "..." },
      { pageId: 201, title: "SQL Injection", type: "Vulnerability", severity: "Critical", content: "..." },
      { pageId: 202, title: "Cross-Site Scripting (XSS)", type: "Vulnerability", severity: "High", content: "..." },
      { pageId: 203, title: "Server-Side Request Forgery (SSRF)", type: "Vulnerability", severity: "High", content: "..." },
      { pageId: 301, title: "Conclusion", type: "Back Matter", content: "..." },
      { pageId: 302, title: "Recommendations", type: "Back Matter", content: "..." },
    ],
  },


  {
    id: 2,
    title: "Android Mobile App Security Audit - H1 2025",
    client: "FinSecure Bank",
    status: "In Progress",
    pages: [
      { pageId: 101, title: "Cover Page", type: "Front Matter", content: "..." },
      { pageId: 102, title: "Executive Summary", type: "Front Matter", content: "..." },
      { pageId: 201, title: "Insecure Data Storage", type: "Vulnerability", severity: "High", content: "..." },
      { pageId: 202, title: "Improper Platform Usage", type: "Vulnerability", severity: "Medium", content: "..." },
      { pageId: 203, title: "Insecure Communication", type: "Vulnerability", severity: "High", content: "..." },
      { pageId: 301, title: "Conclusion", type: "Back Matter", content: "..." },
    ],
  },


  {
    id: 3,
    title: "Internal Network Penetration Test - Aug 2025",
    client: "Health-First Innovations",
    status: "Pending",
    pages: [
      { pageId: 101, title: "Cover Page", type: "Front Matter", content: "..." },
      { pageId: 102, title: "Scope and Methodology", type: "Front Matter", content: "..." },
      { pageId: 201, title: "Unpatched Systems (MS17-010)", type: "Vulnerability", severity: "Critical", content: "..." },
      { pageId: 202, title: "Weak Password Policies", type: "Vulnerability", severity: "High", content: "..." },
      { pageId: 203, title: "Missing Network Segmentation", type: "Vulnerability", severity: "Medium", content: "..." },
      { pageId: 204, title: "SMB Relay Attacks", type: "Vulnerability", severity: "High", content: "..." },
      { pageId: 301, title: "Summary of Findings", type: "Back Matter", content: "..." },
      { pageId: 302, title: "Strategic Recommendations", type: "Back Matter", content: "..." },
    ],
  },
];