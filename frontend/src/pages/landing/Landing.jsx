import { motion } from "framer-motion";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import RoleCard from "../../components/common/RoleCard";
import FeatureCard from "../../components/common/FeatureCard";
import "./Landing.css";

import {
  FaUserGraduate,
  FaBuilding,
  FaLaptopCode,
  FaFileUpload,
  FaBrain,
  FaProjectDiagram,
  FaListOl,
  FaCheckCircle,
  FaFileAlt,
  FaLightbulb,
  FaShieldAlt,
  FaHistory,
  FaCubes,
  FaReact,
  FaJava,
  FaPython,
  FaLock,
} from "react-icons/fa";
import { SiSpring, SiFastapi, SiPytorch, SiRedis } from "react-icons/si";

import { useNavigate } from "react-router-dom";

const WORKFLOW_STEPS = [
  { icon: <FaFileUpload />, title: "Upload Resume", desc: "PDF parsed instantly" },
  { icon: <FaBrain />, title: "AI Extracts Text", desc: "PyMuPDF text pipeline" },
  { icon: <FaProjectDiagram />, title: "Generates Embeddings", desc: "Sentence Transformers" },
  { icon: <FaListOl />, title: "Ranks Jobs", desc: "Hybrid ML scoring" },
  { icon: <FaCheckCircle />, title: "Apply", desc: "One-click application" },
];

const TECH_STACK = [
  { icon: <FaReact />, label: "React" },
  { icon: <FaJava />, label: "Spring Boot" },
  { icon: <SiSpring />, label: "Spring Cloud" },
  { icon: <SiFastapi />, label: "FastAPI" },
  { icon: <FaPython />, label: "PyTorch" },
  { icon: <SiPytorch />, label: "Sentence Transformers" },
  { icon: <SiRedis />, label: "Redis" },
  { icon: <FaLock />, label: "JWT · OAuth2 · AES" },
];

const FEATURES = [
  { icon: <FaFileAlt />, title: "Resume Parsing", description: "Automatic resume parsing using PyMuPDF." },
  { icon: <FaBrain />, title: "AI Recommendation", description: "Sentence Transformers + Hybrid ML." },
  { icon: <FaLightbulb />, title: "Explainable AI", description: "Every recommendation is fully explainable." },
  { icon: <FaShieldAlt />, title: "Secure Platform", description: "JWT, OAuth2, AES, Redis, RBAC." },
  { icon: <FaHistory />, title: "Recommendation History", description: "Stores latest AI recommendation sessions." },
  { icon: <FaCubes />, title: "Microservices", description: "Spring Boot Cloud architecture." },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export default function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <span className="hero-orb hero-orb-1" aria-hidden="true" />
        <span className="hero-orb hero-orb-2" aria-hidden="true" />
        <span className="hero-orb hero-orb-3" aria-hidden="true" />
        <span className="hero-orb hero-orb-4" aria-hidden="true" />

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="section-eyebrow">Explainable AI · Hybrid Matching</span>

          <h1>
            Find Your Dream Job Using{" "}
            <span className="gradient-text">Explainable AI</span>
          </h1>

          <p className="hero-sub">
            Upload your resume and let a <strong>hybrid AI recommendation engine</strong> —
            built on Spring Boot, FastAPI, Sentence Transformers and PyTorch —
            analyze, rank and explain the best-fit jobs for you.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => navigate("/login")}>
              Get Started
            </button>
            <a href="#workflow" className="btn btn-outline">
              See How It Works
            </a>
          </div>

          <div className="hero-badges">
            <span className="hero-badge glass"><FaBrain /> Hybrid AI Matching</span>
            <span className="hero-badge glass"><FaLightbulb /> Explainable Results</span>
            <span className="hero-badge glass"><FaShieldAlt /> Enterprise-Grade Security</span>
          </div>
        </motion.div>

        <div className="scroll-cue" aria-hidden="true"><span /></div>
      </section>

      <section id="workflow" className="workflow section">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">Pipeline</span>
            <h2>How IntelliHire Works</h2>
            <p className="section-sub">
              From resume upload to ranked recommendations — every step is automated and explainable.
            </p>
          </div>

          <div className="workflow-track">
            {WORKFLOW_STEPS.map((step, i) => (
              <motion.div
                className="workflow-step"
                key={step.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.1 }}
              >
                <div className="workflow-step-icon">
                  {step.icon}
                  <span className="workflow-step-num">{i + 1}</span>
                </div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="roles" className="roles section">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">Get Started</span>
            <h2>Choose Your Role</h2>
            <p className="section-sub">
              IntelliHire adapts to who you are — candidate, company, or platform developer.
            </p>
          </div>

          <div className="role-container">
            <RoleCard
              icon={<FaUserGraduate />}
              title="Candidate"
              description="Upload resume, receive AI recommendations and apply."
              buttonText="Continue"
              onClick={() => navigate("/login?role=USER")}
            />
            <RoleCard
              icon={<FaBuilding />}
              title="Company"
              description="Post jobs, review applicants and hire."
              buttonText="Continue"
              onClick={() => navigate("/login?role=RECRUITER")}
            />
            <RoleCard
              icon={<FaLaptopCode />}
              title="Developer"
              description="Analytics, monitoring and AI insights."
              buttonText="Continue"
              onClick={() => navigate("/login?role=ADMIN")}
            />
          </div>
        </div>
      </section>

      <section id="tech" className="tech section">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">Under the Hood</span>
            <h2>Powered By a Modern Stack</h2>
            <p className="section-sub">
              A microservices architecture combining Java, Python and machine learning.
            </p>
          </div>

          <div className="tech-grid">
            {TECH_STACK.map((tech) => (
              <span className="tech-chip glass" key={tech.label}>
                {tech.icon} {tech.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="features section">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">Platform</span>
            <h2>Built for Trust and Precision</h2>
            <p className="section-sub">
              Everything IntelliHire ships with, from parsing to production security.
            </p>
          </div>

          <div className="feature-container">
            {FEATURES.map((f) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} />
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <motion.div className="cta-inner" {...fadeUp}>
          <h2>Ready to find your best-fit job?</h2>
          <p>Join IntelliHire and let explainable AI do the matching for you.</p>
          <button className="btn btn-primary" onClick={() => navigate("/login")}>
            Get Started Free
          </button>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}