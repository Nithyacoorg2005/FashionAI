import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import useAuthStore from '../../store/authStore';

const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { register, isLoading, error, clearError } = useAuthStore();
  
  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return false;
    }
    setPasswordError('');
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePasswords()) return;
    await register(name, email, password);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-md text-sm"
          >
            {error}
          </motion.div>
        )}
        
        <Input
          label="Full Name"
          type="text"
          id="name"
          placeholder="John Doe"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            clearError();
          }}
          icon={<User className="w-5 h-5" />}
          required
          fullWidth
        />
        
        <Input
          label="Email"
          type="email"
          id="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            clearError();
          }}
          icon={<Mail className="w-5 h-5" />}
          required
          fullWidth
        />
        
        <Input
          label="Password"
          type="password"
          id="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            clearError();
            if (confirmPassword) validatePasswords();
          }}
          icon={<Lock className="w-5 h-5" />}
          error={passwordError}
          required
          fullWidth
        />
        
        <Input
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (password) validatePasswords();
          }}
          icon={<Lock className="w-5 h-5" />}
          required
          fullWidth
        />
        
        <div>
          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
          >
            Create Account
          </Button>
        </div>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              Sign in
            </a>
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default RegisterForm;