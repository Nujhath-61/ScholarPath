import { useParams, Link } from "react-router-dom";
import { blogs } from "../data/blogs";
import { useState } from "react";
import "../styles/blogDetails.css";

function BlogDetails() {

    const { id } = useParams();

    const blog = blogs.find(
        (item) => item.id === Number(id)
    );

    const [saved, setSaved] = useState(false);


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


    const relatedBlogs = blogs.filter(
        (item) =>
            item.category === blog.category &&
            item.id !== blog.id
    );


    function saveBlog(){

        setSaved(!saved);

        let savedBlogs =
            JSON.parse(
                localStorage.getItem("savedBlogs")
            ) || [];


        if(!saved){

            savedBlogs.push(blog);

        }
        else{

            savedBlogs =
            savedBlogs.filter(
                item => item.id !== blog.id
            );

        }


        localStorage.setItem(
            "savedBlogs",
            JSON.stringify(savedBlogs)
        );

    }



    return (

        <main className="blog-details">

            <article className="blog-container">


                <span className="blog-tag">
                    {blog.category}
                </span>


                <h1>
                    {blog.title}
                </h1>



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



                <div className="article-content">

                    {blog.content}

                </div>



                <div className="blog-actions">

                    <button
                        onClick={saveBlog}
                        className="save-btn"
                    >
                        {saved ? 
                        "❤️ Saved" : 
                        "🤍 Save Blog"}
                    </button>


                    <Link
                        to="/blogs"
                        className="back-btn"
                    >
                        ← Back to Blogs
                    </Link>

                </div>



                {/* Author */}

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



            {/* Related Blogs */}

            {
                relatedBlogs.length > 0 &&

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

            }


        </main>

    );
}


export default BlogDetails;