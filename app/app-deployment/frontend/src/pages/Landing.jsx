import { useNavigate } from "react-router-dom";
import { GraduationCap, BookOpen, Users, Mail } from "lucide-react";
import { useEffect, useState } from "react";

export default function Landing() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 scroll-smooth">
      {/* Navbar */}
      <nav
        className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 backdrop-blur-md ${
          scrolled
            ? "bg-white/90 shadow-md py-3"
            : "bg-blue-50/95 shadow-sm py-4"
        }`}
      >
        <div className="flex justify-between items-center px-8">
          <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
            <GraduationCap className="w-7 h-7 text-blue-600" />
            Smart Learn
          </h1>

          <div className="flex items-center gap-8 text-sm font-medium">
            <button
              onClick={() => scrollToSection("home")}
              className="hover:text-blue-600 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="hover:text-blue-600 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-blue-600 transition-colors"
            >
              Contact
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-sm"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-1.5 text-blue-700 rounded-lg transform hover:scale-105 transition-all duration-300 shadow-inner border-2 border-blue-600"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="flex flex-col items-center justify-center text-center py-60 px-6 bg-gradient-to-b from-blue-50 to-white"
      >
        <h2 className="text-5xl font-bold text-blue-700 mb-4 leading-tight">
          Empowering Learning for Everyone
        </h2>
        <p className="text-gray-600 max-w-2xl mb-8 text-lg">
          A collaborative platform that connects students, teachers, and
          administrators with seamless course management and progress tracking.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="px-8 py-3 text-lg bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-md"
        >
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="py-60 px-8 bg-blue-50 text-center">
        <h3 className="text-3xl font-bold text-blue-700 mb-10">
          Why Choose Smart Learn?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <BookOpen className="w-10 h-10 text-blue-600 mx-auto mb-4" />
            <h4 className="font-semibold text-lg mb-2">Course Management</h4>
            <p className="text-gray-600 text-sm">
              Effortlessly manage and track courses with intuitive interfaces
              for teachers and students.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <Users className="w-10 h-10 text-blue-600 mx-auto mb-4" />
            <h4 className="font-semibold text-lg mb-2">Collaboration Tools</h4>
            <p className="text-gray-600 text-sm">
              Stay connected and collaborate efficiently across roles with
              real-time data synchronization.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <GraduationCap className="w-10 h-10 text-blue-600 mx-auto mb-4" />
            <h4 className="font-semibold text-lg mb-2">Smart Dashboards</h4>
            <p className="text-gray-600 text-sm">
              Gain insights and control through personalized dashboards designed
              for your role.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-56 px-8 md:px-20 bg-white text-center border-t border-gray-100"
      >
        <h3 className="text-3xl font-bold text-blue-700 mb-6">
          About Smart Learn
        </h3>
        <p className="max-w-4xl mx-auto text-gray-700 text-lg leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-32 px-6 bg-blue-600 text-white text-center"
      >
        <h3 className="text-3xl font-semibold mb-6">Get in Touch</h3>
        <p className="mb-6 max-w-xl mx-auto text-blue-100">
          Have questions or want to collaborate? Reach out to us anytime!
        </p>
        <a
          href="mailto:madhumidha072005@gmail.com"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition-all"
        >
          <Mail className="w-5 h-5" />
          Contact Us
        </a>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gray-50 border-t text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} Smart Learn. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-4 text-gray-500">
          <button
            onClick={() => scrollToSection("home")}
            className="hover:text-blue-600"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="hover:text-blue-600"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="hover:text-blue-600"
          >
            Contact
          </button>
        </div>
      </footer>
    </div>
  );
}
