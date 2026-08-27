import "./coursesection.css";

const courses = [
  {
    id: 1,
    category: "Web Development",
    title: "Complete Modern Web Development Bootcamp",
    instructor: "Alex Johnson",
    rating: "4.9",
    students: "12.5K",
    price: "$49.99",
    oldPrice: "$89.99",
    level: "Beginner",
  },
  {
    id: 2,
    category: "Data Science",
    title: "Python for Data Science and Machine Learning",
    instructor: "Sarah Williams",
    rating: "4.8",
    students: "8.7K",
    price: "$44.99",
    oldPrice: "$79.99",
    level: "Intermediate",
  },
  {
    id: 3,
    category: "UI/UX Design",
    title: "UI/UX Design Masterclass with Figma",
    instructor: "Michael Brown",
    rating: "4.9",
    students: "6.3K",
    price: "$39.99",
    oldPrice: "$69.99",
    level: "Beginner",
  },
  {
    id: 4,
    category: "Mobile Development",
    title: "Build Android Apps with Modern Development",
    instructor: "David Miller",
    rating: "4.7",
    students: "5.9K",
    price: "$42.99",
    oldPrice: "$74.99",
    level: "Intermediate",
  },
];

export default function CourseSection() {
  return (
    <section className="course-section">
      <div className="course-container">
        <div className="course-header">
          <div>
            <span className="course-label">Popular Courses</span>

            <h2 className="course-title">
              Learn From the <span>Best Courses</span>
            </h2>
          </div>

          <a href="/courses" className="course-view-all">
            View All Courses <span>→</span>
          </a>
        </div>

        <div className="course-grid">
          {courses.map((course) => (
            <article className="course-card" key={course.id}>
              <div className="course-thumbnail">
                <div className="course-thumbnail-content">
                  <span>{course.category}</span>
                  <strong>Course</strong>
                </div>

                <span className="course-level">{course.level}</span>
              </div>

              <div className="course-card-content">
                <h3 className="course-card-title">{course.title}</h3>

                <p className="course-instructor">{course.instructor}</p>

                <div className="course-rating">
                  <strong>{course.rating}</strong>
                  <span className="course-stars">★★★★★</span>
                  <span>({course.students})</span>
                </div>

                <div className="course-price">
                  <strong>{course.price}</strong>
                  <span>{course.oldPrice}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}