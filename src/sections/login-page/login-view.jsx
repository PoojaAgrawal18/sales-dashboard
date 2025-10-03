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
  Divider,
  TextField,
  Container,
  Typography,
  IconButton,
  useMediaQuery,
  InputAdornment,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { AUTH_ACTIONS } from 'src/redux/auth/actions';
import { AUTH_API_ROUTES } from 'src/services/auth/constants';

import Iconify from 'src/components/iconify';

export default function LoginPageView() {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((reducers) => reducers.authReducer);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (values, action) => {
      localStorage.setItem('loginID', values.password);
      localStorage.setItem('email', values.email);
      dispatch({
        type: AUTH_ACTIONS.LOGIN,
        payload: {
          body: {
            password: values.password,
            email: values.email,
          },
        },
      });
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  const handleGoogleLogin = () => {
    window.open(`${import.meta.env.VITE_APP_BASE_URL}${AUTH_API_ROUTES.GOOGLE_LOGIN}`, '_self');
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        backgroundColor: '#011627',
        overflow: 'auto',
        backgroundImage: 'url("../../../assets/background/Background.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        '&::before': {
          content: '""',
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          backgroundImage: 'url("../../../assets/background/Background_black.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          pointerEvents: 'none',
        },
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
        <Box onClick={() => router.push('/')}>
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

      {/* Main Content - Login Card */}
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
              mt: { xs: 4, sm: 8 },
            }}
          >
            <img
              src="../../../assets/logo/cap.png"
              alt="capline logo"
              style={{ width: isMobile ? '59px' : '59px' }}
            />
          </Box>

          {/* Welcome Text */}
          <Typography
            sx={{
              fontWeight: 700,
              color: 'black',
              textAlign: 'center',
              mb: 0.5,
              mt: 2,
              fontSize: '18px',
            }}
          >
            Welcome To Capline’s RCM360° Tool!{' '}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: '#292929',
              textAlign: 'center',
              mb: { xs: 3, sm: 5 },
              fontSize: '16px',
              fontWeight: 1,
              px: 2,
            }}
          >
            Enter the <b color="black">Credentials</b> to access your account
          </Typography>

          {/* Login Form */}
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
                {/* Email Field */}
                <TextField
                  fullWidth
                  name="email"
                  label="Email ID"
                  size="small"
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
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
              </Stack>
              {/* Login Button */}
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
                Login
              </LoadingButton>
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
              px: 2, // Add horizontal padding
            }}
          >
            <Divider sx={{ flexGrow: 1 }} />
            <Typography variant="caption" sx={{ px: 2, color: 'text.secondary' }}>
              Or
            </Typography>
            <Divider sx={{ flexGrow: 1 }} />
          </Box>

          {/* Google Login Button */}
          <LoadingButton
            fullWidth
            size="medium"
            variant="outlined"
            onClick={handleGoogleLogin}
            startIcon={<Iconify sx={{ width: 28, height: 28 }} icon="flat-color-icons:google" />}
            sx={{
              color: 'text.primary',
              borderColor: 'divider',
              maxWidth: '350px',
              height: '42px',
              mt: 2,
            }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: { xs: 1, sm: 2 },
              mt: 3,
              width: '100%',
              maxWidth: '310px',
              px: 2,
              flexWrap: 'wrap',
            }}
          >
            <img src="../../../assets/background/brandicon.png" alt="logo " />
          </Box>

          {/* Copyright Text */}
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              textAlign: 'center',
              mt: 2,
              mb: 6,
              fontSize: '0.7rem',
              px: 2,
            }}
          >
            Copyright 2024-2025 Capline Healthcare Management
            <br />
            All rights reserved.
          </Typography>
        </Card>
      </Container>
    </Box>
  );
}
