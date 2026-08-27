import "./latestblogpost.css";

const blogPosts = [
  {
    id: 1,
    category: "Web Development",
    title: "How to Start Your Journey as a Web Developer",
    excerpt:
      "Learn the essential skills, tools, and roadmap you need to become a successful web developer.",
    author: "Alex Johnson",
    date: "Aug 20, 2026",
    readTime: "5 min read",
  },
  {
    id: 2,
    category: "Career",
    title: "10 Skills Every Software Engineer Should Learn",
    excerpt:
      "Discover the most important technical and professional skills that can help you grow your career.",
    author: "Sarah Williams",
    date: "Aug 16, 2026",
    readTime: "7 min read",
  },
  {
    id: 3,
    category: "Learning",
    title: "How to Build a Consistent Learning Habit",
    excerpt:
      "Simple strategies to stay motivated, manage your time, and make continuous learning a habit.",
    author: "Michael Brown",
    date: "Aug 12, 2026",
    readTime: "4 min read",
  },
];

export default function LatestBlogPost() {
  return (
    <section className="latest-blog-post">
      <div className="latest-blog-post-container">
        <div className="latest-blog-post-header">
          <div>
            <span className="latest-blog-post-label">From Our Blog</span>

            <h2 className="latest-blog-post-title">
              Latest <span>Blog Posts</span>
            </h2>
          </div>

          <a href="/blog" className="latest-blog-post-view-all">
            View All Posts <span>→</span>
          </a>
        </div>

        <div className="latest-blog-post-grid">
          {blogPosts.map((post) => (
            <article className="latest-blog-post-card" key={post.id}>
              <a
                href={`/blog/${post.id}`}
                className="latest-blog-post-image"
              >
                <span>{post.category}</span>
              </a>

              <div className="latest-blog-post-content">
                <div className="latest-blog-post-meta">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="latest-blog-post-card-title">
                  <a href={`/blog/${post.id}`}>{post.title}</a>
                </h3>

                <p className="latest-blog-post-excerpt">{post.excerpt}</p>

                <div className="latest-blog-post-footer">
                  <span className="latest-blog-post-author">
                    By {post.author}
                  </span>

                  <a
                    href={`/blog/${post.id}`}
                    className="latest-blog-post-read-more"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}