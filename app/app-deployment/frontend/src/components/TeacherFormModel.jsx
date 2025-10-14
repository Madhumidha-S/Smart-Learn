import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  specialization: yup.string().required("Specialization is required"),
});

const TeacherFormModal = ({ open, teacher, onClose, onSaved }) => {
  const { register, handleSubmit, reset, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (teacher) {
      setValue("name", teacher.name);
      setValue("email", teacher.email);
      setValue("specialization", teacher.specialization || "");
    } else {
      reset();
    }
  }, [teacher, reset, setValue]);

  if (!open) return null;

  const onSubmit = async (data) => {
    try {
      if (teacher) {
        await axios.put(`http://localhost:3001/teachers/${teacher.id}`, data, {
          withCredentials: true,
        });
        toast.success("Teacher updated");
      } else {
        await axios.post("http://localhost:3001/teachers", data, {
          withCredentials: true,
        });
        toast.success("Teacher added");
      }
      onSaved();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save teacher");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">
          {teacher ? "Edit Teacher" : "Add Teacher"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            {...register("name")}
            placeholder="Name"
            className="border p-2 rounded w-full"
          />
          <input
            {...register("email")}
            placeholder="Email"
            type="email"
            className="border p-2 rounded w-full"
          />
          <input
            {...register("specialization")}
            placeholder="Specialization"
            className="border p-2 rounded w-full"
          />
          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              className="px-4 py-2 border rounded hover:bg-gray-100"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
            >
              {teacher ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherFormModal;
