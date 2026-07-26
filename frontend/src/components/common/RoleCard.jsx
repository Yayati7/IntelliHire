import { motion } from "framer-motion";
import "./RoleCard.css";

export default function RoleCard({ icon, title, description, buttonText, onClick }) {
  return (
    <motion.div
      className="role-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -10 }}
    >
      <div className="role-icon">{icon}</div>
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={onClick}>{buttonText}</button>
    </motion.div>
  );
}