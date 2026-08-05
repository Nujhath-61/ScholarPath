import { Link } from "react-router-dom";

function BlogCard({ blog }) {
  return (
    <article className="blog-card">

      <div className="blog-content">

        <span className="blog-category">
          {blog.category}
        </span>

        <h3>
          {blog.title}
        </h3>

        <p className="blog-description">
          {blog.description}
        </p>

        <div className="blog-meta">

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

        <Link
          to={`/blogs/${blog.id}`}
          className="read-more"
        >
          Read More →
        </Link>

      </div>

    </article>
  );
}

export default BlogCard;