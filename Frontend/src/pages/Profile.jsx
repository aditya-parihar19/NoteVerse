import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { logout } from "../store/authSlice";
import { deleteUserApi } from "../api/auth"; // your delete API
import toast from "react-hot-toast";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirm) return;

    setLoading(true);
    try {
      const res  = await deleteUserApi(user?.id);
      dispatch(logout());
      toast.success(res.message || "Account deleted successfully.");
      navigate("/");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error(error.message || "Failed to delete account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 pt-20 pb-12">
        <div className="bg-white shadow-lg rounded-xl p-8">
          {/* Header */}
          <div className="flex items-center gap-6 border-b pb-6">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-[#219EBC] flex items-center justify-center text-white text-3xl font-bold">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#023047]">
                {user?.name || "User"}
              </h1>
              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>

          {/* Profile Info */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <ProfileItem label="Full Name" value={user?.name} />
            <ProfileItem label="Email" value={user?.email} />
            <ProfileItem label="Role" value={user?.role || "Student"} />
            <ProfileItem
              label="Joined On"
              value={
                user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "—"
              }
            />
          </div>

          {/* Actions */}
          <div className="mt-10">
            <button
              onClick={handleDelete}
              disabled={loading}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-800 transition disabled:opacity-50"
            >
              {loading ? "Deleting..." : "Delete Account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Read-only field component
function ProfileItem({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-lg font-medium text-[#023047]">{value || "—"}</p>
    </div>
  );
}
