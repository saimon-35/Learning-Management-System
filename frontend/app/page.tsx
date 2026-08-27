import Navbar from "@/components/navbar/navbar";
import HeroSection from "@/components/home/herosection/herosection";
import CategorySection from "@/components/home/categorysection/categorysection";
import CourseSection from "@/components/home/coursesection/coursesection";
import LatestBlogPost from "@/components/home/latestblogpost/latestblogpost";
import Footer from "@/components/footer/footer";
export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <CategorySection />
      <CourseSection />
      <LatestBlogPost />
      <Footer />
    </main>
  );
}