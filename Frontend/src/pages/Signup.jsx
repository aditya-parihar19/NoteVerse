import Input from "../components/Input";
import Button from "../components/Button";

export default function Signup() {
  const handleSignup = (e) => {
    e.preventDefault();
    // handle signup API here
    console.log("Signup submitted");
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

          <form onSubmit={handleSignup} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
            />
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
            />

            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>

          <p className="text-sm text-gray-500">
            Already have an account? <a href="/login" className="text-[#219EBC] font-medium">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
}
