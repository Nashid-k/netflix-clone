import { Link } from "react-router-dom";
import { Info, Play, Star } from "lucide-react";

const HeroContent = ({ content, onInfoClick }) => {
  return (
    <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-32 z-30">
      <div className="max-w-2xl space-y-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-balance animate-fade-in">
          <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
            {content.title || content.name}
          </span>
        </h1>

        <div className="flex flex-wrap items-center gap-4 animate-fade-in-up delay-100">
          <div className="flex items-center bg-white/10 px-3 py-1 rounded-full">
            <Star className="w-4 h-4 text-yellow-500 mr-1" />
            <span>{content.vote_average?.toFixed(1)}</span>
          </div>
          <span className="bg-white/10 px-3 py-1 rounded-full">
            {content.release_date?.split("-")[0] ||
              content.first_air_date?.split("-")[0]}
          </span>
          <span
            className={`${
              content.adult ? "bg-red-500/80" : "bg-green-500/80"
            } px-3 py-1 rounded-full font-medium`}
          >
            {content.adult ? "18+" : "PG-13"}
          </span>
          {content.runtime && (
            <span className="bg-white/10 px-3 py-1 rounded-full">
              {Math.floor(content.runtime / 60)}h {content.runtime % 60}m
            </span>
          )}
        </div>

        <p className="text-lg md:text-xl text-gray-300 line-clamp-3 animate-fade-in-up delay-200">
          {content.overview}
        </p>

        <div className="flex gap-4 pt-4 animate-fade-in-up delay-300">
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
      </div>
    </div>
  );
};

export default HeroContent;