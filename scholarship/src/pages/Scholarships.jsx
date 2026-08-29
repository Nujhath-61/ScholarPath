import { useState } from "react";
import ScholarshipCard from "../components/ScholarshipCard";
import { getAllScholarships } from "../utils/scholarships";
import "../styles/scholarships.css";

export default function Scholarships() {
  const [studyLevel, setStudyLevel] = useState("All");

  const scholarships = getAllScholarships();

  function matchesStudyLevel(scholarship) {
    if (studyLevel === "All") {
      return true;
    }

    const text = [
      scholarship.available_program || "",
      ...Object.keys(scholarship.studyLevels || {}),
      ...Object.values(scholarship.studyLevels || {}).flatMap(
        (level) => level.programs || []
      ),
    ]
      .join(" ")
      .toLowerCase();

    if (studyLevel === "Undergraduate") {
      return (
        text.includes("undergraduate") ||
        text.includes("bachelor")
      );
    }

    if (studyLevel === "Master's") {
      return text.includes("master");
    }

    if (studyLevel === "PhD") {
      return (
        text.includes("phd") ||
        text.includes("doctoral")
      );
    }

    return true;
  }

  const filteredScholarships = scholarships.filter(matchesStudyLevel);

  return (
    <main className="scholarships-page">
      <section className="scholarships-hero">
        <p className="eyebrow">EXPLORE OPPORTUNITIES</p>

        <h1>Scholarships for ambitious students.</h1>

        <p>
          Find scholarship opportunities that match your academic goals.
        </p>

        <div className="opportunity-summary">
          <span>
            <strong>{scholarships.length}</strong> featured opportunities
          </span>
        </div>
      </section>

      {/* Filter is outside the blue hero section */}
      <section className="filter-section">
        <label className="study-filter">
          Study level

          <select
            value={studyLevel}
            onChange={(event) => setStudyLevel(event.target.value)}
          >
            <option value="All">All study levels</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Master's">Master's</option>
            <option value="PhD">PhD</option>
          </select>
        </label>
      </section>

      <section className="scholarship-grid">
        {filteredScholarships.length > 0 ? (
          filteredScholarships.map((scholarship) => (
            <ScholarshipCard
              key={scholarship.id}
              scholarship={scholarship}
            />
          ))
        ) : (
          <p className="no-results">
            No scholarships found for this study level.
          </p>
        )}
      </section>
    </main>
  );
}