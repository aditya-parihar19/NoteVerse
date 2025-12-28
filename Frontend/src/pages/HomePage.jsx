import React from "react";
import Navbar from "./Navbar";

export default function HomePage() {
  return (
    <div className="bg-[rgb(255,245,230)] text-gray-900 font-sans w-full mx-auto">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <header className="bg-[orange] text-white py-20 px-6 mt-5 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">📚 NoteVerse</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Your one-stop platform for accessing high-quality{" "}
          <strong>study notes</strong> and{" "}
          <strong>previous year question papers</strong>.
        </p>
        <button className="mt-8 bg-[rgb(255,200,0)] hover:bg-[rgb(255,180,0)] text-white px-6 py-3 rounded-lg transition-colors">
          Explore Notes
        </button>
      </header>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-12">🚀 Features</h2>
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div className="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold mb-2">✍️ Well-structured Notes</h3>
            <p>
              Access well-organized notes for a wide range of subjects to make your studying faster and easier.
            </p>
          </div>
          <div className="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-semibold mb-2">📂 Previous Year Papers</h3>
            <p>
              Download past question papers easily and practice effectively for upcoming exams.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[rgb(255,230,200)] text-[rgb(153,76,0)] py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Start Learning with NoteVerse Today!</h2>
        <p className="mb-6 max-w-xl mx-auto">
          Revise smarter, practice better, and achieve your goals with a single platform.
        </p>
        <button className="bg-[rgb(255,200,0)] hover:bg-[rgb(255,180,0)] text-white px-6 py-3 rounded-lg transition-colors">
          Get Started
        </button>
      </section>

      {/* Footer */}
      <footer className="py-6 px-6 text-center border-t border-gray-200">
        <p>© {new Date().getFullYear()} NoteVerse. All rights reserved.</p>
      </footer>
    </div>
  );
}
