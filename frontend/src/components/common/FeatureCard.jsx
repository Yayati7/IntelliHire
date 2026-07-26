import { motion } from "framer-motion";
import "./FeatureCard.css";

export default function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      className="feature-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {icon && <div className="feature-icon">{icon}</div>}
      <h3>{title}</h3>
      <p>{description}</p>
    </motion.div>
  );
}