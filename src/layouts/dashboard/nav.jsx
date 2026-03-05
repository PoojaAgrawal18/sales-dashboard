import { useEffect } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

import { RouterLink } from 'src/routes/components';
import { useRouter, usePathname } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import Scrollbar from 'src/components/scrollbar';

import navConfig from './config-navigation';
import AccountPopover from './common/account-popover';

// ----------------------------------------------------------------------
// Dashboard-Matched Theme - Dark Navy with Glassmorphism
// ----------------------------------------------------------------------

const THEME = {
  bg: 'linear-gradient(180deg, #0a1628 0%, #0f1c2e 100%)',
  navItemBg: 'rgba(59, 130, 246, 0.12)',
  navItemActiveBg: 'linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(37, 99, 235, 0.25) 100%)',
  itemHover: 'rgba(59, 130, 246, 0.15)',
  border: 'rgba(59, 130, 246, 0.15)',
  cardBorder: 'rgba(255, 255, 255, 0.08)',
  text: 'rgba(148, 163, 184, 0.85)',
  textActive: '#ffffff',
  accent: '#3b82f6',
  accentGlow: 'rgba(59, 130, 246, 0.4)',
  glassBg: 'rgba(15, 28, 46, 0.6)',
  glassBackdrop: 'blur(12px)',
  activeDot: '#3b82f6',
};

export default function Nav({ openNav, onCloseNav, collapsed, onToggleCollapse, navWidth }) {
  const pathname = usePathname();
  const router = useRouter();
  const upLg = useResponsive('up', 'lg');

  const widthExpanded = 280;
  const widthCollapsed = 72;
  const currentWidth = navWidth ?? (collapsed ? widthCollapsed : widthExpanded);

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname, openNav, onCloseNav]);

  const renderMenu = (
    <Stack
      component="nav"
      spacing={1}
      sx={{
        py: 2,
        px: collapsed ? 1.5 : 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} collapsed={collapsed} />
      ))}
    </Stack>
  );

  const renderContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: THEME.bg,
        borderRight: `1px solid ${THEME.border}`,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Logo / brand */}
      <Box
        onClick={() => router.push('/dashboard')}
        sx={{
          px: collapsed ? 1.5 : 2.5,
          py: 2.5,
          cursor: 'pointer',
          borderBottom: `1px solid ${THEME.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          mb: 0.5,
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            flexShrink: 0,
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            boxShadow: `0 4px 12px ${THEME.accentGlow}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography sx={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>
            S
          </Typography>
        </Box>
        {!collapsed && (
          <Box sx={{ ml: 1.5, minWidth: 0 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                color: THEME.textActive,
                letterSpacing: '-0.01em',
                fontSize: 15,
                lineHeight: 1.3,
              }}
            >
              Sales Hub
            </Typography>
            <Typography
              variant="caption"
              sx={{ 
                color: THEME.text, 
                fontSize: 11, 
                fontWeight: 500,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Analytics
            </Typography>
          </Box>
        )}
      </Box>

      <Scrollbar
        sx={{
          flex: 1,
          '& .simplebar-content': {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          },
        }}
      >
        {renderMenu}
        <Box sx={{ flexGrow: 1 }} />
        
        <Box sx={{ px: collapsed ? 1 : 2, pb: 2 }}>
          <AccountPopover collapsed={collapsed} />
        </Box>

        {/* Collapse toggle – desktop only */}
        {upLg && onToggleCollapse && (
          <Box sx={{ px: collapsed ? 1 : 2, pb: 2, pt: 0.5 }}>
            <Tooltip title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} placement="right">
              <IconButton
                onClick={onToggleCollapse}
                sx={{
                  width: '100%',
                  height: 36,
                  borderRadius: '8px',
                  border: `1px solid ${THEME.border}`,
                  color: THEME.text,
                  bgcolor: 'rgba(15, 28, 46, 0.4)',
                  backdropFilter: THEME.glassBackdrop,
                  '&:hover': {
                    bgcolor: THEME.itemHover,
                    color: THEME.textActive,
                    borderColor: THEME.accent,
                  },
                }}
              >
                {collapsed ? (
                  <ChevronRightRoundedIcon sx={{ fontSize: 20 }} />
                ) : (
                  <ChevronLeftRoundedIcon sx={{ fontSize: 20 }} />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Scrollbar>
    </Box>
  );

  return (
    <Box sx={{ flexShrink: { lg: 0 }, width: currentWidth }}>
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            left: 0,
            top: 0,
            width: currentWidth,
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            pt: 0,
            transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: widthExpanded,
              background: THEME.bg,
              borderRight: `1px solid ${THEME.border}`,
              boxShadow: '24px 0 48px rgba(0,0,0,0.5)',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
  collapsed: PropTypes.bool,
  onToggleCollapse: PropTypes.func,
  navWidth: PropTypes.number,
};

// ----------------------------------------------------------------------

function NavItem({ item, collapsed }) {
  const pathname = usePathname();
  const active = item.path === pathname;

  const content = (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 48,
        borderRadius: '12px',
        px: collapsed ? 1 : 2,
        py: 1.25,
        justifyContent: 'flex-start',
        gap: collapsed ? 0 : 2,
        position: 'relative',
        overflow: 'visible',
        ...(active && {
          bgcolor: THEME.navItemBg,
          color: THEME.textActive,
          fontWeight: 600,
          '&::before': {
            content: '""',
            position: 'absolute',
            left: -16,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 4,
            height: 24,
            bgcolor: THEME.accent,
            borderRadius: '0 4px 4px 0',
            boxShadow: `0 0 12px ${THEME.accentGlow}`,
          },
        }),
        ...(!active && {
          bgcolor: 'transparent',
          color: THEME.text,
          fontWeight: 500,
        }),
        fontSize: 14.5,
        transition: 'all 0.2s ease',
        '&:hover': {
          bgcolor: active ? THEME.navItemBg : THEME.itemHover,
          color: THEME.textActive,
          '& .nav-icon': { 
            color: THEME.accent,
            transform: 'scale(1.05)',
          },
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: collapsed ? '100%' : 'auto',
        }}
      >
        <Box
          className="nav-icon"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 36,
            height: 36,
            borderRadius: '10px',
            bgcolor: active ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
            color: active ? THEME.accent : THEME.text,
            fontSize: 20,
            flexShrink: 0,
            transition: 'all 0.2s ease',
          }}
        >
          {item.icon}
        </Box>
      </Box>
      {!collapsed && (
        <Box 
          component="span" 
          sx={{ 
            flex: 1, 
            overflow: 'hidden', 
            textOverflow: 'ellipsis', 
            whiteSpace: 'nowrap',
            letterSpacing: '-0.01em',
          }}
        >
          {item.title}
        </Box>
      )}
    </ListItemButton>
  );

  if (collapsed) {
    return (
      <Tooltip title={item.title} placement="right" arrow>
        {content}
      </Tooltip>
    );
  }

  return content;
}

NavItem.propTypes = {
  item: PropTypes.object,
  collapsed: PropTypes.bool,
};