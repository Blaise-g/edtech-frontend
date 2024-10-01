// src/pages/Quizzes.js
import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, Paper, Slide, LinearProgress, CircularProgress, Tabs, Tab, TextField, Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Quiz from '../components/Quiz';
import QuizReview from '../components/QuizReview';
import QuizDashboard from '../components/QuizDashboard';
import CreateQuiz from '../components/CreateQuiz';
import TagManager from '../components/TagManager';
import ChatbotInterface from '../components/ChatbotInterface';
import { fetchQuizzes, submitQuiz } from '../store/slices/quizzesSlice';

const Quizzes = () => {
  const dispatch = useDispatch();
  const { items: quizzes, status, error } = useSelector(state => state.quizzes);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState(null);
  const [score, setScore] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isQuizzing, setIsQuizzing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchQuizzes());
    }
  }, [status, dispatch]);

  const handleStartQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    setQuizCompleted(false);
    setUserAnswers(null);
    setScore(null);
    setIsQuizzing(true);
  };

  const handleSubmitQuiz = async (answers) => {
    setUserAnswers(answers);
    // TODO: When connecting to backend, send answers to API and get score
    // const result = await dispatch(submitQuiz({ quizId: currentQuiz.id, answers }));
    // setScore(result.payload.score);

    // Mock score calculation
    const mockScore = Math.floor(Math.random() * 101);
    setScore(mockScore);
    setQuizCompleted(true);
  };

  const handleRetryQuiz = () => {
    setQuizCompleted(false);
    setUserAnswers(null);
    setScore(null);
  };

  const handleEndQuiz = () => {
    setIsQuizzing(false);
    setCurrentQuiz(null);
    setQuizCompleted(false);
    setUserAnswers(null);
    setScore(null);
  };

  if (status === 'loading') {
    return <CircularProgress />;
  }

  if (status === 'failed') {
    return <Typography color="error">{error}</Typography>;
  }

  const filteredQuizzes = quizzes.filter(quiz => 
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quiz.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const completedQuizzes = quizzes.filter(q => q.completed);
  const averageScore = completedQuizzes.length > 0
    ? completedQuizzes.reduce((sum, q) => sum + q.score, 0) / completedQuizzes.length
    : 0;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
        Quizzes
      </Typography>
      {!isQuizzing ? (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} centered sx={{ mb: 3 }}>
            <Tab label="Available Quizzes" />
            <Tab label="Create Quiz" />
            <Tab label="Manage Tags" />
          </Tabs>
          <Box>
            {activeTab === 0 && (
              <Box>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search quizzes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ mb: 3 }}
                />
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Available Quizzes</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                      {filteredQuizzes.map(quiz => (
                        <Button
                          key={quiz.id}
                          variant="contained"
                          onClick={() => handleStartQuiz(quiz)}
                          disabled={quiz.completed}
                        >
                          {quiz.completed ? `Review ${quiz.title}` : `Start ${quiz.title}`}
                        </Button>
                      ))}
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="h6">Statistics</Typography>
                      <Typography>Total Quizzes: {quizzes.length}</Typography>
                      <Typography>Completed Quizzes: {completedQuizzes.length}</Typography>
                      <Typography>Available Quizzes: {quizzes.length - completedQuizzes.length}</Typography>
                      <Typography>Average Score: {averageScore.toFixed(2)}%</Typography>
                    </Paper>
                  </Grid>
                </Grid>
                <QuizDashboard quizzes={quizzes} />
              </Box>
            )}
            {activeTab === 1 && <CreateQuiz />}
            {activeTab === 2 && quizzes && quizzes.length > 0 && (
              <TagManager items={quizzes} itemType="quiz" />
            )}
          </Box>
        </Paper>
      ) : (
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <Paper sx={{ p: 4, mb: 4, maxWidth: '800px', margin: 'auto' }}>
            {!quizCompleted ? (
              <Quiz quiz={currentQuiz} onSubmit={handleSubmitQuiz} />
            ) : (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  Quiz Completed!
                </Typography>
                <Typography variant="h5" sx={{ mb: 4, color: 'green' }}>
                  Your Score: {score} / 100
                </Typography>
                <LinearProgress variant="determinate" value={score} sx={{ mb: 2 }} />
                <QuizReview quiz={currentQuiz} userAnswers={userAnswers} />
                <ChatbotInterface quiz={currentQuiz} userAnswers={userAnswers} />
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Button variant="outlined" onClick={handleRetryQuiz}>
                    Retry Quiz
                  </Button>
                  <Button variant="contained" onClick={handleEndQuiz}>
                    Back to Quizzes
                  </Button>
                </Box>
              </Box>
            )}
          </Paper>
        </Slide>
      )}
    </Box>
  );
};

export default Quizzes;