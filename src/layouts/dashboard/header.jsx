/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
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

export default function Header({ onOpenNav, navWidth: navWidthProp }) {
  const theme = useTheme();
  const lgUp = useResponsive('up', 'lg');
  const navWidth = navWidthProp ?? NAV.WIDTH;

  // const firstName = userDetails?.name?.split(' ')[0];


  return (
    <Box
      sx={{
        position: 'absolute',
        top: 16,
        borderRadius: 2,
        ml: 2,
        height: 56,
        zIndex: theme.zIndex.appBar + 1,
        backgroundColor: 'rgba(15, 23, 42, 0.85)',
        border: '1px solid rgba(255,255,255,0.09)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        left: lgUp ? `${navWidth}px` : 8,
        right: 16,
        py: 0,
        px: { xs: 2, md: 3 },
      }}
    >
      <Toolbar disableGutters sx={{ height: 1, flex: 1, px: { lg: 2 } }}>
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <MotionTypography
            initial="hidden"
            animate="visible"
            variants={dashboardTitleVariants}
            sx={{
              fontSize: 15,
              fontWeight: 600,
              color: '#e2e8f0',
              letterSpacing: '-0.01em',
            }}
          >
            <Box component="span" sx={{ color: '#94a3b8', fontWeight: 500 }}>
              Sales Dashboard
            </Box>
            <Box component="span" sx={{ mx: 0.5, color: 'rgba(255,255,255,0.2)' }}>·</Box>
            <Box component="span">Pipeline, revenue & performance</Box>
          </MotionTypography>
        </Box>
      </Toolbar>
      <NotificationPanel />
    </Box>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
  navWidth: PropTypes.number,
};

