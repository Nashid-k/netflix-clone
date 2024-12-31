import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { Volume2, VolumeX } from "lucide-react";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../../utils/constants";

export const VideoPlayer = ({ content, trailers, show, isMuted, setStates }) => {
  const [posterUrl, setPosterUrl] = useState("");
  const [isTrailerLoading, setIsTrailerLoading] = useState(false);

  // Load poster image
  useEffect(() => {
    if (content?.backdrop_path) {
      // Load low quality first
      const img = new Image();
      img.src = SMALL_IMG_BASE_URL + content.backdrop_path;
      setPosterUrl(SMALL_IMG_BASE_URL + content.backdrop_path);

      img.onload = () => {
        setStates(prev => ({ ...prev, imageLoading: false }));
        
        // Then load high quality
        const highQualityImg = new Image();
        highQualityImg.src = ORIGINAL_IMG_BASE_URL + content.backdrop_path;
        highQualityImg.onload = () => {
          setPosterUrl(ORIGINAL_IMG_BASE_URL + content.backdrop_path);
        };
      };
    }
  }, [content, setStates]);

  // Poster Image Component
  const PosterImage = () => (
    <div className="absolute inset-0 w-full h-full">
      <img
        src={posterUrl}
        alt={content?.title || content?.name}
        className="w-full h-full object-cover"
        style={{
          transform: 'scale(1.35)',
          transformOrigin: 'center center'
        }}
      />
    </div>
  );

  // Loading Spinner Component
  const LoadingOverlay = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20">
      <LoadingSpinner />
    </div>
  );

  // Volume Control Button
  const VolumeControl = () => (
    <button
      onClick={() => setStates(prev => ({ ...prev, isMuted: !prev.isMuted }))}
      className="absolute bottom-6 right-6 z-50"
    >
      <div className="bg-black/40 p-2.5 rounded-lg backdrop-blur-sm 
                    hover:bg-black/60 transition-all duration-300">
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-white/90" />
        ) : (
          <Volume2 className="w-6 h-6 text-white/90" />
        )}
      </div>
    </button>
  );

  // If no trailer or not ready to show, return poster
  if (!show || !trailers?.length) {
    return (
      <div className="relative w-full h-full overflow-hidden">
        <PosterImage />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Always show poster as background */}
      <PosterImage />
      
      {/* Loading indicator */}
      {isTrailerLoading && <LoadingOverlay />}
      
      {/* YouTube Player */}
      <div className="absolute inset-0 w-full h-full">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${trailers[0]?.key}`}
          width="100%"
          height="100%"
          playing={true}
          muted={isMuted}
          loop={true}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(1.35)',
            opacity: isTrailerLoading ? 0 : 1,
            transition: 'opacity 0.3s ease',
          }}
          onReady={() => {
            console.log("Trailer ready to play");
            setIsTrailerLoading(false);
          }}
          onStart={() => {
            console.log("Trailer started playing");
            setIsTrailerLoading(false);
          }}
          onBuffer={() => {
            console.log("Trailer buffering");
            setIsTrailerLoading(true);
          }}
          onBufferEnd={() => {
            console.log("Trailer buffering ended");
            setIsTrailerLoading(false);
          }}
          onError={(error) => {
            console.error("Trailer playback error:", error);
            setStates(prev => ({
              ...prev,
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
                iv_load_policy: 3,
                playsinline: 1,
                disablekb: 1,
                fs: 0,
              },
              embedOptions: {
                width: '100%',
                height: '100%'
              }
            },
          }}
        />
      </div>

      {/* Volume Control */}
      <VolumeControl />
    </div>
  );
};