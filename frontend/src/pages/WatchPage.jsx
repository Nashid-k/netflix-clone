import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContentStore } from "../store/content";
import axios from "axios";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";

function formatReleaseDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const WatchPage = () => {
  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [currentTraileridx, setCurrentTraileridx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({});
  const [similarContent, setSimilarContent] = useState([]);
  const { contentType } = useContentStore();

  useEffect(() => {
    const getTrailers = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
        setTrailers(res.data.trailers);
      } catch (error) {
        if (error.message.includes("404")) {
          setTrailers([]);
        }
      }
    };
    getTrailers();
  }, [contentType, id]);

  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
        setSimilarContent(res.data.similar);
      } catch (error) {
        if (error.message.includes("404")) {
          setSimilarContent([]);
        }
      }
    };
    getSimilarContent();
  }, [contentType, id]);

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
        setContent(res.data.content);
      } catch (error) {
        if (error.message.includes("404")) {
          setContent([]);
        }
      } finally {
        setLoading(false);
      }
    };
    getContentDetails();
  }, [contentType, id]);

  return (
      <div className="bg-black min-h-screen text-white">
        <Navbar />
      <div className="mx-auto container px-4 py-8 h-full">
        {trailers.length > 0 && (
          <div className="justify-between items-center mb-4 flex">
            <button
              className={`bg-gray-500/70 py-2 text-white px-4 rounded transition-all duration-300 ${
                currentTraileridx === 0
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer hover:bg-gray-600"
              }`}
              disabled={currentTraileridx === 0}
              onClick={() => {
                if (currentTraileridx > 0) {
                  setCurrentTraileridx((prev) => prev - 1);
                }
              }}
            >
              <ChevronLeft size={24} className="text-white" />
            </button>

            <button
              className={`bg-gray-500/70 py-2 text-white px-4 rounded transition-all duration-300 ${
                currentTraileridx === trailers.length - 1
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer hover:bg-gray-600"
              }`}
              disabled={currentTraileridx === trailers.length - 1}
              onClick={() => {
                if (currentTraileridx < trailers.length - 1) {
                  setCurrentTraileridx((prev) => prev + 1);
                }
              }}
            >
              <ChevronRight size={24} className="text-white" />
            </button>
          </div>
        )}

        <div className="aspect-video mb-8 sm:px-10 md:px-32">
          {trailers.length > 0 ? (
            <ReactPlayer
              className="aspect-video mx-auto overflow-hidden rounded-lg"
              url={`https://www.youtube.com/watch?v=${trailers[currentTraileridx].key}`}
              playing={true}
              controls={true}
              width="100%"
              height="70vh"
            />
          ) : (
            <h2 className="text-xl text-center mt-5">
              No trailers available for{" "}
              <span className="font-bold text-red-600">
                {content?.title || content?.name}
              </span>
            </h2>
          )}
        </div>

        {/* Movie details with responsive layout */}
        <div className="mb-4 mb:mb-0 flex flex-col sm:flex-row sm:items-center">
          {/* Text section */}
          <div className="sm:w-2/3">
            <h2 className="text-5xl font-bold text-balance">
              {content?.title || content?.name}
            </h2>
            <p className="mt-2 text-lg">
              {formatReleaseDate(content?.release_date || content?.first_air_date)} |{" "}
              {content?.adult ? (
                <span className="text-red-600">18+</span>
              ) : (
                <span className="text-green-600">PG-13</span>
              )}
            </p>
            <p className="mt-2 text-lg">{content?.overview}</p>
          </div>

          {/* Poster section */}
          <div className="sm:w-1/3 mt-4 sm:mt-0 sm:ml-8">
            <img
              src={ORIGINAL_IMG_BASE_URL + content.poster_path}
              alt="Poster image"
              className="max-h-[600px] rounded-md mx-auto sm:mx-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
