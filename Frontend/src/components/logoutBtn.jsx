import Button from "./Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../store/authSlice";
import toast from "react-hot-toast";

export default function LogoutBtn() {
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

  return <Button onClick={handleLogout}>Logout</Button>;
}