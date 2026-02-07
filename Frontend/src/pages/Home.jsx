import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function HomePage() {

  const  navigate = useNavigate();
  
  const features = [
    {
      title: "Well-structured Notes",
      description: "Access well-organized notes for a wide range of subjects to make your studying faster and easier.",
      color: "bg-[#E0F2F1]",
      icon: "📄",
    },
    {
      title: "Previous Year Papers",
      description: "Download past question papers easily and practice effectively for upcoming exams.",
      color: "bg-[#E0F2F1]",
      icon: "📝",
    },
    {
      title: "Subject-wise Organization",
      description: "Find notes categorized by subjects and topics to save your time and effort.",
      color: "bg-[#E0F2F1]",
      icon: "📚",
    },
    {
      title: "Quick Search",
      description: "Search notes instantly using keywords or filters to get exactly what you need.",
      color: "bg-[#E0F2F1]",
      icon: "🔍",
    },
    {
      title: "Download Anywhere",
      description: "Download PDFs and access notes offline anytime, anywhere.",
      color: "bg-[#E0F2F1]",
      icon: "💾",
    },
    {
      title: "Community Driven",
      description: "Students and faculty contribute notes, ensuring updated and comprehensive content.",
      color: "bg-[#E0F2F1]",
      icon: "🤝",
    },
  ];

  return (
    <div className="bg-[#F8F9FA] text-gray-900 font-sans w-full">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-[#F8F9FA] to-[#8ECAE6] py-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          
          {/* Left Text */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-[#023047] mb-4 drop-shadow-md">
              NoteVerse
            </h1>
            <p className="text-lg md:text-xl text-[#023047] mb-6 max-w-lg drop-shadow-sm">
              Your one-stop platform for accessing high-quality{" "}
              <strong>study notes</strong> and <strong>previous year question papers</strong>.
            </p>
            <button className="bg-[#219EBC] hover:bg-[#023047] hover:cursor-pointer text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300"
            
            onClick={() => navigate("/notes")}

            >
              Explore Notes
            </button>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <img
              src="/hero-section-img.png"
              alt="Study Illustration"
              className="w-4/5 md:w-3/4 max-w-sm md:max-w-md rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
            />
          </div>

        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#023047]">
          Features
        </h2>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 ${feature.color} flex flex-col h-full`}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-2 text-[#219EBC]">{feature.title}</h3>
              <p className="text-gray-700 flex-1">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

{/* Call to Action Section */}
<section className="py-20">
  <div className="max-w-6xl mx-auto px-4  py-20 bg-[#219EBC] rounded-xl text-center shadow-lg">
    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
      Start Learning with NoteVerse Today!
    </h2>
    <p className="mb-8 text-lg md:text-xl max-w-xl mx-auto leading-relaxed text-white">
      Revise smarter, practice better, and achieve your goals with a single platform.
    </p>
    <button
    onClick={() => navigate("/signin")}
    className="bg-white hover:bg-gray-100 text-[#219EBC] px-8 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 hover: cursor-pointer">
      Get Started
    </button>
  </div>
</section>


      <Footer />
    </div>
  );
}
