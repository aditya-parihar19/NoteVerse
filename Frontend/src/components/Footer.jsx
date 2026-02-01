export default function Footer() {
  return (
    <footer className="bg-[#023047] text-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo / Branding */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-white">NoteVerse</h2>
          <p className="text-gray-300 mt-1 text-sm">
            Your one-stop platform for study notes & previous year papers.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col sm:flex-row gap-4 text-center md:text-right">
          <a href="/notes" className="hover:text-[#B1A7F3] transition-colors">Notes</a>
          <a href="/features" className="hover:text-[#B1A7F3] transition-colors">Features</a>
          <a href="/about" className="hover:text-[#B1A7F3] transition-colors">About</a>
          <a href="/contact" className="hover:text-[#B1A7F3] transition-colors">Contact</a>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} NoteVerse. All rights reserved.
      </div>
    </footer>
  );
}
