import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("Name is required").min(2, "Too short"),
  age: yup.number().required("Age is required").min(3, "Invalid age").max(120),
  guardian: yup.string().nullable(),
  email: yup.string().email("Invalid email").nullable(),
}).required();

const StudentForm = ({ open, initialValues = null, onClose, onSubmit, loading }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues || { name: "", age: "", guardian: "", email: "" }
  });

  useEffect(() => {
    reset(initialValues || { name: "", age: "", guardian: "", email: "" });
  }, [initialValues, reset]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form
        onSubmit={handleSubmit((vals) => onSubmit(vals))}
        className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-lg"
      >
        <h3 className="text-lg font-semibold mb-4">
          {initialValues ? "Edit Student" : "Add Student"}
        </h3>

        <div className="grid gap-3">
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input {...register("name")} className="w-full mt-1 px-3 py-2 border rounded" />
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Age</label>
            <input type="number" {...register("age")} className="w-full mt-1 px-3 py-2 border rounded" />
            {errors.age && <p className="text-xs text-red-500">{errors.age.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Guardian</label>
            <input {...register("guardian")} className="w-full mt-1 px-3 py-2 border rounded" />
            {errors.guardian && <p className="text-xs text-red-500">{errors.guardian.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input {...register("email")} className="w-full mt-1 px-3 py-2 border rounded" />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
