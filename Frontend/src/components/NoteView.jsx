import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

export default function NoteView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  // Replace with real API call later
  const mockNotes = [
    { id: 1, title: "Mathematics – Calculus Notes", description: "Derivatives, integrals, limits with solved examples.", category: "Math", createdAt: "2026-01-10T12:00:00Z", fileUrl: "/files/calculus.pdf" },
    { id: 2, title: "Physics – Mechanics", description: "Motion, force laws, work-energy theorem.", category: "Physics", createdAt: "2026-01-12T09:30:00Z", fileUrl: "/files/mechanics.pdf" },
    { id: 3, title: "DSA – Data Structures", description: "Arrays, stacks, queues, trees & graphs.", category: "CS", createdAt: "2026-01-18T11:20:00Z", fileUrl: "/files/data-structures.pdf" },
  ];

  useEffect(() => {
    setTimeout(() => {
      const foundNote = mockNotes.find((n) => n.id === parseInt(id));
      setNote(foundNote || null);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) return <Loader />;

  if (!note) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Navbar />
        <p className="text-red-600 text-lg mt-20">Note not found 😕</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />
      
      {/* 👇 Match Navbar width */}
      <main className="pt-20 max-w-6xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-sm text-[#219EBC] hover:text-[#023047]"
        >
          ← Back
        </button>

        <div className="bg-white rounded-xl shadow-md p-8">
          <span className="text-xs font-medium text-[#219EBC]">{note.category}</span>
          <h1 className="text-2xl font-bold text-[#023047] mt-2">{note.title}</h1>
          <p className="text-gray-600 mt-4">{note.description}</p>
          <p className="text-xs text-gray-400 mt-3">
            Uploaded on {new Date(note.createdAt).toLocaleDateString()}
          </p>

          <div className="mt-6 flex gap-4">
            <a
              href={note.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#219EBC] hover:bg-[#023047] text-white font-medium py-2 px-4 rounded transition"
            >
              Download PDF
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
