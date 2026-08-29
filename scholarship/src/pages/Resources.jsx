
import { Link } from "react-router-dom";
import "../styles/appPages.css";

// ==========================================
// YOUTUBE VIDEOS
// ==========================================


const videos = [
  {
    title: "How to Write a Perfect Statement of Purpose",
    description:
      "Learn useful tips for preparing a clear and effective statement of purpose for your scholarship application.",
    url: "https://www.youtube.com/embed/NYbu30bqcbM",
  },
  {
  title: "How I Wrote Essays That Got Me Into Top Universities",
  description:
    "Learn useful approaches to writing strong university and scholarship essays from an experienced applicant.",
  url: "https://www.youtube.com/embed/MZ0XeefKWoE",
},
  {
    title: "Scholarship Application Guide",
    description:
      "Watch this video for helpful guidance when preparing your scholarship application.",
    url: "https://www.youtube.com/embed/MG3EbXE6TAg",
  },
  {
  title: "Scholarship Interview Questions and Answers",
  description:
    "Learn how to prepare for common scholarship interview questions and present yourself confidently.",
  url: "https://www.youtube.com/embed/q6323JL8a24",
},
  {
  title: "Effective Scholarship Essay: Tips & Tricks",
  description:
    "Learn practical tips for writing an effective scholarship essay and presenting your ideas clearly.",
  url: "https://www.youtube.com/embed/tjXIfam5qLE",
},
{
  title: "Student Visa Interview",
  description:
    "Learn about the student visa interview process and how to prepare for common interview questions.",
  url: "https://www.youtube.com/embed/HKeZbBl2EeI",
}
];



// ==========================================
// RESOURCE CARDS
// ==========================================

const cards = [
  [
    "📄",
    "Required Documents",
    [
      "Academic transcripts and certificates",
      "Passport or national ID",
      "CV or résumé",
      "Personal statement",
      "Recommendation letters",
      "English test score, if required",
    ],
  ],

  [
    "✅",
    "Before You Submit",
    [
      "Read all eligibility requirements",
      "Check the application deadline",
      "Use clear PDF files",
      "Check spelling and grammar",
      "Confirm every required field is complete",
      "Save a copy of your application",
    ],
  ],

  [
    "✍️",
    "Personal Statement Tips",
    [
      "Introduce your study and career goals",
      "Explain why you chose the program",
      "Describe your achievements honestly",
      "Show how you will help your community",
      "Use simple and clear language",
    ],
  ],

  [
    "📤",
    "Upload Steps",
    [
      "Create an account on the official website",
      "Complete the application form",
      "Upload each document as requested",
      "Review your information carefully",
      "Submit before the deadline",
      "Keep the confirmation email",
    ],
  ],
];

// ==========================================
// RESOURCES PAGE
// ==========================================

export default function Resources() {
  return (
    <main className="resources-page">

      {/* ==========================================
          HERO
      ========================================== */}

     


      <div className="resources-body">

        {/* ==========================================
            VIDEOS FIRST
        ========================================== */}

        <section className="video-section">

          <div className="video-heading">
            <p className="eyebrow">WATCH & LEARN</p>

            <h2>Helpful Scholarship Videos</h2>

            <p>
              Watch these helpful videos to improve your
              scholarship application.
            </p>
          </div>


          <div className="video-grid">

            {videos.map((video) => (
              <article
                className="video-card"
                key={video.title}
              >

                <div className="video-wrapper">

                  <iframe
                    src={video.url}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>

                </div>


                <div className="video-content">

                  <h3>{video.title}</h3>

                  <p>{video.description}</p>

                </div>

              </article>
            ))}

          </div>

        </section>


        {/* ==========================================
            RESOURCE CARDS
        ========================================== */}

        <section className="resource-section">

          <div className="resource-heading">
            <p className="eyebrow">APPLICATION GUIDES</p>

            <h2>Scholarship Preparation Resources</h2>

            <p>
              Use these simple checklists and tips before
              submitting your application.
            </p>
          </div>


          <section className="resource-grid">

            {cards.map(([icon, title, items]) => (
              <article
                className="resource-card"
                key={title}
              >

                <span className="resource-icon">
                  {icon}
                </span>

                <h2>{title}</h2>

                <ul>
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

              </article>
            ))}

          </section>

        </section>


        {/* ==========================================
            IMPORTANT REMINDER
        ========================================== */}

        <section className="notice">

          <h2>Important reminder</h2>

          <p>
            Always verify scholarship information from the
            official website before applying. Official websites
            have the final requirements.
          </p>

          <Link
            className="primary-button"
            to="/scholarships"
          >
            Explore scholarships
          </Link>

        </section>

      </div>

    </main>
  );
}


