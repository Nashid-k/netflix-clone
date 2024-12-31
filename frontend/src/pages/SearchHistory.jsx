import { useState, useEffect } from 'react';
import { X, Clock, Search, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
      opacity: 1,
      transition: { duration: 0.3 }
  }
};

const itemVariant = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
};


export const SearchHistory = () => {
    const [searchHistory, setSearchHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchSearchHistory();
    }, []);

    const fetchSearchHistory = async () => {
        try {
            const response = await axios.get('api/v1/search/history');
            setSearchHistory(response.data.content || []);
        } catch (error) {
            toast.error('Failed to load search history');
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const removeFromHistory = async (id) => {
        try {
            await axios.delete(`api/v1/search/history/${id}`);
            setSearchHistory(prev => prev.filter(item => item.id !== id));
            toast.success('Removed from history');
        } catch (error) {
            toast.error('Failed to remove item');
            console.error('Error:', error);
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'movie':
                return '🎬';
            case 'tv':
                return '📺';
            case 'person':
                return '👤';
            default:
                return '🔍';
        }
    };

    if (isLoading) {
      return (
          <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
              <Navbar />
              <div className="flex justify-center items-center h-[calc(100vh-64px)]">
                  <div className="animate-pulse">
                      <Clock className="w-8 h-8 text-red-600" />
                  </div>
              </div>
          </div>
      );
  }

  return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
          <Navbar />
          <div className="container mx-auto px-4 py-16">
              {searchHistory.length === 0 ? (
                  <motion.div 
                      className="max-w-4xl mx-auto text-center space-y-6 mt-20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                  >
                      <Clock className="w-16 h-16 mx-auto text-red-600/80" />
                      <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                          No Search History
                      </h1>
                      <p className="text-gray-400 text-lg">Start exploring to build your history</p>
                      <Link 
                          to="/search" 
                          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 
                                   px-8 py-3 rounded-full transition-all duration-300
                                   shadow-lg shadow-red-600/20"
                      >
                          <ArrowLeft className="w-5 h-5" />
                          Back to Search
                      </Link>
                  </motion.div>
              ) : (
                  <motion.div 
                      className="max-w-5xl mx-auto space-y-6"
                      variants={container}
                      initial="hidden"
                      animate="show"
                  >
                      <div className="flex justify-between items-center mb-10">
                          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                              Search History
                          </h1>
                          <Link 
                              to="/search"
                              className="flex items-center gap-2 bg-red-600 px-6 py-3 rounded-full 
                                       hover:bg-red-700 transition-all duration-300
                                       shadow-lg shadow-red-600/20"
                          >
                              <Search className="w-5 h-5" />
                              New Search
                          </Link>
                      </div>

                      <div className="grid gap-4">
                          {searchHistory.map((historyItem) => (
                              <motion.div
                                  key={historyItem.id}
                                  variants={itemVariant}
                                  className="bg-gray-800/40 backdrop-blur-sm rounded-xl overflow-hidden 
                                           border border-gray-700/50 hover:border-red-500/50
                                           hover:bg-gray-800/60 transition-all duration-300
                                           shadow-lg"
                              >
                                  <div className="p-5 flex items-center justify-between group">
                                      <div className="flex items-center gap-5">
                                          {historyItem.image ? (
                                              <img 
                                                  src={`https://image.tmdb.org/t/p/w92${historyItem.image}`}
                                                  alt={historyItem.title}
                                                  className="w-16 h-20 rounded-lg object-cover shadow-lg"
                                              />
                                          ) : (
                                              <div className="w-16 h-20 rounded-lg bg-gray-700/50 
                                                          flex items-center justify-center text-2xl shadow-lg">
                                                  {getTypeIcon(historyItem.searchType)}
                                              </div>
                                          )}
                                          <div className="space-y-1">
                                              <Link
                                                  to={`/search?q=${encodeURIComponent(historyItem.title)}&type=${historyItem.searchType}`}
                                                  className="text-xl font-semibold hover:text-red-500 transition-colors"
                                              >
                                                  {historyItem.title}
                                              </Link>
                                              <div className="flex items-center gap-3 text-sm text-gray-400">
                                                  <span className="capitalize px-2 py-1 bg-gray-700/50 rounded-full">
                                                      {historyItem.searchType}
                                                  </span>
                                                  <span>•</span>
                                                  <span>{new Date(historyItem.createdAt).toLocaleDateString()}</span>
                                              </div>
                                          </div>
                                      </div>
                                      <button
                                          onClick={() => removeFromHistory(historyItem.id)}
                                          className="p-2 hover:bg-red-500/10 text-gray-400 hover:text-red-500 
                                                   rounded-full transition-all duration-300 opacity-0 
                                                   group-hover:opacity-100"
                                      >
                                          <X className="w-5 h-5" />
                                      </button>
                                  </div>
                              </motion.div>
                          ))}
                      </div>
                  </motion.div>
              )}
          </div>
      </div>
  );
};

export default SearchHistory;