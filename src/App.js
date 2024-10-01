// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './themes/theme';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TutorHome from './pages/TutorHome';
import MainDashboard from './pages/MainDashboard';
import StudyMaterials from './pages/StudyMaterials';
import Flashcards from './pages/Flashcards';
import Quizzes from './pages/Quizzes';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import DocChat from './pages/DocChat';

function App() {
  const [useDarkMode, setUseDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleDarkMode = () => {
    setUseDarkMode((prevMode) => !prevMode);
  };

  // Temporary function to toggle authentication for development
  const toggleAuth = () => {
    setIsAuthenticated((prevAuth) => !prevAuth);
  };

  return (
    <ThemeProvider theme={useDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <Layout toggleDarkMode={toggleDarkMode} toggleAuth={toggleAuth} isAuthenticated={isAuthenticated} useDarkMode={useDarkMode}>
          <Routes>
            {/* Default route: Redirect to /home */}
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={isAuthenticated ? <TutorHome /> : <Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/doc-chat" 
              element={isAuthenticated ? <DocChat /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/dashboard" 
              element={isAuthenticated ? <MainDashboard /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/study-materials" 
              element={isAuthenticated ? <StudyMaterials /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/flashcards" 
              element={isAuthenticated ? <Flashcards /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/quizzes" 
              element={isAuthenticated ? <Quizzes /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/profile" 
              element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/notifications" 
              element={isAuthenticated ? <Notifications /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/settings" 
              element={isAuthenticated ? <Settings /> : <Navigate to="/login" />} 
            />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;