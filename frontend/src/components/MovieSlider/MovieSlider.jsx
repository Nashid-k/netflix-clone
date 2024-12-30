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
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return <LoadingShimmer count={6} />;
  }

  return (
    <div
      className="text-white px-8 md:px-16 lg:px-32 relative"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h2 className="text-xl font-semibold mb-4">
        {formattedCategoryName} {formattedContentType}
      </h2>

      <div className="relative group">
        {showArrows && movies.length > 0 && (
          <>
            <NavigationArrow 
              direction="left" 
              onClick={scrollLeft} 
              className="-left-4 md:-left-8"
            />
            <NavigationArrow 
              direction="right" 
              onClick={scrollRight} 
              className="-right-4 md:-right-8"
            />
          </>
        )}

        <div
          ref={sliderRef}
          className="flex items-center space-x-4 overflow-x-scroll scrollbar-hide scroll-smooth"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
});

MovieSlider.displayName = 'MovieSlider';
export default MovieSlider;