import { useState, useEffect } from "react";
import axios from "axios";
import { useContentStore } from "../store/content";

export const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState(null);
  const [trailers, setTrailers] = useState([]);
  const { contentType } = useContentStore();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`/api/v1/${contentType}/trending`);
        console.log("Trending Response:", response.data);
        
        if (response.data?.success && response.data?.content) {
          const content = response.data.content;
          setTrendingContent(content);

          // Fetch trailers
          if (content?.id) {
            const type = content?.title ? "movie" : "tv";
            try {
              const trailerResponse = await axios.get(
                `/api/v1/${type}/${content.id}/trailers`
              );
              console.log("Trailer Response:", trailerResponse.data);
              if (trailerResponse.data?.trailers?.length > 0) {
                setTrailers(trailerResponse.data.trailers);
              }
            } catch (error) {
              console.error("Error fetching trailers:", error);
              setTrailers([]);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching content:", error);
        setTrendingContent(null);
        setTrailers([]);
      }
    };

    fetchContent();
  }, [contentType]);

  return { trendingContent, trailers };
};