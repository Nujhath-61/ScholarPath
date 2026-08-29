import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import "../styles/appPages.css";

const getUser = () =>
  JSON.parse(localStorage.getItem("currentUser") || "null");

const savedScholarshipsKey = (userId) =>
  `savedScholarships_${userId}`;

const savedBlogsKey = (userId) =>
  `savedBlogs_${userId}`;

export default function Profile() {

  const [user, setUser] = useState(getUser);

  const [editing, setEditing] = useState(false);

  // ============================================================
  // SAVED SCHOLARSHIPS
  // ============================================================

  const [saved, setSaved] = useState(() => {

    const currentUser = getUser();

    return currentUser
      ? JSON.parse(
          localStorage.getItem(
            savedScholarshipsKey(currentUser.id)
          ) || "[]"
        )
      : [];

  });


  // ============================================================
  // SAVED BLOGS
  // ============================================================

  const [savedBlogs, setSavedBlogs] = useState(() => {

    const currentUser = getUser();

    return currentUser
      ? JSON.parse(
          localStorage.getItem(
            savedBlogsKey(currentUser.id)
          ) || "[]"
        )
      : [];

  });


  // ============================================================
  // NOT LOGGED IN
  // ============================================================

  if (!user) {

    return (
      <main className="content-page empty-page">

        <h1>
          You are not logged in.
        </h1>

        <p>
          Create an account or log in to view your profile.
        </p>

        <Link
          className="primary-button"
          to="/login"
        >
          Log in
        </Link>

      </main>
    );

  }


  // ============================================================
  // ADMIN
  // ============================================================

  if (user.role === "admin") {

    return (
      <Navigate
        to="/admin"
        replace
      />
    );

  }


  // ============================================================
  // KEYS
  // ============================================================

  const scholarshipKey =
    savedScholarshipsKey(user.id);

  const blogKey =
    savedBlogsKey(user.id);


  // ============================================================
  // UPDATE PROFILE
  // ============================================================

  function save(e) {

    e.preventDefault();

    const data = Object.fromEntries(
      new FormData(e.currentTarget)
    );

    const updated = {
      ...user,
      ...data
    };


    // Update current user

    localStorage.setItem(
      "currentUser",
      JSON.stringify(updated)
    );


    // Update users list

    const users = JSON.parse(
      localStorage.getItem("scholarPathUsers") || "[]"
    ).map((item) =>
      item.id === updated.id
        ? updated
        : item
    );

    localStorage.setItem(
      "scholarPathUsers",
      JSON.stringify(users)
    );


    setUser(updated);

    setEditing(false);
  }


  // ============================================================
  // REMOVE SCHOLARSHIP
  // ============================================================

  function removeScholarship(index) {

    const next =
      saved.filter((_, i) => i !== index);

    localStorage.setItem(
      scholarshipKey,
      JSON.stringify(next)
    );

    setSaved(next);
  }


  // ============================================================
  // REMOVE BLOG
  // ============================================================

  function removeBlog(blogId) {

    const next =
      savedBlogs.filter(
        (blog) => blog.id !== blogId
      );

    localStorage.setItem(
      blogKey,
      JSON.stringify(next)
    );

    setSavedBlogs(next);
  }


  // ============================================================
  // INITIALS
  // ============================================================

  const initials =
    user.fullName
      ? user.fullName
          .split(" ")
          .map((part) => part[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
      : "SP";


  // ============================================================
  // PAGE
  // ============================================================

  return (

    <main className="content-page profile-page">


      {/* ======================================================
          PROFILE CARD
      ====================================================== */}

      <section className="profile-card-react">

        <div className="profile-cover" />


        <div className="profile-body">

          <div className="profile-heading">

            <span className="avatar">
              {initials}
            </span>

            <button
              className="secondary-button"
              onClick={() => setEditing(true)}
            >
              Edit profile
            </button>

          </div>


          <h1>
            {user.fullName}
          </h1>


          <p>
            {user.email}
          </p>


          {/* ==================================================
              STATS
          ================================================== */}

          <div className="stats">

            <div>

              <strong>
                {saved.length}
              </strong>

              <span>
                Saved scholarships
              </span>

            </div>


            <div>

              <strong>
                {savedBlogs.length}
              </strong>

              <span>
                Saved blogs
              </span>

            </div>


            <div>

              <strong>
                {user.aspirant}
              </strong>

              <span>
                Study level
              </span>

            </div>

          </div>


          {/* ==================================================
              PROFILE INFORMATION
          ================================================== */}

          <div className="info-grid-react">

            {[
              ["Institution", user.institution],
              ["Phone number", user.phone],
              ["Address", user.address],
              ["Email address", user.email]
            ].map(([label, value]) => (

              <div key={label}>

                <small>
                  {label}
                </small>

                <strong>
                  {value || "Not provided"}
                </strong>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ======================================================
          SAVED SCHOLARSHIPS
      ====================================================== */}

      <section className="saved-section">

        <div className="section-row">

          <h2>
            Saved scholarships
          </h2>

          <Link to="/scholarships">
            Find more →
          </Link>

        </div>


        {saved.length ? (

          <div className="saved-list">

            {saved.map((item, index) => (

              <article
                key={`${item.name || item.title}-${index}`}
              >

                <div>

                  <h3>
                    {item.name || item.title}
                  </h3>

                  <p>
                    📍 {item.location || "Location not specified"}
                  </p>

                </div>


                <div>

                  <Link
                    to={`/scholarships/${item.id || 1}`}
                  >
                    View
                  </Link>

                  <button
                    onClick={() =>
                      removeScholarship(index)
                    }
                  >
                    Remove
                  </button>

                </div>

              </article>

            ))}

          </div>

        ) : (

          <p className="empty-message">
            You have not saved any scholarships yet.
          </p>

        )}

      </section>


      {/* ======================================================
          SAVED BLOGS
      ====================================================== */}

      <section className="saved-section saved-blogs-section">

        <div className="section-row">

          <h2>
            Saved blogs
          </h2>

          <Link to="/blogs">
            Find more →
          </Link>

        </div>


        {savedBlogs.length ? (

          <div className="saved-list">

            {savedBlogs.map((blog) => (

              <article
                key={blog.id}
                className="saved-blog-item"
              >

                <div>

                  <h3>
                    {blog.title}
                  </h3>

                  <p>
                    {blog.category || "Scholarship Guide"}
                  </p>

                  {blog.date && (
                    <small>
                      📅 {blog.date}
                    </small>
                  )}

                </div>


                <div>

                  <Link
                    to={`/blogs/${blog.id}`}
                  >
                    Read
                  </Link>

                  <button
                    onClick={() =>
                      removeBlog(blog.id)
                    }
                  >
                    Remove
                  </button>

                </div>

              </article>

            ))}

          </div>

        ) : (

          <div className="empty-message">

            <p>
              You have not saved any blogs yet.
            </p>

            <Link to="/blogs">
              Browse scholarship guides →
            </Link>

          </div>

        )}

      </section>


      {/* ======================================================
          EDIT PROFILE MODAL
      ====================================================== */}

      {editing && (

        <div
          className="edit-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-profile-title"
        >

          <div className="edit-modal-panel">


            {/* MODAL HEADER */}

            <div className="modal-heading">

              <div>

                <p className="eyebrow">
                  YOUR PROFILE
                </p>

                <h2 id="edit-profile-title">
                  Edit profile
                </h2>

              </div>


              <button
                type="button"
                className="modal-close"
                aria-label="Close profile editor"
                onClick={() => setEditing(false)}
              >
                ×
              </button>

            </div>


            {/* FORM */}

            <form
              className="edit-profile-form"
              onSubmit={save}
            >

              <div className="two-columns">


                <label>

                  Full name

                  <input
                    name="fullName"
                    defaultValue={user.fullName}
                    required
                  />

                </label>


                <label>

                  Phone number

                  <input
                    name="phone"
                    defaultValue={user.phone}
                    required
                  />

                </label>


                <label>

                  Institution

                  <input
                    name="institution"
                    defaultValue={user.institution}
                    required
                  />

                </label>


                <label>

                  Study level

                  <select
                    name="aspirant"
                    defaultValue={user.aspirant}
                  >

                    <option>
                      Undergraduate
                    </option>

                    <option>
                      Master's
                    </option>

                    <option>
                      PhD
                    </option>

                  </select>

                </label>

              </div>


              <label>

                Address

                <input
                  name="address"
                  defaultValue={user.address}
                  required
                />

              </label>


              {/* MODAL ACTIONS */}

              <div className="modal-actions">

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </button>


                <button
                  className="primary-button"
                >
                  Save changes
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </main>

  );
}