import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <a href="/" className="footer-logo">
              Edu<span>Learn</span>
            </a>

            <p className="footer-description">
              Learn new skills, grow your career, and build a better future
              with expert-led online courses.
            </p>

            <div className="footer-socials">
              <a href="#" aria-label="Facebook">
                f
              </a>
              <a href="#" aria-label="Twitter">
                X
              </a>
              <a href="#" aria-label="LinkedIn">
                in
              </a>
              <a href="#" aria-label="Instagram">
                ◎
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h3>Platform</h3>

            <a href="/courses">Courses</a>
            <a href="/categories">Categories</a>
            <a href="/instructors">Instructors</a>
            <a href="/blog">Blog</a>
          </div>

          <div className="footer-column">
            <h3>Company</h3>

            <a href="/about">About Us</a>
            <a href="/contact">Contact Us</a>
            <a href="/careers">Careers</a>
            <a href="/become-instructor">Become an Instructor</a>
          </div>

          <div className="footer-column">
            <h3>Support</h3>

            <a href="/help">Help Center</a>
            <a href="/faq">FAQ</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms & Conditions</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 EduLearn. All rights reserved.</p>

          <div className="footer-bottom-links">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/cookies">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}