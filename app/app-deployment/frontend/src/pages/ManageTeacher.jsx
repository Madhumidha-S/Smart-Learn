import { useState } from "react";
import TeacherFormModal from "../components/TeacherFormModel";
import ConfirmModal from "../components/ConfirmModal";

const ManageTeachersTab = () => {
  const [teachers, setTeachers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = (id) => {
    setTeachers((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSave = (teacher) => {
    if (teacher.id) {
      setTeachers((prev) =>
        prev.map((t) => (t.id === teacher.id ? teacher : t))
      );
    } else {
      const newId = Math.max(...teachers.map((t) => t.id)) + 1;
      setTeachers((prev) => [...prev, { ...teacher, id: newId }]);
    }
    setModalOpen(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Manage Teachers</h3>
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
      <TeacherFormModal
        open={modalOpen}
        teacher={editingTeacher}
        onClose={() => setModalOpen(false)}
        onSaved={handleSave}
      />
      <ConfirmModal
        open={confirmOpen}
        title="Delete Teacher"
        message="Are you sure you want to delete this teacher?"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          handleDelete(deleteId);
          setConfirmOpen(false);
        }}
      />
    </div>
  );
};

export default ManageTeachersTab;
