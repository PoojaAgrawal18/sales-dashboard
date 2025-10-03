/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import EmailIcon from '@mui/icons-material/Email';
// import TwitterIcon from '@mui/icons-material/Twitter';
import {
  Box,
  Link,
  Grid,
  Button,
  useTheme,
  Container,
  Typography,
  IconButton,
  useMediaQuery,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

const RcmPage = () => {
  const [setErrors] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);

  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const handleLanguageMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    handleLanguageMenuClose();
  };

  const handleSignIn = () => {
    router.push('/login');
  };
  const handleSignUp = () => {
    router.push('/signup');
  };
  const handleResetPassword = () => {
    router.push('/reset-password');
  };

  const handleCellClick = (cellContent) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(cellContent)) {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${cellContent}`, '_blank');
    } else {
      console.log('Clicked cell content:', cellContent);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
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
        <Box
          sx={{
            p: { xs: 1, sm: 2 },
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <Box sx={{ color: 'white' }}>
            <img
              src="../../../assets/logo/capline-logo.png"
              alt="capline logo"
                 style={{
              width: isMobile ? '179px' : '179px',
              marginLeft: isMobile ? '4px' : '8px',
              marginTop: '-2px',height:'45px'
            }}
            />
          </Box>
        </Box>

        <Container
          maxWidth="sm"
          sx={{
            py: { xs: 3, sm: 4, md: 6 },
            px: { xs: 2, sm: 3 },
            position: 'relative',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              sx={{
                color: 'white',
                fontWeight: 500,
                fontSize: { xs: '28px', sm: '36px', md: '50px' },
                lineHeight: 1.2,
                mb: 1,
                flexWrap: 'nowrap',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Welcome to RCM360°{' '}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: 'grey.300',
                mt: 5,
                fontSize: { xs: '13px', sm: '15px' },
                whiteSpace: { sm: 'nowrap' },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              Capline's RCM tool is an advanced platform that automates billing, coding, claims, and
              compliance for{' '}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'grey.300',
                fontSize: { xs: '13px', sm: '15px' },
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                whiteSpace: { sm: 'nowrap' },
                px: 1,
                mt: 0.6,
              }}
            >
              healthcare practices. It optimizes revenue, reduces denials, & enhances efficiency
              with real-time analytics & <br />
              seamless workflow integration.
            </Typography>
          </Box>
          <Box
            sx={{
              textAlign: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleSignIn}
              sx={{
                mt: 0,
                bgcolor: 'white',
                color: '#2C4E6C',
                '&:hover': { bgcolor: 'grey.100' },
                width: { xs: '100%', sm: '85%', md: '410px' },
                maxWidth: '410px',
                borderRadius: '4px',
                mx: 'auto',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Sign In
            </Button>
          </Box>

          <Box
            sx={{
              mt: { xs: 2, sm: 5 },
              textAlign: 'center',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'grey.300',
                fontSize: { xs: '11px', sm: '12px' },
                px: 2,
                mb: 0.5,
              }}
            >
              Are you having trouble signing in?{' '}
              <Link
                onClick={handleResetPassword}
                sx={{
                  color: '#FFFFFF',
                  fontSize: 'inherit',
                  textDecoration: 'underline',
                  textDecorationColor: '#FFFFFF',
                  fontWeight: 400,
                  cursor: 'pointer',
                }}
              >
                Click here
              </Link>
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'grey.300',
                fontSize: { xs: '11px', sm: '12px' },
                px: 2,
                overflowWrap: 'break-word',
                whiteSpace: { sm: 'nowrap' },
              }}
            >
              or please email Capline Healthcare Management Support at{' '}
              <Link
                style={{
                  color: '#FFFFFF',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontWeight: 400,
                }}
                onClick={() => handleCellClick('credentialing@caplinehealth.com')}
              >
                credentialing@caplinehealth.com{' '}
              </Link>
            </Typography>
          </Box>
          <Box
            sx={{
              mt: { xs: 2, sm: 3 },
              pt: { xs: 2, sm: 3 },
              borderTop: '1px solid white',
              width: '100%',
              borderColor: 'white',
              textAlign: 'center',
              mx: 'auto',
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: 'grey.300', fontSize: { xs: '12px', sm: '13px' }, mt: 1 }}
            >
              No account?
            </Typography>
            <IconButton
              sx={{
                mt: 0.5,
                border: '1px solid ',
                color: 'white',
                '&:hover': { bgcolor: 'primary.main' },
              }}
              onClick={handleSignUp}
            >
              <EmailIcon />
            </IconButton>
            <Typography
              variant="body2"
              sx={{ color: 'grey.300', mt: 0.5, fontSize: { xs: '12px', sm: '13px' } }}
            >
              Create one!
            </Typography>
          </Box>
        </Container>
      </Box>

      <Box
        sx={{
          bgcolor: 'background.paper',
          py: { xs: 1, sm: 2 },
          px: { xs: 2, sm: 4 },
          position: 'relative',
          mt: -5.5,
          height: '312px',
        }}
      >
        <Grid container spacing={{ xs: 1, md: 2 }} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: { xs: 1, md: 0 }, mt: { xs: 1, md: '55px' } }}>
              <img
                src="../../../assets/logo/cap-footer.png"
                alt="capline logo"
                style={{ width: isMobile ? '135px' : '135px' }}
              />
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  mt: 3,
                  fontSize: { xs: '10px', sm: '12px' },
                  fontWeight: 300,
                  color: '#747479',
                  mb: 2,
                }}
              >
                Capline Healthcare Management is a healthcare assistance company that provides
                credentialing, insurance verification, medical billing, and revenue cycle management
                services to healthcare practices across the United States.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: { xs: 'flex-start', md: 'flex-end' },
                gap: { xs: 1, sm: 2 },
                flexWrap: { xs: 'nowrap', sm: 'wrap' },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: 1, sm: 2 },
                  fontSize: { xs: '12px', sm: '14px' },
                  justifyContent: { xs: 'flex-start', md: 'flex-end' },
                  mt: { xs: 1, md: 9 },
                }}
              >
                <Typography
                  variant="body2"
                  component="a"
                  // href="https://www.caplinehealthcaremanagement.com/contact-us/"
                  target="_blank"
                  sx={{
                    color: '#2E2E38',
                    '&:hover': { color: 'text.secondary' },
                    textDecoration: 'underline',
                  }}
                >
                  Our locations
                </Typography>
                <Typography
                  variant="body2"
                  component="a"
                  // href="https://www.caplinehealthcaremanagement.com/"
                  target="_blank"
                  sx={{
                    color: '#2E2E38',
                    '&:hover': { color: 'text.secondary' },
                    textDecoration: 'underline',
                  }}
                >
                  Connect with us
                </Typography>
                <Typography
                  variant="body2"
                  component="a"
                  // href="https://www.caplinehealthcaremanagement.com/privacy-policy/"
                  target="_blank"
                  sx={{
                    color: '#2E2E38',
                    '&:hover': { color: 'text.secondary' },
                    textDecoration: 'underline',
                  }}
                >
                  Legal and privacy
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'flex-start', md: 'flex-end' },
                mt: { xs: 2, md: 6 },
                mb: 2,
                mr: -0.5,
              }}
            >
              <IconButton
                // href="https://www.facebook.com/CaplineHealthcareManagement"
                // target="_blank"
                size="small"
                sx={{ color: '#000', width: '44px', height: '44px' }}
              >
                <img src="../../../assets/background/facebook.svg" alt="logo" />
              </IconButton>
              <IconButton
                // href="https://www.linkedin.com/company/capline-healthcare-management-us/"
                // target="_blank"
                size="small"
                sx={{ color: '#000', width: '44px', height: '44px' }}
              >
                <img src="../../../assets/background/linkedin.svg" alt="logo" />
              </IconButton>
              <IconButton
                // href="https://www.instagram.com/caplinehealthcaremanagement/#"
                // target="_blank"
                size="small"
                sx={{ color: '#000', width: '44px', height: '44px' }}
              >
                <img src="../../../assets/background/twitter.svg" alt="logo" />
              </IconButton>
              <IconButton
                // href="https://www.youtube.com/@caplinehealthcaremanagement"
                // target="_blank"
                size="small"
                sx={{ color: '#000', width: '44px', height: '44px' }}
              >
                <img src="../../../assets/background/youtube.svg" alt="logo" />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default RcmPage;
