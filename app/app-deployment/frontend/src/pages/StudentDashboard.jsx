import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../context/AuthContext";

const StudentDashboard = () => {
  const { user } = useAuth();

  const links = [
    { to: "/student", label: "Profile" },
    { to: "/student/courses", label: "My Courses" },
  ];

  return (
    <DashboardLayout links={links}>
      <h1 className="text-2xl font-bold text-purple-700 mb-6">My Profile</h1>

      <div className="bg-white p-6 rounded-xl shadow border max-w-md">
        <p className="text-gray-600 mb-2">
          <strong>Email:</strong> {user?.email || "shiv@gmail.com"}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Role:</strong> Student
        </p>
        <p className="text-gray-600">
          <strong>Joined:</strong> March 2025
        </p>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
