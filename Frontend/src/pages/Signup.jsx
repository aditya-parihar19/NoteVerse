import Input from "../components/Input";
import Button from "../components/Button";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import { signupApi } from "../api/auth";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

export default function Signup() {

  const { register, handleSubmit, formState: {errors,  isSubmitting}, reset} = useForm();
  const  navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignup = async (data) => {
    try{
      const response = await signupApi(data);
      localStorage.setItem("token", response.data?.accessToken);
      dispatch(login({user: response?.data?.createdUser}));
      reset();
      navigate("/");
    } catch (error) {
      console.error(error)
      alert(error.response?.data?.message || "Signup Failed")
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
              { ...register("name")}
            />
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              { ...register("email")}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
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
