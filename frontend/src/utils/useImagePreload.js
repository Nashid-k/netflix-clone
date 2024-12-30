import { useState, useEffect } from 'react';
import { SMALL_IMG_BASE_URL, ORIGINAL_IMG_BASE_URL } from '../utils/constants';

export const useImagePreload = (content, setLoadingState) => {
  const [posterUrl, setPosterUrl] = useState('');

  useEffect(() => {
    if (content?.backdrop_path) {
      // Load low quality image first
      const smallImage = new Image();
      smallImage.src = SMALL_IMG_BASE_URL + content.backdrop_path;
      setPosterUrl(SMALL_IMG_BASE_URL + content.backdrop_path);
      
      smallImage.onload = () => {
        setLoadingState(prev => ({ ...prev, imageLoading: false }));
        
        // Then load high quality image
        const highQualityImage = new Image();
        highQualityImage.src = ORIGINAL_IMG_BASE_URL + content.backdrop_path;
        highQualityImage.onload = () => {
          setPosterUrl(ORIGINAL_IMG_BASE_URL + content.backdrop_path);
        };
      };
    }
  }, [content, setLoadingState]);

  return { posterUrl };
};