import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useSelector } from "react-redux";
import LogoutBtn from "./logoutBtn";
import Button from "./Button";
import ProfileMenu from "./ProfileMenu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#F8F9FA] to-[#8ECAE6] text-white shadow-md border-b-2 border-b-indigo-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/notes" className="hover:text-[#B1A7F3] transition-colors my-auto">
              Notes
            </Link>

            <Link to="/papers" className="hover:text-[#F8F9FA] transition-colors my-auto">
              Question Papers
            </Link>

            {!isAuthenticated && (
              <Button>
                <Link to="/signin">Sign In</Link>
              </Button>
            )}

            {isAuthenticated && <ProfileMenu />}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-[#219EBC] via-[#8ECAE6] to-[#023047] px-4 pt-2 pb-4 space-y-2">
          <Link to="/" className="block hover:text-[#80ED99] transition-colors">
            Home
          </Link>
          <Link to="/notes" className="block hover:text-[#B1A7F3] transition-colors">
            Notes
          </Link>
          <Link to="/papers" className="block hover:text-[#F8F9FA] transition-colors">
            Papers
          </Link>
        </div>
      )}
    </nav>
  );
}
