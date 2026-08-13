import ScholarshipCard from "../components/ScholarshipCard";
import { scholarships } from "../data/scholarships";
import "../styles/scholarships.css";

export default function Scholarships() {
  return <main className="scholarships-page"><section className="scholarships-hero"><p className="eyebrow">FIND YOUR NEXT OPPORTUNITY</p><h1>Scholarships for ambitious students.</h1><p>Browse trusted funding opportunities and find the right program for your academic goals.</p><div className="opportunity-summary"><span><strong>{scholarships.length}</strong> featured opportunity</span><span>✓ Verified details</span><span>✓ Free to explore</span></div></section><section className="scholarship-grid" aria-label="Scholarship opportunities">{scholarships.map((item) => <ScholarshipCard key={item.id} scholarship={item} />)}</section></main>;
}
