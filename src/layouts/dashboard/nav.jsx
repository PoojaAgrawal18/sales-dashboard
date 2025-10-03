/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton';

import { RouterLink } from 'src/routes/components';
import { useRouter, usePathname } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

// import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';

import { NAV } from './config-layout';
import navConfig from './config-navigation';
import AccountPopover from './common/account-popover';

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }) {
  const pathname = usePathname();
  const router = useRouter();

  const upLg = useResponsive('up', 'lg');

  const navWidth = {
    xs: '240px',
    sm: '260px',
    md: '280px',
    lg: NAV.WIDTH || '300px',
  };

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ py: 1, mt: 4, gap: 0.5, display: 'flex', textAlign: 'flex-start' }}> {/* Removed px: 3 */}
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );

  const renderContent = (
    <Box
      sx={{
        mx: { xs: 1.5, sm: 2, md: 2.3 },
        mb: 0,
        mt: 1,
        height: 'calc(100% - 90px)',
        position: 'relative',
        backgroundColor: '#0D477A',
        borderRadius: { xs: '8px', sm: '10px', md: '12px' },
        overflow: 'hidden',
      }}
    >
      <Scrollbar
        sx={{
          height: '100%',
          '& .simplebar-content': {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          },
        }}
      >
        {renderMenu}
        <Box sx={{ flexGrow: 1 }} />
        <AccountPopover />
      </Scrollbar>
    </Box>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { xs: navWidth.xs, sm: navWidth.sm, md: navWidth.md, lg: navWidth.lg },
        background: '#fff',
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: { xs: navWidth.xs, sm: navWidth.sm, md: navWidth.md, lg: navWidth.lg },
            display: 'flex',
            flexDirection: 'column',
            pt: { xs: 2, sm: 3, md: 4 },

          }}
        >
          <Box sx={{ mb: { xs: 1, sm: 1.5, md: 2 }, ml: { xs: 2, sm: 2.5, md: 3 } }} onClick={() => router.push('/dashboard')}>
            <img
              src="../../../assets/logo/cap-nav.png"
              alt="capline logo"
              style={{
                width: '100%',
                maxWidth: '179px',
                height: 'auto'
              }}
            />
          </Box>
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: { xs: navWidth.xs, sm: navWidth.sm, md: navWidth.md },
              boxShadow: (theme) => theme.shadows[2],
            },
          }}
        >
          <Box sx={{ p: { xs: 1, sm: 1.5, md: 2 } }}>
            <img
              src="../../../assets/background/Group 1000004573.png"
              alt="capline logo"
              style={{
                width: '100%',
                maxWidth: '159px',
                height: 'auto'
              }}
            />
          </Box>
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

// ----------------------------------------------------------------------

function NavItem({ item }) {
  const pathname = usePathname();
  const active = item.path === pathname;

  const renderTitle = () => {
    if (item.multiLine) {
      switch (item.title) {
        case 'Month on month AR Pendency':
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
              <span>Month on month</span>
              <span>AR Pendency</span>
            </Box>
          );
        case 'Monthly Collection/Production/AR/Adjustment/BTP':
          return (
            <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
              <span>Monthly Collection/</span>
              <span>Production/AR/</span>
              <span>Adjustment/BTP</span>
            </Box>
          );
        default:
          return item.title;
      }
    }
    return item.title;
  };

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: { xs: 36, sm: 40, md: 44 },
        borderRadius: 0,
        typography: 'body2',
        color: '#FFFFFF',
        fontWeight: 'fontWeightMedium',
        fontSize: { xs: '13px', sm: '13px', md: '14px' },
        justifyContent: 'flex-start',
        mx: 3,
        bgcolor: active ? '#6B7280' : 'transparent',
        '&:hover': {
          bgcolor: active ? '#5B626B' : 'rgba(255, 255, 255, 0.1)',
        },
        ...(active && {
          fontWeight: 'fontWeightSemiBold',
        }),
      }}
    >
      <Box sx={{ display: 'flex', alignItems: '' }}>
        <Box component="span" sx={{ width: 20, height: 20, ml: 0, mr:2 }}>
          {item.icon}
        </Box>
        <Box component="span">
          {renderTitle()}
        </Box>
      </Box>
    </ListItemButton>

  );
}
NavItem.propTypes = {
  item: PropTypes.object,
};