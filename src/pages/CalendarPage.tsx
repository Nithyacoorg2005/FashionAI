import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import WeeklyCalendar from '../components/calendar/WeeklyCalendar';
import OutfitBuilder from '../components/outfit/OutfitBuilder';
import useAuthStore from '../store/authStore';
import useOutfitStore from '../store/outfitStore';
import useClothingStore from '../store/clothingStore';
import { isSameDay } from 'date-fns';

const CalendarPage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const { plans, outfits } = useOutfitStore();
  const { items } = useClothingStore();
  
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isCreatingOutfit, setIsCreatingOutfit] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  const renderDaysOfWeek = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days.map((day, index) => (
      <div key={index} className="text-center font-medium text-gray-500 dark:text-gray-400 text-sm py-2">
        {day}
      </div>
    ));
  };
  
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
  
  const handleCalendarAddOutfit = (date: Date) => {
    setSelectedDate(date);
    setIsCreatingOutfit(true);
  };
  
  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = new Date(monthStart);
    const endDate = new Date(monthEnd);
    
    const dateFormat = 'd';
    const days = eachDayOfInterval({ start: startDate, end: endDate });
    
    const firstDayOfMonth = startDate.getDay();
    const emptyDaysBefore = Array.from({ length: firstDayOfMonth }, (_, i) => (
      <div key={`empty-before-${i}`} className="h-24 border border-gray-100 dark:border-gray-800"></div>
    ));
    
    const renderedDays = days.map((day, dayIndex) => {
      const formattedDate = format(day, dateFormat);
      const plan = getPlanForDate(day);
      const outfit = plan ? getOutfitById(plan.outfitId) : null;
      const outfitItems = plan ? getItemsForOutfit(plan.outfitId) : [];
      
      return (
        <motion.div
          key={day.toString()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: dayIndex * 0.01 }}
          className={`min-h-24 border border-gray-100 dark:border-gray-800 ${
            isToday(day) ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''
          }`}
        >
          <div className="flex flex-col h-full">
            <div className={`text-right p-1 ${
              isToday(day) ? 'bg-indigo-500 text-white rounded-t-sm' : ''
            }`}>
              <span className={`text-sm ${
                isToday(day) 
                  ? 'font-bold' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}>
                {formattedDate}
              </span>
            </div>
            
            <div className="flex-grow p-1">
              {plan && outfit ? (
                <div className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded p-1 transition-colors">
                  <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 truncate">
                    {outfit.name}
                  </div>
                  {outfitItems.length > 0 && (
                    <div className="grid grid-cols-2 gap-1">
                      {outfitItems.slice(0, 2).map((item) => (
                        <div
                          key={item.id}
                          className="aspect-square overflow-hidden rounded-sm"
                        >
                          <img
                            src={item.imageUrl}
                            alt={item.category}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => handleCalendarAddOutfit(day)}
                  className="w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                >
                  <Plus className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      );
    });
    
    return [...emptyDaysBefore, ...renderedDays];
  };
  
  return (
    <Layout>
      <div className="py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Outfit Calendar
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Plan your outfits for upcoming days and events
            </p>
          </div>
        </div>
        
        <div className="mb-8">
          <WeeklyCalendar onAddOutfit={handleCalendarAddOutfit} />
        </div>
        
        <Card>
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {format(currentMonth, 'MMMM yyyy')}
            </h2>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevMonth}
                aria-label="Previous month"
                icon={<ChevronLeft className="w-4 h-4" />}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={nextMonth}
                aria-label="Next month"
                icon={<ChevronRight className="w-4 h-4" />}
              />
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-7 gap-px">
              {renderDaysOfWeek()}
              {renderCells()}
            </div>
          </CardContent>
        </Card>
        
        {/* Create Outfit Modal */}
        {isCreatingOutfit && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="w-full max-w-4xl max-h-[90vh] overflow-auto">
              <OutfitBuilder onClose={() => setIsCreatingOutfit(false)} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CalendarPage;