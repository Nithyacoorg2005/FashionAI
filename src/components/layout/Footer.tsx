import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-4">FashionAI</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              AI-powered fashion organization to simplify your wardrobe and elevate your style.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400" aria-label="Github">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/features" className="text-gray-600 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-600 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/help" className="text-gray-600 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-indigo-500 dark:text-gray-400 dark:hover:text-indigo-400">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">Stay Updated</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Subscribe to our newsletter for tips and updates.
            </p>
            <form className="flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 text-sm focus:ring-indigo-500 focus:border-indigo-500 dark:text-white mb-2 sm:mb-0 sm:mr-2"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} FashionAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;