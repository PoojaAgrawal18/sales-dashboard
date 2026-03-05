import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import { useResponsive } from 'src/hooks/use-responsive';

import { NAV, HEADER } from './config-layout';

// ----------------------------------------------------------------------

const DASHBOARD_BG = '#0a0f2b'; // matches dashboard content area

const SPACING = 8;

export default function Main({ children, sx, navWidth: navWidthProp, ...other }) {
  const lgUp = useResponsive('up', 'lg');
  const navWidth = navWidthProp ?? NAV.WIDTH;

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: DASHBOARD_BG,
        py: `${HEADER.H_MOBILE + SPACING}px`,
        ...(lgUp && {
          px: 2,
          py: `${HEADER.H_DESKTOP + SPACING}px`,
          width: `calc(100% - ${navWidth}px)`,
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}

Main.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
  navWidth: PropTypes.number,
};
