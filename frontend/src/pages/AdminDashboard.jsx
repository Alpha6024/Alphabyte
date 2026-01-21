import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import TabNavigation from '../components/TabNavigation';
import { mockEvents, mockStudents, mockOrganizers } from '../data/mockData';
import { formatDate } from '../utils/helpers';

const AdminDashboard = ({ currentUser, setCurrentUser }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [events] = useState(mockEvents);
  const [students, setStudents] = useState(mockStudents);
  const [organizers, setOrganizers] = useState(mockOrganizers);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState(currentUser);
  const [editingUser, setEditingUser] = useState(null);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'users', label: 'Manage Users', icon: '👥' },
    { id: 'events', label: 'All Events', icon: '📅' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'profile', label: 'Profile', icon: '👤' }
  ];

  // Calculate statistics
  const totalEvents = events.length;
  const totalRegistrations = events.reduce((sum, event) => sum + event.registeredCount, 0);
  const totalCertificates = events.filter(event => event.status === 'completed').length;
  const totalOrganizers = organizers.length;
  const totalStudents = students.length;

  // Analytics data
  const eventsByCategory = events.reduce((acc, event) => {
    acc[event.category] = (acc[event.category] || 0) + 1;
    return acc;
  }, {});

  const categoryData = Object.entries(eventsByCategory).map(([name, value]) => ({
    name,
    value,
    color: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'][Math.floor(Math.random() * 6)]
  }));

  const monthlyData = [
    { month: 'Jan', events: 5, registrations: 120 },
    { month: 'Feb', events: 8, registrations: 200 },
    { month: 'Mar', events: 12, registrations: 350 },
    { month: 'Apr', events: 6, registrations: 180 },
    { month: 'May', events: 10, registrations: 280 },
    { month: 'Jun', events: 15, registrations: 420 }
  ];

  const topEvents = events
    .sort((a, b) => b.registeredCount - a.registeredCount)
    .slice(0, 5);

  const handleEditUser = (user, type) => {
    setEditingUser({ ...user, type });
  };

  const handleSaveUser = () => {
    if (editingUser.type === 'student') {
      setStudents(prev => prev.map(s => s.id === editingUser.id ? editingUser : s));
    } else {
      setOrganizers(prev => prev.map(o => o.id === editingUser.id ? editingUser : o));
    }
    setEditingUser(null);
    toast.success('User updated successfully!');
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Events</p>
              <p className="text-3xl font-bold">{totalEvents}</p>
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
              <p className="text-green-100">Registrations</p>
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
              <p className="text-purple-100">Certificates</p>
              <p className="text-3xl font-bold">{totalCertificates}</p>
            </div>
            <div className="text-4xl opacity-80">🏆</div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Organizers</p>
              <p className="text-3xl font-bold">{totalOrganizers}</p>
            </div>
            <div className="text-4xl opacity-80">📋</div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-teal-500 to-teal-600 p-6 rounded-xl text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-teal-100">Students</p>
              <p className="text-3xl font-bold">{totalStudents}</p>
            </div>
            <div className="text-4xl opacity-80">🎓</div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Events</h2>
          <div className="space-y-4">
            {events.slice(0, 4).map(event => (
              <div key={event.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <img src={event.image} alt={event.title} className="w-10 h-10 object-cover rounded-lg" />
                  <div>
                    <h3 className="font-medium text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-500">{formatDate(event.date)}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  event.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {event.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Top Events by Registration</h2>
          <div className="space-y-4">
            {topEvents.map((event, index) => (
              <div key={event.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-500">{event.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{event.registeredCount}</p>
                  <p className="text-sm text-gray-500">registrations</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Events by Category Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Events by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Trends Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Monthly Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="events" fill="#3B82F6" name="Events" />
              <Bar dataKey="registrations" fill="#10B981" name="Registrations" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Detailed Statistics */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-xl shadow-lg"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Detailed Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{Math.round(totalRegistrations / totalEvents)}</div>
            <div className="text-sm text-gray-500">Avg. Registrations per Event</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{Math.round((totalCertificates / totalEvents) * 100)}%</div>
            <div className="text-sm text-gray-500">Event Completion Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{Math.round(totalRegistrations / totalStudents)}</div>
            <div className="text-sm text-gray-500">Avg. Events per Student</div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      {/* Students Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-lg"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Students ({students.length})</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Roll Number</th>
                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3">Year</th>
                <th className="px-6 py-3">Events</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{student.name}</td>
                  <td className="px-6 py-4">{student.rollNumber}</td>
                  <td className="px-6 py-4">{student.department}</td>
                  <td className="px-6 py-4">{student.year}</td>
                  <td className="px-6 py-4">{student.registeredEvents?.length || 0}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEditUser(student, 'student')}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Organizers Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-6 rounded-xl shadow-lg"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Event Organizers ({organizers.length})</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3">Position</th>
                <th className="px-6 py-3">Events Created</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {organizers.map(organizer => (
                <tr key={organizer.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{organizer.name}</td>
                  <td className="px-6 py-4">{organizer.department}</td>
                  <td className="px-6 py-4">{organizer.position}</td>
                  <td className="px-6 py-4">{organizer.eventsCreated?.length || 0}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEditUser(organizer, 'organizer')}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Edit User Modal */}
      {editingUser && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full mx-4"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Edit {editingUser.type === 'student' ? 'Student' : 'Organizer'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <input
                  type="text"
                  value={editingUser.department}
                  onChange={(e) => setEditingUser({...editingUser, department: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex space-x-4 mt-6">
              <button
                onClick={handleSaveUser}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditingUser(null)}
                className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );

  const renderEvents = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-xl font-bold text-gray-900 mb-4">All Events ({events.length})</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Event</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Organizer</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Registrations</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <img src={event.image} alt={event.title} className="w-10 h-10 object-cover rounded-lg" />
                    <div>
                      <div className="font-medium text-gray-900">{event.title}</div>
                      <div className="text-gray-500 text-xs">{event.venue}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">{formatDate(event.date)}</td>
                <td className="px-6 py-4">{event.organizer}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {event.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <div className="font-medium">{event.registeredCount}/{event.maxParticipants}</div>
                    <div className="text-gray-500">{Math.round((event.registeredCount / event.maxParticipants) * 100)}% filled</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    event.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {event.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );

  const renderSettings = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">System Settings</h2>
      
      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Email Notifications</h4>
                <p className="text-sm text-gray-500">Send email notifications for new registrations</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Auto-generate Certificates</h4>
                <p className="text-sm text-gray-500">Automatically generate certificates for completed events</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div className="border-b border-gray-200 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default Max Participants</label>
              <input
                type="number"
                defaultValue="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Registration Deadline (days before event)</label>
              <input
                type="number"
                defaultValue="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Maintenance</h3>
          <div className="space-y-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Export All Data
            </button>
            <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors ml-4">
              Clear Cache
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors ml-4">
              Reset System
            </button>
          </div>
        </div>
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
        <h2 className="text-2xl font-bold text-gray-900">Admin Profile</h2>
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
          <input
            type="text"
            value={profileData.role}
            onChange={(e) => setProfileData({...profileData, role: e.target.value})}
            disabled={!isEditingProfile}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
          />
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Comprehensive system management and analytics</p>
      </motion.div>

      <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'analytics' && renderAnalytics()}
      {activeTab === 'users' && renderUsers()}
      {activeTab === 'events' && renderEvents()}
      {activeTab === 'settings' && renderSettings()}
      {activeTab === 'profile' && renderProfile()}
    </div>
  );
};

export default AdminDashboard;