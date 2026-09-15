import type { Project } from "@/lib/types";

/**
 * All project content lives here.
 * `featured: true` surfaces a project as an interactive case study on the home page
 * and generates a /projects/[slug] detail route.
 *
 * TODO: replace every `links` placeholder with real GitHub / live / paper URLs.
 */
export const projects: Project[] = [
  {
    slug: "hybrid-llm-hrm-reasoning",
    title: "Hybrid Architecture of LLM and HRM for Multi-Step Mathematical Reasoning",
    tagline:
      "An interpretable reasoning pipeline that turns math word problems into auditable, step-by-step solutions.",
    type: "Final-Year Research Project",
    period: "2025 – Present",
    context: "University of Moratuwa",
    advisor: "Dr. Romesh Thanuja",
    domain: "Research",
    problem:
      "Standard LLMs and standalone reasoning models can reach correct answers but rarely expose interpretable, auditable multi-step mathematical reasoning — making errors hard to localize and trust hard to earn.",
    solution:
      "I designed an end-to-end hybrid reasoning pipeline that combines an LLM parser, a graph-based bridge encoder, an HRM core with Adaptive Computation Time (ACT) halting, and an LLM explanation module — so every solution carries a decoded, step-by-step trace.",
    details: [
      "Convert free-form math word problems into structured dependency graphs with intermediate arithmetic traces.",
      "Implement HRM high-level and low-level transformer modules for hierarchical reasoning.",
      "Build a graph attention encoder as the bridge between the LLM parse and the HRM core.",
      "Add a digit-head decoder for numeric outputs and an LLM explainer for natural-language justifications.",
      "Engineer the full PyTorch training pipeline with ACT halting diagnostics.",
    ],
    dataset:
      "Trained on GSM8K (7,473 train / 1,319 test). Target: ≥ 40% exact-match accuracy vs. standalone baselines [TARGET — to be validated]. Interpretability measured via per-step decoded values, halt-step diagnostics, and LLM-as-judge explanation coherence.",
    stack: ["PyTorch", "HRM", "Graph Attention Networks", "NVIDIA NIM", "Transformers"],
    impact:
      "Demonstrates a path toward reasoning systems whose intermediate steps are decodable and verifiable, not just final-answer accurate.",
    featured: true,
    links: {
      // TODO: add paper / repo when available.
      paper: "",
      github: "",
    },
    caseStudy: [
      {
        heading: "Why hybridize at all?",
        body: "LLMs are strong parsers and explainers but weak, opaque calculators. HRMs offer structured, halting-aware computation but lack natural-language grounding. The hybrid treats each model as a specialist: the LLM reads and explains, the HRM reasons and computes, and a graph encoder is the contract between them.",
      },
      {
        heading: "The interpretability contract",
        body: "Every problem becomes a dependency graph of sub-results. Because the HRM decodes intermediate values at each halt step, a wrong final answer can be traced to the exact step that diverged — turning a black box into an auditable trace.",
      },
      {
        heading: "Evaluation philosophy",
        body: "Accuracy alone is insufficient for a reasoning claim. Alongside exact-match on GSM8K, the project scores per-step value correctness, halt-step behavior under ACT, and explanation coherence via an LLM-as-judge protocol.",
      },
    ],
  },
  {
    slug: "multi-agent-hospital-system",
    title: "AI-Driven Multi-Agent Hospital Management System",
    tagline:
      "Specialized LLM agents orchestrated with LangGraph to coordinate hospital operations end to end.",
    type: "Project",
    period: "2025",
    domain: "Agentic AI",
    problem:
      "Hospital operations — patient admission, bed assignment, staff allocation — require coordination across multiple workflows that are slow and error-prone when handled manually.",
    solution:
      "I architected a multi-agent automation system in which specialized LLM agents, orchestrated with LangGraph, coordinate hospital operations through a shared set of tool interfaces.",
    details: [
      "Implemented MCP / FastMCP interfaces to expose hospital operations as standardized AI tools.",
      "Built backend services with FastAPI and SQLAlchemy REST APIs.",
      "Orchestrated specialized agents with LangGraph for multi-step coordination.",
      "Automated build, test, and AWS deployment via GitHub Actions CI/CD.",
    ],
    stack: ["Python", "FastAPI", "LangGraph", "MCP", "FastMCP", "Docker", "AWS"],
    impact:
      "Demonstrates agent orchestration, tool-enabled AI workflows, and production-minded backend design.",
    featured: true,
    links: {
      // TODO: add repo / demo.
      github: "",
    },
  },
  {
    slug: "whatsapp-sales-agent",
    title: "WhatsApp Sales Agent — AI Conversational Commerce",
    tagline:
      "An autonomous conversational agent for product discovery and recommendation over WhatsApp.",
    type: "Project",
    period: "2025",
    domain: "Conversational AI",
    problem:
      "Conversational product discovery on messaging platforms needs persistent context and actionable recommendations — not stateless one-shot replies.",
    solution:
      "I built an autonomous conversational sales agent on Google Gemini for WhatsApp-based product recommendation and customer interaction, with memory and tool use.",
    details: [
      "Engineered conversation memory, user profiling, and message classification.",
      "Implemented session persistence and a real-time currency-converter tool.",
      "Deployed through a Flask webhook integrated with the Meta WhatsApp Business API.",
    ],
    stack: ["Python", "Google Gemini", "Flask", "Phi Agent Framework", "WhatsApp Business API"],
    impact: "Demonstrates applied conversational AI and tool-augmented commerce workflows.",
    featured: true,
    links: {
      // TODO: add repo / demo.
      github: "",
    },
  },
  {
    slug: "carbon-footprint-monitoring",
    title: "AI-Assisted Carbon Footprint Monitoring System",
    tagline:
      "ML-assisted emissions analytics across a food supply chain, built in a Sysco Labs-mentored team.",
    type: "Project",
    period: "Nov 2023 – Jul 2024",
    domain: "Applied ML",
    problem:
      "Food supply-chain emissions data is difficult to analyze and operationalize into sustainability insights.",
    solution:
      "I developed an ML-assisted carbon footprint monitoring system in a Sysco Labs-mentored team, combining models, backend services, and an interactive dashboard.",
    details: [
      "Trained Scikit-learn models on cleaned, feature-engineered emissions data.",
      "Built backend microservices for vendor and product management.",
      "Built interactive visualization components for the emissions dashboard.",
    ],
    stack: ["Scikit-learn", "React", "Node.js", "Spring Boot", "GCP"],
    impact: "Combined ML, backend services, and dashboard visualization in a sustainability use case.",
    featured: false,
    links: {
      github: "",
    },
  },
  {
    slug: "ats-resume-tracker",
    title: "ATS Resume Tracking System",
    tagline: "An LLM-powered resume evaluator that scores fit and suggests targeted improvements.",
    type: "Project",
    period: "2024",
    domain: "LLM Apps",
    problem: "Job seekers need clearer visibility into how their resumes match a job description.",
    solution:
      "I built an LLM-powered resume evaluation app that computes match scores, flags missing keywords, and generates targeted improvement suggestions.",
    details: [
      "Computed resume-to-JD match scoring with the Gemini API.",
      "Flagged missing keywords and generated improvement suggestions.",
      "Deployed as a self-service Streamlit web app for live analysis.",
    ],
    stack: ["Python", "Streamlit", "Google Gemini API"],
    impact: "Deployed as a self-service web app for live resume analysis.",
    featured: false,
    links: {
      github: "",
    },
  },
  {
    slug: "weapon-detection-fuzzy",
    title: "Fuzzy-Enhanced Real-Time Place Recognition and Weapon Detection",
    tagline: "A surveillance system that pairs YOLOv8 detection with a fuzzy-logic reliability layer.",
    type: "Project",
    period: "2024",
    domain: "Computer Vision",
    problem:
      "Real-time surveillance models lose reliability under uncertainty — lighting changes, occlusions, and camera-angle variation.",
    solution:
      "I built a real-time surveillance system combining YOLOv8 object detection with a fuzzy-logic reliability layer for robust perception under uncertainty.",
    details: [
      "Ran YOLOv8 for real-time weapon detection.",
      "Added a fuzzy-logic layer to score detection reliability.",
      "Used Places365 for scene/place recognition and OpenCV for the vision pipeline.",
    ],
    stack: ["Python", "YOLOv8", "Fuzzy Logic", "Places365", "OpenCV"],
    impact: "Focused on robust perception under uncertainty.",
    featured: false,
    links: {
      github: "",
    },
  },
  {
    slug: "obesity-classification",
    title: "Obesity Classification Prediction",
    tagline: "Benchmarked gradient-boosting classifiers to predict obesity levels from medical data.",
    type: "Project",
    period: "2024",
    domain: "Applied ML",
    problem:
      "Predicting obesity levels from medical indicators needs a model that balances accuracy with reliable generalization.",
    solution:
      "I built and benchmarked gradient-boosting classifiers, using hyperparameter tuning to select the strongest-performing model.",
    details: [
      "Trained and compared XGBoost, LightGBM, and Decision Tree classifiers.",
      "Tuned hyperparameters to maximize validated accuracy.",
      "Selected the best model by cross-validated performance.",
    ],
    stack: ["Python", "Scikit-learn", "XGBoost", "LightGBM"],
    impact: "A clean, reproducible benchmarking workflow for tabular medical classification.",
    featured: false,
    links: {
      github: "",
    },
  },
  {
    slug: "autonomous-chessboard",
    title: "Autonomous Chessboard — Hardware/Software Integration",
    tagline: "An AI-assisted autonomous chessboard with a real-time move-display subsystem.",
    type: "Project",
    period: "2022 – 2023",
    domain: "Embedded Systems",
    problem:
      "An autonomous chessboard requires tight coordination between sensing, decision logic, and a responsive physical display.",
    solution:
      "I co-built an AI-assisted autonomous chessboard, delivering the real-time LCD move-display subsystem and contributing to hardware-software integration and testing.",
    details: [
      "Built the real-time LCD move-display subsystem.",
      "Contributed to hardware-software integration across the board.",
      "Ran integration testing of the combined system.",
    ],
    stack: ["Embedded Systems", "C", "Hardware Integration"],
    impact: "Hands-on systems engineering across the hardware/software boundary.",
    featured: false,
    links: {},
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
