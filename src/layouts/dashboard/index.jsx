import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';

import Nav from './nav';
import Main from './main';
import Header from './header';
import { NAV, NAV_STORAGE_KEY } from './config-layout';

// ----------------------------------------------------------------------

function getStoredNavCollapsed() {
  try {
    const v = localStorage.getItem(NAV_STORAGE_KEY);
    return v === 'true';
  } catch {
    return false;
  }
}

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);
  const [navCollapsed, setNavCollapsed] = useState(getStoredNavCollapsed);

  const navWidth = navCollapsed ? NAV.WIDTH_COLLAPSED : NAV.WIDTH;

  useEffect(() => {
    try {
      localStorage.setItem(NAV_STORAGE_KEY, String(navCollapsed));
    } catch { /* empty */ }
  }, [navCollapsed]);

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} navWidth={navWidth} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav
          openNav={openNav}
          onCloseNav={() => setOpenNav(false)}
          collapsed={navCollapsed}
          onToggleCollapse={() => setNavCollapsed((c) => !c)}
          navWidth={navWidth}
        />

        <Main navWidth={navWidth}>{children}</Main>
      </Box>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
