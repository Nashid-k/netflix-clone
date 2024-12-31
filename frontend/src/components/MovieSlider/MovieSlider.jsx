import { useEffect, useState, useRef, memo } from "react";
import axios from "axios";
import { useContentStore } from "../../store/content";
import { MovieCard } from "../MovieCard";
import { LoadingShimmer } from "../common";
import { NavigationArrow } from "./NavigationArrow";

const MovieSlider = memo(({ category }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { contentType } = useContentStore();
  const [showArrows, setShowArrows] = useState(false);
  const sliderRef = useRef(null);

  const formattedCategoryName = category
    .replaceAll("_", " ")
    .charAt(0)
    .toUpperCase() + category.replaceAll("_", " ").slice(1);
  const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";

  useEffect(() => {
    let isMounted = true;

    const getMoviesByCategory = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `/api/v1/${contentType}/${category.toLowerCase()}`
        );
        if (isMounted) {
          setMovies(res.data.content);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch content:", error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getMoviesByCategory();
    return () => {
      isMounted = false;
    };
  }, [category, contentType]);



  const scrollLeft = () => {
    if (sliderRef.current) {
      const containerWidth = sliderRef.current.offsetWidth;
      const cardWidth = window.innerWidth <= 768 ? 200 : 280; // Responsive card width
      const cardsToScroll = Math.floor(containerWidth / cardWidth);
      
      sliderRef.current.scrollBy({
        left: -(cardWidth * cardsToScroll),
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const containerWidth = sliderRef.current.offsetWidth;
      const cardWidth = window.innerWidth <= 768 ? 200 : 280; // Responsive card width
      const cardsToScroll = Math.floor(containerWidth / cardWidth);
      
      sliderRef.current.scrollBy({
        left: cardWidth * cardsToScroll,
        behavior: "smooth",
      });
    }
  };

  if (loading) return <LoadingShimmer count={6} />;

  return (
    <div
      className="relative py-4 md:py-6"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      {/* Title */}
      <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 px-4 md:px-12 text-white">
        {formattedCategoryName} {formattedContentType}
      </h2>

      <div className="relative group">
        {/* Navigation Arrows - Only show on desktop */}
        {showArrows && movies.length > 0 && window.innerWidth > 768 && (
          <>
            <NavigationArrow 
              direction="left" 
              onClick={scrollLeft} 
              className="hidden md:block absolute left-3 md:left-8 z-50"
            />
            <NavigationArrow 
              direction="right" 
              onClick={scrollRight} 
              className="hidden md:block absolute right-3 md:right-8 z-50"
            />
          </>
        )}

        {/* Slider Container */}
        <div className="relative px-4 md:px-20">
          <div
            ref={sliderRef}
            className="flex gap-2 md:gap-6 overflow-x-scroll overflow-y-visible
                       scrollbar-hide scroll-smooth md:py-[80px] md:-my-[80px]"
            style={{
              scrollSnapType: 'x mandatory',
              scrollPadding: '0 16px'
            }}
          >
            {/* Left Spacer - Only on desktop */}
            <div className="hidden md:block shrink-0 w-4 md:w-8" />
            
            {movies.map((movie) => (
              <div 
                key={movie.id}
                className="relative shrink-0 w-[200px] md:w-[280px] 
                         scroll-snap-align-start"
              >
                <MovieCard movie={movie} />
              </div>
            ))}

            {/* Right Spacer - Only on desktop */}
            <div className="hidden md:block shrink-0 w-4 md:w-8" />
          </div>
        </div>
      </div>
    </div>
  );
});

MovieSlider.displayName = 'MovieSlider';
export default MovieSlider;