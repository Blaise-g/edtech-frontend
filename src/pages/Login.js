// src/pages/Login.js
import React from 'react';
import { Typography, Box, Button, TextField, Divider } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import GoogleIcon from '@mui/icons-material/Google';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const Login = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    // TODO: Implement login logic here
    console.log(values);
    setSubmitting(false);
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google login logic
    console.log('Google login');
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 8, px: 2 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Button
        variant="outlined"
        startIcon={<GoogleIcon />}
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleGoogleLogin}
      >
        Continue with Google
      </Button>
      <Divider sx={{ my: 2 }}>OR</Divider>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Field
              as={TextField}
              fullWidth
              margin="normal"
              name="email"
              label="Email"
              variant="outlined"
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <Field
              as={TextField}
              fullWidth
              margin="normal"
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={isSubmitting}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
