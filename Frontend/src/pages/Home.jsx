import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <div className="bg-[#F8F9FA] text-gray-900 font-sans w-full mx-auto">

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-[#F8F9FA] to-[#8ECAE6] text-white py-16 px-6 flex flex-col md:flex-row items-center justify-center">
        {/* Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl text-[#023047] font-bold mb-4 drop-shadow-lg">
            NoteVerse
          </h1>
          <p className="text-lg md:text-xl max-w-xl mb-6 drop-shadow-md text-[#023047]">
            Your one-stop platform for accessing high-quality{" "}
            <strong >study notes</strong> and{" "}
            <strong >previous year question papers</strong>.
          </p>
          <button className="mt-4 bg-[#B1A7F3] hover:bg-[#B1A7F3] text-[#023047] font-semibold px-6 py-3 rounded-lg shadow-md">
            Explore Notes
          </button>
        </div>

        {/* Hero Image */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <div className="w-full max-w-md">
            <img
              src="/hero-section-img.png"
              alt="Study Illustration"
              className="rounded-xl shadow-xl hover:shadow-2xl"
            />
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-20 bg-[#F8F9FA]">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#023047]">
          Features
        </h2>
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div className="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow bg-white">
            <h3 className="text-2xl font-semibold mb-2 text-[#219EBC]">Well-structured Notes</h3>
            <p className="text-gray-700">
              Access well-organized notes for a wide range of subjects to make your studying faster and easier.
            </p>
          </div>
          <div className="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow bg-white">
            <h3 className="text-2xl font-semibold mb-2 text-[#219EBC]">Previous Year Papers</h3>
            <p className="text-gray-700">
              Download past question papers easily and practice effectively for upcoming exams.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-[#80ED99] via-[#B1A7F3] to-[#8ECAE6] text-[#023047] py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4 drop-shadow-md">
          Start Learning with NoteVerse Today!
        </h2>
        <p className="mb-6 max-w-xl mx-auto drop-shadow-sm">
          Revise smarter, practice better, and achieve your goals with a single platform.
        </p>
        <button className="bg-[#219EBC] hover:bg-[#023047] text-blue-800 px-6 py-3 rounded-lg font-semibold transition-colors shadow-md">
          Get Started
        </button>
      </section>

      <Footer/>
    </div>
  );
}
