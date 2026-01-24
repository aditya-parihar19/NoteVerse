import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

export default function StudyMaterial() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Mock notes data
  const mockNotes = [
    {
      id: 1,
      title: "Mathematics - Calculus Notes",
      description: "A complete guide to derivatives, integrals, and limits.",
      category: "Math",
      createdAt: "2026-01-10T12:00:00Z",
      fileUrl: "/files/calculus.pdf",
    },
    {
      id: 2,
      title: "Physics - Mechanics",
      description: "Key concepts of motion, forces, and energy.",
      category: "Physics",
      createdAt: "2026-01-12T09:30:00Z",
      fileUrl: "/files/mechanics.pdf",
    },
    {
      id: 3,
      title: "Chemistry - Organic Chemistry",
      description: "Basic principles and reaction mechanisms.",
      category: "Chemistry",
      createdAt: "2026-01-15T14:45:00Z",
      fileUrl: "/files/organic-chemistry.pdf",
    },
    {
      id: 4,
      title: "Computer Science - Data Structures",
      description: "Notes on arrays, linked lists, trees, and graphs.",
      category: "CS",
      createdAt: "2026-01-18T11:20:00Z",
      fileUrl: "/files/data-structures.pdf",
    },
    {
      id: 5,
      title: "English Literature - Shakespeare",
      description: "Important plays, sonnets, and analysis notes.",
      category: "English",
      createdAt: "2026-01-20T08:15:00Z",
      fileUrl: "/files/shakespeare.pdf",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setNotes(mockNotes);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and search notes
  const filteredNotes = notes.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <Loader />;

  return (
    <div className="bg-[#F8F9FA] min-h-screen">
      {/* Navbar */}
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-6">
        
        {/* Left Sidebar - Search & Filter */}
        <div className="lg:w-1/4 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-[#023047]">Search & Filter</h2>

          {/* Search */}
          <div className="mb-6">
            <label className="block mb-2 text-gray-700 font-medium">Search Notes</label>
            <input
              type="text"
              placeholder="Enter keyword..."
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#219EBC]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Category</label>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#219EBC]"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Math">Math</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="CS">CS</option>
              <option value="English">English</option>
            </select>
          </div>
        </div>

        {/* Right Side - Notes */}
        <div className="lg:w-3/4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredNotes.length === 0 ? (
            <p className="text-center text-[#023047] col-span-full mt-10">
              No notes found.
            </p>
          ) : (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between hover:shadow-xl transition-shadow"
              >
                <div>
                  <h3 className="text-xl font-semibold text-[#219EBC] mb-2">
                    {note.title}
                  </h3>
                  <p className="text-gray-700 mb-4 line-clamp-3">{note.description}</p>
                  <p className="text-sm text-gray-500">
                    Uploaded: {new Date(note.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <a
                  href={note.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 bg-[#8ECAE6] hover:bg-[#219EBC] text-white font-semibold py-2 px-4 rounded text-center transition-colors"
                >
                  Download
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
