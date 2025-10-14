import DashboardLayout from "../components/DashboardLayout";
import { BookOpen } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:3001/course", {
          withCredentials: true,
        });
        setCourses(res.data.courses || []);
      } catch (err) {
        setError("Failed to load courses. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Loading courses...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500 font-medium">
        {error}
      </div>
    );

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <div className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-8 flex items-center gap-3">
          <BookOpen size={28} /> Available Courses
        </h2>

        {courses.length === 0 ? (
          <div className="text-gray-500 text-lg">No courses available yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <span className="text-sm text-blue-600">
                  Category: {course.category || "N/A"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
