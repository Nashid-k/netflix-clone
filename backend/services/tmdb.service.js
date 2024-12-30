import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

// Create a reusable axios instance
const tmdbApi = axios.create({
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + ENV_VARS.TMDB_API_KEY
  },
  timeout: 5000
});

// Add response caching
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const fetchFromTMDB = async(url) => {
  // Check cache first
  const cachedData = cache.get(url);
  if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
    return cachedData.data;
  }

  try {
    const response = await tmdbApi.get(url);
    
    if (response.status !== 200) {
      throw new Error("Failed to fetch data from TMDB: " + response.statusText);
    }

    // Cache the response
    cache.set(url, {
      data: response.data,
      timestamp: Date.now()
    });

    return response.data;
  } catch (error) {
    console.error("TMDB API Error:", error.message);
    throw error;
  }
};