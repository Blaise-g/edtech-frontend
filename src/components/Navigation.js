// src/components/Navigation.js
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Button } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SubjectIcon from '@mui/icons-material/Subject';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import QuizIcon from '@mui/icons-material/Quiz';
import ChatIcon from '@mui/icons-material/Chat';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useTheme } from '@mui/material/styles';

const Navigation = ({ onAddSourcesClick }) => {
  const location = useLocation();
  const theme = useTheme();

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/home' },
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Study Materials', icon: <MenuBookIcon />, path: '/study-materials' },
    { text: 'Doc Chat', icon: <ChatIcon />, path: '/doc-chat' },
    { text: 'Quizzes', icon: <QuizIcon />, path: '/quizzes' },
    { text: 'Flashcards', icon: <ChatIcon />, path: '/flashcards' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: 240, 
          boxSizing: 'border-box',
          backgroundColor: theme.palette.background.default,
          borderRight: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <Box sx={{ overflow: 'auto', mt: 8, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <List>
          {menuItems.map((item) => (
            <ListItem 
              button 
              key={item.text} 
              component={RouterLink} 
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: '0 20px 20px 0',
                mr: 2,
                mb: 1,
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                  },
                  '& .MuiListItemIcon-root': {
                    color: theme.palette.primary.contrastText,
                  },
                },
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
    <Box sx={{ mt: 'auto', mb: 2, mx: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            fullWidth
            onClick={onAddSourcesClick}
          >
            Add Sources
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Navigation;