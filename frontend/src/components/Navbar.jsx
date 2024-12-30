import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, Search } from "lucide-react";
import { useAuthStore } from "../store/authUser.js";
import { useContentStore } from "../store/content.js";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const togglerMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const { setContentType } = useContentStore();

  return (
    <header className=" flex flex-wrap items-center justify-between p-4 h-20">
      <div className="flex items-center gap-10 z-50">
        <Link to={"/"}>
          <img
            src="/netflix-logo.png"
            alt="Netflix Logo"
            className="w-24 md:w-28 hover:opacity-80 transition-opacity duration-200"
          />
        </Link>

        {/* Desktop navbar items */}
        <div className="hidden sm:flex gap-4 items-center">
          <Link
            to={"/"}
            className="hover:text-red-600 transition-all duration-300"
            onClick={() => setContentType("movie")}
          >
            Movies
          </Link>
          <Link
            to={"/"}
            className="hover:text-red-600 transition-all duration-300"
            onClick={() => setContentType("tv")}
          >
            TV Shows
          </Link>
          <Link
            to={"/history"}
            className="hover:text-red-600 transition-all duration-300"
          >
            Search History
          </Link>
        </div>
      </div>

      {/* Navbar actions */}
      <div className="flex gap-4 items-center z-50">
        <Link to={"/history"}>
          <Search className="size-6 cursor-pointer hover:text-red-600 transition-colors duration-300" />
        </Link>

        {/* Profile image with hover effect */}
        <img
          src={user.image}
          alt="Avatar"
          className="h-8 rounded cursor-pointer hover:opacity-80 transition-opacity duration-300"
        />

        <LogOut
          className="size-6 cursor-pointer hover:text-red-600 transition-colors duration-300"
          onClick={logout}
        />

        {/* Mobile menu button */}
        <div className="sm:hidden">
          <Menu
            className="size-6 cursor-pointer hover:text-red-600 transition-colors duration-300"
            onClick={togglerMobileMenu}
          />
        </div>
      </div>

      {/* Mobile navbar items */}
      {isMobileMenuOpen && (
        <div className="w-full sm:hidden mt-4 z-50 bg-black border-t border-gray-800 rounded">
          <Link
            to={"/"}
            className="block p-2 text-white transition-colors duration-300" 
            onClick={togglerMobileMenu}
          >
            Movies
          </Link>
          <Link
            to={"/"}
            className="block p-2 text-white transition-colors duration-300" 
            onClick={togglerMobileMenu}
          >
            TV Shows
          </Link>
          <Link
            to={"/history"}
            className="block p-2 text-white transition-colors duration-300" 
            onClick={togglerMobileMenu}
          >
            Search History
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
