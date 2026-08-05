import { useState } from "react";
import { blogs } from "../data/blogs";
import BlogCard from "../components/BlogCard";
import "../styles/blog.css";

function Blogs() {

    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = [
        "All",
        ...new Set(blogs.map((blog) => blog.category))
    ];

    const featuredBlog = blogs[0];

    const filteredBlogs =
        selectedCategory === "All"
            ? blogs
            : blogs.filter(
                (blog) => blog.category === selectedCategory
            );

    return (

        <main className="blogs-page">

            {/* Hero Section */}

            <section className="blog-hero">

                <p className="blog-hero-tag">
                    SCHOLARPATH BLOG
                </p>

                <h1>
                    Scholarship Tips, Study Abroad Guides &
                    Student Resources
                </h1>

                <p className="blog-hero-description">
                    Learn how to prepare stronger scholarship
                    applications, write better SOPs, ace interviews,
                    and study abroad with confidence.
                </p>

            </section>


            {/* Featured Blog */}

            <section className="featured-blog">

                <div className="featured-content">

                    <span className="featured-category">
                        {featuredBlog.category}
                    </span>

                    <h2>
                        {featuredBlog.title}
                    </h2>

                    <p>
                        {featuredBlog.description}
                    </p>

                    <div className="featured-meta">

                        <span>
                            👤 {featuredBlog.author}
                        </span>

                        <span>
                            📅 {featuredBlog.date}
                        </span>

                        <span>
                            ⏱ {featuredBlog.readTime}
                        </span>

                    </div>

                </div>

            </section>


            {/* Category Filters */}

            <section className="category-section">

                {categories.map((category) => (

                    <button
                        key={category}
                        className={
                            selectedCategory === category
                                ? "category active"
                                : "category"
                        }
                        onClick={() =>
                            setSelectedCategory(category)
                        }
                    >
                        {category}
                    </button>

                ))}

            </section>


            {/* Blog Cards */}

            <section className="blogs-grid">

                {
                    filteredBlogs
                        .filter(
                            (blog) =>
                                blog.id !== featuredBlog.id
                        )
                        .map((blog) => (

                            <BlogCard
                                key={blog.id}
                                blog={blog}
                            />

                        ))
                }

            </section>

        </main>

    );

}

export default Blogs;