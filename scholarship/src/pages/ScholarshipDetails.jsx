// scholarship/src/pages/ScholarshipDetails.jsx

import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getScholarshipById } from "../utils/scholarships";
import "../styles/scholarshipDetails.css";

const ListCard = ({ title, items, icon = "✓" }) => {
  if (!items?.length) return null;

  return (
    <section className="content-card">
      <h2>{title}</h2>
      <ul className="check-list">
        {items.map((item, index) => (
          <li key={item?.title || index}>
            <span className="check-icon">{icon}</span>
            {typeof item === "string" ? (
              <span>{item}</span>
            ) : (
              <div>
                <strong>{item.title}</strong>
                {item.description && <p>{item.description}</p>}
                {item.link && (
                  <a href={item.link} target="_blank" rel="noreferrer">
                    {item.linkText || "Learn more"} →
                  </a>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default function ScholarshipDetails() {
  const { id } = useParams();
  const scholarship = getScholarshipById(id);

  const levels = Object.keys(scholarship?.studyLevels || {});
  const [selectedLevel, setSelectedLevel] = useState(levels[0] || "");
  const currentLevel = scholarship?.studyLevels?.[selectedLevel];

  if (!scholarship) {
    return (
      <main className="scholarship-not-found">
        <span>🎓</span>
        <h1>Scholarship not found</h1>
        <p>This scholarship may have been removed or the link is incorrect.</p>
        <Link to="/scholarships">Browse scholarships</Link>
      </main>
    );
  }

  return (
    <main className="scholarship-page">
      <section className="details-hero">
        <img src={scholarship.image} alt={scholarship.name} />
        <div className="hero-overlay" />
      </section>

      <div className="details-layout">
        <article className="details-main">
          <Link className="back-link" to="/scholarships">
            ← Back to scholarships
          </Link>

          <header className="scholarship-header">
            <div className="header-top">
              <span className="funding-badge">{scholarship.funding}</span>
              <span className="deadline-pill">Deadline: {scholarship.deadline}</span>
            </div>

            <h1>{scholarship.name}</h1>
            <p className="university-name">{scholarship.university}</p>
          </header>

          <section className="overview-grid">
            <div className="overview-item">
              <span className="overview-icon">📍</span>
              <div>
                <small>LOCATION</small>
                <strong>{scholarship.location}</strong>
              </div>
            </div>

            <div className="overview-item">
              <span className="overview-icon">🎓</span>
              <div>
                <small>STUDY LEVEL</small>
                <strong>
                  {currentLevel?.label ||
                    scholarship.available_program ||
                    "See available programs"}
                </strong>
              </div>
            </div>

            <div className="overview-item">
              <span className="overview-icon">💰</span>
              <div>
                <small>FUNDING</small>
                <strong>{scholarship.funding}</strong>
              </div>
            </div>
          </section>

          <section className="content-card about-card">
            <p className="section-label">OVERVIEW</p>
            <h2>About this scholarship</h2>
            <p className="description">{scholarship.description}</p>
          </section>

          {levels.length > 0 && (
            <section className="content-card">
              <p className="section-label">CHOOSE YOUR PATH</p>
              <h2>What do you plan to study?</h2>

              <div className="level-tabs">
                {levels.map((level) => (
                  <button
                    key={level}
                    type="button"
                    className={selectedLevel === level ? "level-tab active" : "level-tab"}
                    onClick={() => setSelectedLevel(level)}
                  >
                    {scholarship.studyLevels[level]?.label || level}
                  </button>
                ))}
              </div>

              {currentLevel?.description && (
                <p className="level-description">{currentLevel.description}</p>
              )}

              {currentLevel?.programs?.length > 0 && (
                <div className="program-list">
                  {currentLevel.programs.map((program) => (
                    <span key={program}>{program}</span>
                  ))}
                </div>
              )}
            </section>
          )}

          <div className="two-column-content">
            <ListCard
              title="What this scholarship covers"
              items={scholarship.benefits}
              icon="✓"
            />
            <ListCard
              title="Who can apply"
              items={scholarship.eligibility}
              icon="✓"
            />
          </div>

          <ListCard
            title="Documents to prepare"
            items={scholarship.documents}
            icon="↗"
          />

          {currentLevel?.applicationProcess?.length > 0 && (
            <section className="content-card">
              <p className="section-label">APPLICATION GUIDE</p>
              <h2>How to apply</h2>

              <div className="application-timeline">
                {currentLevel.applicationProcess.map((step, index) => (
                  <div className="timeline-step" key={step.title || index}>
                    <span className="step-number">{index + 1}</span>
                    <div>
                      <h3>{typeof step === "string" ? step : step.title}</h3>
                      {step.description && <p>{step.description}</p>}
                      {step.link && (
                        <a href={step.link} target="_blank" rel="noreferrer">
                          {step.linkText || "Open official resource"} →
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </article>

        <aside className="details-sidebar">
          <div className="apply-card">
            <span className="apply-card-icon">🎓</span>
            <h2>Ready to apply?</h2>
            <p>Always review the latest requirements on the official scholarship website.</p>

            {scholarship.officialWebsite ? (
              <a
                className="apply-button"
                href={scholarship.officialWebsite}
                target="_blank"
                rel="noreferrer"
              >
                Visit official website ↗
              </a>
            ) : (
              <button className="apply-button" disabled>
                Application link unavailable
              </button>
            )}
          </div>

          <div className="sidebar-note">
            <strong>Important</strong>
            <p>Deadlines and requirements can change. Confirm every detail before submitting your application.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}