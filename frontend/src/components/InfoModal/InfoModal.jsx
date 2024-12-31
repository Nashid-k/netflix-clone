import { X, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { ORIGINAL_IMG_BASE_URL } from "../../utils/constants";
import { ContentMetadata } from "../ContentSection/components/ContentMetadata";

const InfoModal = ({ content, onClose, isClosing }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 
                  transition-all duration-700 ${
                    isClosing
                      ? "animate-backdrop-fade-out"
                      : "animate-backdrop-fade-in"
                  }`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      onClick={onClose}
    >
      <div
        className={`relative bg-zinc-900 rounded-xl max-w-4xl w-full 
                    overflow-hidden ${
                      isClosing 
                        ? "animate-modal-slide-out" 
                        : "animate-modal-slide-in"
                    }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header with Background Image */}
        <div className="relative h-[300px] md:h-[400px]">
          <img
            src={ORIGINAL_IMG_BASE_URL + content?.backdrop_path}
            alt={content?.title || content?.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t 
                         from-zinc-900 via-zinc-900/50 to-transparent" />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 p-2 
                      rounded-full hover:bg-black/70 
                      transition-all duration-300 hover:scale-110"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Title on Image */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h2 className="text-3xl font-bold text-white drop-shadow-lg">
              {content?.title || content?.name}
            </h2>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-8 space-y-6 text-white">
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-white/90">
            <ContentMetadata content={content} className="text-white" />
          </div>

          {/* Overview */}
          <p className="text-white/80 leading-relaxed text-lg">
            {content?.overview}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Link
              to={`/watch/${content?.id}`}
              className="bg-white hover:bg-white/90 text-black px-8 py-3 
                       rounded-lg flex items-center gap-2 transition-all 
                       duration-300 hover:scale-105 font-semibold"
            >
              <Play className="w-5 h-5 fill-black" />
              Play Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;