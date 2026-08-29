import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/scholarshipCard.css";
import {
  getCurrentStudent,
  getSavedScholarships,
  toggleSavedScholarship,
} from "../utils/savedScholarships";

export default function ScholarshipCard({ scholarship }) {
  const navigate = useNavigate();
  const user = getCurrentStudent();
  const [saved, setSaved] = useState(() => user ? getSavedScholarships(user.id).some((item) => item.id === scholarship.id) : false);

  function handleSave() {
    const result = toggleSavedScholarship(scholarship);
    if (result.status === "login-required") return navigate("/login");
    setSaved(result.status === "saved");
  }

  return <article className="scholarship-card"><div className="scholarship-image-wrap"><img src={scholarship.image} alt={scholarship.name} className="scholarship-image" /><span className="funding-badge">{scholarship.funding}</span></div><div className="scholarship-content"><p className="program-label">{scholarship.available_program}</p><h2>{scholarship.name}</h2><p className="university">{scholarship.university}</p><div className="scholarship-meta"><span>📍 {scholarship.location}</span><span>📅 {scholarship.deadline}</span></div><div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "22px", paddingTop: "16px", borderTop: "1px solid #e2e8f0" }}><Link to={`/scholarships/${scholarship.id}`} className="details-btn" style={{ flex: 1, margin: 0, padding: 0, border: 0 }}>View opportunity <span>→</span></Link><button type="button" onClick={handleSave} style={{ padding: "8px 12px", border: `1px solid ${saved ? "#1d4ed8" : "#93c5fd"}`, borderRadius: "8px", background: saved ? "#1d4ed8" : "#eff6ff", color: saved ? "#fff" : "#1d4ed8", cursor: "pointer", fontWeight: 800 }}>{saved ? "Saved" : "Save"}</button></div></div></article>;
}
