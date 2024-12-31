import { useState } from "react";
import { Info, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../../utils/constants";
import InfoModal from "../InfoModal/InfoModal";

const MovieCard = ({ movie }) => {
  const [showModal, setShowModal] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = window.innerWidth <= 768;

  const handleInfoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setIsModalClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setIsModalClosing(false);
    }, 1000);
  };

  return (
    <>
      <div
        className={`relative w-full h-[120px] md:h-[160px] rounded-lg overflow-hidden
                   ${!isMobile ? `transform transition-all duration-500 
                   ease-[cubic-bezier(0.4,0.0,0.2,1)] hover:scale-[1.5] 
                   hover:z-50 origin-center` : ''}`}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
      >
        {/* Base Image */}
        <img
          src={SMALL_IMG_BASE_URL + movie.backdrop_path}
          alt={movie.title || movie.name}
          className="w-full h-full object-cover rounded-lg"
          loading="lazy"
        />
        
        {/* Hover Overlay - Only on desktop */}
        {!isMobile && (
          <div 
            className={`absolute inset-0 bg-gradient-to-t from-black/80 
                       via-black/30 to-transparent rounded-lg flex flex-col 
                       justify-between p-4 transition-opacity duration-300
                       ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          >
            <h3 className="text-base font-semibold line-clamp-2 text-white 
                         drop-shadow-lg">
              {movie.title || movie.name}
            </h3>
            
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <Link
                  to={`/watch/${movie.id}`}
                  className="bg-white hover:bg-white/90 text-black p-2 
                           rounded-full transition-all duration-300 
                           hover:scale-110"
                >
                  <Play className="w-5 h-5 fill-black" />
                </Link>
                <button
                  onClick={handleInfoClick}
                  className="bg-neutral-500/50 hover:bg-neutral-500 p-2 
                           rounded-full transition-all duration-300 
                           hover:scale-110"
                >
                  <Info className="w-5 h-5" />
                </button>
              </div>
              
              <div className="text-sm text-white drop-shadow-lg">
                {movie.release_date?.split("-")[0] ||
                  movie.first_air_date?.split("-")[0]}
              </div>
            </div>
          </div>
        )}

        {/* Mobile-only overlay */}
        {isMobile && (
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t 
                         from-black/80 to-transparent p-2">
            <h3 className="text-sm font-semibold text-white drop-shadow-lg 
                         line-clamp-1">
              {movie.title || movie.name}
            </h3>
          </div>
        )}
      </div>

      {showModal && (
        <InfoModal
          content={movie}
          onClose={handleCloseModal}
          isClosing={isModalClosing}
        />
      )}
    </>
  );
};
export default MovieCard;