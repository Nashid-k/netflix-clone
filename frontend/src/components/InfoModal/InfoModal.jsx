import { useState, useEffect } from "react";
import { X, Play, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { ORIGINAL_IMG_BASE_URL } from "../../utils/constants";
import { ContentMetadata } from "../ContentSection/components/ContentMetadata";
import axios from "axios";

const InfoModal = ({ content, onClose, isClosing }) => {
  const [personDetails, setPersonDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);
  const isPerson = content?.media_type === "person" || content?.known_for_department;

  useEffect(() => {
    if (isPerson && content?.id) {
      const fetchPersonDetails = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`/api/v1/search/person/details/${content.id}`);
          setPersonDetails(response.data.content);
        } catch (error) {
          console.error("Error fetching person details:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchPersonDetails();
    }
  }, [content?.id, isPerson]);

  const truncateBiography = (text, maxLength = 300) => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const renderPersonContent = () => (
    <>
      {/* Person Header */}
      <div className="relative h-[300px]">
        <div className="h-full flex">
          <div className="w-1/3 h-full p-6">
            <img
              src={ORIGINAL_IMG_BASE_URL + content?.profile_path}
              alt={content?.name}
              className="w-full h-full object-cover rounded-xl shadow-2xl"
            />
          </div>
          <div className="w-2/3 h-full bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-900/50 
                        flex flex-col justify-center px-6">
            <h2 className="text-3xl font-bold text-white mb-4">{content?.name}</h2>
            {!isLoading && personDetails && (
              <div className="space-y-2 text-gray-300">
                {personDetails.known_for_department && (
                  <div className="text-xl text-red-500 font-semibold">
                    {personDetails.known_for_department}
                  </div>
                )}
                {personDetails.birthday && <div>Born: {personDetails.birthday}</div>}
                {personDetails.place_of_birth && <div>{personDetails.place_of_birth}</div>}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Person Details */}
      <div className="overflow-y-auto max-h-[calc(90vh-300px)] custom-scrollbar">
        <div className="p-8 space-y-6">
          {isLoading ? (
            <div className="animate-pulse">Loading...</div>
          ) : personDetails && (
            <>
              {personDetails.biography && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Biography</h3>
                  <p className="text-white/80 leading-relaxed">
                    {showFullBio ? personDetails.biography : truncateBiography(personDetails.biography)}
                  </p>
                  {personDetails.biography.length > 300 && (
                    <button
                      onClick={() => setShowFullBio(!showFullBio)}
                      className="text-red-500 hover:text-red-400 mt-2 flex items-center gap-1"
                    >
                      {showFullBio ? "Show Less" : "Read More"}
                    </button>
                  )}
                  <a
                    href={`https://www.google.com/search?q=${content.name} actor biography`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-red-500 hover:text-red-400"
                  >
                    Read More on Web <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}

              {personDetails.credits?.cast && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Known For</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {personDetails.credits.cast
                      .sort((a, b) => b.popularity - a.popularity)
                      .slice(0, 8)
                      .filter(work => work.poster_path)
                      .map((work) => (
                        <Link 
                          key={work.id}
                          to={`/watch/${work.id}`}
                          className="relative group cursor-pointer"
                        >
                          <img
                            src={`${ORIGINAL_IMG_BASE_URL}${work.poster_path}`}
                            alt={work.title || work.name}
                            className="w-full rounded-lg transition-transform duration-300 
                                     group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 
                                        group-hover:opacity-100 transition-opacity 
                                        duration-300 rounded-lg flex items-end">
                            <div className="p-2 text-sm">
                              <div className="font-semibold">{work.title || work.name}</div>
                              <div className="text-gray-300">as {work.character}</div>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );

  const renderMovieContent = () => (
    <>
      <div className="relative h-[300px]">
        <img
          src={ORIGINAL_IMG_BASE_URL + content?.backdrop_path}
          alt={content?.title || content?.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h2 className="text-3xl font-bold text-white drop-shadow-lg">
            {content?.title || content?.name}
          </h2>
        </div>
      </div>

      <div className="p-8 space-y-6">
        <div className="flex flex-wrap items-center gap-4 text-white/90">
          <ContentMetadata content={content} className="text-white" />
        </div>
        <p className="text-white/80 leading-relaxed text-lg">{content?.overview}</p>
        <div className="flex gap-4 pt-4">
          <Link
            to={`/watch/${content?.id}`}
            className="bg-white hover:bg-white/90 text-black px-8 py-3 rounded-lg 
                     flex items-center gap-2 transition-all duration-300 
                     hover:scale-105 font-semibold"
          >
            <Play className="w-5 h-5 fill-black" />
            Play Now
          </Link>
        </div>
      </div>
    </>
  );

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 
                  transition-all duration-700 ${
                    isClosing ? "animate-backdrop-fade-out" : "animate-backdrop-fade-in"
                  }`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      onClick={onClose}
    >
      <div
        className={`relative bg-zinc-900 rounded-xl max-w-4xl w-full max-h-[90vh] 
                    overflow-hidden ${
                      isClosing ? "animate-modal-slide-out" : "animate-modal-slide-in"
                    }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 p-2 rounded-full 
                    hover:bg-black/70 transition-all duration-300 hover:scale-110"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Content */}
        {isPerson ? renderPersonContent() : renderMovieContent()}
      </div>
    </div>
  );
};

export default InfoModal;