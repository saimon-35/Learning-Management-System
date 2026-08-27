import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          Edu<span>Learn</span>
        </a>

        <div className="navbar-links">
          <a href="/" className="navbar-link navbar-link-active">
            Home
          </a>

          <a href="/courses" className="navbar-link">
            Courses
          </a>

          <a href="/categories" className="navbar-link">
            Categories
          </a>

          <a href="/instructors" className="navbar-link">
            Instructors
          </a>
        </div>

        <div className="navbar-actions">
          <a href="/login" className="navbar-login">
            Log in
          </a>

          <a href="/signup" className="navbar-signup">
            Sign up
          </a>
        </div>
      </div>
    </nav>
  );
}
