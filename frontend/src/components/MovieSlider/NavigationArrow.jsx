import { ChevronLeft, ChevronRight } from "lucide-react";

export const NavigationArrow = ({ direction, onClick, className }) => (
  <button
    className={`absolute top-1/2 -translate-y-1/2 flex items-center justify-center 
                size-12 rounded-full bg-black/50 hover:bg-black/70 text-white z-40 
                transition-all duration-300 ${className}`}
    onClick={onClick}
  >
    {direction === "left" ? (
      <ChevronLeft size={24} />
    ) : (
      <ChevronRight size={24} />
    )}
  </button>
);