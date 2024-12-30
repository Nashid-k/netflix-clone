import { useState, useEffect, memo } from "react"; // Added useEffect
import Navbar from "../../components/Navbar";
import { useGetTrendingContent } from "../../hooks/useGetTrendingContent";
import { useContentStore } from "../../store/content";
import { VideoPlayer } from "../../components/VideoPlayer/VideoPlayer";
import { ContentSection } from "../../components/ContentSection/ContentSection";
import { LoadingShimmer } from "../../components/common/LoadingShimmer";
import { GradientOverlays } from "../../components/common/GradientOverlays";
import MovieSlider from "../../components/MovieSlider/MovieSlider";
import InfoModal from "../../components/InfoModal/InfoModal";
import { MOVIE_CATEGORIES, TV_CATEGORIES } from "../../utils/constants";

const HomeScreen = memo(() => {
  const { trendingContent, trailers } = useGetTrendingContent();
  const { contentType } = useContentStore();

  const [states, setStates] = useState({
    imageLoading: true,
    showTrailer: false,
    showPoster: true,
    isMuted: true,
    trailerLoading: false,
    showInfoModal: false,
    isModalClosing: false,
  });

  // Reset states when content changes
  useEffect(() => {
    if (trendingContent) {
      setStates(prev => ({
        ...prev,
        showTrailer: false,
        showPoster: true,
        imageLoading: true,
        isMuted: true,
        trailerLoading: false,
      }));
    }
  }, [contentType, trendingContent]);

  // Auto-play trailer after delay
  useEffect(() => {
    let timer;
    if (!states.imageLoading && trailers?.length > 0 && states.showPoster) {
      console.log("Setting up trailer timer");
      timer = setTimeout(() => {
        console.log("Starting trailer playback");
        setStates(prev => ({
          ...prev,
          trailerLoading: true,
          showTrailer: true,
          showPoster: false,
        }));
      }, 6000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [states.imageLoading, trailers, states.showPoster]);

  // Handle Info Modal
  const handleInfoClick = (e) => {
    e?.preventDefault();
    setStates(prev => ({ ...prev, showInfoModal: true }));
  };

  const handleCloseModal = () => {
    setStates(prev => ({ ...prev, isModalClosing: true }));
    setTimeout(() => {
      setStates(prev => ({
        ...prev,
        showInfoModal: false,
        isModalClosing: false,
      }));
    }, 500);
  };

  // Show loading state if no content
  if (!trendingContent) {
    return (
      <div className="h-screen bg-black">
        <Navbar />
        <LoadingShimmer show={true} />
      </div>
    );
  }

  return (
    <>
      <div className="relative h-screen text-white overflow-hidden">
        <Navbar />
        <LoadingShimmer show={states.imageLoading} />

        {/* Background Content */}
        <div className="absolute top-0 left-0 w-full h-full">
          <VideoPlayer
            content={trendingContent}
            trailers={trailers}
            show={states.showTrailer}
            isMuted={states.isMuted}
            trailerLoading={states.trailerLoading}
            setStates={setStates}
          />
        </div>

        <GradientOverlays />

        {/* Content Section */}
        <ContentSection 
          content={trendingContent} 
          onInfoClick={handleInfoClick}
        />

        {/* Info Modal */}
        {states.showInfoModal && (
          <InfoModal
            content={trendingContent}
            onClose={handleCloseModal}
            isClosing={states.isModalClosing}
          />
        )}
      </div>

      {/* Movie/TV Show Categories */}
      <div className="flex flex-col gap-10 bg-black py-10">
        {(contentType === "movie" ? MOVIE_CATEGORIES : TV_CATEGORIES).map(
          (category) => (
            <MovieSlider key={category} category={category} />
          )
        )}
      </div>
    </>
  );
});

HomeScreen.displayName = "HomeScreen";
export default HomeScreen;