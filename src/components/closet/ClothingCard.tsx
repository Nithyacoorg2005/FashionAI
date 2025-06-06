import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Edit, Trash2 } from 'lucide-react';
import { ClothingItem, Season, Occasion } from '../../types';
import Card from '../ui/Card';

interface ClothingCardProps {
  item: ClothingItem;
  onEdit: (item: ClothingItem) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string, favorite: boolean) => void;
}

const ClothingCard: React.FC<ClothingCardProps> = ({
  item,
  onEdit,
  onDelete,
  onToggleFavorite,
}) => {
  const seasonColors = {
    [Season.Spring]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    [Season.Summer]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    [Season.Fall]: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    [Season.Winter]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  };
  
  const occasionColors = {
    [Occasion.Casual]: 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300',
    [Occasion.WorkFromHome]: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300',
    [Occasion.Office]: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
    [Occasion.Formal]: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    [Occasion.SemiFormal]: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
    [Occasion.Athletic]: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
    [Occasion.Special]: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="relative pb-[100%] overflow-hidden bg-gray-100 dark:bg-gray-800">
          <img
            src={item.imageUrl}
            alt={`${item.category} - ${item.color}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <button
            onClick={() => onToggleFavorite(item.id, !item.favorite)}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 transition-colors"
            aria-label={item.favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              size={18}
              fill={item.favorite ? '#ef4444' : 'none'}
              className={item.favorite ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}
            />
          </button>
        </div>
        
        <div className="p-4 flex-grow">
          <div className="font-medium text-gray-900 dark:text-white capitalize mb-2">
            {item.subCategory || item.category}
          </div>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {item.season.map((season) => (
              <span
                key={season}
                className={`text-xs px-2 py-1 rounded-full ${seasonColors[season]}`}
              >
                {season}
              </span>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-1">
            {item.occasion.slice(0, 2).map((occasion) => (
              <span
                key={occasion}
                className={`text-xs px-2 py-1 rounded-full ${occasionColors[occasion]}`}
              >
                {occasion.replace(/-/g, ' ')}
              </span>
            ))}
            {item.occasion.length > 2 && (
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                +{item.occasion.length - 2}
              </span>
            )}
          </div>
        </div>
        
        <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 flex justify-between">
          <button
            onClick={() => onEdit(item)}
            className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
            aria-label="Edit"
          >
            <Edit size={18} />
          </button>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Worn {item.timesWorn} times
          </div>
          <button
            onClick={() => onDelete(item.id)}
            className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
            aria-label="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </Card>
    </motion.div>
  );
};

export default ClothingCard;