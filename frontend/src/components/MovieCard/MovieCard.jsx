import { useState } from "react";
import { Info, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../../utils/constants";
import  InfoModal  from "../InfoModal/InfoModal";

const MovieCard = ({ movie }) => {
  const [showModal, setShowModal] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleInfoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(true); // This opens the modal
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
        className="relative min-w-[200px] transform transition-all duration-700 
                   ease-in-out hover:scale-110 hover:z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={SMALL_IMG_BASE_URL + movie.backdrop_path}
          alt={movie.title || movie.name}
          className="rounded-lg object-cover w-full h-[120px]"
          loading="lazy"
        />
        
        {isHovered && (
          <div className="absolute inset-0 bg-black/70 rounded-lg flex flex-col justify-between p-3">
            <h3 className="text-sm font-semibold line-clamp-2">
              {movie.title || movie.name}
            </h3>
            
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Link
                  to={`/watch/${movie.id}`}
                  className="bg-white hover:bg-white/80 text-black p-1.5 rounded-full 
                           transition-all duration-300 hover:scale-110"
                >
                  <Play className="w-4 h-4 fill-black" />
                </Link>
                <button
                  onClick={handleInfoClick}
                  className="bg-gray-500/70 hover:bg-gray-500 p-1.5 rounded-full 
                           transition-all duration-300 hover:scale-110"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>
              
              <div className="text-xs">
                {movie.release_date?.split("-")[0] ||
                  movie.first_air_date?.split("-")[0]}
              </div>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <InfoModal
        show={showModal} // Add this prop
        content={movie}
        onClose={handleCloseModal}
        isClosing={isModalClosing}
      />
      )}
    </>
  );
};


export default MovieCard;