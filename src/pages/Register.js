      // src/pages/Register.js
      import React from 'react';
      import { Typography, Box, Button, TextField, Divider } from '@mui/material';
      import { Formik, Form, Field } from 'formik';
      import * as Yup from 'yup';
      import GoogleIcon from '@mui/icons-material/Google';

      const RegisterSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string()
          .min(8, 'Password must be at least 8 characters')
          .required('Required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Required'),
      });

      const Register = () => {
        const handleSubmit = (values, { setSubmitting }) => {
          // TODO: Implement registration logic here
          console.log(values);
          setSubmitting(false);
        };

        const handleGoogleRegister = () => {
          // TODO: Implement Google registration logic
          console.log('Google register');
        };

        return (
          <Box sx={{ maxWidth: 400, margin: 'auto', mt: 8, px: 2 }}>
            <Typography variant="h4" gutterBottom>
              Register
            </Typography>
            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleGoogleRegister}
            >
              Sign Up with Google
            </Button>
            <Divider sx={{ my: 2 }}>OR</Divider>
            <Formik
              initialValues={{ email: '', password: '', confirmPassword: '' }}
              validationSchema={RegisterSchema}
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
                  <Field
                    as={TextField}
                    fullWidth
                    margin="normal"
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    disabled={isSubmitting}
                  >
                    Register
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        );
      };

      export default Register;
