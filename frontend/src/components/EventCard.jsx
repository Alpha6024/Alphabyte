import React from 'react';
import { motion } from 'framer-motion';
import { formatDate, formatTime, getEventStatusColor, calculateProgress } from '../utils/helpers';

const EventCard = ({ event, onRegister, onEdit, onDelete, showActions = false, userType = 'student' }) => {
  const progressPercentage = calculateProgress(event.registeredCount, event.maxParticipants);
  const isFullyBooked = event.registeredCount >= event.maxParticipants;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
    >
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEventStatusColor(event.status)}`}>
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
            {event.category}
          </span>
        </div>
      </div>

      {/* Event Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-2">📅</span>
            <span>{formatDate(event.date)} at {formatTime(event.time)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-2">📍</span>
            <span>{event.venue}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-2">👤</span>
            <span>Organized by {event.organizer}</span>
          </div>
        </div>

        {/* Registration Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Registrations</span>
            <span>{event.registeredCount}/{event.maxParticipants}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className={`h-2 rounded-full ${
                progressPercentage >= 90 ? 'bg-red-500' : 
                progressPercentage >= 70 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          {userType === 'student' && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onRegister(event.id)}
              disabled={isFullyBooked || event.status === 'completed'}
              className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-colors ${
                isFullyBooked || event.status === 'completed'
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isFullyBooked ? 'Fully Booked' : event.status === 'completed' ? 'Event Ended' : 'Register'}
            </motion.button>
          )}

          {showActions && userType === 'organizer' && (
            <>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onEdit(event)}
                className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg font-medium text-sm hover:bg-green-700 transition-colors"
              >
                Edit
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onDelete(event.id)}
                className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg font-medium text-sm hover:bg-red-700 transition-colors"
              >
                Delete
              </motion.button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;