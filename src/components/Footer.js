// src/components/Footer.js
import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: 'background.paper' }}>
      <Container maxWidth="sm">
        <Typography variant="body2" color="text.secondary" align="center">
          © 2023 AI Tutoring Platform
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          <Link href="/terms">Terms of Service</Link> | <Link href="/privacy">Privacy Policy</Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
