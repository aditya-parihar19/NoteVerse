import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser, getCurrentUser } from "../store/authSlice";
import toast from "react-hot-toast";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await dispatch(logoutUser());

    if (logoutUser.fulfilled.match(result)) {
      toast.success("Logged out successfully");
      navigate("/");
    } else {
      toast.error(result.payload || "Logout failed");
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Profile Button */}
      <button
        onClick={() => navigate("/my-profile")}
        className="flex items-center gap-2 text-white px-3 py-1 border-2 border-[#023047] rounded-md transition"
      >
        <span className="w-8 h-8 flex items-center justify-center bg-white text-[#023047] font-bold rounded-full">
          {user?.name?.[0]?.toUpperCase() || "U"}
        </span>
        <span className="hidden md:block font-medium">
          {user?.name || "Profile"}
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border z-50">
          <button
            onClick={() => navigate("/my-profile")}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-[#023047]"
          >
            My Profile
          </button>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
