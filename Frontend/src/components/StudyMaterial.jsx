import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

export default function StudyMaterial() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const mockNotes = [
    { id: 1, title: "Mathematics – Calculus Notes", description: "Derivatives, integrals, limits with solved examples.", category: "Math", createdAt: "2026-01-10T12:00:00Z", fileUrl: "/files/calculus.pdf" },
    { id: 2, title: "Physics – Mechanics", description: "Motion, force laws, work-energy theorem.", category: "Physics", createdAt: "2026-01-12T09:30:00Z", fileUrl: "/files/mechanics.pdf" },
    { id: 3, title: "DSA – Data Structures", description: "Arrays, stacks, queues, trees & graphs.", category: "CS", createdAt: "2026-01-18T11:20:00Z", fileUrl: "/files/data-structures.pdf" },
  ];

  useEffect(() => {
    setTimeout(() => {
      setNotes(mockNotes);
      setLoading(false);
    }, 800);
  }, []);

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />

      {/* 👇 Align content width with navbar */}
      <main className="pt-20 max-w-6xl mx-auto px-4">
        
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#023047]">Study Materials</h1>
          <p className="text-gray-500 mt-1">Browse and download notes uploaded by students & faculty</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
          <input
            type="text"
            placeholder="Search notes..."
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#219EBC] outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#219EBC] outline-none"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Math">Math</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="CS">Computer Science</option>
            <option value="English">English</option>
          </select>
        </div>

        {/* Notes Grid */}
        {filteredNotes.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">No notes found 📄</div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-medium text-[#219EBC]">{note.category}</span>
                  <h3 className="text-lg font-semibold text-[#023047] mt-2">{note.title}</h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">{note.description}</p>
                  <p className="text-xs text-gray-400 mt-3">
                    Uploaded on {new Date(note.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="mt-4 flex gap-2">
                  <a
                    href={note.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center rounded-lg bg-[#219EBC] hover:bg-[#023047] text-white text-sm font-medium py-2 transition"
                  >
                    Download PDF
                  </a>

                  <button
                    onClick={() => navigate(`/notes/${note.id}`)}
                    className="flex-1 inline-flex items-center justify-center rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium py-2 transition"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
