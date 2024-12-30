import { Play, Info } from "lucide-react";
import { Link } from "react-router-dom";

export const ActionButtons = ({ content, onInfoClick }) => {
  return (
    <div className="flex gap-4 animate-fade-in-up delay-300">
      <Link
        to={`/watch/${content.id}`}
        className="bg-white hover:bg-white/90 text-black px-6 py-2.5 rounded-lg 
                  flex items-center transition-all duration-300 
                  hover:scale-105 hover:shadow-lg font-semibold"
      >
        <Play className="w-5 h-5 mr-2 fill-black" />
        Play
      </Link>

      <button
        onClick={onInfoClick}
        className="bg-white/20 hover:bg-white/30 px-6 py-2.5 rounded-lg 
                  flex items-center transition-all duration-300 
                  hover:scale-105 hover:shadow-lg backdrop-blur-sm"
      >
        <Info className="w-5 h-5 mr-2" />
        More Info
      </button>
    </div>
  );
};