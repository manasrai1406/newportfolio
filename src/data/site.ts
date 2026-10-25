// Every piece of personal text and every link lives here.
// Anything in [brackets] is a placeholder still waiting for real data.

export const isPlaceholder = (s: string) => !s || s.trim().startsWith("[");
/** Placeholder URLs render as "#" so they never become broken relative links. */
export const href = (url: string) => (isPlaceholder(url) ? "#" : url);

export const site = {
  name: "Manas Rai",
  title: "Manas Rai | Data Analyst & Solution Consultant",
  description:
    "Data Analyst and Solution Consultant at UKG working with SQL, Power BI, Python and GenAI: dashboards, data validation, reconciliation and AI-assisted automation.",
  // NEXT_PUBLIC_SITE_URL wins if set; otherwise Vercel's production domain, which switches to the
  // custom domain automatically once that's made primary in Vercel.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"),
  email: "mrai73759@gmail.com",
  resumeUrl: "/Manas-Rai-Resume.pdf", // file in public/; the Resume button downloads it
  socials: {
    x: "[X / TWITTER URL]",
    github: "https://github.com/manasrai1406",
    linkedin: "https://www.linkedin.com/in/manasrai1406",
  },
  // Booking page for the "30-minute intro call" card: a Cal.com event link or a Google Calendar
  // appointment-schedule link, with Google Meet set as the location.
  booking: { url: "[BOOKING LINK]", minutes: 30 },
  openToWork: true, // shows the green "Open to opportunities" capsule in the header
  roles: ["Solution Consultant", "Data Analyst", "AI Enthusiast"],
};

