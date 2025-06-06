import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format, addDays, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import useOutfitStore from '../../store/outfitStore';
import useClothingStore from '../../store/clothingStore';
import Card, { CardHeader, CardContent } from '../ui/Card';
import Button from '../ui/Button';

interface WeeklyCalendarProps {
  onAddOutfit: (date: Date) => void;
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ onAddOutfit }) => {
  const [startDate, setStartDate] = useState(new Date());
  const { plans, outfits } = useOutfitStore();
  const { items } = useClothingStore();
  
  const getDaysOfWeek = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(addDays(startDate, i));
    }
    return days;
  };
  
  const days = getDaysOfWeek();
  
  const getPlanForDate = (date: Date) => {
    return plans.find(plan => isSameDay(new Date(plan.date), date));
  };
  
  const getOutfitById = (outfitId: string) => {
    return outfits.find(outfit => outfit.id === outfitId);
  };
  
  const getItemsForOutfit = (outfitId: string) => {
    const outfit = getOutfitById(outfitId);
    if (!outfit) return [];
    return items.filter(item => outfit.items.includes(item.id));
  };
  
  const previousWeek = () => {
    setStartDate(addDays(startDate, -7));
  };
  
  const nextWeek = () => {
    setStartDate(addDays(startDate, 7));
  };
  
  const isToday = (date: Date) => {
    return isSameDay(date, new Date());
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Weekly Outfit Planner
        </h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={previousWeek}
            aria-label="Previous week"
            icon={<ChevronLeft className="w-4 h-4" />}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={nextWeek}
            aria-label="Next week"
            icon={<ChevronRight className="w-4 h-4" />}
          />
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-7 gap-4">
          {days.map((day, i) => {
            const plan = getPlanForDate(day);
            const outfit = plan ? getOutfitById(plan.outfitId) : null;
            const outfitItems = plan ? getItemsForOutfit(plan.outfitId) : [];
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-lg overflow-hidden border ${
                  isToday(day)
                    ? 'border-indigo-500 dark:border-indigo-400'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className={`p-2 text-center ${
                  isToday(day)
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}>
                  <p className="text-xs font-medium">{format(day, 'E')}</p>
                  <p className="text-sm font-bold">{format(day, 'd')}</p>
                </div>
                
                <div className="p-2 h-36 bg-white dark:bg-gray-900">
                  {plan && outfit ? (
                    <div className="h-full flex flex-col">
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 truncate">
                        {outfit.name}
                      </p>
                      <div className="flex-grow overflow-hidden grid grid-cols-2 gap-1">
                        {outfitItems.slice(0, 4).map((item, idx) => (
                          <div
                            key={item.id}
                            className="rounded overflow-hidden bg-gray-100 dark:bg-gray-800"
                          >
                            <img
                              src={item.imageUrl}
                              alt={`${item.category}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div
                      className="h-full flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-md hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
                      onClick={() => onAddOutfit(day)}
                    >
                      <div className="text-center">
                        <Plus className="w-5 h-5 mx-auto text-gray-400 dark:text-gray-500" />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Add outfit
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyCalendar;