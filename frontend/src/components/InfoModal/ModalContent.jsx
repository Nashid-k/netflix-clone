import { X, Star, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { ORIGINAL_IMG_BASE_URL } from "../../utils/constants";

export const ModalContent = ({ content, onClose }) => (
  <>
    <div className="relative h-[300px] md:h-[400px] animate-fade-in duration-700">
      <img
        src={ORIGINAL_IMG_BASE_URL + content.backdrop_path}
        alt={content.title || content.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-black/50 p-2 rounded-full 
                  hover:bg-black/70 transition-all duration-500 hover:scale-110"
      >
        <X className="w-6 h-6" />
      </button>
    </div>

    <div className="p-8 space-y-6 animate-fade-in-up delay-200">
      <h2 className="text-3xl font-bold">
        {content.title || content.name}
      </h2>
      
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center bg-white/10 px-3 py-1 rounded-full">
          <Star className="w-4 h-4 text-yellow-500 mr-1" />
          <span>{content.vote_average?.toFixed(1)}</span>
        </div>
        <span className="bg-white/10 px-3 py-1 rounded-full">
          {content.release_date?.split("-")[0] ||
            content.first_air_date?.split("-")[0]}
        </span>
        <span className={`${content.adult ? 'bg-red-500/80' : 'bg-green-500/80'} 
                       px-3 py-1 rounded-full font-medium transition-colors duration-300`}>
          {content.adult ? "18+" : "PG-13"}
        </span>
        {content.runtime && (
          <span className="bg-white/10 px-3 py-1 rounded-full">
            {Math.floor(content.runtime / 60)}h {content.runtime % 60}m
          </span>
        )}
      </div>

      <p className="text-gray-300 leading-relaxed text-lg">
        {content.overview}
      </p>

      <div className="flex gap-4 pt-4">
        <Link
          to={`/watch/${content.id}`}
          className="bg-white hover:bg-white/90 text-black px-8 py-3 rounded-lg 
                    flex items-center transition-all duration-500 
                    hover:scale-105 hover:shadow-lg font-semibold"
        >
          <Play className="w-5 h-5 mr-2 fill-black" />
          Play Now
        </Link>
      </div>
    </div>
  </>
);