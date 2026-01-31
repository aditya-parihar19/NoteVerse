import Input from "../components/Input";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { resetPasswordApi } from "../api/auth";

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const handleResetPassword = async (data) => {
    try {
      await resetPasswordApi({
        token,
        password: data.password,
      });

      toast.success("Password reset successfully!");
      reset();
      navigate("/signin");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Reset password failed"
      );
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 font-semibold">
          Invalid or missing reset token.
        </p>
      </div>
    );
  }

  if (isSubmitting) return <Loader />;

  return (
    <div className="min-h-screen flex">
      {/* Left side image */}
      <div className="hidden md:flex w-1/2 bg-gray-100">
        <img
          src="./reset-password-img.png"
          alt="Reset Password"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right side form */}
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-3xl font-bold text-[#023047]">
            Reset Password
          </h1>
          <p className="text-gray-500">
            Enter your new password below
          </p>

          <form
            onSubmit={handleSubmit(handleResetPassword)}
            className="space-y-4"
          >
            <Input
              label="New Password"
              type="password"
              placeholder="Enter new password"
              error={errors?.password?.message}
              {...register("password")}
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm new password"
              error={errors?.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </Button>
          </form>

          <p className="text-sm text-gray-500">
            Back to{" "}
            <Link
              to="/login"
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
