/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, useFormik, FormikProvider } from 'formik';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Grid,
  Stack,
  Select,
  Divider,
  MenuItem,
  TextField,
  Typography,
  IconButton,
  FormControl,
  InputAdornment,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { AUTH_ACTIONS } from 'src/redux/auth/actions';
import { AUTH_API_ROUTES } from 'src/services/auth/constants';

import Iconify from 'src/components/iconify';

export default function SignUpView() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((reducers) => reducers.authReducer ?? {});
  const isLoading = Boolean(loading);

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required('Full name is required'),
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
      name: '',
      username: '',
      email: '',
      phoneNumber: '',
      password: '',
      state: '',
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      const trimmed = Object.fromEntries(
        Object.entries(values).map(([k, v]) => [
          k,
          typeof v === 'string' ? v.trim() : v,
        ])
      );
      dispatch({
        type: AUTH_ACTIONS.SIGNUP,
        payload: {
          body: trimmed,
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

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      bgcolor: 'background.paper',
      borderRadius: 2,
      '& fieldset': { borderColor: 'divider' },
      '&:hover fieldset': { borderColor: 'primary.main' },
      '&.Mui-focused fieldset': { borderColor: 'primary.main', borderWidth: 2 },
    },
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', fontFamily: 'inherit' }}>
      {/* Left Panel - Hero (matches nav/dashboard) */}
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
            Win more
            <br />
            deals, faster
          </Typography>

          <Typography
            sx={{
              fontSize: 18,
              color: 'rgba(148, 163, 184, 0.95)',
              maxWidth: 420,
              lineHeight: 1.6,
            }}
          >
            Revenue intelligence that transforms your pipeline into predictable growth
          </Typography>
        </Box>

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Stack spacing={2}>
            {[
              { value: '3.2x', label: 'Average deal velocity increase' },
              { value: '94%', label: 'Forecast accuracy' },
              { value: '10k+', label: 'Teams powered' },
            ].map((stat, i) => (
              <Box
                key={stat.label}
                sx={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 2,
                  py: 2,
                  borderTop: i === 0 ? 'none' : '1px solid rgba(148, 163, 184, 0.12)',
                }}
              >
                <Typography sx={{ fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
                  {stat.value}
                </Typography>
                <Typography sx={{ fontSize: 15, color: 'rgba(226, 232, 240, 0.9)', fontWeight: 500 }}>
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>

      {/* Right Panel - Form */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 3, sm: 6, md: 8 },
          bgcolor: 'background.default',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 480 }}>
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
              Get started
            </Typography>
            <Typography sx={{ fontSize: 15, color: 'text.secondary', lineHeight: 1.6 }}>
              Create your workspace and start closing deals
            </Typography>
          </Box>

          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="name"
                      placeholder="Full name"
                      {...getFieldProps('name')}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                      sx={inputSx}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="username"
                      placeholder="Workspace name"
                      {...getFieldProps('username')}
                      error={Boolean(touched.username && errors.username)}
                      helperText={touched.username && errors.username}
                      sx={inputSx}
                    />
                  </Grid>
                </Grid>

                <TextField
                  fullWidth
                  name="email"
                  placeholder="Work email"
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  sx={inputSx}
                />

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="phoneNumber"
                      placeholder="Phone number"
                      {...getFieldProps('phoneNumber')}
                      error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                      helperText={touched.phoneNumber && errors.phoneNumber}
                      sx={inputSx}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={Boolean(touched.state && errors.state)} sx={inputSx}>
                      <Select displayEmpty name="state" {...getFieldProps('state')}>
                        <MenuItem value="" disabled><em>State</em></MenuItem>
                        <MenuItem value="AL">Alabama</MenuItem>
                        <MenuItem value="AK">Alaska</MenuItem>
                        <MenuItem value="AZ">Arizona</MenuItem>
                      </Select>
                      {touched.state && errors.state && (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75 }}>
                          {errors.state}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>

                <TextField
                  fullWidth
                  name="password"
                  placeholder="Password (min. 6 characters)"
                  type={showPassword ? 'text' : 'password'}
                  {...getFieldProps('password')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: 'text.secondary' }}>
                          <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} sx={{ width: 22, height: 22 }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  sx={inputSx}
                />

                <LoadingButton
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isLoading}
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
                  Create workspace
                </LoadingButton>
              </Stack>
            </Form>
          </FormikProvider>

          <Box sx={{ display: 'flex', alignItems: 'center', my: 3, gap: 2 }}>
            <Divider sx={{ flex: 1 }} />
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>OR</Typography>
            <Divider sx={{ flex: 1 }} />
          </Box>

          <LoadingButton
            fullWidth
            size="large"
            variant="outlined"
            onClick={handleGoogleSignup}
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
              Already have an account?{' '}
            </Typography>
            <Typography
              component="span"
              onClick={handleLogin}
              sx={{
                color: 'primary.main',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Log in
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}