/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
// eslint-disable-next-line perfectionist/sort-imports
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';

import { useResponsive } from 'src/hooks/use-responsive';

import { NAV } from './config-layout';
import NotificationPanel from './common/notifications-popover';
// ----------------------------------------------------------------------

// Animation variants for text elements
const dashboardTitleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const MotionTypography = motion(Typography);

export default function Header({ onOpenNav }) {
  const theme = useTheme();

  const lgUp = useResponsive('up', 'lg');

  // const firstName = userDetails?.name?.split(' ')[0];


  return (
    <Box
      sx={{
        position: 'absolute',
        top: 16,
        borderRadius: '8px',
        ml: 5,
        height: '64px',
        zIndex: theme.zIndex.appBar + 1,
        backgroundColor: 'white',
        borderBottom: '1px solid #f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        left: lgUp ? `${NAV.WIDTH}px` : 0,
        right: 39,
        py: { xs: 0.5, sm: 1, md: 2 },
        px: { xs: 1, sm: 2, md: 3 },
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        <Box sx={{ flexGrow: 0 }} />

        <Box sx={{ width: '100%' }}>
          <Stack mt={0} ml={-6}>

            <MotionTypography
              initial="hidden"
              animate="visible"
              variants={dashboardTitleVariants}
              sx={{ textAlign: 'center', fontSize: '18px', fontWeight: 500, color: '#000000',ml:1 }}
            >
              <b>RCM 360</b> - Revenue Cycle Metrics & Monitoring Platform

            </MotionTypography>
          </Stack>


        </Box>
      </Toolbar>
    <NotificationPanel />

    </Box>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

