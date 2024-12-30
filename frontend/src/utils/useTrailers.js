import { useState, useEffect } from 'react';
import axios from 'axios';

export const useTrailers = (content) => {
  const [trailers, setTrailers] = useState([]);

  useEffect(() => {
    const fetchTrailers = async () => {
      if (!content?.id) return;

      try {
        const type = content?.title ? "movie" : "tv";
        const response = await axios.get(`/api/v1/${type}/${content.id}/trailers`);
        setTrailers(response.data.trailers);
      } catch (error) {
        console.error("Error fetching trailers:", error);
        setTrailers([]);
      }
    };

    fetchTrailers();
  }, [content]);

  return { trailers };
};