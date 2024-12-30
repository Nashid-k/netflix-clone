import { Play, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { ContentMetadata } from './components/ContentMetadata';

export const ContentSection = ({ content, onInfoClick }) => (
  <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-32 z-30">
    <div className="max-w-2xl space-y-4">
      {/* Title */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-balance animate-fade-in">
        {content?.title || content?.name}
      </h1>

      {/* Metadata */}
      <div className="flex flex-wrap items-center gap-6 animate-fade-in-up delay-100">
        <ContentMetadata content={content} />
      </div>

      {/* Overview */}
      <p className="text-lg md:text-xl text-gray-300 line-clamp-3 animate-fade-in-up delay-200">
        {content?.overview}
      </p>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4 animate-fade-in-up delay-300">
        <Link
          to={`/watch/${content?.id}`}
          className="bg-white hover:bg-white/90 text-black px-6 py-2.5 rounded-lg 
                    flex items-center transition-all duration-300 
                    hover:scale-105 hover:shadow-lg font-semibold"
        >
          <Play className="w-5 h-5 mr-2 fill-black" />
          Play
        </Link>

        <button
          onClick={onInfoClick} // Make sure this is properly passed
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