import Input from "../components/Input";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice.js";
import { loginSchema } from "../schema/schema.js";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import Loader from "../components/Loader.jsx";
import { useEffect } from "react";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  // Show toast on error changes
  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //   }
  // }, [error]);

  const handleLogin = async (data) => {
    try {
      const resultAction = await dispatch(loginUser(data));

      if (loginUser.fulfilled.match(resultAction)) {
        reset();
        navigate("/");
        toast.success("Logged in successfully!");
      } else if (loginUser.rejected.match(resultAction)) {
        // If thunk rejected with message
        const message =
          resultAction.payload || "Login failed. Please try again!";
        toast.error(message);
      }
    } catch (err) {
      toast.error("Something went wrong. Try again!");
    }
  };

  if (loading) return <Loader />;

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
              error={errors?.email?.message}
              {...register("email")}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              error={errors?.password?.message}
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
