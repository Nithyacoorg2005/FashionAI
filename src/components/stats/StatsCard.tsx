import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, ArrowUpRight, ArrowDownRight, Percent, Slash } from 'lucide-react';
import Card, { CardContent, CardHeader } from '../ui/Card';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  change?: number;
  icon?: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  description,
  change,
  icon = <BarChart3 className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />,
}) => {
  const getChangeColor = () => {
    if (!change) return 'text-gray-500 dark:text-gray-400';
    return change > 0 
      ? 'text-green-600 dark:text-green-400' 
      : 'text-red-600 dark:text-red-400';
  };
  
  const getChangeIcon = () => {
    if (!change) return <Slash className="w-3 h-3" />;
    return change > 0 
      ? <ArrowUpRight className="w-3 h-3" /> 
      : <ArrowDownRight className="w-3 h-3" />;
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                {title}
              </p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {value}
              </h3>
              
              {(description || change !== undefined) && (
                <div className="mt-2 flex items-center">
                  {change !== undefined && (
                    <span className={`flex items-center text-xs font-medium ${getChangeColor()} mr-2`}>
                      {getChangeIcon()}
                      {Math.abs(change)}%
                    </span>
                  )}
                  
                  {description && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {description}
                    </p>
                  )}
                </div>
              )}
            </div>
            
            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-full">
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatsCard;