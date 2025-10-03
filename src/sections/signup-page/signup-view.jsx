/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, useFormik, FormikProvider } from 'formik';

import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Stack,
  Select,
  Divider,
  MenuItem,
  TextField,
  Container,
  Typography,
  IconButton,
  InputLabel,
  FormControl,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { AUTH_ACTIONS } from 'src/redux/auth/actions';
import { AUTH_API_ROUTES } from 'src/services/auth/constants';

import Iconify from 'src/components/iconify';

export default function SignUpView() {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((reducers) => reducers.authReducer);

  const SignupSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    state: Yup.string().required('State is required'),
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      username: '',
      email: '',
      phoneNumber: '',
      password: '',
      state: '',
    },
    validationSchema: SignupSchema,
    onSubmit: (values, action) => {
      // Handle signup submission
      dispatch({
        type: AUTH_ACTIONS.SIGNUP,
        payload: {
          body: values,
        },
      });
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  const handleGoogleSignup = () => {
    window.open(`${import.meta.env.VITE_APP_BASE_URL}${AUTH_API_ROUTES.GOOGLE_LOGIN}`, '_self');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(to bottom, rgba(26, 32, 39, 0.5), rgba(26, 32, 39, 0.7)), url('../../../assets/background/Background.png')`,
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        backgroundColor: '#011627', // Dark blue background as fallback
        overflow: 'auto', // Handle overflow for small screens
      }}
    >
      {/* Header with Logo and Language Selector */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: { xs: 2, sm: 3, md: 4 },
          width: '100%',
        }}
      >
        {/* Capline Logo */}
        <Box  onClick={() => router.push('/')}>
          <img
            src="../../../assets/logo/capline-logo.png"
            alt="capline logo"
              style={{
              width: isMobile ? '179px' : '179px',
              marginLeft: isMobile ? '0px' : '-5px',
              marginTop: '-16px',height:'45px',position:'relative'
            }}
          />
        </Box>
      </Box>

      {/* Main Content - Signup Card */}
      <Container
        maxWidth="sm"
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: { xs: 2, sm: 3, md: 4 },
          mt: { xs: -2, sm: -4, md: -6 },
          px: { xs: 2, sm: 3 },
        }}
      >
        <Card
          sx={{
            width: '100%',
            borderRadius: 1,
            p: { xs: 2, sm: 3 },
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: { xs: '100%', sm: '450px', md: '500px' },
            minHeight: { xs: '600px', sm: '730px' },
            mx: 'auto',
            overflow: 'hidden',
          }}
        >
          {/* Capline Icon */}
          <Box  onClick={() => router.push('/')}
            sx={{
              mb: 2,
              mt: { xs: 4, sm: 4 },
            }}
          >
            <img
              src="../../../assets/logo/cap.png"
              alt="capline logo"
              style={{ width: isMobile ? '59px' : '59px' }}
            />
          </Box>

          {/* Create Account Text */}
          <Typography
            sx={{
              fontWeight: 700,
              color: 'black',
              textAlign: 'center',
              mb: 2,
              fontSize: '18px',
            }}
          >
            Create an account
          </Typography>

          {/* Signup Form */}
          <FormikProvider value={formik}>
            <Form
              autoComplete="off"
              noValidate
              onSubmit={handleSubmit}
              style={{
                width: '100%',
                maxWidth: '380px',
                padding: '0 16px',
              }}
            >
              <Stack spacing={2}>
                {/* Full Name Field */}
                <TextField
                  fullWidth
                  name="fullName"
                  label="Full Name"
                  size="small"
                  {...getFieldProps('fullName')}
                  error={Boolean(touched.fullName && errors.fullName)}
                  helperText={touched.fullName && errors.fullName}
                />

                {/* Username Field */}
                <TextField
                  fullWidth
                  name="username"
                  label="Username"
                  size="small"
                  {...getFieldProps('username')}
                  error={Boolean(touched.username && errors.username)}
                  helperText={touched.username && errors.username}
                />

                {/* Email Field */}
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  size="small"
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />

                {/* Phone Number Field */}
                <TextField
                  fullWidth
                  name="phoneNumber"
                  label="Phone Number"
                  size="small"
                  {...getFieldProps('phoneNumber')}
                  error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                />

                {/* Password Field */}
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  size="small"
                  type={showPassword ? 'text' : 'password'}
                  {...getFieldProps('password')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          size="small"
                        >
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />

                {/* State Field */}
                <FormControl fullWidth size="small" error={Boolean(touched.state && errors.state)}>
                  <InputLabel id="state-select-label">State</InputLabel>
                  <Select
                    labelId="state-select-label"
                    id="state-select"
                    label="State"
                    {...getFieldProps('state')}
                  >
                    <MenuItem value="AL">Alabama</MenuItem>
                    <MenuItem value="AK">Alaska</MenuItem>
                    <MenuItem value="AZ">Arizona</MenuItem>
                    {/* Add other states as needed */}
                  </Select>
                  {touched.state && errors.state && (
                    <Typography variant="caption" color="error">
                      {errors.state}
                    </Typography>
                  )}
                </FormControl>

                {/* Signup Button */}
                <LoadingButton
                  fullWidth
                  size="medium"
                  type="submit"
                  variant="contained"
                  loading={loading}
                  sx={{
                    backgroundColor: '#2C4E6C',
                    mt: 3,
                    mb: 2,
                    '&:hover': {
                      backgroundColor: '#1E3A52',
                    },
                    height: '42px',
                  }}
                >
                  Signup
                </LoadingButton>
              </Stack>
            </Form>
          </FormikProvider>

          {/* Divider with "Or" text */}
          <Box
            sx={{
              width: '100%',
              maxWidth: '380px',
              display: 'flex',
              alignItems: 'center',
              my: 2,
              px: 2,
            }}
          >
            <Divider sx={{ flexGrow: 1 }} />
            <Typography variant="caption" sx={{ px: 2, color: 'text.secondary' }}>
              Or
            </Typography>
            <Divider sx={{ flexGrow: 1 }} />
          </Box>

          {/* Google Signup Button */}
          <LoadingButton
            fullWidth
            size="medium"
            variant="outlined"
            onClick={handleGoogleSignup}
            startIcon={<Iconify sx={{ width: 28, height: 28 }} icon="flat-color-icons:google" />}
            sx={{
              color: 'text.primary',
              borderColor: 'divider',
              maxWidth: '350px',
              height: '42px',
            }}
          />

          {/* Already have an account */}
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ display: 'inline-block' }}>
              Already have an account?
            </Typography>
            <Typography
              variant="body2"
              component="span"
              onClick={handleLogin}
              sx={{
                color: 'primary.main',
                ml: 1,
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Login
            </Typography>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}
