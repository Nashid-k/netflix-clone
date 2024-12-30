import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { Volume2, VolumeX } from "lucide-react";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../../utils/constants";

export const VideoPlayer = ({ 
  content, 
  trailers, 
  show, 
  isMuted, 
  trailerLoading,
  setStates 
}) => {
  const [posterUrl, setPosterUrl] = useState("");

  console.log("VideoPlayer Props:", {
    content,
    trailers,
    show,
    isMuted,
    trailerLoading,
    posterUrl
  });

  useEffect(() => {
    if (content?.backdrop_path) {
      const img = new Image();
      img.src = SMALL_IMG_BASE_URL + content.backdrop_path;
      setPosterUrl(SMALL_IMG_BASE_URL + content.backdrop_path);

      img.onload = () => {
        setStates(prev => ({ ...prev, imageLoading: false }));
        
        const highQualityImg = new Image();
        highQualityImg.src = ORIGINAL_IMG_BASE_URL + content.backdrop_path;
        highQualityImg.onload = () => {
          setPosterUrl(ORIGINAL_IMG_BASE_URL + content.backdrop_path);
        };
      };
    }
  }, [content, setStates]);

  // Show poster if no trailer or not ready to show trailer
  if (!show || !trailers?.length) {
    return (
      <img
        src={posterUrl}
        alt={content?.title || content?.name}
        className="w-full h-full object-cover transition-opacity duration-500"
        style={{ opacity: posterUrl ? 1 : 0 }}
      />
    );
  }

  // Show trailer
  return (
    <div className="relative w-full h-full">
      {trailerLoading && <LoadingSpinner />}
      
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${trailers[0]?.key}`}
        width="100%"
        height="100%"
        playing={true}
        muted={isMuted}
        loop={true}
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          objectFit: "cover",
        }}
        onReady={() => {
          console.log("Trailer ready to play");
          setStates(prev => ({ ...prev, trailerLoading: false }));
        }}
        onError={(error) => {
          console.error("Trailer playback error:", error);
          setStates(prev => ({
            ...prev,
            trailerLoading: false,
            showTrailer: false,
            showPoster: true
          }));
        }}
        config={{
          youtube: {
            playerVars: {
              modestbranding: 1,
              controls: 0,
              autoplay: 1,
              showinfo: 0,
              rel: 0,
            },
          },
        }}
      />
      
      <button
        onClick={() => setStates(prev => ({ ...prev, isMuted: !prev.isMuted }))}
        className="absolute bottom-8 right-8 z-50 group"
      >
        <div className="bg-black/50 p-3 rounded-lg backdrop-blur-sm 
                      transition-all duration-300 
                      group-hover:bg-black/70 group-hover:scale-110">
          {isMuted ? (
            <VolumeX className="w-8 h-8 text-white/90" />
          ) : (
            <Volume2 className="w-8 h-8 text-white/90" />
          )}
        </div>
      </button>
    </div>
  );
};