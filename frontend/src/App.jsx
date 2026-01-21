import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import StudentDashboard from './pages/StudentDashboard';
import OrganizerDashboard from './pages/OrganizerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { mockStudents, mockOrganizers, mockAdmin } from './data/mockData';

function App() {
  const [userType, setUserType] = useState('student');
  const [currentUser, setCurrentUser] = useState(mockStudents[0]);

  // Update current user when user type changes
  useEffect(() => {
    switch (userType) {
      case 'student':
        setCurrentUser(mockStudents[0]);
        break;
      case 'organizer':
        setCurrentUser(mockOrganizers[0]);
        break;
      case 'admin':
        setCurrentUser(mockAdmin);
        break;
      default:
        setCurrentUser(mockStudents[0]);
    }
  }, [userType]);

  const renderDashboard = () => {
    switch (userType) {
      case 'student':
        return (
          <StudentDashboard 
            currentUser={currentUser} 
            setCurrentUser={setCurrentUser} 
          />
        );
      case 'organizer':
        return (
          <OrganizerDashboard 
            currentUser={currentUser} 
            setCurrentUser={setCurrentUser} 
          />
        );
      case 'admin':
        return (
          <AdminDashboard 
            currentUser={currentUser} 
            setCurrentUser={setCurrentUser} 
          />
        );
      default:
        return (
          <StudentDashboard 
            currentUser={currentUser} 
            setCurrentUser={setCurrentUser} 
          />
        );
    }
  };

  return (
    <div className="App">
      <Layout
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        userType={userType}
        setUserType={setUserType}
      >
        {renderDashboard()}
      </Layout>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;