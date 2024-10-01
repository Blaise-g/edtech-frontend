// src/components/Layout.js
import React, { useState } from 'react';
import { Box, AppBar, Toolbar, IconButton, Avatar, Menu, MenuItem, Tooltip, Button, Switch, FormControlLabel, useTheme } from '@mui/material';
import Navigation from './Navigation';
import { Link as RouterLink } from 'react-router-dom';
import ChatbotWidget from './ChatbotWidget';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SettingsIcon from '@mui/icons-material/Settings';
import AddSources from '../pages/AddSources'; // Import the AddSources component

const Layout = ({ children, toggleDarkMode, toggleAuth, isAuthenticated, useDarkMode }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAddSourcesOpen, setIsAddSourcesOpen] = useState(false); // Add this state
  const theme = useTheme();

  const handleProfileMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAddSourcesClick = () => {
    setIsAddSourcesOpen(true);
  };
  const handleAddSourcesClose = () => {
    setIsAddSourcesOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          boxShadow: theme.shadows[1]
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/path-to-your-logo.png"
              alt="AI Tutor Logo"
              style={{ width: '40px', height: '40px', marginRight: '8px' }}
            />
            <Tooltip title="AI Tutor">
              <Box sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>AI Tutor</Box>
            </Tooltip>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Temporary authentication toggle */}
            <FormControlLabel
              control={<Switch checked={isAuthenticated} onChange={toggleAuth} />}
              label="Auth"
            />

            {/* Dark mode toggle */}
            <IconButton onClick={toggleDarkMode} sx={{ color: 'inherit' }}>
              {useDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            {isAuthenticated ? (
              <>
                <IconButton component={RouterLink} to="/notifications" sx={{ color: 'inherit' }}>
                  <NotificationsIcon />
                </IconButton>
                <IconButton component={RouterLink} to="/settings" sx={{ color: 'inherit' }}>
                  <SettingsIcon />
                </IconButton>
                <Tooltip title="Open profile">
                  <IconButton onClick={handleProfileMenu} sx={{ p: 0, ml: 2 }}>
                    <Avatar alt="User" src="/path-to-default-avatar.png" />
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleProfileMenuClose}
                  sx={{ mt: '45px' }}
                >
                  <MenuItem onClick={handleProfileMenuClose} component={RouterLink} to="/profile">
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleProfileMenuClose} component={RouterLink} to="/logout">
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box>
                <Button component={RouterLink} to="/login" sx={{ color: 'inherit' }}>Login</Button>
                <Button component={RouterLink} to="/register" sx={{ color: 'inherit' }}>Register</Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Navigation onAddSourcesClick={handleAddSourcesClick} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {children}
      </Box>
      <ChatbotWidget />
      <AddSources 
        open={isAddSourcesOpen} 
        onClose={handleAddSourcesClose} 
        isDarkMode={useDarkMode} />
      </Box>
  );
};

export default Layout;