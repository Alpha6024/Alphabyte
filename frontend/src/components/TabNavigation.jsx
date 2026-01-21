import React from 'react';
import { motion } from 'framer-motion';

const TabNavigation = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-gray-200 mb-8">
      <nav className="flex space-x-8">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            onClick={() => setActiveTab(tab.id)}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <span className="flex items-center space-x-2">
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
            </span>
          </motion.button>
        ))}
      </nav>
    </div>
  );
};

export default TabNavigation;