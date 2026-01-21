import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import TabNavigation from '../components/TabNavigation';
import EventCard from '../components/EventCard';
import { mockEvents, categories } from '../data/mockData';
import { formatDate, formatTime } from '../utils/helpers';

const OrganizerDashboard = ({ currentUser, setCurrentUser }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [events, setEvents] = useState(mockEvents);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState(currentUser);

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

  const organizerEvents = events.filter(event => event.organizerId === currentUser.id);
  const totalRegistrations = organizerEvents.reduce((sum, event) => sum + event.registeredCount, 0);
  const totalCertificates = organizerEvents.filter(event => event.status === 'completed').length;

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.description || !newEvent.date || !newEvent.time || !newEvent.venue) {
      toast.error('Please fill in all required fields');
      return;
    }

    const event = {
      ...newEvent,
      id: Date.now(),
      organizer: currentUser.name,
      organizerId: currentUser.id,
      registeredCount: 0,
      status: 'upcoming',
      registrations: []
    };

    setEvents(prev => [...prev, event]);
    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      venue: '',
      category: 'Technology',
      maxParticipants: 100,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400'
    });
    setShowCreateForm(false);
    toast.success('Event created successfully!');
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setNewEvent(event);
    setShowCreateForm(true);
  };

  const handleUpdateEvent = () => {
    setEvents(prev => prev.map(event => 
      event.id === editingEvent.id ? { ...newEvent, id: editingEvent.id } : event
    ));
    setEditingEvent(null);
    setShowCreateForm(false);
    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      venue: '',
      category: 'Technology',
      maxParticipants: 100,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400'
    });
    toast.success('Event updated successfully!');
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(prev => prev.filter(event => event.id !== eventId));
      toast.success('Event deleted successfully!');
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Events</p>
              <p className="text-3xl font-bold">{organizerEvents.length}</p>
            </div>
            <div className="text-4xl opacity-80">📅</div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Total Registrations</p>
              <p className="text-3xl font-bold">{totalRegistrations}</p>
            </div>
            <div className="text-4xl opacity-80">👥</div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Certificates Issued</p>
              <p className="text-3xl font-bold">{totalCertificates}</p>
            </div>
            <div className="text-4xl opacity-80">🏆</div>
          </div>
        </motion.div>
      </div>

      {/* Recent Events */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-6 rounded-xl shadow-lg"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Events</h2>
        <div className="space-y-4">
          {organizerEvents.slice(0, 3).map(event => (
            <div key={event.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <img src={event.image} alt={event.title} className="w-12 h-12 object-cover rounded-lg" />
                <div>
                  <h3 className="font-semibold text-gray-900">{event.title}</h3>
                  <p className="text-sm text-gray-500">{formatDate(event.date)} • {event.registeredCount} registered</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                event.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {event.status}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderCreateEvent = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {editingEvent ? 'Edit Event' : 'Create New Event'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Event Title *</label>
          <input
            type="text"
            value={newEvent.title}
            onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter event title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
          <select
            value={newEvent.category}
            onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer pr-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em'
            }}
          >
            {categories.slice(1).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
          <textarea
            value={newEvent.description}
            onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter event description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
          <input
            type="time"
            value={newEvent.time}
            onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Venue *</label>
          <input
            type="text"
            value={newEvent.venue}
            onChange={(e) => setNewEvent({...newEvent, venue: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter venue"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Participants</label>
          <input
            type="number"
            value={newEvent.maxParticipants}
            onChange={(e) => setNewEvent({...newEvent, maxParticipants: parseInt(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Event Image URL</label>
          <input
            type="url"
            value={newEvent.image}
            onChange={(e) => setNewEvent({...newEvent, image: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter image URL"
          />
        </div>
      </div>

      <div className="mt-6 flex space-x-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={editingEvent ? handleUpdateEvent : handleCreateEvent}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          {editingEvent ? 'Update Event' : 'Create Event'}
        </motion.button>
        <button
          onClick={() => {
            setShowCreateForm(false);
            setEditingEvent(null);
            setNewEvent({
              title: '',
              description: '',
              date: '',
              time: '',
              venue: '',
              category: 'Technology',
              maxParticipants: 100,
              image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400'
            });
          }}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
      </div>
    </motion.div>
  );

  const renderManageEvents = () => (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h2 className="text-2xl font-bold text-gray-900">My Events</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab('create')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          ➕ Create New Event
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {organizerEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <EventCard
              event={event}
              onEdit={handleEditEvent}
              onDelete={handleDeleteEvent}
              showActions={true}
              userType="organizer"
            />
          </motion.div>
        ))}
      </div>

      {organizerEvents.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No events created yet</h3>
          <p className="text-gray-500 mb-4">Create your first event to get started</p>
          <button
            onClick={() => setActiveTab('create')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Create Event
          </button>
        </motion.div>
      )}
    </div>
  );

  const renderRegistrations = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Registrations</h2>
      
      <div className="space-y-6">
        {organizerEvents.map(event => (
          <div key={event.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                <p className="text-sm text-gray-500">{formatDate(event.date)} • {event.venue}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">{event.registeredCount}</p>
                <p className="text-sm text-gray-500">registrations</p>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(event.registeredCount / event.maxParticipants) * 100}%` }}
              />
            </div>
            
            <div className="flex justify-between text-sm text-gray-600">
              <span>{event.registeredCount} / {event.maxParticipants} participants</span>
              <span>{Math.round((event.registeredCount / event.maxParticipants) * 100)}% filled</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const renderProfile = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Organizer Profile</h2>
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
          <input
            type="text"
            value={profileData.position}
            onChange={(e) => setProfileData({...profileData, position: e.target.value})}
            disabled={!isEditingProfile}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
          />
        </div>

        <div className="md:col-span-2">
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
            onClick={() => {
              setCurrentUser(profileData);
              setIsEditingProfile(false);
              toast.success('Profile updated successfully!');
            }}
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Organizer Dashboard</h1>
        <p className="text-gray-600">Create and manage your college events</p>
      </motion.div>

      <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'create' && renderCreateEvent()}
      {activeTab === 'manage' && renderManageEvents()}
      {activeTab === 'registrations' && renderRegistrations()}
      {activeTab === 'profile' && renderProfile()}
    </div>
  );
};

export default OrganizerDashboard;