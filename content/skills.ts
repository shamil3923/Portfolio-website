import type { SkillCategory } from "@/lib/types";

/**

* Weights drive type size in the skills sphere:
* 3 = headline capability · 2 = solid · 1 = supporting
  */
  export const skills: SkillCategory[] = [
  {
  id: "agentic-ai",
  name: "Agentic AI & LLMs",
  shortName: "Agentic AI",
  skills: [
  { name: "LangGraph", weight: 3 },
  { name: "MCP", weight: 3 },
  { name: "RAG", weight: 3 },
  { name: "Multi-agent", weight: 3 },
  { name: "n8n", weight: 2 },
  { name: "Microsoft Azure AI Foundry", weight: 2 },
  "LangChain",
  "Agno / Phi",
  "Prompt engineering",
  { name: "Fine-tuning", weight: 1 },
  { name: "Gemini", weight: 1 },
  { name: "OpenAI", weight: 1 },
  ],
  },
  {
  id: "ml-dl",
  name: "Machine Learning & Deep Learning",
  shortName: "ML / DL",
  skills: [
  { name: "PyTorch", weight: 3 },
  { name: "Transformers", weight: 3 },
  "Hugging Face",
  "Scikit-learn",
  "YOLOv8",
  "OpenCV",
  { name: "XGBoost", weight: 1 },
  { name: "LightGBM", weight: 1 },
  ],
  },
  {
  id: "frontend",
  name: "Frontend & AI Apps",
  shortName: "Frontend",
  skills: [
  { name: "React", weight: 2 },
  { name: "JavaScript", weight: 2 },
  { name: "Streamlit", weight: 2 },
  ],
  },
  {
  id: "backend",
  name: "Backend & APIs",
  shortName: "Backend",
  skills: [
  { name: "FastAPI", weight: 3 },
  "Flask",
  "Spring Boot",
  "REST APIs",
  { name: "SQLAlchemy", weight: 1 },
  ],
  },
  {
  id: "data-cloud",
  name: "Data & Cloud",
  shortName: "Data & Cloud",
  skills: [
  { name: "Docker", weight: 3 },
  { name: "PostgreSQL", weight: 3 },
  { name: "AWS", weight: 2 },
  { name: "GCP", weight: 2 },
  "GitHub Actions",
  { name: "MySQL", weight: 1 },
  { name: "MSSQL", weight: 1 },
  ],
  },
  {
  id: "programming",
  name: "Programming",
  shortName: "Languages",
  skills: [
  { name: "Python", weight: 3 },
  "Java",
  { name: "JavaScript", weight: 2 },
  { name: "C", weight: 1 },
  ],
  },
  {
  id: "tools",
  name: "Tools",
  shortName: "Tools",
  skills: [
  "Git",
  "GitHub",
  { name: "VS Code", weight: 1 },
  { name: "IntelliJ", weight: 1 },
  { name: "Jira", weight: 1 },
  { name: "Trello", weight: 1 },
  ],
  },
  ];