export const nav = [
  { label: "Home", href: "#hero" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

// TODO: confirm the final tool list. 6 x 3 grid, the last key has no icon.
export const keyboard: { label: string; icon?: string }[] = [
  { label: "Python", icon: "python" },
  { label: "PostgreSQL", icon: "postgresql" },
  { label: "Pandas", icon: "pandas" },
  { label: "NumPy", icon: "numpy" },
  { label: "Scikit-learn", icon: "scikitlearn" },
  { label: "Jupyter", icon: "jupyter" },
  { label: "PyTorch", icon: "pytorch" },
  { label: "TensorFlow", icon: "tensorflow" },
  { label: "Keras", icon: "keras" },
  { label: "OpenCV", icon: "opencv" },
  { label: "Hugging Face", icon: "huggingface" },
  { label: "Apache Spark", icon: "apachespark" },
  { label: "Plotly", icon: "plotly" },
  { label: "Power BI", icon: "powerbi" }, // hand-drawn glyph; swap for Microsoft's own logo
  { label: "Git", icon: "git" },
  { label: "MySQL", icon: "mysql" },
  { label: "FastAPI", icon: "fastapi" },
  { label: "AI" },
];

export type Job = {
  role: string;
  company: string;
  dates: string;
  points: string[];
  skills: string[];
};

export const experience: Job[] = [
  {
    role: "Solution Consultant I",
    company: "Ultimate Kronos Group (UKG) · Customer Success & Onboarding · Noida",
    dates: "Feb 2025 - Present",
    points: [
      "Designed and built a Power BI productivity dashboard tracking productive vs. non-productive and billable vs. non-billable hours of 120+ employees, pulling Timesheet API data via Dell Boomi and transforming it with SQL.",
      "Drove adoption by 5 managers for work-allocation decisions; the Director used it in team reviews.",
      "Validated and reconciled payroll data across sources with SQL and Excel, improving turnaround time and reducing manual errors.",
      "Ran routine data quality checks on account health: data accuracy, BI security setup, support performance and payroll cycle validation.",
      "Configured payroll taxes, deductions and EEO reporting to take 5+ customers through go-live and their first payroll cycle.",
      "Tracked and resolved escalations, bugs and feature requests in Jira and Salesforce with cross-functional teams.",
    ],
    skills: ["SQL", "Microsoft Excel", "Power BI", "Copilot Studio", "Python", "UKG Pro"],
  },
];

export const skills = {
  // Three marquee rows; each drifts in the opposite direction to the one above.
  marquee: [
    ["SQL", "MySQL", "PostgreSQL", "Microsoft Excel", "Python", "pandas", "Data Validation", "Data Reconciliation"],
    ["Power BI", "Dashboards", "Dell Boomi", "REST APIs", "BI Security Setup", "Jira", "Salesforce", "UKG Pro"],
    ["Machine Learning", "Deep Learning", "NLP", "Text Embeddings", "Prompt Engineering", "GenAI / LLM APIs", "OCR", "Workflow Automation"],
  ],
  categories: [
    {
      title: "Data Analysis & Querying",
      items: ["SQL, MySQL, PostgreSQL", "Python, pandas", "Microsoft Excel", "Data Validation & Reconciliation"],
    },
    {
      title: "Reporting & BI",
      items: ["Power BI dashboards", "Dell Boomi, REST APIs", "BI Security Setup", "Data Accuracy Monitoring"],
    },
    {
      title: "Machine Learning & AI",
      items: ["Machine Learning, Deep Learning, NLP", "Text Embeddings, Prompt Engineering", "GenAI / LLM APIs, OCR", "AI-assisted Workflow Automation"],
    },
    {
      title: "Tools",
      items: ["Power BI, Dell Boomi", "Jira, Salesforce", "UKG Pro", "MySQL, XML, Microsoft Excel"],
    },
  ],
};

export const achievements = [
  {
    tag: "Hackathon",
    title: "Global Nominee, NASA Space Apps Challenge",
    description: "Selected as a global nominee among 200+ teams.",
  },
  {
    tag: "Kaggle",
    title: "Menstrual Health & PCOD Risk Detection Dataset",
    // Stats from Kaggle, Oct 2026; rounded down so the card stays true as they grow.
    description: "8.7K+ views, 1.6K+ downloads and a 10.0 usability score on Kaggle. Published Jan 2024 under MIT.",
    url: "https://www.kaggle.com/datasets/manasrai1406/menstrual-health-and-pcod-risk-detection-dataset",
    linkLabel: "View on Kaggle",
  },
  {
    tag: "Leadership",
    title: "Machine Learning Lead, GDSC KIET",
    description: "Mentored peers through their projects and partnered with other colleges to kickstart AI adoption on campus. Hundreds joined along the way.",
  },
  {
    tag: "Leadership",
    title: "SprintHacks 2.0 Coordinator",
    description: "Led stakeholder coordination for a national hackathon with a 1 crore+ prize pool and 2,000+ attendees.",
  },
  {
    tag: "Hackathon",
    title: "5+ Hackathon Wins",
    description: "Secured winning positions at intra- and inter-college hackathons.",
  },
  {
    tag: "Bootcamp",
    title: "3-Day Machine Learning Bootcamp, GDSC KIET",
    description: "Beginner ML path with a Streamlit demo project. 100+ attendees.",
  },
].map((a: { tag: string; title: string; description: string; url?: string; linkLabel?: string }, i) => ({
  number: String(i + 1).padStart(2, "0"),
  ...a,
}));

export type Project = {
  title: string;
  description: string;
  tags: string[]; // the first tag is shown on the card
  repoUrl: string; // "" when there is no public repo
  liveUrl: string; // "" when there is no live demo
  image: string; // path under public/, e.g. "/projects/parchi.png"; "" shows a placeholder
};

const placeholderProject = (n: string): Project => ({
  title: `[Project ${n}]`,
  description: "[ONE-LINE PROJECT DESCRIPTION]",
  tags: ["[Category]"],
  repoUrl: "[REPO URL]",
  liveUrl: "[LIVE URL]",
  image: "",
});

export const projects: Project[] = [
  {
    title: "Parchi",
    description:
      "GenAI-assisted receipt management: turns PDFs, spreadsheets, scans and photos into validated PostgreSQL records, with OCR, a Redis job queue and plain-English questions over the data.",
    tags: ["GenAI", "Python", "pandas", "OCR", "PostgreSQL", "Redis", "FastAPI"],
    repoUrl: "https://github.com/manasrai1406/parchi",
    liveUrl: "",
    image: "",
  },
  {
    title: "Legacy Report Mapping",
    description:
      "RAG prototype matching legacy client reports to UKG Pro reports with PII masking, OpenAI embeddings and Qdrant; piloted with 30 users, cutting mapping from ~1 hour to ~10 minutes per report.",
    tags: ["RAG", "Python", "OpenAI", "Qdrant"],
    repoUrl: "",
    liveUrl: "",
    image: "",
  },
  placeholderProject("Three"),
  placeholderProject("Four"),
  placeholderProject("Five"),
  placeholderProject("Six"),
];

export const education = [
  {
    degree: "B.Tech, Computer Science",
    institution: "KIET Group of Institutions (AKTU), Ghaziabad",
    grade: "CGPA 8.3",
    years: "Nov 2021 - Jul 2025",
  },
  {
    degree: "Intermediate (Class XII)",
    institution: "CBSE, Varanasi",
    grade: "91.20%",
    years: "Apr 2019 - Apr 2020",
  },
];
