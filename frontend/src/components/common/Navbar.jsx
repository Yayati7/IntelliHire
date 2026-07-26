import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaBars, FaTimes, FaUserGraduate, FaBuilding } from "react-icons/fa";
import "./../../styles/Navbar.css";

const LINKS = [
  { href: "#features", label: "Features" },
  { href: "#workflow", label: "How It Works" },
  { href: "#roles", label: "Roles" },
  { href: "#tech", label: "Tech Stack" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-inner">
        <div className="logo" onClick={() => navigate("/")}>
          <span className="logo-mark">IH</span>
          IntelliHire
        </div>

        <ul className="nav-links">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>

        <div className="nav-buttons">
          <button className="login-btn" onClick={() => setOpen((prev) => !prev)}>
            Login
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                className="login-dropdown glass"
                initial={{ opacity: 0, y: -10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.96 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <div
                  className="login-dropdown-item"
                  onClick={() => {
                    setOpen(false);
                    navigate("/login?role=USER");
                  }}
                >
                  <FaUserGraduate />
                  <span>Login as Candidate</span>
                </div>

                <div
                  className="login-dropdown-item"
                  onClick={() => {
                    setOpen(false);
                    navigate("/login?role=RECRUITER");
                  }}
                >
                  <FaBuilding />
                  <span>Login as Company</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.ul
            className="nav-links-mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setMobileOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}