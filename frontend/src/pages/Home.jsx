import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const userTypes = [
    { 
      type: 'student', 
      title: 'Student Dashboard', 
      icon: '🎓',
      description: 'Browse and register for events',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      type: 'organizer', 
      title: 'Event Organizer', 
      icon: '📋',
      description: 'Create and manage events',
      color: 'from-green-500 to-green-600'
    },
    { 
      type: 'admin', 
      title: 'Admin Dashboard', 
      icon: '⚙️',
      description: 'System administration',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Welcome to EventHub
          </h1>
          <p className="text-xl text-gray-600">
            College Event Management System
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {userTypes.map((user, index) => (
            <motion.div
              key={user.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/${user.type}`)}
              className="bg-white p-8 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-all"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${user.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <span className="text-2xl">{user.icon}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{user.title}</h3>
              <p className="text-gray-600">{user.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;