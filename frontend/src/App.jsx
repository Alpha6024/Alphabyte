import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import StudentDashboard from './pages/StudentDashboard';
import OrganizerDashboard from './pages/OrganizerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Demo from './pages/Demo';
import { mockStudents, mockOrganizers, mockAdmin } from './data/mockData';

function App() {
  const [userType, setUserType] = useState('student');
  const [currentUser, setCurrentUser] = useState(mockStudents[0]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/student" element={
            <Layout
              currentUser={mockStudents[0]}
              setCurrentUser={setCurrentUser}
              userType="student"
              setUserType={setUserType}
            >
              <StudentDashboard 
                currentUser={mockStudents[0]} 
                setCurrentUser={setCurrentUser} 
              />
            </Layout>
          } />
          <Route path="/organizer" element={
            <Layout
              currentUser={mockOrganizers[0]}
              setCurrentUser={setCurrentUser}
              userType="organizer"
              setUserType={setUserType}
            >
              <OrganizerDashboard 
                currentUser={mockOrganizers[0]} 
                setCurrentUser={setCurrentUser} 
              />
            </Layout>
          } />
          <Route path="/admin" element={
            <Layout
              currentUser={mockAdmin}
              setCurrentUser={setCurrentUser}
              userType="admin"
              setUserType={setUserType}
            >
              <AdminDashboard 
                currentUser={mockAdmin} 
                setCurrentUser={setCurrentUser} 
              />
            </Layout>
          } />
        </Routes>
        
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
    </Router>
  );
}

export default App;