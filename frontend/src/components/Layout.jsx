import React from 'react';
import { motion } from 'framer-motion';

const Layout = ({ children, currentUser, setCurrentUser, userType, setUserType }) => {
  const userTypes = [
    { value: 'student', label: 'Student Dashboard', icon: '🎓' },
    { value: 'organizer', label: 'Event Organizer', icon: '📋' },
    { value: 'admin', label: 'Admin Dashboard', icon: '⚙️' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  EventHub
                </h1>
                <p className="text-xs text-gray-500">College Event Management</p>
              </div>
            </motion.div>

            {/* User Type Switcher */}
            <div className="flex items-center space-x-4">
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer pr-10 bg-no-repeat bg-right"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundSize: '1.5em 1.5em'
                }}
              >
                {userTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.icon} {type.label}
                  </option>
                ))}
              </select>

              {/* User Profile */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3 bg-white px-4 py-2 rounded-lg border border-gray-200"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {currentUser?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{currentUser?.name || 'User'}</p>
                  <p className="text-gray-500 capitalize">{userType}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500">
            <p>&copy; 2026 EventHub - College Event Management System</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;