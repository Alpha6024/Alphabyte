import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import TabNavigation from '../components/TabNavigation';
import EventCard from '../components/EventCard';
import { mockEvents, categories } from '../data/mockData';
import { filterEvents, formatDate } from '../utils/helpers';

const StudentDashboard = ({ currentUser, setCurrentUser }) => {
  const [activeTab, setActiveTab] = useState('browse');
  const [events, setEvents] = useState(mockEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState(currentUser);

  const tabs = [
    { id: 'browse', label: 'Browse Events', icon: '🔍' },
    { id: 'myEvents', label: 'My Events', icon: '📅' },
    { id: 'profile', label: 'Profile', icon: '👤' }
  ];

  const filteredEvents = filterEvents(events, searchTerm, selectedCategory);
  const registeredEvents = events.filter(event => 
    currentUser.registeredEvents?.includes(event.id)
  );

  const handleRegister = (eventId) => {
    const event = events.find(e => e.id === eventId);
    if (event.registeredCount >= event.maxParticipants) {
      toast.error('Event is fully booked!');
      return;
    }

    setEvents(prev => prev.map(e => 
      e.id === eventId 
        ? { ...e, registeredCount: e.registeredCount + 1 }
        : e
    ));

    setCurrentUser(prev => ({
      ...prev,
      registeredEvents: [...(prev.registeredEvents || []), eventId]
    }));

    toast.success(`Successfully registered for ${event.title}!`);
  };

  const handleDownloadCertificate = (eventId) => {
    toast.success('Certificate downloaded successfully!');
  };

  const handleProfileSave = () => {
    setCurrentUser(profileData);
    setIsEditingProfile(false);
    toast.success('Profile updated successfully!');
  };

  const renderBrowseEvents = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-lg"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search events by name, description, or organizer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer pr-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em'
            }}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <EventCard
              event={event}
              onRegister={handleRegister}
              userType="student"
            />
          </motion.div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}
    </div>
  );

  const renderMyEvents = () => (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Registered Events</h2>
        
        {registeredEvents.length > 0 ? (
          <div className="space-y-4">
            {registeredEvents.map(event => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-500">{formatDate(event.date)} • {event.venue}</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      event.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {event.status === 'completed' ? 'Attended' : 'Registered'}
                    </span>
                  </div>
                </div>
                
                {event.status === 'completed' && currentUser.certificates?.includes(event.id) && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDownloadCertificate(event.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium text-sm hover:bg-green-700 transition-colors"
                  >
                    📜 Download Certificate
                  </motion.button>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No registered events</h3>
            <p className="text-gray-500">Browse and register for events to see them here</p>
          </div>
        )}
      </motion.div>
    </div>
  );

  const renderProfile = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Student Profile</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsEditingProfile(!isEditingProfile)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          {isEditingProfile ? 'Cancel' : 'Edit Profile'}
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            value={profileData.name}
            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
            disabled={!isEditingProfile}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
            disabled={!isEditingProfile}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Roll Number</label>
          <input
            type="text"
            value={profileData.rollNumber}
            onChange={(e) => setProfileData({...profileData, rollNumber: e.target.value})}
            disabled={!isEditingProfile}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
          <input
            type="text"
            value={profileData.department}
            onChange={(e) => setProfileData({...profileData, department: e.target.value})}
            disabled={!isEditingProfile}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
          <select
            value={profileData.year}
            onChange={(e) => setProfileData({...profileData, year: e.target.value})}
            disabled={!isEditingProfile}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 appearance-none cursor-pointer pr-10"
            style={{
              backgroundImage: !isEditingProfile ? 'none' : `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em'
            }}
          >
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            value={profileData.phone}
            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
            disabled={!isEditingProfile}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
          />
        </div>
      </div>

      {isEditingProfile && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex space-x-4"
        >
          <button
            onClick={handleProfileSave}
            className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Save Changes
          </button>
          <button
            onClick={() => {
              setIsEditingProfile(false);
              setProfileData(currentUser);
            }}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        </motion.div>
      )}
    </motion.div>
  );

  return (
    <div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Dashboard</h1>
        <p className="text-gray-600">Discover and register for exciting college events</p>
      </motion.div>

      <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'browse' && renderBrowseEvents()}
      {activeTab === 'myEvents' && renderMyEvents()}
      {activeTab === 'profile' && renderProfile()}
    </div>
  );
};

export default StudentDashboard;