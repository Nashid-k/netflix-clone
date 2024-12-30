import { X } from "lucide-react";
import { ORIGINAL_IMG_BASE_URL } from "../../utils/constants";

const ModalHeader = ({ content, onClose }) => {
  return (
    <div className="relative h-[300px] md:h-[400px]">
      <img
        src={ORIGINAL_IMG_BASE_URL + content.backdrop_path}
        alt={content.title || content.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-black/50 p-2 rounded-full 
                  hover:bg-black/70 transition-all duration-300 hover:scale-110"
      >
        <X className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ModalHeader;