import ReactPlayer from "react-player";
import { Volume2, VolumeX } from "lucide-react";
import { LoadingSpinner } from "../common/LoadingSpinner";

const TrailerPlayer = ({ 
  trailerKey, 
  isMuted, 
  isLoading,
  onMuteToggle, 
  onReady, 
  onError 
}) => {
  return (
    <div className="relative w-full h-full">
      {isLoading && <LoadingSpinner />}

      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${trailerKey}`}
        width="100%"
        height="100%"
        playing
        muted={isMuted}
        loop
        onReady={onReady}
        onError={onError}
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          objectFit: "cover",
          margin: 0,
          padding: 0,
          overflow: "hidden",
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
        onClick={onMuteToggle}
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

export default TrailerPlayer;