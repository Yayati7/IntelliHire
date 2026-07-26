import { AnimatePresence, motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";
import "./ConfirmDialog.css";

export default function ConfirmDialog({
    open,
    title,
    message,
    confirmText,
    cancelText,
    danger,
    onConfirm,
    onCancel
}) {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="confirm-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                >
                    <motion.div
                        className="confirm-dialog"
                        initial={{ opacity: 0, y: 16, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.96 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                    >
                        <div className={`confirm-icon ${danger ? "danger" : ""}`}>
                            <FaExclamationTriangle />
                        </div>

                        <h3>{title}</h3>
                        <p>{message}</p>

                        <div className="confirm-actions">
                            <button className="btn btn-outline" onClick={onCancel}>
                                {cancelText}
                            </button>
                            <button
                                className={`btn ${danger ? "btn-danger" : "btn-primary"}`}
                                onClick={onConfirm}
                            >
                                {confirmText}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}