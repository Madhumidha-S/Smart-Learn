import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchStudents, createStudent, updateStudent, deleteStudent } from "../api/studentsApi";
import StudentForm from "../components/StudentForm";
import ConfirmModal from "../components/ConfirmModal";
import { toast } from "react-toastify";
import DashboardLayout from "../components/DashboardLayout";

const StudentsPage = () => {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");

  const [isFormOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const { data, isLoading, isError } = useQuery(
    ["students", { page, limit, search, sortBy, sortOrder }],
    () => fetchStudents({ page, limit, search, sortBy, sortOrder }),
    { keepPreviousData: true, staleTime: 1000 * 60 * 0.5 } 
  );

  const createMut = useMutation(createStudent, {
    onSuccess: () => {
      toast.success("Student created");
      queryClient.invalidateQueries({ queryKey: ["students"] });
      setFormOpen(false);
    },
    onError: (err) => toast.error(err?.message || "Create failed"),
  });

  const updateMut = useMutation(({ id, payload }) => updateStudent({ id, payload }), {
    onSuccess: () => {
      toast.success("Student updated");
      queryClient.invalidateQueries({ queryKey: ["students"] });
      setFormOpen(false);
      setEditing(null);
    },
    onError: (err) => toast.error(err?.message || "Update failed"),
  });

  const deleteMut = useMutation((id) => deleteStudent(id), {
    onSuccess: () => {
      toast.success("Student deleted");
      queryClient.invalidateQueries({ queryKey: ["students"] });
      setConfirmOpen(false);
      setDeletingId(null);
    },
    onError: (err) => toast.error(err?.message || "Delete failed"),
  });

  const onOpenAdd = () => { setEditing(null); setFormOpen(true); };
  const onOpenEdit = (s) => { setEditing(s); setFormOpen(true); };
  const onOpenDelete = (id) => { setDeletingId(id); setConfirmOpen(true); };

  const handleSubmitForm = (vals) => {
    if (editing) {
      updateMut.mutate({ id: editing.id, payload: vals });
    } else {
      createMut.mutate(vals);
    }
  };

  const handleConfirmDelete = () => {
    if (deletingId) deleteMut.mutate(deletingId);
  };

  const total = data?.total || 0;
  const students = data?.data || [];

  const totalPages = Math.max(1, Math.ceil(total / limit));

  const handleSort = (field) => {
    if (sortBy === field) setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    else { setSortBy(field); setSortOrder("asc"); }
  };

  const links = [
    { to: "/teacher", label: "Dashboard" },
    { to: "/teacher/students", label: "Student List" },
    { to: "/teacher/courses", label: "Courses" },
  ];

  return (
    <DashboardLayout links={links}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Students</h1>

        <div className="flex items-center gap-3">
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by name or email..."
            className="px-3 py-2 border rounded-lg"
          />
          <button onClick={onOpenAdd} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Add Student
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow border">
        {isLoading ? (
          <div className="py-10 text-center text-gray-500">Loading...</div>
        ) : isError ? (
          <div className="py-10 text-center text-red-500">Error loading students</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-gray-600 bg-gray-50">
                    <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort("name")}>
                      Name {sortBy === "name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                    </th>
                    <th className="py-3 px-4">Course</th>
                    <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort("progress")}>
                      Progress {sortBy === "progress" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                    </th>
                    <th className="py-3 px-4">Guardian</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {students.length === 0 ? (
                    <tr><td className="py-6 px-4 text-center" colSpan={5}>No students found</td></tr>
                  ) : (
                    students.map((s) => (
                      <tr key={s.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{s.name}</td>
                        <td className="py-3 px-4">{s.course || "-"}</td>
                        <td className="py-3 px-4">{s.progress || "0%"}</td>
                        <td className="py-3 px-4">{s.guardian || "-"}</td>
                        <td className="py-3 px-4 text-right">
                          <div className="inline-flex gap-2">
                            <button onClick={() => onOpenEdit(s)} className="text-blue-600">Edit</button>
                            <button onClick={() => onOpenDelete(s.id)} className="text-red-600">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-600">
                Showing {(page - 1) * limit + 1}-{Math.min(page * limit, total)} of {total}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Prev
                </button>
                <div className="px-3 py-1 border rounded bg-gray-50">{page}</div>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <StudentForm
        open={isFormOpen}
        initialValues={editing}
        onClose={() => { setFormOpen(false); setEditing(null); }}
        onSubmit={handleSubmitForm}
        loading={createMut.isLoading || updateMut.isLoading}
      />

      <ConfirmModal
        open={confirmOpen}
        title="Delete student"
        message="Are you sure you want to delete this student? This action cannot be undone."
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={deleteMut.isLoading}
      />
    </DashboardLayout>
  );
};

export default StudentsPage;
