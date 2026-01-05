import Input from "../components/Input";
import Button from "../components/Button";
import {useForm} from "react-hook-form";
import  {loginApi} from "../api/auth.js";
import { useNavigate } from "react-router-dom"
import {useDispatch} from "react-redux"
import { login } from "../store/authSlice.js";

export default function Login() {

  const { register, handleSubmit, formState: {errors, isSubmitting}, reset} = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async(data) => {
    try {
      const response = await loginApi(data);
      localStorage.setItem("token", response.data?.accessToken);
      dispatch(login({user: response?.data?.loggedinUser}));
      reset();
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side image */}
      <div className="hidden md:flex w-1/2 bg-gray-100">
        <img
          src="./login-img.png"
          alt="Login"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right side form */}
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-3xl font-bold text-[#023047]">Welcome to NoteVerse</h1>
          <p className="text-gray-500">Login to continue to your dashboard</p>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              { isSubmitting ? "Logging  in..." : "Login"}
            </Button>
          </form>

          <p className="text-sm text-gray-500">
            Don't have an account? <a href="/signup" className="text-[#219EBC] font-medium">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}
