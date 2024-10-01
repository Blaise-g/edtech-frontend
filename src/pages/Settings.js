// src/pages/Settings.js
import React, { useState } from 'react';
import { Typography, Box, Switch, FormControlLabel, Paper, Divider, Slider, Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    publicProfile: false,
    darkMode: false,
    studyReminders: true,
    dailyGoal: 2, // hours
    preferredSubject: '',
    language: 'en',
  });

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: value !== undefined ? value : checked,
    }));
  };

  const handleSave = () => {
    // Here you would typically save the settings to your backend
    console.log('Settings saved:', settings);
    // Show a success message to the user
  };

  return (
    <Box sx={{ mt: 4, px: 2 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Notifications
        </Typography>
        <FormControlLabel
          control={<Switch checked={settings.emailNotifications} onChange={handleChange} name="emailNotifications" />}
          label="Email notifications"
        />
        <FormControlLabel
          control={<Switch checked={settings.pushNotifications} onChange={handleChange} name="pushNotifications" />}
          label="Push notifications"
        />
        <FormControlLabel
          control={<Switch checked={settings.studyReminders} onChange={handleChange} name="studyReminders" />}
          label="Study reminders"
        />

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Privacy
        </Typography>
        <FormControlLabel
          control={<Switch checked={settings.publicProfile} onChange={handleChange} name="publicProfile" />}
          label="Make profile public"
        />

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Appearance
        </Typography>
        <FormControlLabel
          control={<Switch checked={settings.darkMode} onChange={handleChange} name="darkMode" />}
          label="Use dark mode"
        />

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Study Settings
        </Typography>
        <Typography id="daily-goal-slider" gutterBottom>
          Daily study goal (hours)
        </Typography>
        <Slider
          value={settings.dailyGoal}
          onChange={handleChange}
          name="dailyGoal"
          aria-labelledby="daily-goal-slider"
          valueLabelDisplay="auto"
          step={0.5}
          marks
          min={0.5}
          max={8}
        />

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="preferred-subject-label">Preferred Subject</InputLabel>
          <Select
            labelId="preferred-subject-label"
            value={settings.preferredSubject}
            label="Preferred Subject"
            onChange={handleChange}
            name="preferredSubject"
          >
            <MenuItem value="math">Mathematics</MenuItem>
            <MenuItem value="science">Science</MenuItem>
            <MenuItem value="literature">Literature</MenuItem>
            <MenuItem value="history">History</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="language-label">Language</InputLabel>
          <Select
            labelId="language-label"
            value={settings.language}
            label="Language"
            onChange={handleChange}
            name="language"
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="es">Spanish</MenuItem>
            <MenuItem value="fr">French</MenuItem>
            <MenuItem value="de">German</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave}>
            Save Settings
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Settings;