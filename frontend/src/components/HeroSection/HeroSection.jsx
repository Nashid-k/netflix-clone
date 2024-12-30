import { useState, useEffect } from "react";
import axios from "axios";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../../utils/constants";
import { LoadingShimmer } from "../common/LoadingShimmer";
import { GradientOverlays } from "../common/GradientOverlays";
import TrailerPlayer from "./TrailerPlayer";
import InfoModal from '../InfoModal/InfoModal';
import HeroContent from "./HeroContent";

const HeroSection = ({ content }) => {
  const [states, setStates] = useState({
    imageLoading: true,
    showTrailer: false,
    showPoster: true,
    isMuted: true,
    trailerLoading: false,
    showInfoModal: false,
    isModalClosing: false,
  });

  const [posterUrl, setPosterUrl] = useState("");
  const [trailerKey, setTrailerKey] = useState(null);

  // Fetch trailer
  useEffect(() => {
    const fetchTrailer = async () => {
      if (!content?.id) return;
      
      try {
        const type = content?.title ? "movie" : "tv";
        const response = await axios.get(`/api/tmdb/${type}/${content.id}/videos`);
        
        const trailer = response.data.results?.find(
          video => video.type === "Trailer" && video.site === "YouTube"
        );

        if (trailer) {
          setTrailerKey(trailer.key);
          setStates(prev => ({ ...prev, trailerLoading: true }));
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };

    fetchTrailer();
  }, [content]);

  // Preload image
  useEffect(() => {
    if (!content?.backdrop_path) return;

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
  }, [content]);

  // Auto-play trailer after delay
  useEffect(() => {
    let timer;
    if (!states.imageLoading && trailerKey && states.showPoster) {
      timer = setTimeout(() => {
        setStates(prev => ({
          ...prev,
          showTrailer: true,
          showPoster: false,
        }));
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [states.imageLoading, trailerKey, states.showPoster]);

  const handleInfoClick = () => {
    setStates(prev => ({ ...prev, showInfoModal: true }));
  };

  if (!content) return null;

  return (
    <div className="relative h-screen text-white overflow-hidden">
      <LoadingShimmer show={states.imageLoading} />

      {/* Background Content */}
      <div className="absolute top-0 left-0 w-full h-full">
        {states.showTrailer && trailerKey ? (
          <TrailerPlayer
            trailerKey={trailerKey}
            isMuted={states.isMuted}
            isLoading={states.trailerLoading}
            onMuteToggle={() => 
              setStates(prev => ({ ...prev, isMuted: !prev.isMuted }))
            }
            onReady={() =>
              setStates(prev => ({ ...prev, trailerLoading: false }))
            }
            onError={() => {
              setStates(prev => ({
                ...prev,
                showTrailer: false,
                showPoster: true,
              }));
            }}
          />
        ) : (
          <img
            src={posterUrl}
            alt={content.title || content.name}
            className="w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: states.imageLoading ? 0 : 1 }}
          />
        )}
      </div>

      <GradientOverlays />

      {/* Hero Content */}
      <HeroContent 
        content={content}
        onInfoClick={handleInfoClick}
      />

      {/* Info Modal */}
      <InfoModal
        show={states.showInfoModal}
        content={content}
        isClosing={states.isModalClosing}
        onClose={() => {
          setStates(prev => ({ ...prev, isModalClosing: true }));
          setTimeout(() => {
            setStates(prev => ({
              ...prev,
              showInfoModal: false,
              isModalClosing: false,
            }));
          }, 500);
        }}
      />
    </div>
  );
};

export default HeroSection;