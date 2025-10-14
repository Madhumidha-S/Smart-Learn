import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/DashboardLayout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import TeacherFormModal from "../components/TeacherFormModel";
import ConfirmModal from "../components/ConfirmModal";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const links = [
    { to: "/admin", label: "Analytics" },
    { to: "/admin/teachers", label: "Manage Teachers" },
  ];

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get("http://localhost:3001/analytics", {
        withCredentials: true,
      });
      setAnalytics(res.data);
    } catch (err) {
      console.error("Failed to fetch analytics:", err);
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await axios.get("http://localhost:3001/teachers", {
        withCredentials: true,
      });
      setTeachers(res.data.teachers);
    } catch (err) {
      console.error("Failed to fetch teachers:", err);
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      await Promise.all([fetchAnalytics(), fetchTeachers()]);
      setLoading(false);
    };
    fetchAll();
  }, []);

  // useEffect(() => {
  //   const dummyAnalytics = {
  //     summary: { totalStudents: 240, totalTeachers: 18, totalCourses: 35 },
  //     ageStats: [
  //       { age: 18, count: 50 },
  //       { age: 19, count: 40 },
  //       { age: 20, count: 60 },
  //     ],
  //     teacherStats: [
  //       { id: 1, name: "Alice", total_students: 10 },
  //       { id: 2, name: "Bob", total_students: 15 },
  //     ],
  //   };

  //   const dummyTeachers = [
  //     { id: 1, name: "Alice", email: "alice@example.com" },
  //     { id: 2, name: "Bob", email: "bob@example.com" },
  //   ];

  //   setAnalytics(dummyAnalytics);
  //   setTeachers(dummyTeachers);
  //   setLoading(false);
  // }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/teachers/${id}`, {
        withCredentials: true,
      });
      fetchTeachers();
    } catch (err) {
      console.error("Failed to delete teacher:", err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <DashboardLayout links={links}>
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      <div className="flex gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow flex-1">
          <p>Total Students</p>
          <p className="text-2xl font-bold">
            {analytics?.summary?.totalStudents}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow flex-1">
          <p>Total Teachers</p>
          <p className="text-2xl font-bold">
            {analytics?.summary?.totalTeachers}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow flex-1">
          <p>Total Courses</p>
          <p className="text-2xl font-bold">
            {analytics?.summary?.totalCourses}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="font-semibold mb-2">Students by Age</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={analytics?.ageStats}>
              <XAxis dataKey="age" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="font-semibold mb-2">Students per Teacher</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={analytics?.teacherStats}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total_students" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <p className="font-semibold">Teachers</p>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => {
              setEditingTeacher(null);
              setModalOpen(true);
            }}
          >
            Add Teacher
          </button>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50">
                <td className="border p-2">{t.id}</td>
                <td className="border p-2">{t.name}</td>
                <td className="border p-2">{t.email}</td>
                <td className="border p-2">
                  <button
                    className="text-blue-600 mr-2"
                    onClick={() => {
                      setEditingTeacher(t);
                      setModalOpen(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600"
                    onClick={() => {
                      setDeleteId(t.id);
                      setConfirmOpen(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TeacherFormModal
        open={modalOpen}
        teacher={editingTeacher}
        onClose={() => setModalOpen(false)}
        onSaved={fetchTeachers}
      />

      <ConfirmModal
        open={confirmOpen}
        title="Delete Teacher"
        message="Are you sure you want to delete this teacher?"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={async () => {
          await handleDelete(deleteId);
          setConfirmOpen(false);
        }}
      />
    </DashboardLayout>
  );
};

export default AdminDashboard;
