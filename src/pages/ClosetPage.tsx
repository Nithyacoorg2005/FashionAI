import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { Filter, Plus, Search } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import ClothingCard from '../components/closet/ClothingCard';
import ClothingUploader from '../components/closet/ClothingUploader';
import useAuthStore from '../store/authStore';
import useClothingStore from '../store/clothingStore';
import { ClothingCategory, Season, Occasion } from '../types';

const ClosetPage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const { items, updateItem, deleteItem } = useClothingStore();
  
  const [activeCategory, setActiveCategory] = useState<ClothingCategory | 'all'>('all');
  const [activeSeason, setActiveSeason] = useState<Season | 'all'>('all');
  const [activeOccasion, setActiveOccasion] = useState<Occasion | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState(false);
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  const filteredItems = items.filter(item => {
    // Category filter
    if (activeCategory !== 'all' && item.category !== activeCategory) {
      return false;
    }
    
    // Season filter
    if (activeSeason !== 'all' && !item.season.includes(activeSeason)) {
      return false;
    }
    
    // Occasion filter
    if (activeOccasion !== 'all' && !item.occasion.includes(activeOccasion)) {
      return false;
    }
    
    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        item.category.toLowerCase().includes(query) ||
        (item.subCategory && item.subCategory.toLowerCase().includes(query)) ||
        item.color.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return true;
  });
  
  const handleToggleFavorite = (id: string, favorite: boolean) => {
    updateItem(id, { favorite });
  };
  
  return (
    <Layout>
      <div className="py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              My Closet
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Manage and organize your clothing items
            </p>
          </div>
          
          <div className="mt-4 sm:mt-0">
            <Button
              onClick={() => setIsAddingItem(true)}
              icon={<Plus className="w-4 h-4" />}
            >
              Add Item
            </Button>
          </div>
        </div>
        
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="md:flex-grow">
            <Input
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-5 h-5" />}
              fullWidth
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              icon={<Filter className="w-4 h-4" />}
            >
              Filters
            </Button>
          </div>
        </div>
        
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-6 overflow-hidden"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setActiveCategory('all')}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${
                          activeCategory === 'all'
                            ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        All
                      </button>
                      {Object.values(ClothingCategory).map((category) => (
                        <button
                          key={category}
                          onClick={() => setActiveCategory(category)}
                          className={`px-3 py-1 text-sm rounded-full transition-colors ${
                            activeCategory === category
                              ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                              : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Season
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setActiveSeason('all')}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${
                          activeSeason === 'all'
                            ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        All
                      </button>
                      {Object.values(Season).map((season) => (
                        <button
                          key={season}
                          onClick={() => setActiveSeason(season)}
                          className={`px-3 py-1 text-sm rounded-full transition-colors ${
                            activeSeason === season
                              ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                              : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {season}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Occasion
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setActiveOccasion('all')}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${
                          activeOccasion === 'all'
                            ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        All
                      </button>
                      {Object.values(Occasion).map((occasion) => (
                        <button
                          key={occasion}
                          onClick={() => setActiveOccasion(occasion)}
                          className={`px-3 py-1 text-sm rounded-full transition-colors ${
                            activeOccasion === occasion
                              ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                              : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {occasion.replace(/-/g, ' ')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {searchQuery || activeCategory !== 'all' || activeSeason !== 'all' || activeOccasion !== 'all'
                  ? 'No items match your filters'
                  : "You don't have any clothing items yet"}
              </p>
              <Button
                variant="outline"
                onClick={() => setIsAddingItem(true)}
                icon={<Plus className="w-4 h-4" />}
              >
                Add Your First Item
              </Button>
            </motion.div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredItems.map((item) => (
                <ClothingCard
                  key={item.id}
                  item={item}
                  onEdit={() => {}}
                  onDelete={deleteItem}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
        
        {/* Add Item Modal */}
        {isAddingItem && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="w-full max-w-4xl max-h-[90vh] overflow-auto">
              <ClothingUploader />
              <div className="mt-4 flex justify-end">
                <Button variant="outline" onClick={() => setIsAddingItem(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ClosetPage;