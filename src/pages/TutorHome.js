// src/pages/TutorHome.js
import React, { useState, useEffect } from 'react';
import { 
  Typography, Box, Grid, Card, CardContent, Avatar, Button, 
  TextField, Paper, List, ListItem, ListItemText, ListItemIcon,
  Chip, Tooltip, CircularProgress, Divider, LinearProgress,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ScheduleIcon from '@mui/icons-material/Schedule';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import PeopleIcon from '@mui/icons-material/People';
import StarIcon from '@mui/icons-material/Star';

const TutorHome = () => {
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [dailyChallenge, setDailyChallenge] = useState(null);
  const [learningInsights, setLearningInsights] = useState([]);
  const [studyRecommendations, setStudyRecommendations] = useState([]);
  const [mentalWellnessTip, setMentalWellnessTip] = useState('');
  const [topicOfTheDay, setTopicOfTheDay] = useState(null);
  const [openTopicDialog, setOpenTopicDialog] = useState(false);
  const [friendActivity, setFriendActivity] = useState([]);
  const [longTermGoals, setLongTermGoals] = useState([]);

  // Mock user data
  const user = { 
    name: 'John Doe', 
    avatar: '/path-to-avatar.jpg',
    lastLogin: '2 days ago',
    studyStreak: 7,
    totalStudyTime: '14h 30m',
    weeklyGoal: '20h',
    level: 15,
    xp: 7500,
    nextLevelXp: 10000,
  };

  useEffect(() => {
    // Simulate fetching data from an API
    setDailyChallenge({
      subject: 'Mathematics',
      topic: 'Calculus',
      question: 'What is the derivative of f(x) = x^2 + 3x + 2?',
    });

    setLearningInsights([
      { insight: 'You\'ve improved 15% in Physics this week!', icon: <TrendingUpIcon /> },
      { insight: 'Your study sessions are most effective in the morning.', icon: <ScheduleIcon /> },
      { insight: 'You excel at problem-solving questions.', icon: <EmojiObjectsIcon /> },
    ]);

    setStudyRecommendations([
      { text: 'Review Algebra fundamentals to boost your Calculus performance.', subject: 'Mathematics' },
      { text: 'Practice more lab experiments to improve your Chemistry grades.', subject: 'Chemistry' },
      { text: 'Read "To Kill a Mockingbird" for your upcoming Literature class.', subject: 'Literature' },
    ]);

    setMentalWellnessTip('Take short breaks every 25 minutes to maintain focus and reduce stress.');

    setTopicOfTheDay({
      title: 'The Fibonacci Sequence',
      description: 'A series of numbers where each number is the sum of the two preceding ones. It appears in nature and has applications in computer science and finance.',
      subject: 'Mathematics',
    });

    setFriendActivity([
      { name: 'Alice', activity: 'completed a Physics quiz', score: '95%' },
      { name: 'Bob', activity: 'started a new study streak', days: 3 },
      { name: 'Charlie', activity: 'reached level 20', subject: 'Chemistry' },
    ]);

    setLongTermGoals([
      { goal: 'Master Calculus', progress: 60, dueDate: '2023-08-31' },
      { goal: 'Read 20 classic novels', progress: 35, dueDate: '2023-12-31' },
      { goal: 'Complete Advanced Physics course', progress: 20, dueDate: '2023-10-15' },
    ]);
  }, []);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (chatInput.trim() !== '') {
      setChatMessages([...chatMessages, { text: chatInput, sender: 'user' }]);
      // Here you would typically send the message to your AI backend and get a response
      // For now, we'll just mock a response
      setTimeout(() => {
        setChatMessages(prevMessages => [...prevMessages, { 
          text: "I'm here to help! What would you like to know about your studies or learning strategies?", 
          sender: 'ai' 
        }]);
      }, 1000);
      setChatInput('');
    }
  };

  const handleOpenTopicDialog = () => setOpenTopicDialog(true);
  const handleCloseTopicDialog = () => setOpenTopicDialog(false);

  return (
    <Box sx={{ mt: 4, px: 2 }}>
      <Grid container spacing={4}>
        {/* User Welcome and Stats */}
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src={user.avatar} sx={{ width: 60, height: 60, mr: 2 }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  Welcome back, {user.name}!
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Tooltip title="Study Streak">
                    <Chip icon={<LocalFireDepartmentIcon />} label={`${user.studyStreak} day streak`} color="primary" sx={{ mr: 1 }} />
                  </Tooltip>
                  <Tooltip title="Level">
                    <Chip icon={<StarIcon />} label={`Level ${user.level}`} color="secondary" sx={{ mr: 1 }} />
                  </Tooltip>
                  <Box sx={{ flexGrow: 1, ml: 2 }}>
                    <Typography variant="body2" color="text.secondary">XP to next level</Typography>
                    <LinearProgress variant="determinate" value={(user.xp / user.nextLevelXp) * 100} sx={{ height: 10, borderRadius: 5 }} />
                  </Box>
                </Box>
              </Box>
              <Box sx={{ ml: 'auto', textAlign: 'right' }}>
                <Typography variant="h6">
                  {user.totalStudyTime} / {user.weeklyGoal}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Weekly study goal
                </Typography>
                <CircularProgress 
                  variant="determinate" 
                  value={(parseInt(user.totalStudyTime) / parseInt(user.weeklyGoal)) * 100} 
                  sx={{ mt: 1 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* AI Tutor Chat */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                AI Tutor Chat
              </Typography>
              <Paper elevation={3} sx={{ p: 2, mb: 2, height: 20, overflow: 'auto' }}>
                {chatMessages.map((message, index) => (
                  <Typography key={index} variant="body1" sx={{ mb: 1, textAlign: message.sender === 'user' ? 'right' : 'left' }}>
                    {message.sender === 'user' ? '👤' : '🤖'} {message.text}
                  </Typography>
                ))}
              </Paper>
              <form onSubmit={handleChatSubmit}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Ask about your studies, learning strategies, or any subject..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <Button type="submit" variant="contained" endIcon={<ChatIcon />}>
                        Send
                      </Button>
                    ),
                  }}
                />
              </form>
            </CardContent>
          </Card>
        </Grid>

        {/* Daily Challenge and Topic of the Day */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Daily Challenge
              </Typography>
              {dailyChallenge && (
                <>
                  <Typography variant="body1" gutterBottom>
                    Subject: {dailyChallenge.subject}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Topic: {dailyChallenge.topic}
                  </Typography>
                  <Typography variant="body2">
                    {dailyChallenge.question}
                  </Typography>
                  <Button variant="outlined" sx={{ mt: 2 }}>
                    Start Challenge
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Topic of the Day
              </Typography>
              {topicOfTheDay && (
                <>
                  <Typography variant="subtitle1" gutterBottom>
                    {topicOfTheDay.title}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Subject: {topicOfTheDay.subject}
                  </Typography>
                  <Button variant="outlined" onClick={handleOpenTopicDialog} sx={{ mt: 1 }}>
                    Learn More
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Learning Insights */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Learning Insights
              </Typography>
              <List>
                {learningInsights.map((insight, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      {insight.icon}
                    </ListItemIcon>
                    <ListItemText primary={insight.insight} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Study Recommendations */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Personalized Study Recommendations
              </Typography>
              <List>
                {studyRecommendations.map((rec, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <MenuBookIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary={rec.text}
                      secondary={`Subject: ${rec.subject}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Mental Wellness */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Mental Wellness Tip
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FitnessCenterIcon sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="body1">
                  {mentalWellnessTip}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Button variant="outlined" fullWidth>
                Explore More Wellness Tips
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Friend Activity */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Friend Activity
              </Typography>
              <List>
                {friendActivity.map((activity, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary={`${activity.name} ${activity.activity}`}
                      secondary={activity.score || `${activity.days} days` || activity.subject}
                    />
                  </ListItem>
                ))}
              </List>
              <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                Challenge a Friend
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Long-Term Goals */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Long-Term Goals
              </Typography>
              {longTermGoals.map((goal, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    {goal.goal}
                  </Typography>
                  <LinearProgress variant="determinate" value={goal.progress} sx={{ height: 10, borderRadius: 5 }} />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {goal.progress}% complete | Due: {goal.dueDate}
                  </Typography>
                </Box>
              ))}
              <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                Set New Goal
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Topic of the Day Dialog */}
      <Dialog open={openTopicDialog} onClose={handleCloseTopicDialog}>
        <DialogTitle>{topicOfTheDay?.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            {topicOfTheDay?.description}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTopicDialog}>Close</Button>
          <Button variant="contained" onClick={handleCloseTopicDialog}>Learn More</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TutorHome;