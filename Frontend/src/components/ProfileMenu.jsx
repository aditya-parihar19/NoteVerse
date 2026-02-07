import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../store/authSlice";
import toast from "react-hot-toast";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const handleLogout = async () => {
    const result = await dispatch(logoutUser());
    if (logoutUser.fulfilled.match(result)) {
      toast.success("Logged out successfully");
      navigate("/");
    } else {
      toast.error(result.payload || "Logout failed");
    }
    setOpen(false);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Profile Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#023047] hover:bg-white/10 transition hover:cursor-pointer"
      >
        <span className="w-8 h-8 flex items-center justify-center bg-white text-[#023047] font-bold rounded-full">
          {user?.name?.[0]?.toUpperCase() || "U"}
        </span>

        <span className="hidden md:block font-medium text-white">
          {user?.name?.split(" ")[0] || "Profile"}
        </span>

        {open ? (
          <ChevronUp size={18} className="text-white" />
        ) : (
          <ChevronDown size={18} className="text-white" />
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-48 bg-white rounded-md shadow-lg border z-50 overflow-hidden">
          <button
            onClick={() => {
              navigate("/my-profile");
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2.5 text-[#023047] hover:bg-gray-100 transition"
          >
            My Profile
          </button>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2.5 text-red-600 hover:bg-red-50 transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
