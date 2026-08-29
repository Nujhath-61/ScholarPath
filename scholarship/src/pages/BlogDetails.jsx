import { useParams, Link, useNavigate } from "react-router-dom";
import { blogs } from "../data/blogs";
import { useState } from "react";
import "../styles/blogDetails.css";

const savedBlogsKey = (userId) => `savedBlogs_${userId}`;

function BlogDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const blog = blogs.find(
        (item) => item.id === Number(id)
    );

    const [, refreshSavedState] = useState(0);

    const savedUser = JSON.parse(
        localStorage.getItem("currentUser") || "null"
    );

    const saved = savedUser
        ? JSON.parse(
              localStorage.getItem(
                  savedBlogsKey(savedUser.id)
              ) || "[]"
          ).some(
              (item) => item.id === Number(id)
          )
        : false;


    // ==========================================
    // BLOG NOT FOUND
    // ==========================================

    if (!blog) {
        return (
            <div className="not-found">
                <h2>Blog not found</h2>

                <Link to="/blogs">
                    Back to Blogs
                </Link>
            </div>
        );
    }


    // ==========================================
    // RELATED BLOGS
    // ==========================================

    const relatedBlogs = blogs.filter(
        (item) =>
            item.category === blog.category &&
            item.id !== blog.id
    );


    // ==========================================
    // SAVE / REMOVE BLOG
    // ==========================================

    function saveBlog() {

        // ------------------------------------------
        // 1. CHECK LOGIN
        // ------------------------------------------

        const currentUser = JSON.parse(
            localStorage.getItem("currentUser") || "null"
        );

        if (!currentUser) {

            alert("Please log in to save a blog.");

            navigate("/login");

            return;
        }


        // ------------------------------------------
        // 2. GET SAVED BLOGS
        // ------------------------------------------

        let savedBlogs = JSON.parse(
            localStorage.getItem(
                savedBlogsKey(currentUser.id)
            ) || "[]"
        );


        // ------------------------------------------
        // 3. SAVE BLOG
        // ------------------------------------------

        if (!saved) {

            const alreadySaved = savedBlogs.some(
                (item) => item.id === blog.id
            );

            if (!alreadySaved) {
                savedBlogs.push(blog);
            }

            refreshSavedState(
                (version) => version + 1
            );

        }


        // ------------------------------------------
        // 4. REMOVE BLOG
        // ------------------------------------------

        else {

            savedBlogs = savedBlogs.filter(
                (item) => item.id !== blog.id
            );

            refreshSavedState(
                (version) => version + 1
            );
        }


        // ------------------------------------------
        // 5. UPDATE LOCAL STORAGE
        // ------------------------------------------

        localStorage.setItem(
            savedBlogsKey(currentUser.id),
            JSON.stringify(savedBlogs)
        );
    }


    // ==========================================
    // PAGE
    // ==========================================

    return (

        <main className="blog-details">

            <article className="blog-container">

                {/* Category */}

                <span className="blog-tag">
                    {blog.category}
                </span>


                {/* Title */}

                <h1>
                    {blog.title}
                </h1>


                {/* Blog Information */}

                <div className="blog-info">

                    <span>
                        👤 {blog.author}
                    </span>

                    <span>
                        📅 {blog.date}
                    </span>

                    <span>
                        ⏱ {blog.readTime}
                    </span>

                </div>


                {/* ==========================================
                    BLOG CONTENT
                ========================================== */}

                <div
                    className="article-content"
                    dangerouslySetInnerHTML={{
                        __html: blog.content
                    }}
                />


                {/* ==========================================
                    ACTION BUTTONS
                ========================================== */}

                <div className="blog-actions">

                    <button
                        onClick={saveBlog}
                        className="save-btn"
                    >
                        {saved
                            ? "❤️ Saved"
                            : "🤍 Save Blog"
                        }
                    </button>


                    <Link
                        to="/blogs"
                        className="back-btn"
                    >
                        ← Back to Blogs
                    </Link>

                </div>


                {/* ==========================================
                    AUTHOR
                ========================================== */}

                <section className="author-box">

                    <div className="author-avatar">
                        SP
                    </div>


                    <div>

                        <h3>
                            ScholarPath Team
                        </h3>

                        <p>
                            Helping students discover
                            scholarships and study
                            opportunities.
                        </p>

                    </div>

                </section>

            </article>


            {/* ==========================================
                RELATED BLOGS
            ========================================== */}

            {
                relatedBlogs.length > 0 && (

                    <section className="related">

                        <h2>
                            Related Articles
                        </h2>


                        <div className="related-grid">

                            {
                                relatedBlogs.map(item => (

                                    <div
                                        className="related-card"
                                        key={item.id}
                                    >

                                        <img
                                            src={item.image}
                                            alt={item.title}
                                        />


                                        <div>

                                            <h3>
                                                {item.title}
                                            </h3>


                                            <Link
                                                to={`/blogs/${item.id}`}
                                            >
                                                Read More →
                                            </Link>

                                        </div>

                                    </div>

                                ))
                            }

                        </div>

                    </section>

                )
            }

        </main>
    );
}


export default BlogDetails;