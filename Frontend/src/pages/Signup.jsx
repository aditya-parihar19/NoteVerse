import Input from "../components/Input";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../store/authSlice";
import { signUpSchema } from "../schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSignup = async (data) => {
    const resultAction = await dispatch(signupUser(data));

    if (signupUser.fulfilled.match(resultAction)) {
      reset();
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side image */}
      <div className="hidden md:flex w-1/2 bg-gray-100">
        <img
          src="./login-img.png"
          alt="Signup"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right side form */}
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-3xl font-bold text-[#023047]">Create an Account</h1>
          <p className="text-gray-500">Join NoteVerse to access all notes and question papers</p>

          <form onSubmit={handleSubmit(handleSignup)} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              error={errors?.name?.message}
              { ...register("name")}
            />
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              error={errors?.email?.message}
              { ...register("email")}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              error={errors?.password?.message}
              { ...register("password")}
            />
            {/* <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
            /> */}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing up..."  : "Sign up"}
            </Button>
          </form>

          <p className="text-sm text-gray-500">
            Already have an account? <a href="/signin" className="text-[#219EBC] font-medium">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
}
