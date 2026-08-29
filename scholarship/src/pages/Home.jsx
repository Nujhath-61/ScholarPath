import { Link } from "react-router-dom";
import heroImage from "../assets/Image Jun 18, 2026, 09_52_57 PM.png";
import { scholarships } from "../data/scholarships";
import "../styles/Home.css";

export default function Home() {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  // ============================================================
  // AUTOMATIC SCHOLARSHIP STATISTICS
  // ============================================================

  const totalScholarships = scholarships.length;

  // Get countries from scholarship data
  const countries = [
    ...new Set(
      scholarships
        .map((scholarship) => {
          if (scholarship.location) {
            return scholarship.location;
          }

          if (scholarship.country) {
            return scholarship.country;
          }

          return null;
        })
        .filter(Boolean)
    ),
  ];

  const totalCountries = countries.length;

  // ============================================================
  // FEATURED SCHOLARSHIPS
  // ============================================================

  const featured = [
    [
      "Erasmus Mundus Joint Masters",
      "🌍 Europe",
      "Master's",
      "Study a Master's degree through leading European university consortia.",
    ],

    [
      "Commonwealth Scholarship",
      "🇬🇧 UK",
      "Master's / PhD",
      "Explore postgraduate study opportunities in the United Kingdom.",
    ],

    [
      "Fulbright Scholarship",
      "🇺🇸 USA",
      "Master's",
      "A prestigious opportunity for international graduate students.",
    ],
  ];

  // ============================================================
  // CATEGORIES
  // ============================================================

  const categories = [
    [
      "💰",
      "Fully Funded",
      "Scholarships that provide substantial financial support for tuition and living costs.",
      "fully-funded",
    ],

    [
      "🎓",
      "Undergraduate",
      "Funding opportunities for students pursuing a Bachelor's degree.",
      "undergraduate",
    ],

    [
      "📚",
      "Master's & PhD",
      "Explore postgraduate scholarships from universities and governments worldwide.",
      "postgraduate",
    ],

    [
      "📅",
      "Deadline Soon",
      "Keep track of upcoming scholarship deadlines.",
      "deadline-soon",
    ],
  ];

  return (
    <main>

      {/* ========================================================
          HERO
      ======================================================== */}

      <section className="hero">

        <div className="hero-content">

          <p className="eyebrow">
            YOUR FUTURE STARTS HERE
          </p>

          <h1>
            Find scholarships that{" "}
            <span>match your dreams.</span>
          </h1>

          <p className="hero-text">
            Discover trusted scholarship opportunities for
            undergraduate, Master's, and PhD study—all in one place.
          </p>

          <div className="hero-buttons">

            <Link
              to="/scholarships"
              className="primary-button"
            >
              Explore Scholarships
            </Link>

            {!currentUser && (
              <Link
                to="/register"
                className="secondary-button"
              >
                Create Free Account
              </Link>
            )}

          </div>


          {/* ======================================================
              AUTOMATIC STATS
          ====================================================== */}

          <div className="hero-stats">

            <div>
              <strong>{totalScholarships}+</strong>
              <span>Scholarships</span>
            </div>

            <div>
              <strong>{totalCountries}+</strong>
              <span>Destinations</span>
            </div>

            <div>
              <strong>Free</strong>
              <span>For Students</span>
            </div>

          </div>

        </div>


        {/* ========================================================
            HERO IMAGE
        ======================================================== */}

        <div className="hero-image-box">

          <img
            src={heroImage}
            alt="Student exploring scholarship opportunities"
          />

          <div className="floating-card">

            <span className="card-icon">
              🎓
            </span>

            <div>
              <strong>
                Study Abroad
              </strong>

              <p>
                Start your journey today
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* ========================================================
          CATEGORIES
      ======================================================== */}

      <section className="categories">

        <div className="section-heading">

          <p className="eyebrow">
            BROWSE BY CATEGORY
          </p>

          <h2>
            Find the right opportunity
          </h2>

          <p>
            Choose a category and explore scholarships made for you.
          </p>

        </div>


        <div className="category-grid">

          {categories.map(
            ([icon, title, text, filter]) => (

              <Link
                key={title}
                to={`/scholarships?filter=${filter}`}
                className="category-card"
              >

                <span>
                  {icon}
                </span>

                <h3>
                  {title}
                </h3>

                <p>
                  {text}
                </p>

              </Link>

            )
          )}

        </div>

      </section>


      {/* ========================================================
          FEATURED SCHOLARSHIPS
      ======================================================== */}

      <section className="featured">

        <div className="featured-top">

          <div>

            <p className="eyebrow">
              POPULAR OPPORTUNITIES
            </p>

            <h2>
              Featured scholarships
            </h2>

          </div>

          <Link
            to="/scholarships"
            className="view-all"
          >
            View all scholarships →
          </Link>

        </div>


        <div className="featured-grid">

          {featured.map(
            ([name, place, level, text]) => (

              <article
                className="scholarship-card"
                key={name}
              >

                <div className="card-top">

                  <span className="badge">
                    Fully Funded
                  </span>

                  <span>
                    {place}
                  </span>

                </div>


                <h3>
                  {name}
                </h3>


                <p>
                  {text}
                </p>


                <div className="card-footer">

                  <span>
                    {level}
                  </span>

                  <Link to="/scholarships">
                    Details →
                  </Link>

                </div>

              </article>

            )
          )}

        </div>

      </section>


      {/* ========================================================
          CTA
      ======================================================== */}

      {!currentUser && (

        <section className="cta-section">

          <div>

            <p className="eyebrow">
              READY TO BEGIN?
            </p>

            <h2>
              Your next scholarship could be one click away.
            </h2>

            <p>
              Create a free ScholarPath account and save
              opportunities you love.
            </p>

          </div>


          <Link
            to="/register"
            className="light-button"
          >
            Create Account
          </Link>

        </section>

      )}

    </main>
  );
}