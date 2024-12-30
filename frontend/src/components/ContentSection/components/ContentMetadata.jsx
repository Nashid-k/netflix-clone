import { Star } from "lucide-react";

export const ContentMetadata = ({ content }) => (
  <>
    <div className="flex items-center bg-white/10 px-3 py-1 rounded-full">
      <Star className="w-4 h-4 text-yellow-500 mr-1" />
      <span>{content.vote_average?.toFixed(1)}</span>
    </div>
    
    <span className="bg-white/10 px-3 py-1 rounded-full">
      {content.release_date?.split("-")[0] || 
       content.first_air_date?.split("-")[0]}
    </span>
    
    <span className="bg-white/10 px-3 py-1 rounded-full">
      {content.adult ? "18+" : "PG-13"}
    </span>
    
    {content.runtime && (
      <span className="bg-white/10 px-3 py-1 rounded-full">
        {Math.floor(content.runtime / 60)}h {content.runtime % 60}m
      </span>
    )}
  </>
);