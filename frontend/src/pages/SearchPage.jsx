import { useState, useEffect } from "react";
import { useContentStore } from "../store/content";
import Navbar from "../components/Navbar";
import { Search, Star, Calendar, Info, Play } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import InfoModal from '../components/InfoModal/InfoModal';
import { History } from "lucide-react";
import { Link } from "react-router-dom";

// Animation variants
const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariant = {  // renamed from 'item' to 'itemVariant'
    hidden: { opacity: 0, y: 20 },
    show: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.3 }
    }
};

// ResultCard Component
const ResultCard = ({ item, activeTab, navigate, onInfoClick }) => {
    return (
       
        <motion.div
            variants={itemVariant}  // changed from 'item' to 'itemVariant'
            className="group relative bg-gray-800/50 rounded-xl overflow-hidden 
                     hover:shadow-xl hover:shadow-red-600/20 transition-all duration-300
                     border border-gray-700 hover:border-red-500"
            whileHover={{ y: -5 }}
        >
            <div className="relative aspect-[2/3] overflow-hidden">
                <img 
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path || item.profile_path}`}
                    alt={item.title || item.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full 
                                  group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex gap-2 justify-center mb-2">
                            {activeTab !== 'person' && (
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="bg-red-600 p-2 rounded-full hover:bg-red-700 
                                             transition-colors shadow-lg shadow-red-600/50"
                                    onClick={() => navigate(`/watch/${item.id}`)}
                                >
                                    <Play className="w-5 h-5" />
                                </motion.button>
                            )}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="bg-gray-600/80 p-2 rounded-full hover:bg-gray-700 
                                         transition-colors"
                                onClick={onInfoClick}
                            >
                                <Info className="w-5 h-5" />
                            </motion.button>
                        </div>
                        {item.vote_average && (
                            <div className="flex items-center justify-center gap-1 text-yellow-500">
                                <Star className="w-4 h-4" />
                                <span>{item.vote_average.toFixed(1)}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold truncate">{item.title || item.name}</h3>
                {item.release_date && (
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(item.release_date).getFullYear()}</span>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export const SearchPage = () => {
    const [activeTab, setActiveTab] = useState("movie");
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null);
    const { setContentType } = useContentStore();
    const navigate = useNavigate();
    const calculateStringSimilarity = (str1, str2) => {
        const s1 = str1.toLowerCase();
        const s2 = str2.toLowerCase();
        
        // Check for exact match first
        if (s1 === s2) return 1;
        
        // Check if one string contains the other
        if (s1.includes(s2) || s2.includes(s1)) return 0.8;
        
        // Calculate similarity based on common characters
        const chars1 = s1.split('');
        const chars2 = s2.split('');
        const commonChars = chars1.filter(char => chars2.includes(char));
        
        return commonChars.length / Math.max(s1.length, s2.length);
      };
      
    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setContentType(tab === 'movie' ? "movie" : "tv");
        setResults([]);
        setSearchTerm("");
    };
    const handleInfoClick = async (content) => {
        try {
            // First set the modal content and show it
            setSelectedContent(content);
            setShowModal(true);
    
            // Then save to search history
            await axios.post('api/v1/search/history', {
                id: content.id,
                image: content.poster_path || content.profile_path,
                title: content.title || content.name,
                searchType: activeTab
            });
        } catch (error) {
            console.error('Error saving to history:', error);
            // Still show the modal even if saving to history fails
            setSelectedContent(content);
            setShowModal(true);
        }
    };

    const performSearch = async () => {
        if (!searchTerm.trim()) {
            setResults([]);
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.get(`api/v1/search/${activeTab}/${searchTerm}`);
            
            // Filter and sort results
            const filteredResults = response.data.content
                .filter(item => item.poster_path || item.profile_path)
                .map(item => ({
                    ...item,
                    similarity: calculateStringSimilarity(
                        searchTerm,
                        item.name || item.title || ''
                    )
                }))
                .sort((a, b) => {
                    // Sort by similarity score
                    if (b.similarity !== a.similarity) {
                        return b.similarity - a.similarity;
                    }
                    // If similarity is equal, sort by popularity
                    return b.popularity - a.popularity;
                });
    
            setResults(filteredResults);
        } catch (error) {
            if (!error.response?.status === 404) {
                toast.error("An error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchTerm) performSearch();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    return (
        <div className="bg-gradient-to-b from-black via-gray-900 to-black min-h-screen text-white">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                        Discover Amazing Content
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Millions of movies, TV shows, and people to discover
                    </p>
                </motion.div>

                {/* Tabs */}
                <motion.div 
                    className="flex justify-center gap-4 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {["movie", "tv", "person"].map((tab) => (
                        <motion.button
                            key={tab}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300
                                ${activeTab === tab 
                                    ? "bg-red-600 text-white shadow-lg shadow-red-600/30" 
                                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
                            onClick={() => handleTabClick(tab)}
                        >
                            {tab === "tv" ? "TV Shows" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Search Input */}
              <motion.div 
    className="relative max-w-3xl mx-auto mb-12"  // Changed to relative positioning
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3 }}
>
    <input 
        type="text" 
        className="w-full p-4 pr-32 rounded-full bg-gray-800/50 border border-gray-700 
                 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 
                 transition-all duration-300"
        placeholder={`Search for ${activeTab === "tv" ? "TV shows" : activeTab + "s"}...`}
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
    />
    <Link
        to="/history"
        className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 
                 px-4 py-2 rounded-full bg-gray-700/50 hover:bg-gray-700 
                 transition-all duration-300 text-gray-300 hover:text-white"
    >
        <History className="w-4 h-4" />
        <span className="text-sm">History</span>
    </Link>
</motion.div>

                {/* Results */}
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div 
                            className="flex justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                                <Search className="w-8 h-8 text-red-600" />
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >
                            {results.map((item) => (
                                <ResultCard 
                                    key={item.id}
                                    item={item}
                                    activeTab={activeTab}
                                    navigate={navigate}
                                    onInfoClick={() => handleInfoClick(item)}
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Info Modal */}
                {showModal && selectedContent && (
                    <InfoModal
                        content={selectedContent}
                        onClose={() => setShowModal(false)}
                    />
                )}
            </div>
        </div>
    );
};