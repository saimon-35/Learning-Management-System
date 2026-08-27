import "./categorysection.css";

const categories = [
  {
    title: "Web Development",
    description: "Build modern websites and web applications.",
    icon: "💻",
    courses: "120+ Courses",
  },
  {
    title: "Data Science",
    description: "Learn data analysis, visualization, and AI.",
    icon: "📊",
    courses: "80+ Courses",
  },
  {
    title: "Mobile Development",
    description: "Create powerful Android and iOS applications.",
    icon: "📱",
    courses: "60+ Courses",
  },
  {
    title: "UI/UX Design",
    description: "Design beautiful and user-friendly experiences.",
    icon: "🎨",
    courses: "70+ Courses",
  },
  {
    title: "Digital Marketing",
    description: "Master marketing strategies for the digital world.",
    icon: "📈",
    courses: "50+ Courses",
  },
  {
    title: "Business",
    description: "Develop skills to grow and manage businesses.",
    icon: "💼",
    courses: "90+ Courses",
  },
];

export default function CategorySection() {
  return (
    <section className="category-section">
      <div className="category-container">
        <div className="category-header">
          <div>
            <span className="category-label">Explore Learning</span>

            <h2 className="category-title">
              Explore Our <span>Categories</span>
            </h2>
          </div>

          <p className="category-description">
            Discover courses across a wide range of subjects and find the
            perfect path for your learning journey.
          </p>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <a
              href="/courses"
              className="category-card"
              key={category.title}
            >
              <div className="category-icon">{category.icon}</div>

              <div className="category-content">
                <h3>{category.title}</h3>

                <p>{category.description}</p>

                <span>{category.courses}</span>
              </div>

              <div className="category-arrow">→</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}