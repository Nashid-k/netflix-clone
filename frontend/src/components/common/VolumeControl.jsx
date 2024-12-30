import { Volume2, VolumeX } from "lucide-react";

const VolumeControl = ({ isMuted, onToggle }) => {
  return (
    <button
      onClick={onToggle}
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
  );
};

VolumeControl.displayName = 'VolumeControl';
export default VolumeControl;