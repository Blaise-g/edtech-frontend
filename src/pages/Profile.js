// src/pages/Profile.js
import React, { useState } from 'react';
import { Typography, Box, Avatar, Grid, Paper, Chip, LinearProgress, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';
import TimelineIcon from '@mui/icons-material/Timeline';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/path-to-avatar.jpg',
    bio: 'High school student passionate about learning.',
    level: 15,
    xp: 7500,
    nextLevelXp: 10000,
    subjects: ['Mathematics', 'Physics', 'Literature'],
    achievements: [
      { name: 'Quick Learner', description: 'Completed 10 lessons in a day' },
      { name: 'Math Wizard', description: 'Scored 100% in 5 math quizzes' },
      { name: 'Bookworm', description: 'Read 50 study materials' },
    ],
    studyStreak: 7,
  });

  const [openEdit, setOpenEdit] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleEditOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);

  const handleEditSave = () => {
    setUser(editedUser);
    handleEditClose();
  };

  const handleInputChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ mt: 4, px: 2 }}>
      <Typography variant="h4" gutterBottom>
        Your Profile
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar
              alt={user.name}
              src={user.avatar}
              sx={{ width: 100, height: 100 }}
            />
          </Grid>
          <Grid item xs={12} sm>
            <Typography variant="h5">{user.name}</Typography>
            <Typography variant="body1" color="text.secondary">
              {user.email}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {user.bio}
            </Typography>
            <Button startIcon={<EditIcon />} onClick={handleEditOpen} sx={{ mt: 2 }}>
              Edit Profile
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Level {user.level}
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={(user.xp / user.nextLevelXp) * 100} 
            sx={{ height: 10, borderRadius: 5 }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {user.xp} / {user.nextLevelXp} XP to next level
          </Typography>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Subjects
          </Typography>
          {user.subjects.map((subject, index) => (
            <Chip key={index} label={subject} sx={{ mr: 1, mb: 1 }} />
          ))}
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Achievements
          </Typography>
          <Grid container spacing={2}>
            {user.achievements.map((achievement, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
                  <EmojiEventsIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                  <Typography variant="subtitle1">{achievement.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {achievement.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mt: 4, display: 'flex', alignItems: 'center' }}>
          <SchoolIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
          <Box>
            <Typography variant="h6">Study Streak</Typography>
            <Typography variant="body1">{user.studyStreak} days</Typography>
          </Box>
        </Box>
      </Paper>

      <Dialog open={openEdit} onClose={handleEditClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={editedUser.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={editedUser.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="bio"
            label="Bio"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={editedUser.bio}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;