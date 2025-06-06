import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import { 
  Shirt, Droplets, Calendar, BarChart2, Clock, Heart, CircleDollarSign, 
  TrendingUp, BadgePercent, Tag, PieChart
} from 'lucide-react';
import Layout from '../components/layout/Layout';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import StatsCard from '../components/stats/StatsCard';
import useAuthStore from '../store/authStore';
import useClothingStore from '../store/clothingStore';
import useOutfitStore from '../store/outfitStore';
import { ClothingCategory, Season } from '../types';

const StatsPage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const { items } = useClothingStore();
  const { outfits } = useOutfitStore();
  
  const [activeTimeFrame, setActiveTimeFrame] = useState<'week' | 'month' | 'year'>('month');
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  const totalItems = items.length;
  const totalOutfits = outfits.length;
  const favoriteItems = items.filter(item => item.favorite).length;
  const favoriteOutfits = outfits.filter(outfit => outfit.favorite).length;
  
  const categoryBreakdown = Object.values(ClothingCategory).map(category => {
    const count = items.filter(item => item.category === category).length;
    const percentage = totalItems > 0 ? Math.round((count / totalItems) * 100) : 0;
    return { category, count, percentage };
  });
  
  const seasonBreakdown = Object.values(Season).map(season => {
    const count = items.filter(item => item.season.includes(season)).length;
    const percentage = totalItems > 0 ? Math.round((count / totalItems) * 100) : 0;
    return { season, count, percentage };
  });
  
  const colorBreakdown = (() => {
    const colors: { [key: string]: number } = {};
    items.forEach(item => {
      if (!colors[item.color]) {
        colors[item.color] = 0;
      }
      colors[item.color]++;
    });
    
    return Object.entries(colors)
      .map(([color, count]) => ({ color, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  })();
  
  const mostWornItems = [...items]
    .sort((a, b) => b.timesWorn - a.timesWorn)
    .slice(0, 5);
  
  const mostWornOutfits = [...outfits]
    .sort((a, b) => b.timesWorn - a.timesWorn)
    .slice(0, 5);
  
  return (
    <Layout>
      <div className="py-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Style Statistics
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Insights and analytics about your wardrobe and fashion choices
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Items"
            value={totalItems}
            icon={<Shirt className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />}
          />
          <StatsCard
            title="Total Outfits"
            value={totalOutfits}
            icon={<BarChart2 className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />}
          />
          <StatsCard
            title="Favorite Items"
            value={`${favoriteItems} (${totalItems > 0 ? Math.round((favoriteItems / totalItems) * 100) : 0}%)`}
            icon={<Heart className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />}
          />
          <StatsCard
            title="Outfit Combinations"
            value={totalOutfits > 0 ? `${totalOutfits}/${Math.pow(totalItems, 2)}` : '0'}
            description="Of possible combinations"
            icon={<PieChart className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Category Breakdown
              </h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryBreakdown.map(({ category, count, percentage }) => (
                  <div key={category} className="flex items-center">
                    <div className="w-32 text-sm text-gray-700 dark:text-gray-300 capitalize">
                      {category}
                    </div>
                    <div className="flex-grow">
                      <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-indigo-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        ></motion.div>
                      </div>
                    </div>
                    <div className="w-16 text-right text-sm text-gray-700 dark:text-gray-300">
                      {count} ({percentage}%)
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Seasonal Distribution
              </h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {seasonBreakdown.map(({ season, count, percentage }) => (
                  <div key={season} className="flex items-center">
                    <div className="w-32 text-sm text-gray-700 dark:text-gray-300 capitalize">
                      {season}
                    </div>
                    <div className="flex-grow">
                      <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${
                            season === Season.Spring
                              ? 'bg-green-500'
                              : season === Season.Summer
                              ? 'bg-yellow-500'
                              : season === Season.Fall
                              ? 'bg-orange-500'
                              : 'bg-blue-500'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                        ></motion.div>
                      </div>
                    </div>
                    <div className="w-16 text-right text-sm text-gray-700 dark:text-gray-300">
                      {count} ({percentage}%)
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Most Worn Items
              </h2>
            </CardHeader>
            <CardContent>
              {mostWornItems.length === 0 ? (
                <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                  No wear statistics available yet
                </div>
              ) : (
                <div className="space-y-4">
                  {mostWornItems.map((item) => (
                    <div key={item.id} className="flex items-center">
                      <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 mr-4">
                        <img src={item.imageUrl} alt={item.category} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <div className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                          {item.subCategory || item.category}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {item.color}, {item.season.join(', ')}
                        </div>
                      </div>
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {item.timesWorn} times
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Popular Colors
              </h2>
            </CardHeader>
            <CardContent>
              {colorBreakdown.length === 0 ? (
                <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                  No color data available yet
                </div>
              ) : (
                <div className="space-y-4">
                  {colorBreakdown.map(({ color, count }) => (
                    <div key={color} className="flex items-center">
                      <div 
                        className="w-8 h-8 rounded-full mr-4" 
                        style={{ 
                          backgroundColor: color.toLowerCase(),
                          border: '1px solid #e5e7eb',
                        }}
                      ></div>
                      <div className="flex-grow">
                        <div className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                          {color}
                        </div>
                      </div>
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {count} items
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Style Evolution
            </h2>
          </CardHeader>
          <CardContent>
            <div className="text-center p-8 text-gray-500 dark:text-gray-400">
              <p>More detailed insights will be available as you continue to use FashionAI.</p>
              <p className="mt-2">Add more items and create outfits to see your style evolution over time.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default StatsPage;