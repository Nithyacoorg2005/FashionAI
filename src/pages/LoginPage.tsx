import React from 'react';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import LoginForm from '../components/auth/LoginForm';
import useAuthStore from '../store/authStore';

const LoginPage: React.FC = () => {
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
              Welcome back
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Sign in to access your AI-powered fashion closet
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-8 border border-gray-100 dark:border-gray-700">
            <LoginForm />
          </div>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>Demo Account: demo@example.com / password</p>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default LoginPage;