import { Link } from "react-router-dom";
import "../styles/home.css";

import heroImage from "../assets/Image Jun 18, 2026, 09_52_57 PM.png";
import logo from "../assets/graduation-cap.png";

function Home() {

  return (

    <main>

      {/* Hero */}

      <section className="hero">

        <div className="hero-content">

          <p className="eyebrow">
            YOUR FUTURE STARTS HERE
          </p>

          <h1>

            Find scholarships that

            <span> match your dreams.</span>

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

            <Link
              to="/register"
              className="secondary-button"
              id="createAccountBtn"
            >
              Create Free Account
            </Link>

          </div>

          <div className="hero-stats">

            <div>

              <strong>100+</strong>

              <span>Opportunities</span>

            </div>

            <div>

              <strong>20+</strong>

              <span>Countries</span>

            </div>

            <div>

              <strong>Free</strong>

              <span>For Students</span>

            </div>

          </div>

        </div>

        <div className="hero-image-box">

          <img
            src={heroImage}
            alt="Student"
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



      {/* Categories */}

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

          <Link
            to="/scholarships"
            className="category-card"
          >

            <span>💰</span>

            <h3>Fully Funded</h3>

            <p>
              Scholarships that cover tuition and living costs.
            </p>

          </Link>

          <Link
            to="/scholarships"
            className="category-card"
          >

            <span>🎓</span>

            <h3>Undergraduate</h3>

            <p>
              Funding options for Bachelor's degree students.
            </p>

          </Link>

          <Link
            to="/scholarships"
            className="category-card"
          >

            <span>📚</span>

            <h3>Master's & PhD</h3>

            <p>
              Advance your education with global opportunities.
            </p>

          </Link>

          <Link
            to="/scholarships"
            className="category-card"
          >

            <span>📅</span>

            <h3>Deadline Soon</h3>

            <p>
              Do not miss scholarships closing soon.
            </p>

          </Link>

        </div>

      </section>



      {/* Featured Scholarships */}

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

          <article className="scholarship-card">

            <div className="card-top">

              <span className="badge">
                Fully Funded
              </span>

              <span>🌍 Europe</span>

            </div>

            <h3>
              Erasmus Mundus Joint Masters
            </h3>

            <p>
              Study a Master's degree at leading European universities.
            </p>

            <div className="card-footer">

              <span>Master's</span>

              <Link to="/scholarships">
                Details →
              </Link>

            </div>

          </article>

          <article className="scholarship-card">

            <div className="card-top">

              <span className="badge">
                Fully Funded
              </span>

              <span>🇬🇧 UK</span>

            </div>

            <h3>
              Commonwealth Scholarship
            </h3>

            <p>
              Study in the United Kingdom with financial support.
            </p>

            <div className="card-footer">

              <span>Master's / PhD</span>

              <Link to="/scholarships">
                Details →
              </Link>

            </div>

          </article>

          <article className="scholarship-card">

            <div className="card-top">

              <span className="badge">
                Fully Funded
              </span>

              <span>🇺🇸 USA</span>

            </div>

            <h3>
              Fulbright Scholarship
            </h3>

            <p>
              An opportunity for international graduate students.
            </p>

            <div className="card-footer">

              <span>Master's</span>

              <Link to="/scholarships">
                Details →
              </Link>

            </div>

          </article>

        </div>

      </section>



      {/* CTA */}

      <section
        className="cta-section"
        id="ctaSection"
      >

        <div>

          <p className="eyebrow">
            READY TO BEGIN?
          </p>

          <h2>
            Your next scholarship could be one click away.
          </h2>

          <p>
            Create a free ScholarPath account and save opportunities you love.
          </p>

        </div>

        <Link
          to="/register"
          className="light-button"
        >
          Create Account
        </Link>

      </section>

    </main>

  );

}

export default Home;