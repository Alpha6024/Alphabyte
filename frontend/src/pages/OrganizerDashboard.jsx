import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import TabNavigation from '../components/TabNavigation';
import EventCard from '../components/EventCard';
import { mockEvents, categories } from '../data/mockData';
import { formatDate } from '../utils/helpers';
import GenerateQR from '../page/generateQR';

const OrganizerDashboard = ({ currentUser, setCurrentUser }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [events, setEvents] = useState(mockEvents);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState(currentUser);
  const [qrEventId, setQrEventId] = useState(null); // ✅ QR STATE

  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    category: 'Technology',
    maxParticipants: 100,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400'
  });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'create', label: 'Create Event', icon: '➕' },
    { id: 'manage', label: 'Manage Events', icon: '📋' },
    { id: 'registrations', label: 'Registrations', icon: '👥' },
    { id: 'profile', label: 'Profile', icon: '👤' }
  ];

  const organizerEvents = events.filter(e => e.organizerId === currentUser.id);
  const totalRegistrations = organizerEvents.reduce((sum, e) => sum + e.registeredCount, 0);
  const totalCertificates = organizerEvents.filter(e => e.status === 'completed').length;

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.venue) {
      toast.error('Please fill all required fields');
      return;
    }

    setEvents(prev => [
      ...prev,
      {
        ...newEvent,
        id: Date.now(),
        organizerId: currentUser.id,
        organizer: currentUser.name,
        registeredCount: 0,
        status: 'upcoming',
        registrations: []
      }
    ]);

    toast.success('Event created successfully');
    setShowCreateForm(false);
    setEditingEvent(null);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setNewEvent(event);
    setShowCreateForm(true);
  };

  const handleDeleteEvent = (id) => {
    if (window.confirm('Delete this event?')) {
      setEvents(prev => prev.filter(e => e.id !== id));
      toast.success('Event deleted');
    }
  };

  /* ===================== MANAGE EVENTS (QR INTEGRATED) ===================== */
  const renderManageEvents = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {organizerEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow p-4"
          >
            <EventCard
              event={event}
              onEdit={handleEditEvent}
              onDelete={handleDeleteEvent}
              showActions
              userType="organizer"
            />

            {/* ✅ GENERATE QR BUTTON */}
            <button
              onClick={() =>
                setQrEventId(qrEventId === event.id ? null : event.id)
              }
              className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              📷 Generate Attendance QR
            </button>

            {/* ✅ QR COMPONENT */}
            {qrEventId === event.id && (
              <GenerateQR
                eventId={event.id}
                onClose={() => setQrEventId(null)}
              />
            )}
          </motion.div>
        ))}
      </div>

      {organizerEvents.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No events created yet
        </div>
      )}
    </div>
  );

  /* ===================== OTHER SECTIONS (UNCHANGED) ===================== */

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-blue-600 text-white p-6 rounded-xl">
        <p>Total Events</p>
        <p className="text-3xl font-bold">{organizerEvents.length}</p>
      </div>
      <div className="bg-green-600 text-white p-6 rounded-xl">
        <p>Total Registrations</p>
        <p className="text-3xl font-bold">{totalRegistrations}</p>
      </div>
      <div className="bg-purple-600 text-white p-6 rounded-xl">
        <p>Certificates Issued</p>
        <p className="text-3xl font-bold">{totalCertificates}</p>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Organizer Profile</h2>
      <input
        className="border p-2 w-full mb-3"
        value={profileData.name}
        onChange={e => setProfileData({ ...profileData, name: e.target.value })}
      />
      <button
        onClick={() => {
          setCurrentUser(profileData);
          toast.success('Profile updated');
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </div>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Event Organizer Dashboard</h1>
      <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'manage' && renderManageEvents()}
      {activeTab === 'profile' && renderProfile()}
    </div>
  );
};

export default OrganizerDashboard;
