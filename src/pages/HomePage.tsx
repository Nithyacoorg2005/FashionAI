import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Tally4, CalendarRange, Shirt, CloudSun, Lock } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <Shirt className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      title: 'AI-Powered Clothing Recognition',
      description: 'Upload photos of your clothes and our AI will automatically categorize them by type, color, and more.'
    },
    {
      icon: <CloudSun className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      title: 'Weather-Based Recommendations',
      description: 'Get outfit suggestions based on the current weather and your personal style preferences.'
    },
    {
      icon: <Tally4 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      title: 'Drag-and-Drop Outfit Builder',
      description: 'Create and save outfit combinations with our intuitive drag-and-drop interface.'
    },
    {
      icon: <CalendarRange className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      title: 'Calendar Integration',
      description: 'Plan your outfits ahead of time and integrate with your calendar for event-based suggestions.'
    }
  ];
  
  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <Layout>
      <div className="py-12 sm:py-20">
        {/* Hero Section */}
        <motion.div
          className="text-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
          initial="hidden"
          animate="visible"
          variants={heroVariants}
        >
          <motion.h1
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white"
            variants={itemVariants}
          >
            Your Personal{' '}
            <span className="text-indigo-600 dark:text-indigo-400">AI Stylist</span>
          </motion.h1>
          
          <motion.p
            className="mt-6 text-xl text-gray-600 dark:text-gray-300"
            variants={itemVariants}
          >
            Organize your wardrobe, discover new outfit combinations, and always dress your best with AI-powered recommendations.
          </motion.p>
          
          <motion.div
            className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
            variants={itemVariants}
          >
            <Button size="lg" className="px-8">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="px-8">
              Learn More
            </Button>
          </motion.div>
        </motion.div>
        
        {/* App Screenshot */}
        <motion.div
          className="mt-16 relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <img
              src="https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="FashionAI App Screenshot"
              className="w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Effortless Style Management</h3>
                <p className="text-white/80">Organize and plan your outfits with ease</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Features */}
        <div className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Powerful Features
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our AI-powered platform makes fashion organization and styling simple, intuitive, and enjoyable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-full w-fit mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-indigo-600 dark:bg-indigo-700 rounded-2xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Ready to transform your wardrobe?
                </h2>
                <p className="mt-4 text-lg text-indigo-100">
                  Sign up today and start building your digital closet with AI assistance.
                </p>
              </div>
              <div className="mt-8 lg:mt-0 lg:ml-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/register">
                    <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50">
                      Sign Up Free
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-indigo-700">
                      <Lock className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;