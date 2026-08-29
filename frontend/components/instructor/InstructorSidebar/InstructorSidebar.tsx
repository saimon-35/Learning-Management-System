"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./InstructorSidebar.module.css";

const menuItems = [
  {
    label: "Dashboard",
    href: "/instructor",
    icon: "📊",
  },
  {
    label: "My Courses",
    href: "/instructor/courses",
    icon: "📚",
  },
  {
    label: "Create Course",
    href: "/instructor/courses/create",
    icon: "➕",
  },
  {
    label: "Students",
    href: "/instructor/students",
    icon: "👥",
  },
];

export default function InstructorSidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <h2 className={styles.title}>Instructor Panel</h2>
      </div>

      <nav className={styles.navigation}>
        {menuItems.map((item) => {
          const isActive =
            item.href === "/instructor"
              ? pathname === item.href
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.menuItem} ${
                isActive ? styles.active : ""
              }`}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <Link href="/" className={styles.backLink}>
          <span className={styles.icon}>←</span>
          Back to Website
        </Link>
      </div>
    </aside>
  );
}