import { useForm } from "react-hook-form";
import { useState } from "react";
import { uploadMaterialApi } from "../api/studyMaterial";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

export default function UploadMaterial() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("type", data.type);
      formData.append("subject", data.subject);
      formData.append("course", data.course);
      formData.append("branch", data.branch);
      formData.append("semester", data.semester);
      formData.append("file", data.file[0]);

      await uploadMaterialApi(formData);

      toast.success("Material uploaded successfully 🎉");
      reset();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to upload material"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Navbar */}
      <Navbar />

      <main className="pt-20 max-w-6xl mx-auto px-6">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#023047]">
            Upload Study Material
          </h1>
          <p className="text-gray-500 mt-2">
            Upload notes or previous year question papers
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Title
              </label>
              <input
                {...register("title", { required: "Title is required" })}
                placeholder="e.g. DBMS Unit-1 Notes"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#219EBC]"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            {/* Type */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Material Type
              </label>
              <select
                {...register("type", { required: "Type is required" })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#219EBC]"
              >
                <option value="">Select type</option>
                <option value="notes">Notes</option>
                <option value="pyq">PYQ</option>
              </select>
              {errors.type && (
                <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
              )}
            </div>

            {/* Subject */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Subject</label>
              <input
                {...register("subject", { required: "Subject is required" })}
                placeholder="e.g. Database Management System"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#219EBC]"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
              )}
            </div>

            {/* Course & Branch */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Course</label>
                <input
                  {...register("course", { required: "Course is required" })}
                  placeholder="e.g. B.Tech"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#219EBC]"
                />
                {errors.course && (
                  <p className="text-red-500 text-sm mt-1">{errors.course.message}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Branch</label>
                <input
                  {...register("branch", { required: "Branch is required" })}
                  placeholder="e.g. CSE"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#219EBC]"
                />
                {errors.branch && (
                  <p className="text-red-500 text-sm mt-1">{errors.branch.message}</p>
                )}
              </div>
            </div>

            {/* Semester */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Semester</label>
              <select
                {...register("semester", { required: "Semester is required" })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#219EBC]"
              >
                <option value="">Select semester</option>
                {[1,2,3,4,5,6,7,8].map((sem) => (
                  <option key={sem} value={sem}>Semester {sem}</option>
                ))}
              </select>
              {errors.semester && (
                <p className="text-red-500 text-sm mt-1">{errors.semester.message}</p>
              )}
            </div>

            {/* File */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Upload File (PDF)</label>
              <input
                type="file"
                accept=".pdf"
                {...register("file", { required: "File is required" })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:bg-[#023047] file:text-white
                  hover:file:bg-[#03506F]"
              />
              {errors.file && (
                <p className="text-red-500 text-sm mt-1">{errors.file.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#023047] text-white py-3 rounded-xl font-semibold hover:bg-[#03506F] transition disabled:opacity-60"
            >
              {loading ? "Uploading..." : "Upload Material"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
