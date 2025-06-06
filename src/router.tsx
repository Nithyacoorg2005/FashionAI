import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ClosetPage from './pages/ClosetPage';
import OutfitsPage from './pages/OutfitsPage';
import CalendarPage from './pages/CalendarPage';
import StatsPage from './pages/StatsPage';
import useAuthStore from './store/authStore';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuthStore();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/closet',
    element: (
      <ProtectedRoute>
        <ClosetPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/outfits',
    element: (
      <ProtectedRoute>
        <OutfitsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/calendar',
    element: (
      <ProtectedRoute>
        <CalendarPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/stats',
    element: (
      <ProtectedRoute>
        <StatsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;