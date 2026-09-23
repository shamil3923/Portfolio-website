import type { Project } from "@/lib/types";

/**
 * All project content lives here.
 * `featured: true` surfaces a project as an interactive case study on the home page
 * and generates a /projects/[slug] detail route.
 *
 * Preview images live in /public/projects and are referenced by `image`.
 */
export const projects: Project[] = [
  {
    slug: "hybrid-llm-hrm-reasoning",
    title: "Hybrid Architecture of LLM and HRM for Multi-Step Mathematical Reasoning",
    tagline:
      "The language model translates; a learned executor does the arithmetic - so every answer carries a verifiable trace.",
    type: "Final-Year Research Project",
    period: "2025 – Present",
    context: "University of Moratuwa",
    advisor: "Dr. Romesh Thanuja",
    domain: "Research",
    problem:
      "A model that reaches the right answer has not necessarily done the reasoning. Its steps are prose, not computation - so a wrong answer cannot be localised, and a right one cannot be verified.",
    solution:
      "I split the two apart: the LLM parses a word problem into a JSON trace of arithmetic steps and never does the math, while a register-based executor runs each step through HRM primitives that learned integer arithmetic digit by digit.",
    details: [
      "Parse problems into JSON arithmetic traces, keeping one only if it re-executes to the gold answer with every operand grounded in the text.",
      "Train HRM primitives for add, sub, mul and div. Untrained-cell control: trained 10,000/10,000, five random initialisations 0.00% - the arithmetic is learned, not structural.",
      "Make explanations faithful by construction - the narrator sees only the executor's steps, and a narration is accepted only if it parses back to the same sequence.",
      "Verify adaptive computation on GCD: a validation-driven halting rule tracks difficulty at Pearson r = 0.811, against 0.340 for naive PonderNet.",
    ],
    dataset:
      "Paired against CoT, PAL and PoT on the complete GSM8K (n = 1,319) and GSM8K-Platinum (n = 1,209) test sets, McNemar with Holm correction. The pipeline scores 81.12% and 84.28% against CoT's 93.33% and 96.69% - 12.21 pp behind. On gold traces the executor is exact, and stays exact at 24-digit operands, five times its training range.",
    stack: ["PyTorch", "HRM", "GSM8K", "gpt-4o-mini", "Transformers"],
    impact:
      "A measured account of what verifiability costs: the executor emits no tokens and never approximates, and the pipeline still trails chain-of-thought by 12 points. Both halves are the result.",
    featured: true,
    image: "/projects/hybrid-llm-hrm-reasoning.jpg",
    imageAlt:
      "Architecture diagram of the hybrid LLM + HRM reasoning pipeline: word problem into an LLM parser producing a JSON trace, a bridge into tensors, an HRM executor running each arithmetic step, and an explanation module narrating the executor's steps.",
    links: {
      github: "https://github.com/shamil3923/Research_HRM-LLM",
      // TODO: add the paper link once published.
      paper: "",
    },
    caseStudy: [
      {
        heading: "Where it loses, stated plainly",
        body: "81.12% against chain-of-thought's 93.33% on the same problems: 185 discordant pairs to 24, at 13.2× the tokens. A hybrid that is slower, dearer and less accurate has to justify itself on something other than the headline number.",
      },
      {
        heading: "What the trace buys",
        body: "The executor holds 100% at 24-digit operands, where the parallel variant collapses from 96.4% at 5 digits to 5.3% at 11. Explanations are parsed back and checked against its steps, so a fluent account of a computation that never happened is rejected, not scored.",
      },
    ],
  },
  {
    slug: "enterprise-ai-support-platform",
    title: "Enterprise AI Support Intelligence & Resolution Platform",
    tagline:
      "Support automation that routes every ticket to automate, assist, or escalate - with authorisation held in code, not in the prompt.",
    type: "Project",
    period: "2025",
    domain: "Agentic AI",
    problem:
      "Support automation fails in two directions: it answers confidently from nothing, or it is handed authority it should never hold. A model that can draft a refund explanation and also issue the refund is one prompt injection away from moving money.",
    solution:
      "I built a platform that reads a ticket, retrieves grounded evidence, decides eligibility with deterministic rules, scores its own uncertainty, and routes to AUTOMATE / ASSIST / ESCALATE with an audit trail behind each decision. Money-moving actions are EXECUTE-tier and unreachable by the agent at the registry, not by instruction.",
    details: [
      "Hybrid retrieval - dense embeddings plus BM25 fused with Reciprocal Rank Fusion - with claim-by-claim groundedness checks, so an unsupported figure fails the sentence.",
      "A bounded ReAct loop over 15 tools, each carrying a JSON Schema, a permission tier and a reversibility flag.",
      "Eligibility written as ordinary Python against real records, returning four outcomes including INSUFFICIENT_DATA - deliberately distinct from evaluated and refused.",
      "A perimeter of HMAC-SHA256 webhook verification over raw bytes, idempotency keys, ownership checks and an append-only audit trail.",
    ],
    dataset:
      "Every figure comes from running the live pipeline - a test asserts no metric literals survive in the evaluator - and 176 tests run offline with the LLM stubbed. The repository states the caveat up front: the benchmark is synthetic and self-generated, so retrieval scores are an upper bound and the decision metric measures conformance to the documented rules, not whether those rules are right.",
    stack: ["Python", "FastAPI", "RAG", "Qdrant", "PostgreSQL", "n8n", "Docker", "NVIDIA NIM"],
    impact:
      "A working answer to the question agentic systems usually dodge: what the model is structurally forbidden to do, and what happens when it does not know.",
    featured: true,
    image: "/projects/enterprise-ai-support-platform.jpg",
    imageAlt:
      "Architecture diagram of the policy-gated AI ticket-resolution platform: hybrid retrieval, rerank, bounded ReAct agent, claim-level groundedness check, deterministic policy gate, tool authorisation layer and audit log.",
    links: {
      github:
        "https://github.com/shamil3923/Enterprise-AI-Support-Intelligence-Resolution-Platform",
    },
    caseStudy: [
      {
        heading: "The line the model cannot cross",
        body: "Permission tiers grant READ and WRITE to the agent, and EXECUTE only to a human or an approval workflow. A prompt-injected instruction to refund $10,000 is rejected at the registry - it never becomes a judgement call for the model.",
      },
      {
        heading: "Abstention as a feature",
        body: "When the sources do not support an answer, generation abstains and the ticket escalates. With no credential at all the platform still runs end to end on deterministic local providers, and still abstains rather than fabricating.",
      },
    ],
  },
  {
    slug: "multi-agent-hospital-system",
    title: "AI-Driven Multi-Agent Hospital Management System",
    tagline:
      "Policy-gated LLM agents for hospital operations - where the model plans, but deterministic code authorizes.",
    type: "Project",
    period: "2025",
    domain: "Agentic AI",
    problem:
      "An LLM agent that can call hospital tools can also delete patient records, discharge beds, and read clinical notes. The question isn't whether the model is usually right; it's what happens on the occasions it isn't.",
    solution:
      "I built a guarded execution layer: the LLM proposes, a deterministic policy engine decides, a canonical registry dispatches. Then I benchmarked whether that separation was actually necessary - or just defensive architecture.",
    details: [
      "A canonical registry of 26 policy-gated tools across 5 roles. A client string is only ever a dictionary key, never reflection; a tool missing a binding, policy or schema stops the server starting.",
      "A deterministic policy engine - allow / deny / confirm / human approval over four risk tiers, failing closed. Decisions depend on role and tool only, so injected text in an argument cannot move one.",
      "Approval as a genuine LangGraph interrupt, verified by killing the process mid-run and resuming in a new one, where the tool executed exactly once. Grants are bound to a hash of the arguments.",
      "A 13-stage PostgreSQL audit lifecycle that refuses unauditable actions rather than performing them, with row-level locking held under 8-way bed and 12-thread inventory contention.",
      "355 tests passing on the declared lockfile - which caught a container that would have crashed on import, because Docker and CI re-resolved from the manifest and ignored the lockfile.",
    ],
    dataset:
      "A 19-scenario adversarial benchmark records 15 breaches against the legacy path and 0 against the guarded one. Given an unscoped tool menu, the planner proposed tools the caller's role could not use in 29 of 31 restricted cases, and 0 under role-scoped menus. A 238-scenario ablation raised planner accuracy from 0.600 to 0.783, almost entirely through better abstention.",
    stack: ["Python", "FastAPI", "LangGraph", "MCP", "PostgreSQL", "Docker", "AWS"],
    impact:
      "The claim worth making isn't that the agent behaves - it's that misbehaviour is structurally contained, with a benchmark on both sides of the boundary to show it.",
    featured: true,
    image: "/projects/multi-agent-hospital-system.jpg",
    imageAlt:
      "Architecture diagram of the multi-agent hospital management system: an operations request into a LangGraph orchestrator coordinating admission, bed assignment and staff allocation agents, dispatched through a governed MCP tool interface layer onto FastAPI and SQLAlchemy backend services, with automated CI/CD to AWS.",
    links: {
      github: "https://github.com/arivanan0218/hospital-management-system",
    },
    caseStudy: [
      {
        heading: "The boundary wasn't where the architecture implied",
        body: "The HTTP endpoint bypassed the MCP registry, resolving client-supplied strings onto agent methods by reflection - so the reachable surface was every public method on every agent. No authentication, unrecognised arguments dropped silently, failures returned as HTTP 200, and success written to the audit log before the result was checked.",
      },
      {
        heading: "Testing whether the guard was necessary",
        body: "Defensive architecture is easy to justify and hard to falsify, so it got a benchmark. Unscoped, the planner reached for role-forbidden tools in 29 of 31 restricted cases; role-scoped, zero. The apparent safety was a property of the menu, not the model.",
      },
    ],
  },
  {
    slug: "whatsapp-sales-agent",
    title: "WhatsApp Sales Agent - AI Conversational Commerce",
    tagline:
      "A grounded product-discovery agent over WhatsApp, with its retrieval strategy chosen from measurement rather than default.",
    type: "Project",
    period: "2025",
    domain: "Conversational AI",
    problem:
      "Product discovery over messaging needs more than stateless replies: the agent has to hold context, retrieve from a structured catalog, tell an in-catalog request apart from one it cannot serve, and stay reliable while several users write at once.",
    solution:
      "I built a WhatsApp agent on Gemini 2.0 Flash with agent-tool-based RAG over a seeded 200-SKU catalog, persistent SQLite conversation memory, and authenticated webhook handling through the Meta WhatsApp Business API.",
    details: [
      "Replaced the JSON conversation store with SQLite, preserving all 200/200 messages under 20-writer concurrency where the previous implementation lost 190.",
      "Benchmarked four retrieval strategies over a 100-query labelled set, which is what motivated routing by query type rather than picking one retriever.",
      "Scored out-of-catalog behaviour on both sides of the trade-off - useful abstention against false abstention - rather than assuming retrieval confidence was enough.",
      "Hardened the integration with HMAC webhook authentication, session persistence, per-turn latency and cost telemetry, and a suite grown from 36 tests with 4 failures to 118 passing.",
    ],
    dataset:
      "A 100-query labelled evaluation set across 5 categories, run against 4 retrieval strategies and scored on hit@3. Hybrid RRF leads on specification queries (0.92 vs. 0.60 dense); dense leads on semantic ones. Concurrency is tested directly at 20 writers.",
    stack: [
      "Python",
      "Gemini 2.0 Flash",
      "Flask",
      "SQLite",
      "Hybrid RRF Retrieval",
      "WhatsApp Business API",
      "Phi Agent Framework",
    ],
    impact:
      "Every load-bearing choice - the memory store, the retriever, the abstention rule - is backed by a measurement that could have gone the other way.",
    featured: true,
    image: "/projects/whatsapp-sales-agent.jpg",
    imageAlt:
      "Architecture diagram of the WhatsApp AI sales agent: WhatsApp Business API webhook into an HMAC-authenticated Flask backend, SQLite conversation memory, a Gemini 2.0 Flash agent with product-search and catalog tools, hybrid RRF retrieval over a 200-product catalog, and a grounded-response or abstention path, with telemetry and evaluation panels.",
    links: {
      github: "https://github.com/shamil3923/whatsapp_sales_agent",
    },
    caseStudy: [
      {
        heading: "The memory store failed first",
        body: "Under 20 concurrent writers the original JSON file lost 190 of 200 messages. SQLite keeps all 200 - an unglamorous fix, but an agent that forgets most of the conversation cannot be evaluated on anything else.",
      },
      {
        heading: "No single retriever wins",
        body: "Hybrid RRF reached 0.92 hit@3 on specification queries against dense retrieval's 0.60 - but dense was the stronger of the two on semantic queries. The benchmark did not name a winner; it showed the split, and the split is the argument for routing by query type.",
      },
    ],
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
    image: "/projects/carbon-footprint-monitoring.jpg",
    imageAlt:
      "Diagram of the carbon footprint monitoring system: emissions data pipeline, Scikit-learn models, backend microservices, and the analytics dashboard.",
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
    image: "/projects/ats-resume-tracker.jpg",
    imageAlt:
      "Diagram of the ATS resume tracker: resume and job description into the Gemini-powered scorer, out to match score, missing keywords, and suggestions.",
    links: {
      github: "",
    },
  },
  {
    slug: "weapon-detection-fuzzy",
    title: "Context-Aware Threat Detection - Fuzzy Inference for Weapon Alerts",
    tagline:
      "A Mamdani fuzzy inference system that grades weapon alerts by scene context - rebuilt from a group project, then honestly evaluated.",
    type: "Project · rebuild of a university group project",
    period: "2024 – 2025",
    domain: "Computer Vision",
    problem:
      "An identical detection should not raise an identical alert: a knife at 0.6 confidence on an empty hillside is not the same event as on a crowded concourse at night. The original project claimed to fuzz that judgement but summed hard-coded constants behind crisp thresholds, and was never evaluated at all.",
    solution:
      "I rebuilt the scoring layer as a real Mamdani system - membership functions, a 20-rule base, implication, aggregation and defuzzification - over four context antecedents: weapon confidence, scene sensitivity, crowd density and lighting. The context-fusion idea is the group's; the inference engine, the harness and the analyses are mine.",
    details: [
      "Built the Mamdani engine over four antecedents with a 20-rule base and an explainable defuzzified threat score.",
      "Added `--explain`, returning the crisp score, the band, every membership degree and the firing strength of each rule that fired.",
      "Wrote the evaluation harness the original never had, scoring against the threshold rule and a logistic-regression control.",
      "Swept all 48 membership breakpoints by ±5%, costing at worst 1.9 points of balanced accuracy - the result is not perched on tuned constants.",
    ],
    dataset:
      "Two evaluations that disagree, both reported. Synthetic (2,400 rows, half held out): 0.613 balanced accuracy against 0.467 for the original rule, false alarms falling from 24.4% to 2.2%. On 25 real scenes through the actual YOLOv8 and Places365 checkpoints, all three scorers sit at chance - the inherited detector returns exactly 0.000 on 5 of 18 weapon-bearing scenes.",
    stack: ["Python", "scikit-fuzzy", "YOLOv8", "Places365", "OpenCV", "pytest"],
    impact:
      "The honest finding is a negative one: no inference rule recovers information its inputs never carried. Measuring that, rather than shipping the synthetic win, is the point of the rebuild.",
    featured: false,
    image: "/projects/weapon-detection-fuzzy.jpg",
    imageAlt:
      "Diagram of the context-aware threat detection pipeline: weapon confidence, scene sensitivity, crowd density and lighting into a Mamdani fuzzy inference engine, out to a graded threat band.",
    links: {
      github: "https://github.com/shamil3923/Weapon-detection",
    },
    caseStudy: [
      {
        heading: "Why crisp thresholds were the bug",
        body: "Luma 49.9 and 50.1 are the same frame to any camera, yet the original rule scored them 0.2 apart. Sweeping the inputs shows it: the largest step between adjacent brightness samples is 0.2000 under the threshold rule and 0.0005 under the fuzzy system.",
      },
      {
        heading: "Reporting the result that loses",
        body: "Measuring degradation on real frames broke the synthetic model's own assumption - it assumed confidence retention of 0.55–0.72, where fog at severity 0.9 leaves 7%. Publishing the real-frame failure beside the synthetic win is what makes either number worth reading.",
      },
    ],
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
    image: "/projects/obesity-classification.jpg",
    imageAlt:
      "Diagram of the obesity classification benchmarking pipeline: medical indicator data through feature preparation into XGBoost, LightGBM and Decision Tree candidates, hyperparameter tuning, cross-validated evaluation, and best-model selection.",
    links: {
      github: "https://github.com/shamil3923/Obesity_classification_prediction",
    },
  },
  {
    slug: "autonomous-chessboard",
    title: "Autonomous Chessboard - Hardware/Software Integration",
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
    image: "/projects/autonomous-chessboard.jpg",
    imageAlt:
      "Diagram of the autonomous chessboard: a physical sensing layer and move detection on the hardware side, game logic and the real-time LCD move-display subsystem on the software side, joined by hardware-software integration and integration testing.",
    links: {},
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
