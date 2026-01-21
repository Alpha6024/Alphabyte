import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const Profile = ({ currentUser, setCurrentUser, userType }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(currentUser);

  const handleSave = () => {
    setCurrentUser(profileData);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setProfileData(currentUser);
    setIsEditing(false);
  };

  const getFieldsForUserType = () => {
    const commonFields = [
      { key: 'name', label: 'Full Name', type: 'text' },
      { key: 'email', label: 'Email', type: 'email' },
      { key: 'phone', label: 'Phone', type: 'tel' }
    ];

    const userSpecificFields = {
      student: [
        { key: 'studentId', label: 'Student ID', type: 'text' },
        { key: 'course', label: 'Course', type: 'text' },
        { key: 'year', label: 'Year', type: 'number' }
      ],
      organizer: [
        { key: 'department', label: 'Department', type: 'text' },
        { key: 'position', label: 'Position', type: 'text' },
        { key: 'experience', label: 'Experience (years)', type: 'number' }
      ],
      admin: [
        { key: 'adminId', label: 'Admin ID', type: 'text' },
        { key: 'role', label: 'Role', type: 'text' },
        { key: 'permissions', label: 'Permissions', type: 'text' }
      ]
    };

    return [...commonFields, ...(userSpecificFields[userType] || [])];
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 capitalize">
          {userType} Profile
        </h2>
        <div className="space-x-2">
          {isEditing ? (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Save
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                Cancel
              </motion.button>
            </>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Edit Profile
            </motion.button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {getFieldsForUserType().map(field => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
            </label>
            <input
              type={field.type}
              value={profileData[field.key] || ''}
              onChange={(e) => setProfileData({
                ...profileData, 
                [field.key]: e.target.value
              })}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>
        ))}
      </div>

      {/* User Type Specific Stats */}
      {userType === 'student' && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Student Stats</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-blue-700">Events Registered:</span>
              <span className="ml-2 font-medium">{currentUser.registeredEvents?.length || 0}</span>
            </div>
            <div>
              <span className="text-blue-700">Certificates:</span>
              <span className="ml-2 font-medium">{currentUser.certificates?.length || 0}</span>
            </div>
          </div>
        </div>
      )}

      {userType === 'organizer' && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-green-900 mb-2">Organizer Stats</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-green-700">Events Created:</span>
              <span className="ml-2 font-medium">{currentUser.eventsCreated?.length || 0}</span>
            </div>
            <div>
              <span className="text-green-700">Total Participants:</span>
              <span className="ml-2 font-medium">{currentUser.totalParticipants || 0}</span>
            </div>
          </div>
        </div>
      )}

      {userType === 'admin' && (
        <div className="mt-6 p-4 bg-purple-50 rounded-lg">
          <h3 className="font-semibold text-purple-900 mb-2">Admin Stats</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-purple-700">Total Users:</span>
              <span className="ml-2 font-medium">{currentUser.totalUsers || 0}</span>
            </div>
            <div>
              <span className="text-purple-700">System Status:</span>
              <span className="ml-2 font-medium text-green-600">Active</span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Profile;