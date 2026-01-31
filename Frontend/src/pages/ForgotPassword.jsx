import Input from "../components/Input";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { forgotPasswordApi } from "../api/auth";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export default function ForgotPassword() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const handleForgotPassword = async (data) => {
    try {
      const response  = await forgotPasswordApi(data);
      toast.success(response.message || "Reset link sent to your email!");
      reset();
      navigate("/signin");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to send reset link"
      );
    }
  };

  if (isSubmitting) return <Loader />;

  return (
    <div className="min-h-screen flex">
      {/* Left side image */}
      <div className="hidden md:flex w-1/2 bg-gray-100">
        <img
          src="./login-img.png"
          alt="Forgot Password"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right side form */}
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-3xl font-bold text-[#023047]">
            Forgot Password
          </h1>
          <p className="text-gray-500">
            Enter your email to receive a password reset link
          </p>

          <form
            onSubmit={handleSubmit(handleForgotPassword)}
            className="space-y-4"
          >
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              error={errors?.email?.message}
              {...register("email")}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>

          <p className="text-sm text-gray-500">
            Remember your password?{" "}
            <Link
              to="/signin"
              className="text-[#219EBC] font-medium hover:text-[#023047]"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
