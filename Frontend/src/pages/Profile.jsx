import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { logout } from "../store/authSlice";
import { deleteUserApi } from "../api/auth";
import toast from "react-hot-toast";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmDelete) return;

    setLoading(true);
    try {
      const res = await deleteUserApi(user?.id);
      dispatch(logout());
      toast.success(res?.message || "Account deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error(error?.message || "Failed to delete account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />

      <main className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 space-y-8">

          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-bold text-[#023047]">Profile</h1>
            <p className="text-gray-500 mt-1">
              View and manage your account information
            </p>
          </div>

          {/* Profile Header Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-6 p-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#219EBC] to-[#8ECAE6] flex items-center justify-center text-white text-4xl font-bold shadow">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-[#023047]">
                  {user?.name || "User"}
                </h2>
                <p className="text-gray-500">{user?.email}</p>
                <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-[#E0F2FE] text-[#0369A1] font-medium">
                  {user?.role || "Student"}
                </span>
              </div>
            </div>
          </div>

          {/* Account Details Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-xl font-semibold text-[#023047] mb-6">
              Account Details
            </h3>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <ProfileItem label="Full Name" value={user?.name} />
              <ProfileItem label="Email Address" value={user?.email} />
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

            {/* Delete Action */}
            <div className="flex justify-between items-center border-t pt-6">
              <p className="text-sm text-gray-500 max-w-md">
                Deleting your account will permanently remove all your data from NoteVerse.
              </p>

              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition disabled:opacity-60"
              >
                {loading ? "Deleting..." : "Delete Account"}
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

function ProfileItem({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-base font-medium text-[#023047]">
        {value || "—"}
      </p>
    </div>
  );
}
