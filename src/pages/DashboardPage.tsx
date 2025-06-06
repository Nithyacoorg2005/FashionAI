import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { Plus, BarChart2, Shirt, Calendar, CloudSun } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import WeatherWidget from '../components/weather/WeatherWidget';
import OutfitCard from '../components/outfit/OutfitCard';
import OutfitBuilder from '../components/outfit/OutfitBuilder';
import WeeklyCalendar from '../components/calendar/WeeklyCalendar';
import StatsCard from '../components/stats/StatsCard';
import useAuthStore from '../store/authStore';
import useOutfitStore from '../store/outfitStore';
import useClothingStore from '../store/clothingStore';

const DashboardPage: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();
  const { outfits, createOutfit, updateOutfit, deleteOutfit, addPlan } = useOutfitStore();
  const { items } = useClothingStore();
  
  const [isCreatingOutfit, setIsCreatingOutfit] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  const favoriteOutfits = outfits.filter(outfit => outfit.favorite);
  const recentOutfits = [...outfits].sort((a, b) => 
    new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
  ).slice(0, 3);
  
  const handleToggleFavorite = (id: string, favorite: boolean) => {
    updateOutfit(id, { favorite });
  };
  
  const handleAddToCalendar = (outfitId: string) => {
    if (selectedDate) {
      addPlan({
        date: selectedDate,
        outfitId,
      });
      setSelectedDate(null);
    }
  };
  
  const handleCalendarAddOutfit = (date: Date) => {
    setSelectedDate(date);
    setIsCreatingOutfit(true);
  };
  
  return (
    <Layout>
      <div className="py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user?.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Here's an overview of your fashion closet
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 md:mt-0"
          >
            <Button
              onClick={() => setIsCreatingOutfit(true)}
              icon={<Plus className="w-4 h-4" />}
            >
              Create Outfit
            </Button>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Weather Widget */}
          <div className="lg:col-span-1">
            <WeatherWidget />
          </div>
          
          {/* Stats Overview */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatsCard
              title="Total Items"
              value={items.length}
              icon={<Shirt className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />}
            />
            <StatsCard
              title="Outfits Created"
              value={outfits.length}
              icon={<BarChart2 className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />}
            />
            <StatsCard
              title="Weekly Plans"
              value="5/7"
              description="Days planned this week"
              icon={<Calendar className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />}
            />
          </div>
        </div>
        
        {/* Weekly Calendar */}
        <div className="mb-8">
          <WeeklyCalendar onAddOutfit={handleCalendarAddOutfit} />
        </div>
        
        {/* Favorite Outfits */}
        <div className="mb-8">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Favorite Outfits
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCreatingOutfit(true)}
              >
                Create New
              </Button>
            </CardHeader>
            <CardContent>
              {favoriteOutfits.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <p>You haven't favorited any outfits yet.</p>
                  <p className="mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsCreatingOutfit(true)}
                      className="mt-2"
                    >
                      Create your first outfit
                    </Button>
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favoriteOutfits.map(outfit => (
                    <OutfitCard
                      key={outfit.id}
                      outfit={outfit}
                      onEdit={() => {}}
                      onDelete={deleteOutfit}
                      onToggleFavorite={handleToggleFavorite}
                      onAddToCalendar={handleAddToCalendar}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Outfits */}
        <div>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Outfits
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {}}
              >
                View All
              </Button>
            </CardHeader>
            <CardContent>
              {recentOutfits.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <p>You haven't created any outfits yet.</p>
                  <p className="mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsCreatingOutfit(true)}
                      className="mt-2"
                    >
                      Create your first outfit
                    </Button>
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recentOutfits.map(outfit => (
                    <OutfitCard
                      key={outfit.id}
                      outfit={outfit}
                      onEdit={() => {}}
                      onDelete={deleteOutfit}
                      onToggleFavorite={handleToggleFavorite}
                      onAddToCalendar={handleAddToCalendar}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Outfit Builder Modal */}
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

export default DashboardPage;