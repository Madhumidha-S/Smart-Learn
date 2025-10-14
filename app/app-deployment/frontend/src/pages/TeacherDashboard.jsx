import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import {
  fetchStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../api/StudentAPI";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  age: yup.number().required("Age is required").positive().integer(),
  guardian_name: yup.string().required("Guardian name required"),
  guardian_phone: yup.string().required("Guardian phone required"),
});

const TeacherDashboard = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);

  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const { data, isLoading } = useQuery({
    queryKey: ["students", page, search],
    queryFn: () => fetchStudents({ page, search }),
  });

  const addMutation = useMutation({
    mutationFn: addStudent,
    onSuccess: () => {
      queryClient.invalidateQueries(["students"]);
      toast.success("Student added");
      reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateStudent,
    onSuccess: () => {
      queryClient.invalidateQueries(["students"]);
      toast.success("Student updated");
      setEditing(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries(["students"]);
      toast.success("Student deleted");
    },
  });

  const onSubmit = (formData) => {
    if (editing) updateMutation.mutate({ id: editing.id, payload: formData });
    else addMutation.mutate(formData);
  };

  if (isLoading) return <Loader />;

  const students = data?.data || [];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        links={[
          { to: "/teacher", label: "Students" },
          { to: "/teacher/courses", label: "Courses" },
        ]}
      />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Student Management
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-6 rounded-xl shadow-md mb-6 flex gap-4 flex-wrap"
          >
            <input
              {...register("name")}
              placeholder="Name"
              className="border p-2 rounded w-48"
            />
            <input
              {...register("age")}
              placeholder="Age"
              type="number"
              className="border p-2 rounded w-24"
            />
            <input
              {...register("guardian_name")}
              placeholder="Guardian Name"
              className="border p-2 rounded w-48"
            />
            <input
              {...register("guardian_phone")}
              placeholder="Guardian Phone"
              className="border p-2 rounded w-48"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
            >
              {editing ? "Update" : "Add"}
            </button>
          </form>

          <input
            type="text"
            placeholder="Search students..."
            className="border p-2 rounded mb-4 w-1/3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="bg-white shadow-md rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border-b">ID</th>
                  <th className="p-3 border-b">Name</th>
                  <th className="p-3 border-b">Age</th>
                  <th className="p-3 border-b">Guardian</th>
                  <th className="p-3 border-b">Phone</th>
                  <th className="p-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="p-3 border-b">{s.id}</td>
                    <td className="p-3 border-b">{s.name}</td>
                    <td className="p-3 border-b">{s.age}</td>
                    <td className="p-3 border-b">{s.guardian_name}</td>
                    <td className="p-3 border-b">{s.guardian_phone}</td>
                    <td className="p-3 border-b">
                      <button
                        onClick={() => setEditing(s)}
                        className="text-blue-600 hover:underline mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm("Delete this student?"))
                            deleteMutation.mutate(s.id);
                        }}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
