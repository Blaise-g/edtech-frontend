// src/pages/Notifications.js
import React, { useState } from 'react';
import { Typography, Box, List, ListItem, ListItemText, ListItemIcon, Paper, Chip, IconButton, Menu, MenuItem } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New quiz available in Mathematics', date: '2023-05-18', type: 'quiz', read: false },
    { id: 2, message: 'You completed your daily goal!', date: '2023-05-17', type: 'achievement', read: true },
    { id: 3, message: 'Reminder: History essay due tomorrow', date: '2023-05-16', type: 'reminder', read: false },
    { id: 4, message: 'You\'ve been inactive for 3 days. Keep up your study streak!', date: '2023-05-15', type: 'alert', read: false },
  ]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const handleMenuOpen = (event, notification) => {
    setAnchorEl(event.currentTarget);
    setSelectedNotification(notification);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedNotification(null);
  };

  const handleMarkAsRead = () => {
    setNotifications(notifications.map(n => 
      n.id === selectedNotification.id ? { ...n, read: true } : n
    ));
    handleMenuClose();
  };

  const handleDelete = () => {
    setNotifications(notifications.filter(n => n.id !== selectedNotification.id));
    handleMenuClose();
  };

  const getNotificationColor = (type) => {
    switch(type) {
      case 'quiz': return 'primary';
      case 'achievement': return 'success';
      case 'reminder': return 'warning';
      case 'alert': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ mt: 4, px: 2 }}>
      <Typography variant="h4" gutterBottom>
        Notifications
      </Typography>
      <Paper>
        <List>
          {notifications.map((notification) => (
            <ListItem 
              key={notification.id}
              secondaryAction={
                <IconButton edge="end" onClick={(event) => handleMenuOpen(event, notification)}>
                  <MoreVertIcon />
                </IconButton>
              }
              sx={{ bgcolor: notification.read ? 'transparent' : 'action.hover' }}
            >
              <ListItemIcon>
                <NotificationsIcon color={getNotificationColor(notification.type)} />
              </ListItemIcon>
              <ListItemText
                primary={notification.message}
                secondary={
                  <React.Fragment>
                    {notification.date}
                    <Chip 
                      label={notification.type} 
                      size="small" 
                      color={getNotificationColor(notification.type)} 
                      sx={{ ml: 1 }}
                    />
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMarkAsRead}>
          <CheckCircleOutlineIcon sx={{ mr: 1 }} /> Mark as read
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteOutlineIcon sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Notifications;