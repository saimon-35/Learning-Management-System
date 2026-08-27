import "./herosection.css";

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <span className="hero-badge">Learn Without Limits</span>

          <h1 className="hero-title">
            Build Skills.
            <br />
            <span>Build Your Future.</span>
          </h1>

          <p className="hero-description">
            Learn from expert instructors, master in-demand skills, and take
            your career to the next level with our online courses.
          </p>

          <div className="hero-actions">
            <a href="/courses" className="hero-primary-button">
              Explore Courses
            </a>

            <a href="/signup" className="hero-secondary-button">
              Start Learning
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <strong>10K+</strong>
              <span>Students</span>
            </div>

            <div className="hero-stat">
              <strong>500+</strong>
              <span>Courses</span>
            </div>

            <div className="hero-stat">
              <strong>100+</strong>
              <span>Instructors</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card hero-card-main">
            <div className="hero-card-icon">🎓</div>

            <div className="hero-card-content">
              <span>Featured Course</span>
              <strong>Master Modern Development</strong>
            </div>

            <div className="hero-progress">
              <div className="hero-progress-bar">
                <span />
              </div>
              <small>75% completed</small>
            </div>
          </div>

          <div className="hero-floating-card hero-floating-card-top">
            <span className="hero-floating-icon">✓</span>
            <div>
              <strong>Keep Learning</strong>
              <small>You are doing great!</small>
            </div>
          </div>

          <div className="hero-floating-card hero-floating-card-bottom">
            <span className="hero-floating-icon">★</span>
            <div>
              <strong>4.9 / 5</strong>
              <small>Student Rating</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}