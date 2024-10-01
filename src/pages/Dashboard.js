// src/pages/Dashboard.js
import React from 'react';
import { 
  Typography, Box, Grid, Card, CardContent, Avatar, Button, 
  LinearProgress, List, ListItem, ListItemText, ListItemIcon,
  Chip, Tooltip
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SubjectIcon from '@mui/icons-material/Subject';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TimerIcon from '@mui/icons-material/Timer';

const Dashboard = () => {
  // Mock user data
  const user = { name: 'John Doe', points: 1250, streak: 7 };

  // Mock data (replace with actual data from your backend later)
  const mockLeaderboard = [
    { name: 'Alice', score: 980 },
    { name: 'Bob', score: 875 },
    { name: 'Charlie', score: 790 },
  ];

  const overallProgress = 65;
  const recentActivity = [
    { type: 'Quiz', subject: 'Mathematics', score: '85%', date: '2023-05-15' },
    { type: 'Flashcards', subject: 'History', score: '20 cards', date: '2023-05-14' },
    { type: 'Study Session', subject: 'Physics', score: '2 hours', date: '2023-05-13' },
  ];

  const upcomingTasks = [
    { title: 'Math Quiz', due: '2023-05-20' },
    { title: 'History Essay', due: '2023-05-22' },
    { title: 'Science Project', due: '2023-05-25' },
  ];

  const subjects = [
    { name: 'Mathematics', icon: <SubjectIcon />, progress: 75 },
    { name: 'Science', icon: <SubjectIcon />, progress: 60 },
    { name: 'History', icon: <SubjectIcon />, progress: 80 },
    { name: 'English', icon: <SubjectIcon />, progress: 70 },
  ];

  const achievements = [
    { name: 'Quick Learner', description: 'Complete 5 quizzes in a day' },
    { name: 'Bookworm', description: 'Read 10 study materials' },
    { name: 'Consistency King', description: 'Maintain a 7-day streak' },
  ];

  // Personalized study recommendation (mock)
  const studyRecommendation = "Based on your recent activity, we recommend focusing on Calculus in Mathematics.";

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
            <Chip icon={<TimerIcon />} label={`${user.streak} day streak`} color="secondary" />
          </Tooltip>
        </Box>
      </Box>

      {/* Personalized Study Recommendation */}
      <Card sx={{ mb: 4, bgcolor: 'info.light', color: 'info.contrastText' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Personalized Recommendation
          </Typography>
          <Typography variant="body1">
            {studyRecommendation}
          </Typography>
        </CardContent>
      </Card>

      {/* Overall Progress */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Overall Progress
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
              <LinearProgress variant="determinate" value={overallProgress} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography variant="body2" color="text.secondary">{`${Math.round(overallProgress)}%`}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={4}>
        {/* Leaderboard Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                <LeaderboardIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Leaderboard
              </Typography>
              <List>
                {mockLeaderboard.map((student, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: index === 0 ? 'gold' : index === 1 ? 'silver' : 'bronze' }}>
                        {index + 1}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText primary={student.name} secondary={`Score: ${student.score}`} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                <TrendingUpIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Recent Activity
              </Typography>
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
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Tasks Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                <CalendarTodayIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Upcoming Tasks
              </Typography>
              <List>
                {upcomingTasks.map((task, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary={task.title} secondary={`Due: ${task.due}`} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Subject Access */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Your Subjects
              </Typography>
              <Grid container spacing={2}>
                {subjects.map((subject, index) => (
                  <Grid item xs={6} key={index}>
                    <Button
                      variant="outlined"
                      component={RouterLink}
                      to={`/subjects/${subject.name.toLowerCase()}`}
                      startIcon={subject.icon}
                      fullWidth
                      sx={{ justifyContent: 'flex-start', mb: 1 }}
                    >
                      {subject.name}
                    </Button>
                    <LinearProgress variant="determinate" value={subject.progress} />
                  </Grid>
                ))}
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
    </Box>
  );
};

export default Dashboard;