import type { Profile } from "@/lib/types";

export const profile: Profile = {
  name: "Mohamed Shamil",
  // Selected headline (pipe-separated tagline).
  headline:
    "AI/ML Engineer | Agentic AI, LLM Systems, and Hybrid Reasoning Research",
  shortBio:
    "BSc (Hons) Artificial Intelligence undergraduate building agentic AI systems, LLM-based agents, and production-ready backend services. During a 6-month AI/ML internship I shipped production multi-agent systems using MCP, RAG, and LLM architectures to automate multi-step workflows. I'm currently leading a final-year research project on hybrid LLM–HRM reasoning for interpretable mathematical problem solving.",
  location: "Kurunegala, Sri Lanka",
  email: "mrmshamil1786@gmail.com",
  phone: "+94 762 859 696",
  // Served from /public - the file recruiters download.
  resumeUrl: "/MRM_Shamil_AI.pdf",
  domain: "https://shamil.me",
  positioning: [
    "I build agentic systems and LLM applications , multi-agent orchestration, tool-enabled workflows, and retrieval-grounded agents that run in production.",
    "I research hybrid LLM + HRM reasoning for interpretable, auditable multi-step mathematical problem solving.",
    "I ship the whole stack: backend services, APIs, infrastructure, and deployment - not just notebooks and prototypes.",
  ],
  stats: [
    { value: "6 mo", label: "AI/ML engineering internship", note: "CodeGen International" },
    { value: "Multi-agent", label: "systems shipped to production" },
    { value: "LLM + HRM", label: "final-year research focus" },
    { value: "2026", label: "BSc (Hons) AI, expected" },
  ],
  researchInterests: [
    "Hierarchical Reasoning Models",
    "LLMs for mathematical reasoning",
    "Agentic AI systems",
    "Multi-agent orchestration",
    "Graph-based reasoning pipelines",
    "Interpretable AI for multi-step problem solving",
  ],
  languages: [
    { name: "Tamil", level: "Native" },
    { name: "English", level: "Fluent" },
    { name: "Sinhala", level: "Fluent" },
  ],
  involvement: [
    "IEEE Student Member, University of Moratuwa",
    "Company Coordinator, Career Fair 2024, University of Moratuwa",
    "Participant, MoraXtreme 8.0 and CodeRush 2023",
  ],
  certifications: [
    "Python for Beginners - University of Moratuwa",
    "Python Intermediate",
    "Introduction to Generative AI - Coursera",
    "Introduction to LLMs",
    "Prompt Engineering",
    "Introduction to Java",
    "Java Intermediate",
  ],
};
