// src/pages/Home.js
import React from 'react';
import { Typography, Box, Grid, Button, Container, Slide, Fade } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import FeatureCard from '../components/FeatureCard';
import SchoolIcon from '@mui/icons-material/School';
import ScienceIcon from '@mui/icons-material/Science';
import HistoryIcon from '@mui/icons-material/History';
import LanguageIcon from '@mui/icons-material/Language';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CodeIcon from '@mui/icons-material/Code';

const Home = () => {
  const subjects = [
    { name: 'Mathematics', icon: <SchoolIcon fontSize="large" />, description: 'Master algebra, geometry, and calculus' },
    { name: 'Science', icon: <ScienceIcon fontSize="large" />, description: 'Explore physics, chemistry, and biology' },
    { name: 'History', icon: <HistoryIcon fontSize="large" />, description: 'Uncover the past and understand the present' },
    { name: 'Languages', icon: <LanguageIcon fontSize="large" />, description: 'Learn new languages and cultures' },
    { name: 'Arts & Music', icon: <MusicNoteIcon fontSize="large" />, description: 'Discover your creative potential' },
    { name: 'Computer Science', icon: <CodeIcon fontSize="large" />, description: 'Dive into programming and technology' },
  ];

  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center', mt: 8, px: 2 }}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
          Elevate Your Learning with AI
        </Typography>
      </motion.div>
      <Fade in={true} timeout={1500}>
        <Typography variant="h5" gutterBottom sx={{ color: 'text.secondary', mb: 4 }}>
          Experience personalized tutoring powered by artificial intelligence
        </Typography>
      </Fade>
      <Box sx={{ mt: 4, mb: 6 }}>
        <Button
          variant="contained"
          component={RouterLink}
          to="/register"
          size="large"
          sx={{ mr: 2, px: 4, py: 1.5, fontSize: '1.1rem' }}
        >
          Get Started
        </Button>
        <Button
          variant="outlined"
          component={RouterLink}
          to="/login"
          size="large"
          sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
        >
          Login
        </Button>
      </Box>

      <Box sx={{ my: 8 }}>
        <Typography variant="h4" gutterBottom>
          Explore Our Subjects
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {subjects.map((subject, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={(index + 1) * 200}>
                <Box>
                  <FeatureCard
                    icon={subject.icon}
                    title={subject.name}
                    description={subject.description}
                  />
                </Box>
              </Slide>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ my: 8 }}>
        <Typography variant="h4" gutterBottom>
          Why Choose AI Tutor?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Typography variant="h6" gutterBottom>
                Personalized Learning
              </Typography>
              <Typography variant="body1">
                Our AI adapts to your learning style and pace, ensuring a tailored educational experience.
              </Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={4}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Typography variant="h6" gutterBottom>
                24/7 Availability
              </Typography>
              <Typography variant="body1">
                Study anytime, anywhere. Our AI tutor is always ready to help you learn and practice.
              </Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={4}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Typography variant="h6" gutterBottom>
                Comprehensive Curriculum
              </Typography>
              <Typography variant="body1">
                From basic concepts to advanced topics, we cover a wide range of subjects and difficulty levels.
              </Typography>
            </motion.div>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 8 }}>
        <Typography variant="h4" gutterBottom>
          Ready to Transform Your Learning?
        </Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to="/register"
          size="large"
          sx={{ mt: 2, px: 4, py: 1.5, fontSize: '1.1rem' }}
        >
          Start Learning Now
        </Button>
      </Box>
    </Container>
  );
};

export default Home;