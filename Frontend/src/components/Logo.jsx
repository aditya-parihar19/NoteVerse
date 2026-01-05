import { Link } from "react-router-dom";

export default function Logo({ text = "NoteVerse", className = "" }) {
  return (
    <Link to="/" className={`flex items-center ${className}`}>
      {/* Optional image */}
      {/* <img className="h-8 w-8 mr-2" src="/other_logo.png" alt={text} /> */}
      <span className="text-3xl font-bold text-[#023047]">{text}</span>
    </Link>
  );
}
