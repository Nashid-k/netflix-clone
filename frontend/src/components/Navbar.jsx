import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, Search, Settings, UserPlus } from "lucide-react";
import { useAuthStore } from "../store/authUser.js";
import { useContentStore } from "../store/content.js";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, logout } = useAuthStore();
  const togglerMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const { setContentType } = useContentStore();
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex flex-wrap items-center justify-between p-4 h-20">
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
        
        </div>
      </div>

      {/* Navbar actions */}
      <div className="flex gap-4 items-center z-50">
        <Link to={"/search"}>
          <Search className="size-6 cursor-pointer hover:text-red-600 transition-colors duration-300" />
        </Link>

        {/* Profile section with hover menu */}
        <div className="relative flex items-center gap-2" ref={menuRef}>
          <div 
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity duration-200" 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <span className="text-sm font-medium">
              {user?.username || "User"}
            </span>
            <img
              src={user.image}
              alt="Avatar"
              className="h-8 w-8 rounded object-cover"
            />
          </div>

          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full mt-2 w-56 py-2 
                         bg-zinc-900/95 backdrop-blur-sm rounded-xl 
                         shadow-xl border border-white/10
                         sm:right-0 sm:left-auto
                         left-1/2 -translate-x-1/2 sm:translate-x-0"
              >
                <div className="px-4 py-3 border-b border-white/10">
                  <p className="text-sm text-white/60">Signed in as</p>
                  <p className="text-sm font-medium truncate mt-1">
                    {user?.email}
                  </p>
                </div>

                <div className="py-1">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm 
                             text-white/90 hover:bg-white/5 
                             transition-colors duration-200"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <Settings className="size-4" />
                    Manage Profile
                  </Link>
                  <Link
                    to="/profile/add"
                    className="flex items-center gap-2 px-4 py-2 text-sm 
                             text-white/90 hover:bg-white/5 
                             transition-colors duration-200"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <UserPlus className="size-4" />
                    Add Profile
                  </Link>
                </div>

                <div className="pt-1 border-t border-white/10">
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm 
                             text-red-500 hover:bg-red-500/10 
                             transition-colors duration-200"
                  >
                    <LogOut className="size-4" />
                    Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile menu button */}
        <div className="sm:hidden">
          <Menu
            className="size-6 cursor-pointer hover:text-red-600 transition-colors duration-300"
            onClick={togglerMobileMenu}
          />
        </div>
      </div>

      {/* Mobile navbar items */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full sm:hidden mt-4 z-50 bg-zinc-900/95 backdrop-blur-sm 
                     border border-white/10 rounded-xl overflow-hidden"
          >
            <Link
              to={"/"}
              className="flex items-center gap-2 px-4 py-3 text-white/90 
                       hover:bg-white/5 transition-colors duration-200" 
              onClick={() => {
                setContentType("movie");
                togglerMobileMenu();
              }}
            >
              Movies
            </Link>
            <Link
              to={"/"}
              className="flex items-center gap-2 px-4 py-3 text-white/90 
                       hover:bg-white/5 transition-colors duration-200" 
              onClick={() => {
                setContentType("tv");
                togglerMobileMenu();
              }}
            >
              TV Shows
            </Link>
            <Link
              to={"/history"}
              className="flex items-center gap-2 px-4 py-3 text-white/90 
                       hover:bg-white/5 transition-colors duration-200" 
              onClick={togglerMobileMenu}
            >
              Search History
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;