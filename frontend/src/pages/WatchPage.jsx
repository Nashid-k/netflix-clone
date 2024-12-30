import { useEffect, useState, memo } from "react";
import { useParams, Link } from "react-router-dom";
import { useContentStore } from "../store/content";
import axios from "axios";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight, Play, Info, X, Star } from "lucide-react";
import ReactPlayer from "react-player";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";

const formatReleaseDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Memoized Info Modal Component
const InfoModal = memo(({ content, onClose, isClosing }) => (
  <div
    className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-700 ${
      isClosing ? "animate-backdrop-fade-out" : "animate-backdrop-fade-in"
    }`}
    style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
    onClick={onClose}
  >
    <div
      className={`relative bg-zinc-900 rounded-xl max-w-4xl w-full overflow-hidden ${
        isClosing ? "animate-modal-slide-out" : "animate-modal-slide-in"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative h-[300px] md:h-[400px]">
        <img
          src={ORIGINAL_IMG_BASE_URL + content.backdrop_path}
          alt={content.title || content.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-all duration-300 hover:scale-110"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="p-8 space-y-6">
        <h2 className="text-3xl font-bold">{content.title || content.name}</h2>

        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center bg-white/10 px-3 py-1 rounded-full">
            <Star className="w-4 h-4 text-yellow-500 mr-1" />
            <span>{content.vote_average?.toFixed(1)}</span>
          </div>
          <span className="bg-white/10 px-3 py-1 rounded-full">
            {content.release_date?.split("-")[0] ||
              content.first_air_date?.split("-")[0]}
          </span>
          <span className="bg-white/10 px-3 py-1 rounded-full">
            {content.adult ? "18+" : "PG-13"}
          </span>
        </div>

        <p className="text-gray-300 leading-relaxed text-lg">
          {content.overview}
        </p>

        <div className="flex gap-4 pt-4">
          <Link
            to={`/watch/${content.id}`}
            className="bg-white hover:bg-white/90 text-black px-8 py-3 rounded-lg flex items-center transition-all duration-300 hover:scale-105 font-semibold"
          >
            <Play className="w-5 h-5 mr-2 fill-black" />
            Play Now
          </Link>
        </div>
      </div>
    </div>
  </div>
));

InfoModal.displayName = "InfoModal";

// Memoized Content Card Component
const ContentCard = memo(({ item, onInfoClick }) => (
  <div className="group relative max-w-xs mx-auto bg-black rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:scale-105">
    <img
      src={SMALL_IMG_BASE_URL + item.poster_path}
      alt={item.title || item.name}
      className="w-full h-auto rounded-lg"
      loading="lazy"
    />

    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-between p-4">
      <h3 className="text-lg font-semibold line-clamp-2">
        {item.title || item.name}
      </h3>

      <div className="space-y-2">
        <p className="text-sm text-gray-300 line-clamp-3">{item.overview}</p>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Link
              to={`/watch/${item.id}`}
              className="bg-white hover:bg-white/90 text-black p-2 rounded-full transition-all duration-300 hover:scale-110"
            >
              <Play className="w-4 h-4 fill-black" />
            </Link>
            <button
              onClick={() => onInfoClick(item)}
              className="bg-gray-600/80 hover:bg-gray-600 p-2 rounded-full transition-all duration-300 hover:scale-110"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>

          <span className="text-sm bg-gray-800 px-2 py-1 rounded">
            {item.release_date?.split("-")[0] ||
              item.first_air_date?.split("-")[0]}
          </span>
        </div>
      </div>
    </div>
  </div>
));

ContentCard.displayName = "ContentCard";

export const WatchPage = () => {
  const { id } = useParams();
  const [states, setStates] = useState({
    loading: true,
    showModal: false,
    isClosing: false,
    currentTrailerIdx: 0,
  });
  const [data, setData] = useState({
    trailers: [],
    content: {},
    similarContent: [],
    selectedContent: null,
  });
  const { contentType } = useContentStore();

  // Fetch all data in parallel
  useEffect(() => {
    const fetchData = async () => {
      try {
        setStates((prev) => ({ ...prev, loading: true }));

        const [trailersRes, contentRes, similarRes] = await Promise.all([
          axios.get(`/api/v1/${contentType}/${id}/trailers`),
          axios.get(`/api/v1/${contentType}/${id}/details`),
          axios.get(`/api/v1/${contentType}/${id}/similar`),
        ]);

        setData({
          trailers: trailersRes.data.trailers || [],
          content: contentRes.data.content || {},
          similarContent: similarRes.data.similar || [],
          selectedContent: null,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setStates((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, [contentType, id]);

  const handleInfoClick = (content) => {
    setData((prev) => ({ ...prev, selectedContent: content }));
    setStates((prev) => ({ ...prev, showModal: true }));
  };

  const handleCloseModal = () => {
    setStates((prev) => ({ ...prev, isClosing: true }));
    setTimeout(() => {
      setStates((prev) => ({ ...prev, showModal: false, isClosing: false }));
      setData((prev) => ({ ...prev, selectedContent: null }));
    }, 500);
  };

  return (
    <div className="bg-black min-h-screen text-white relative">
      {states.loading && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-gray-600 border-t-white rounded-full animate-spin" />
        </div>
      )}

      <Navbar />

      <div className="mx-auto container px-4 py-8">
        {data.trailers.length > 0 && (
          <div className="flex justify-between items-center mb-6">
            <button
              className={`bg-gray-600 py-2 px-6 rounded transition-all duration-300 ${
                states.currentTrailerIdx === 0
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer hover:bg-gray-700"
              }`}
              disabled={states.currentTrailerIdx === 0}
              onClick={() =>
                setStates((prev) => ({
                  ...prev,
                  currentTrailerIdx: Math.max(0, prev.currentTrailerIdx - 1),
                }))
              }
            >
              <ChevronLeft size={24} />
            </button>

            <button
              className={`bg-gray-600 py-2 px-6 rounded transition-all duration-300 ${
                states.currentTrailerIdx === data.trailers.length - 1
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer hover:bg-gray-700"
              }`}
              disabled={states.currentTrailerIdx === data.trailers.length - 1}
              onClick={() =>
                setStates((prev) => ({
                  ...prev,
                  currentTrailerIdx: Math.min(
                    data.trailers.length - 1,
                    prev.currentTrailerIdx + 1
                  ),
                }))
              }
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        <div className="aspect-video mb-8 sm:px-10 md:px-32 relative">
          {data.trailers.length > 0 ? (
            <ReactPlayer
              className="aspect-video mx-auto overflow-hidden rounded-lg"
              url={`https://www.youtube.com/watch?v=${
                data.trailers[states.currentTrailerIdx].key
              }`}
              playing={true}
              controls={true}
              width="100%"
              height="70vh"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-center bg-zinc-900 rounded-lg">
              <p className="text-2xl sm:text-3xl md:text-4xl">
                No trailers available for{" "}
                <span className="font-bold text-red-600">
                  {data.content?.title || data.content?.name}
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Content Details Section */}

        
        <div
          className="relative bg-cover bg-center bg-no-repeat mb-12 rounded-lg shadow-lg overflow-hidden hidden lg:block"
          style={{
            backgroundImage: `url(${
              ORIGINAL_IMG_BASE_URL + data.content?.backdrop_path
            })`,
            height: "600px",
          }}
        >
        
          <div className="absolute inset-0 bg-black opacity-70 z-0"></div>

          {/* Content Text */}
          <div className="relative z-10 px-6 py-8 sm:w-2/3 md:w-1/2 lg:w-1/3">
            <h2 className="text-4xl font-semibold leading-tight text-white">
              {data.content?.title || data.content?.name}
            </h2>
            <p className="text-lg sm:text-xl mt-3">
              {formatReleaseDate(
                data.content?.release_date || data.content?.first_air_date
              )}
            </p>
            <p className="mt-4 text-sm sm:text-base text-gray-300">
              {data.content?.overview}
            </p>
            <div className="mt-4 flex items-center gap-4">
              <span
                className={`px-3 py-1 rounded-full ${
                  data.content?.adult ? "bg-red-600" : "bg-green-600"
                }`}
              >
                {data.content?.adult ? "18+" : "PG-13"}
              </span>
              {data.content?.vote_average && (
                <div className="flex items-center bg-white/10 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span>{data.content.vote_average.toFixed(1)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Overlay Poster Image */}
          <div className="absolute right-6 bottom-6 sm:w-1/3 sm:max-w-xs w-full z-10">
            <img
              src={SMALL_IMG_BASE_URL + data.content?.poster_path}
              alt="Poster"
              className="rounded-lg shadow-2xl max-w-full h-auto transform transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>

        {/* Mobile Content Details */}
        <div className="block lg:hidden">
          <div className="p-4 bg-zinc-900 text-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold">
              {data.content?.title || data.content?.name}
            </h2>
            <p className="text-sm mt-2">
              {formatReleaseDate(
                data.content?.release_date || data.content?.first_air_date
              )}
            </p>
            <p className="mt-4 text-base text-gray-300">
              {data.content?.overview}
            </p>
            <div className="mt-4 flex items-center gap-4">
              <span
                className={`px-3 py-1 rounded-full ${
                  data.content?.adult ? "bg-red-600" : "bg-green-600"
                }`}
              >
                {data.content?.adult ? "18+" : "PG-13"}
              </span>
              {data.content?.vote_average && (
                <div className="flex items-center bg-white/10 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span>{data.content.vote_average.toFixed(1)}</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4">
            <img
              src={SMALL_IMG_BASE_URL + data.content?.poster_path}
              alt="Poster"
              className="rounded-lg w-full shadow-lg"
              loading="lazy"
            />
          </div>
        </div>

        {/* Similar Content Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Similar Content
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {data.similarContent
              .filter((item) => item.poster_path)
              .map((item) => (
                <ContentCard
                  key={item.id}
                  item={item}
                  onInfoClick={handleInfoClick}
                />
              ))}
          </div>
        </div>
      </div>

      {/* Info Modal */}
      {states.showModal && data.selectedContent && (
        <InfoModal
          content={data.selectedContent}
          onClose={handleCloseModal}
          isClosing={states.isClosing}
        />
      )}
    </div>
  );
};

export default memo(WatchPage);
