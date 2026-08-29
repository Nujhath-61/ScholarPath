import { useSearchParams } from "react-router-dom";
import ScholarshipCard from "../components/ScholarshipCard";
import { getAllScholarships } from "../utils/scholarships";
import "../styles/scholarships.css";

export default function Scholarships() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeFilter = searchParams.get("filter") || "all";

  const scholarships = getAllScholarships();

  function scholarshipText(scholarship) {
    return [
      scholarship.available_program || "",
      scholarship.funding || "",
      ...Object.keys(scholarship.studyLevels || {}),
      ...Object.values(scholarship.studyLevels || {}).flatMap(
        (level) => level.programs || []
      ),
    ]
      .join(" ")
      .toLowerCase();
  }

  function hasUpcomingDeadline(deadline) {
    const match = deadline?.match(
      /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),\s*(\d{4})/i
    );

    if (!match) return false;

    const deadlineDate = new Date(`${match[1]} ${match[2]}, ${match[3]}`);
    const today = new Date();
    const ninetyDaysFromToday = new Date();
    ninetyDaysFromToday.setDate(today.getDate() + 90);

    return deadlineDate >= today && deadlineDate <= ninetyDaysFromToday;
  }

  function matchesFilter(scholarship) {
    const text = scholarshipText(scholarship);

    if (activeFilter === "fully-funded") {
      return scholarship.funding?.toLowerCase().includes("fully funded");
    }

    if (activeFilter === "undergraduate") {
      return text.includes("undergraduate") || text.includes("bachelor");
    }

    if (activeFilter === "postgraduate") {
      return (
        text.includes("master") ||
        text.includes("phd") ||
        text.includes("doctoral")
      );
    }

    if (activeFilter === "deadline-soon") {
      return hasUpcomingDeadline(scholarship.deadline);
    }

    return true;
  }

  const filteredScholarships = scholarships.filter(matchesFilter);

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
          Filter scholarships

          <select
            value={activeFilter}
            onChange={(event) => {
              const filter = event.target.value;
              setSearchParams(filter === "all" ? {} : { filter });
            }}
          >
            <option value="all">All scholarships</option>
            <option value="fully-funded">Fully funded</option>
            <option value="undergraduate">Undergraduate</option>
            <option value="postgraduate">Master's &amp; PhD</option>
            <option value="deadline-soon">Deadline within 90 days</option>
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
