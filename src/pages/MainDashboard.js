// src/pages/Dashboard.js
import React, { useState } from 'react';
import { 
  Typography, Box, Grid, Card, CardContent, Avatar, Button, 
  LinearProgress, List, ListItem, ListItemText, ListItemIcon,
  Chip, Tooltip, Select, MenuItem, FormControl, InputLabel,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Tab, Tabs
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SubjectIcon from '@mui/icons-material/Subject';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TimerIcon from '@mui/icons-material/Timer';
import FlagIcon from '@mui/icons-material/Flag';
import BookIcon from '@mui/icons-material/Book';
import TimelineIcon from '@mui/icons-material/Timeline';

const Dashboard = () => {
  const [selectedSubject, setSelectedSubject] = useState('overall');
  const [openGoalDialog, setOpenGoalDialog] = useState(false);
  const [newGoal, setNewGoal] = useState('');
  const [currentTab, setCurrentTab] = useState(0);

  // Mock user data
  const user = { name: 'John Doe', points: 1250, streak: 7, level: 15 };

  // Mock data (replace with actual data from your backend later)
  const subjects = [
    { id: 'math', name: 'Mathematics', icon: '📐', progress: 75 },
    { id: 'science', name: 'Science', icon: '🔬', progress: 60 },
    { id: 'literature', name: 'Literature', icon: '📚', progress: 80 },
    { id: 'history', name: 'History', icon: '🏛️', progress: 70 },
  ];

  const mockLeaderboard = [
    { name: 'Alice', score: 980 },
    { name: 'Bob', score: 875 },
    { name: 'Charlie', score: 790 },
  ];

  const recentActivity = [
    { type: 'Quiz', subject: 'Mathematics', score: '85%', date: '2023-05-15' },
    { type: 'Flashcards', subject: 'History', score: '20 cards', date: '2023-05-14' },
    { type: 'Study Session', subject: 'Physics', score: '2 hours', date: '2023-05-13' },
  ];

  const upcomingTasks = [
    { title: 'Math Quiz', due: '2023-05-20', subject: 'Mathematics' },
    { title: 'History Essay', due: '2023-05-22', subject: 'History' },
    { title: 'Science Project', due: '2023-05-25', subject: 'Science' },
  ];

  const achievements = [
    { name: 'Quick Learner', description: 'Complete 5 quizzes in a day' },
    { name: 'Bookworm', description: 'Read 10 study materials' },
    { name: 'Consistency King', description: 'Maintain a 7-day streak' },
  ];

  const topicMastery = {
    Mathematics: [
      { topic: 'Algebra', progress: 80 },
      { topic: 'Geometry', progress: 65 },
      { topic: 'Calculus', progress: 50 },
    ],
    Science: [
      { topic: 'Physics', progress: 70 },
      { topic: 'Chemistry', progress: 60 },
      { topic: 'Biology', progress: 75 },
    ],
    Literature: [
      { topic: 'Shakespeare', progress: 85 },
      { topic: 'Poetry', progress: 70 },
      { topic: 'Novel Analysis', progress: 55 },
    ],
    History: [
      { topic: 'World War II', progress: 90 },
      { topic: 'Ancient Civilizations', progress: 65 },
      { topic: 'Renaissance', progress: 80 },
    ],
  };

  const [goals, setGoals] = useState([
    { title: 'Complete Calculus course', progress: 30, subject: 'Mathematics' },
    { title: 'Read 5 classic novels', progress: 60, subject: 'Literature' },
    { title: 'Memorize periodic table', progress: 45, subject: 'Science' },
  ]);

  const handleOpenGoalDialog = () => setOpenGoalDialog(true);
  const handleCloseGoalDialog = () => setOpenGoalDialog(false);

  const handleAddGoal = () => {
    if (newGoal.trim() !== '') {
      setGoals([...goals, { title: newGoal, progress: 0, subject: selectedSubject }]);
      setNewGoal('');
      handleCloseGoalDialog();
    }
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const getOverallProgress = () => {
    return subjects.reduce((acc, subject) => acc + subject.progress, 0) / subjects.length;
  };

  const filteredGoals = selectedSubject === 'overall' 
    ? goals 
    : goals.filter(goal => goal.subject === selectedSubject);

  const filteredUpcomingTasks = selectedSubject === 'overall'
    ? upcomingTasks
    : upcomingTasks.filter(task => task.subject === selectedSubject);

  return (
    <Box sx={{ mt: 4, px: 2 }}>
      {/* Welcome Header with Gamification Elements */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">
          Welcome, {user.name}! 🎓
        </Typography>
        <Box>
          <Tooltip title="Total Points">
            <Chip icon={<EmojiEventsIcon />} label={`${user.points} pts`} color="primary" sx={{ mr: 1 }} />
          </Tooltip>
          <Tooltip title="Study Streak">
            <Chip icon={<TimerIcon />} label={`${user.streak} day streak`} color="secondary" sx={{ mr: 1 }} />
          </Tooltip>
          <Tooltip title="Current Level">
            <Chip icon={<LeaderboardIcon />} label={`Level ${user.level}`} color="success" />
          </Tooltip>
        </Box>
      </Box>

      {/* Subject Selector */}
      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel id="subject-select-label">Select Subject</InputLabel>
        <Select
          labelId="subject-select-label"
          value={selectedSubject}
          label="Select Subject"
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <MenuItem value="overall">Overall Progress</MenuItem>
          {subjects.map((subject) => (
            <MenuItem key={subject.id} value={subject.id}>
              {subject.icon} {subject.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Progress Overview */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {selectedSubject === 'overall' ? 'Overall Progress' : `${subjects.find(s => s.id === selectedSubject).name} Progress`}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
              <LinearProgress 
                variant="determinate" 
                value={selectedSubject === 'overall' ? getOverallProgress() : subjects.find(s => s.id === selectedSubject).progress} 
              />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography variant="body2" color="text.secondary">
                {`${Math.round(selectedSubject === 'overall' ? getOverallProgress() : subjects.find(s => s.id === selectedSubject).progress)}%`}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={4}>
        {/* Topic Mastery */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                <TimelineIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Topic Mastery
              </Typography>
              {selectedSubject !== 'overall' && (
                <List>
                  {topicMastery[subjects.find(s => s.id === selectedSubject).name].map((topic, index) => (
                    <ListItem key={index}>
                      <ListItemText 
                        primary={topic.topic} 
                        secondary={
                          <LinearProgress 
                            variant="determinate" 
                            value={topic.progress} 
                            sx={{ mt: 1 }}
                          />
                        } 
                      />
                      <Typography variant="body2" color="text.secondary">
                        {`${topic.progress}%`}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              )}
              {selectedSubject === 'overall' && (
                <Typography variant="body2" color="text.secondary">
                  Please select a subject to view topic mastery.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Goals */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                <FlagIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Goals
              </Typography>
              <List>
                {filteredGoals.map((goal, index) => (
                  <ListItem key={index}>
                    <ListItemText 
                      primary={goal.title} 
                      secondary={
                        <LinearProgress 
                          variant="determinate" 
                          value={goal.progress} 
                          sx={{ mt: 1 }}
                        />
                      } 
                    />
                    <Typography variant="body2" color="text.secondary">
                      {`${goal.progress}%`}
                    </Typography>
                  </ListItem>
                ))}
              </List>
              <Button variant="outlined" onClick={handleOpenGoalDialog} sx={{ mt: 2 }}>
                Add New Goal
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity and Upcoming Tasks */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Tabs value={currentTab} onChange={handleTabChange} centered>
                <Tab label="Recent Activity" />
                <Tab label="Upcoming Tasks" />
              </Tabs>
              {currentTab === 0 && (
                <List>
                  {recentActivity.map((activity, index) => (
                    <ListItem key={index}>
                      <ListItemText 
                        primary={`${activity.type} - ${activity.subject}`} 
                        secondary={`${activity.score} | ${activity.date}`} 
                      />
                    </ListItem>
                  ))}
                </List>
              )}
              {currentTab === 1 && (
                <List>
                  {filteredUpcomingTasks.map((task, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <AssignmentIcon />
                      </ListItemIcon>
                      <ListItemText primary={task.title} secondary={`Due: ${task.due}`} />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Button variant="contained" fullWidth startIcon={<BookIcon />}>
                    Start Study Session
                  </Button>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Button variant="outlined" fullWidth startIcon={<AssignmentIcon />}>
                    Take a Quiz
                  </Button>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Button variant="outlined" fullWidth startIcon={<TimelineIcon />}>
                    View Progress Report
                  </Button>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Button variant="outlined" fullWidth startIcon={<FlagIcon />}>
                    Set Goals
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Achievements Section */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                <EmojiEventsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Recent Achievements
              </Typography>
              <Grid container spacing={2}>
                {achievements.map((achievement, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle1">{achievement.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {achievement.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add Goal Dialog */}
      <Dialog open={openGoalDialog} onClose={handleCloseGoalDialog}>
        <DialogTitle>Add New Goal</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="goal"
            label="Goal"
            type="text"
            fullWidth
            variant="outlined"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseGoalDialog}>Cancel</Button>
          <Button onClick={handleAddGoal}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;