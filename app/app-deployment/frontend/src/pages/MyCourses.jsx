import { useQuery } from "@tanstack/react-query";
import { fetchCourses } from "../api/axiosCourse";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

const MyCourses = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  if (isLoading) return <Loader />;
  if (isError)
    return <div className="p-8 text-red-500">Failed to load courses</div>;

  const courses = data?.courses || [];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        links={[
          { to: "/teacher", label: "Students" },
          { to: "/courses", label: "Courses" },
        ]}
      />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Courses
          </h2>

          {courses.length === 0 ? (
            <div className="text-gray-600 text-center mt-12">
              No courses available yet.
            </div>
          ) : (
            <div className="bg-white shadow-md rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 border-b">ID</th>
                    <th className="p-3 border-b">Title</th>
                    <th className="p-3 border-b">Category</th>
                    <th className="p-3 border-b">Description</th>
                    <th className="p-3 border-b">Instructor</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-50">
                      <td className="p-3 border-b">{course.id}</td>
                      <td className="p-3 border-b font-medium text-gray-900">
                        {course.title}
                      </td>
                      <td className="p-3 border-b">{course.category}</td>
                      <td className="p-3 border-b text-gray-600">
                        {course.description}
                      </td>
                      <td className="p-3 border-b">
                        {course.instructor?.name || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
