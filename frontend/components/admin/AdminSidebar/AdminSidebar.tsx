"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./AdminSidebar.module.css";

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <h2>LMS Admin</h2>
      </div>

      <nav className={styles.navigation}>
        <Link
          href="/admin"
          className={`${styles.navItem} ${
            isActive("/admin")
              ? styles.active
              : ""
          }`}
        >
          <span>📊</span>
          Dashboard
        </Link>

        <Link
          href="/admin/users"
          className={`${styles.navItem} ${
            isActive("/admin/users")
              ? styles.active
              : ""
          }`}
        >
          <span>👥</span>
          Users
        </Link>

        <Link
          href="/admin/courses"
          className={`${styles.navItem} ${
            isActive("/admin/courses")
              ? styles.active
              : ""
          }`}
        >
          <span>📚</span>
          Courses
        </Link>
      </nav>
    </aside>
  );
}