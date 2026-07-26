import "./../../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="logo">
            <span className="logo-mark">IH</span>
            IntelliHire
          </div>
          <p>
            Explainable, hybrid AI job recommendation platform — matching
            candidates to roles with transparent, model-backed reasoning.
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="#workflow">How It Works</a>
            <a href="#tech">Tech Stack</a>
          </div>

          <div className="footer-col">
            <h4>Get Started</h4>
            <a href="#roles">Choose Your Role</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 IntelliHire. All rights reserved.</span>
        <span>Built with React, Spring Boot &amp; FastAPI</span>
      </div>
    </footer>
  );
}