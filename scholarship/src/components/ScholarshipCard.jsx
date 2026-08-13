import { Link } from "react-router-dom";
import "../styles/scholarshipCard.css";

export default function ScholarshipCard({ scholarship }) {
  return <article className="scholarship-card"><div className="scholarship-image-wrap"><img src={scholarship.image} alt={scholarship.name} className="scholarship-image" /><span className="funding-badge">{scholarship.funding}</span></div><div className="scholarship-content"><p className="program-label">{scholarship.available_program}</p><h2>{scholarship.name}</h2><p className="university">{scholarship.university}</p><div className="scholarship-meta"><span>📍 {scholarship.location}</span><span>📅 {scholarship.deadline}</span></div><Link to={`/scholarships/${scholarship.id}`} className="details-btn">View opportunity <span>→</span></Link></div></article>;
}
