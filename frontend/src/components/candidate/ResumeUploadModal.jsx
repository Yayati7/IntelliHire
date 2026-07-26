import { useState } from "react";
import { toast } from "react-toastify";
import "./HistoryModal.css";

export default function ResumeUploadModal({ open, onClose, onUpload }) {

    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    if (!open) return null;

    async function submit() {
        if (!file) {
            toast.error("Please choose a PDF file first.");
            return;
        }
        setUploading(true);
        try {
            await onUpload(file);
            onClose();
        } catch (e) {
            console.log(e);
            toast.error(e?.response?.data?.message || "Upload failed. Only PDF files under 10MB allowed.");
        } finally {
            setUploading(false);
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Upload Resume</h2>
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <div className="modal-actions">
                    <button className="btn btn-primary" onClick={submit} disabled={uploading}>
                        {uploading ? "Uploading..." : "Upload"}
                    </button>
                    <button className="btn btn-outline" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}