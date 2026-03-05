/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, useFormik, FormikProvider } from 'formik';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Stack,
  Divider,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { AUTH_ACTIONS } from 'src/redux/auth/actions';
import { AUTH_API_ROUTES } from 'src/services/auth/constants';

import Iconify from 'src/components/iconify';

export default function LoginPageView() {
  const dispatch = useDispatch();
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
    onSubmit: (values) => {
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
        minHeight: '100vh',
        display: 'flex',
        fontFamily: 'inherit',
      }}
    >
      {/* Left Panel - Hero (matches nav/sidebar palette) */}
      <Box
        sx={{
          flex: { xs: 0, lg: 1 },
          display: { xs: 'none', lg: 'flex' },
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 8,
          background: 'linear-gradient(180deg, #0f172a 0%, #0c1222 100%)',
          borderRight: '1px solid rgba(148, 163, 184, 0.08)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 6,
              boxShadow: '0 8px 32px rgba(56, 189, 248, 0.35)',
            }}
          >
            <Typography sx={{ fontSize: 28, fontWeight: 800, color: '#fff' }}>S</Typography>
          </Box>

          <Typography
            sx={{
              fontSize: 56,
              fontWeight: 800,
              color: '#f1f5f9',
              lineHeight: 1.1,
              mb: 3,
              letterSpacing: '-0.03em',
            }}
          >
            Welcome
            <br />
            back
          </Typography>

          <Typography
            sx={{
              fontSize: 18,
              color: 'rgba(148, 163, 184, 0.95)',
              maxWidth: 420,
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            Your revenue command center. Track pipeline health, forecast with confidence, and close
            deals faster.
          </Typography>
        </Box>

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Stack spacing={2}>
            <Box
              sx={{
                p: 2.5,
                borderRadius: 2,
                background: 'rgba(56, 189, 248, 0.08)',
                border: '1px solid rgba(56, 189, 248, 0.15)',
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    bgcolor: '#22c55e',
                    boxShadow: '0 0 0 6px rgba(34, 197, 94, 0.2)',
                  }}
                />
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#e2e8f0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Live activity
                </Typography>
              </Stack>
              <Typography sx={{ fontSize: 14, color: 'rgba(226, 232, 240, 0.9)', fontWeight: 500 }}>
                127 active deals · $2.4M pipeline this week
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>

      {/* Right Panel - Login Form */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 3, sm: 6, md: 8 },
          bgcolor: 'background.default',
          position: 'relative',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 440 }}>
          {/* Mobile logo */}
          <Box
            sx={{
              display: { xs: 'flex', lg: 'none' },
              width: 48,
              height: 48,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #38bdf8, #0ea5e9)',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 4,
              boxShadow: '0 4px 16px rgba(14, 165, 233, 0.3)',
            }}
          >
            <Typography sx={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>S</Typography>
          </Box>

          <Box sx={{ mb: 5 }}>
            <Typography
              sx={{
                fontSize: { xs: 28, sm: 34 },
                fontWeight: 800,
                color: 'text.primary',
                mb: 1.5,
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}
            >
              Sign in
            </Typography>
            <Typography sx={{ fontSize: 15, color: 'text.secondary', lineHeight: 1.6 }}>
              Access your sales dashboard and team insights
            </Typography>
          </Box>

          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                <TextField
                  fullWidth
                  name="email"
                  placeholder="Work email"
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'background.paper',
                      borderRadius: 2,
                      '& fieldset': { borderColor: 'divider' },
                      '&:hover fieldset': { borderColor: 'primary.main' },
                      '&.Mui-focused fieldset': { borderColor: 'primary.main', borderWidth: 2 },
                    },
                  }}
                />

                <Box>
                  <TextField
                    fullWidth
                    name="password"
                    placeholder="Password"
                    type={showPassword ? 'text' : 'password'}
                    {...getFieldProps('password')}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            sx={{ color: 'text.secondary' }}
                          >
                            <Iconify
                              icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                              sx={{ width: 22, height: 22 }}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        '& fieldset': { borderColor: 'divider' },
                        '&:hover fieldset': { borderColor: 'primary.main' },
                        '&.Mui-focused fieldset': { borderColor: 'primary.main', borderWidth: 2 },
                      },
                    }}
                  />
                  <Box sx={{ textAlign: 'right', mt: 1 }}>
                    <Typography
                      component="span"
                      sx={{
                        fontSize: 14,
                        color: 'primary.main',
                        fontWeight: 600,
                        cursor: 'pointer',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      Forgot password?
                    </Typography>
                  </Box>
                </Box>

                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={loading}
                  sx={{
                    mt: 0.5,
                    height: 48,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: 15,
                    fontWeight: 600,
                    boxShadow: (t) => t.customShadows?.primary || '0 4px 14px rgba(14, 165, 233, 0.35)',
                  }}
                >
                  Sign in
                </LoadingButton>
              </Stack>
            </Form>
          </FormikProvider>

          <Box sx={{ display: 'flex', alignItems: 'center', my: 3, gap: 2 }}>
            <Divider sx={{ flex: 1 }} />
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              OR
            </Typography>
            <Divider sx={{ flex: 1 }} />
          </Box>

          <LoadingButton
            fullWidth
            size="large"
            variant="outlined"
            onClick={handleGoogleLogin}
            startIcon={<Iconify icon="flat-color-icons:google" sx={{ width: 22, height: 22 }} />}
            sx={{
              height: 48,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: 15,
              fontWeight: 600,
              borderColor: 'divider',
              '&:hover': { borderColor: 'grey.400', bgcolor: 'action.hover' },
            }}
          >
            Continue with Google
          </LoadingButton>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography component="span" sx={{ color: 'text.secondary', fontSize: 15 }}>
              Don&apos;t have an account?{' '}
            </Typography>
            <Typography
              component={RouterLink}
              href="/signup"
              sx={{
                color: 'primary.main',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Create workspace
            </Typography>
          </Box>

          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', textAlign: 'center', mt: 3, display: 'block', lineHeight: 1.6 }}
          >
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}