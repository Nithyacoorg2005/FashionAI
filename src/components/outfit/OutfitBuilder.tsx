import React, { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus, Save, Trash2 } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { ClothingCategory, Season, Occasion, ClothingItem } from '../../types';
import useClothingStore from '../../store/clothingStore';
import useOutfitStore from '../../store/outfitStore';
import Card, { CardContent, CardFooter, CardHeader } from '../ui/Card';

interface OutfitBuilderProps {
  onClose?: () => void;
}

const OutfitBuilder: React.FC<OutfitBuilderProps> = ({ onClose }) => {
  const [name, setName] = useState('New Outfit');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [occasions, setOccasions] = useState<Occasion[]>([]);
  const [activeCategory, setActiveCategory] = useState<ClothingCategory>(ClothingCategory.Tops);
  const [isSaving, setIsSaving] = useState(false);
  
  const { items } = useClothingStore();
  const { createOutfit } = useOutfitStore();
  
  const filteredItems = items.filter(item => item.category === activeCategory);
  
  const handleAddItem = (itemId: string) => {
    if (!selectedItems.includes(itemId)) {
      setSelectedItems([...selectedItems, itemId]);
    }
  };
  
  const handleRemoveItem = (itemId: string) => {
    setSelectedItems(selectedItems.filter(id => id !== itemId));
  };
  
  const toggleSeason = (season: Season) => {
    if (seasons.includes(season)) {
      setSeasons(seasons.filter(s => s !== season));
    } else {
      setSeasons([...seasons, season]);
    }
  };
  
  const toggleOccasion = (occasion: Occasion) => {
    if (occasions.includes(occasion)) {
      setOccasions(occasions.filter(o => o !== occasion));
    } else {
      setOccasions([...occasions, occasion]);
    }
  };
  
  const handleSave = () => {
    if (selectedItems.length === 0) return;
    
    setIsSaving(true);
    
    createOutfit({
      name,
      items: selectedItems,
      season: seasons,
      occasion: occasions,
      favorite: false,
    });
    
    // Reset form
    setName('New Outfit');
    setSelectedItems([]);
    setSeasons([]);
    setOccasions([]);
    setIsSaving(false);
    
    if (onClose) onClose();
  };
  
  // Find the selected clothing items
  const selectedClothingItems = items.filter(item => 
    selectedItems.includes(item.id)
  );
  
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Create New Outfit
        </h2>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left side: Outfit preview and info */}
          <div>
            <Input
              label="Outfit Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              className="mb-4"
            />
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Seasons
              </label>
              <div className="flex flex-wrap gap-2">
                {Object.values(Season).map((season) => (
                  <button
                    key={season}
                    type="button"
                    onClick={() => toggleSeason(season)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      seasons.includes(season)
                        ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {season}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Occasions
              </label>
              <div className="flex flex-wrap gap-2">
                {Object.values(Occasion).map((occasion) => (
                  <button
                    key={occasion}
                    type="button"
                    onClick={() => toggleOccasion(occasion)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      occasions.includes(occasion)
                        ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {occasion.replace(/-/g, ' ')}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Selected Items ({selectedItems.length})
              </h3>
              
              {selectedItems.length === 0 ? (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center text-gray-500 dark:text-gray-400">
                  <p>No items selected yet.</p>
                  <p className="text-sm mt-1">Use the panel on the right to add items to your outfit.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  {selectedClothingItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="relative group"
                    >
                      <div className="rounded-md overflow-hidden bg-white dark:bg-gray-700 shadow-sm">
                        <div className="aspect-square relative">
                          <img
                            src={item.imageUrl}
                            alt={`${item.category}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="absolute top-1 right-1 p-1 rounded-full bg-white/80 dark:bg-gray-800/80 opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                        <div className="p-2 text-xs font-medium text-gray-700 dark:text-gray-300">
                          {item.subCategory || item.category}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Right side: Closet items */}
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Browse Closet
              </label>
              <div className="flex overflow-x-auto pb-2 hide-scrollbar">
                {Object.values(ClothingCategory).map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 text-sm rounded-full whitespace-nowrap mr-2 transition-colors ${
                      activeCategory === category
                        ? 'bg-indigo-500 text-white'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-96 overflow-y-auto p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
              {filteredItems.length === 0 ? (
                <div className="col-span-3 text-center py-8 text-gray-500 dark:text-gray-400">
                  No items in this category
                </div>
              ) : (
                filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`rounded-md overflow-hidden bg-white dark:bg-gray-700 shadow-sm cursor-pointer ${
                      selectedItems.includes(item.id) ? 'ring-2 ring-indigo-500' : ''
                    }`}
                    onClick={() => handleAddItem(item.id)}
                  >
                    <div className="aspect-square relative">
                      <img
                        src={item.imageUrl}
                        alt={`${item.category}`}
                        className="w-full h-full object-cover"
                      />
                      {selectedItems.includes(item.id) && (
                        <div className="absolute top-1 right-1 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-2 text-xs font-medium text-gray-700 dark:text-gray-300">
                      {item.subCategory || item.category}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-end space-x-3">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          disabled={selectedItems.length === 0}
          isLoading={isSaving}
          icon={<Save className="w-4 h-4" />}
        >
          Save Outfit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OutfitBuilder;