import React from 'react';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import RegisterForm from '../components/auth/RegisterForm';
import useAuthStore from '../store/authStore';

const RegisterPage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  
  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full space-y-8 text-center"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Create an account
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Join FashionAI and transform your wardrobe experience
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-8 border border-gray-100 dark:border-gray-700">
            <RegisterForm />
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default RegisterPage;