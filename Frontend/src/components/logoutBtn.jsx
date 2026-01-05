import Button from  "./Button"
import { logoutApi } from "../api/auth"
import { logout } from "../store/authSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function LogoutBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async() => {
    try {
      await logoutApi();
      localStorage.removeItem("token");
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Logout failed. Please try again.");
    }
  }
  return (
    <>
      <Button onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
}