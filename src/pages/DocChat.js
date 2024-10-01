// src/pages/DocChat.js
import React, { useState } from 'react';
import { 
  Typography, Box, Grid, Card, CardContent, TextField, Button,
  List, ListItem, ListItemText, ListItemIcon, Paper
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ChatIcon from '@mui/icons-material/Chat';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const DocChat = () => {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  // Mock documents
  const documents = [
    { id: 1, name: 'Physics Notes.pdf' },
    { id: 2, name: 'History Essay.docx' },
    { id: 3, name: 'Math Formulas.pdf' },
  ];

  const handleDocSelect = (doc) => {
    setSelectedDoc(doc);
    setChatMessages([]);
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (chatInput.trim() !== '') {
      setChatMessages([...chatMessages, { text: chatInput, sender: 'user' }]);
      // Here you would typically send the message to your AI backend and get a response
      // For now, we'll just mock a response
      setTimeout(() => {
        setChatMessages(prevMessages => [...prevMessages, { 
          text: `Here's what I found in "${selectedDoc.name}" related to your question...`, 
          sender: 'ai' 
        }]);
      }, 1000);
      setChatInput('');
    }
  };

  return (
    <Box sx={{ mt: 4, px: 2 }}>
      <Typography variant="h4" gutterBottom>
        Doc Chat
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Your Documents</Typography>
              <List>
                {documents.map((doc) => (
                  <ListItem 
                    key={doc.id} 
                    button 
                    onClick={() => handleDocSelect(doc)}
                    selected={selectedDoc && selectedDoc.id === doc.id}
                  >
                    <ListItemIcon>
                      <InsertDriveFileIcon />
                    </ListItemIcon>
                    <ListItemText primary={doc.name} />
                  </ListItem>
                ))}
              </List>
              <Button
                variant="contained"
                startIcon={<UploadFileIcon />}
                fullWidth
                sx={{ mt: 2 }}
              >
                Upload New Document
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {selectedDoc ? `Chat about: ${selectedDoc.name}` : 'Select a document to start chatting'}
              </Typography>
              <Paper elevation={3} sx={{ p: 2, mb: 2, height: 300, overflow: 'auto' }}>
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
                  placeholder="Ask about the selected document..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  disabled={!selectedDoc}
                  InputProps={{
                    endAdornment: (
                      <Button type="submit" variant="contained" endIcon={<ChatIcon />} disabled={!selectedDoc}>
                        Send
                      </Button>
                    ),
                  }}
                />
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DocChat;