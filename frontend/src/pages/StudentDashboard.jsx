import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import TabNavigation from '../components/TabNavigation';
import EventCard from '../components/EventCard';
import { mockEvents, categories } from '../data/mockData';
import { filterEvents, formatDate } from '../utils/helpers';
import ScanQR from '../page/scanQR';

const StudentDashboard = ({ currentUser, setCurrentUser }) => {
  const [activeTab, setActiveTab] = useState('browse');
  const [events, setEvents] = useState(mockEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState(currentUser);

  const [scanMode, setScanMode] = useState(false); // ✅ ADDED

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

    setEvents(prev =>
      prev.map(e =>
        e.id === eventId
          ? { ...e, registeredCount: e.registeredCount + 1 }
          : e
      )
    );

    setCurrentUser(prev => ({
      ...prev,
      registeredEvents: [...(prev.registeredEvents || []), eventId]
    }));

    toast.success(`Successfully registered for ${event.title}!`);
  };

  const handleDownloadCertificate = () => {
    toast.success('Certificate downloaded successfully!');
  };

  /* ===================== BROWSE EVENTS ===================== */
  const renderBrowseEvents = () => (
    <div className="space-y-6">
      {/* unchanged */}
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
    </div>
  );

  /* ===================== MY EVENTS (QR INTEGRATED) ===================== */
  const renderMyEvents = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-lg"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            My Registered Events
          </h2>

          {/* ✅ SCAN QR BUTTON */}
          <button
            onClick={() => setScanMode(!scanMode)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            {scanMode ? 'Close Scanner' : '📷 Scan Attendance QR'}
          </button>
        </div>

        {/* ✅ QR SCANNER */}
        {scanMode && (
          <div className="mb-6">
            <ScanQR />
          </div>
        )}

        {registeredEvents.length > 0 ? (
          <div className="space-y-4">
            {registeredEvents.map(event => (
              <div
                key={event.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div>
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-sm text-gray-500">
                    {formatDate(event.date)} • {event.venue}
                  </p>
                </div>

                {event.status === 'completed' && (
                  <button
                    onClick={handleDownloadCertificate}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    Download Certificate
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No registered events</p>
        )}
      </motion.div>
    </div>
  );

  /* ===================== PROFILE (UNCHANGED) ===================== */
  const renderProfile = () => (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Student Profile</h2>
      {/* profile code unchanged */}
    </div>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>

      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === 'browse' && renderBrowseEvents()}
      {activeTab === 'myEvents' && renderMyEvents()}
      {activeTab === 'profile' && renderProfile()}
    </div>
  );
};

export default StudentDashboard;
