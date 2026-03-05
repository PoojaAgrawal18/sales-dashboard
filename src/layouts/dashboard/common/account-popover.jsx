import { useState } from 'react';
import PropTypes from 'prop-types'; 
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

import { account } from 'src/_mock/account';

import { AUTH_ACTIONS } from '../../../redux/auth/actions';

// ----------------------------------------------------------------------

const SIDEBAR = {
  bg: 'rgba(15, 23, 42, 0.6)',
  border: '1px solid rgba(148, 163, 184, 0.1)',
  text: '#e2e8f0',
  textMuted: 'rgba(148, 163, 184, 0.9)',
  accent: '#38bdf8',
  hover: 'rgba(148, 163, 184, 0.08)',
};

// ----------------------------------------------------------------------

export default function AccountPopover({ collapsed }) {
  const [open, setOpen] = useState(null);
  const dispatch = useDispatch();
  const { userDetails } = useSelector((reducers) => reducers.authReducer);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    dispatch({ type: AUTH_ACTIONS.LOGOUT, payload: {} });
  };

  const trigger = (
    <Box
      onClick={handleOpen}
      sx={{
        mx: collapsed ? 0 : 1.5,
        mb: 2,
        py: 1.5,
        px: collapsed ? 0 : 2,
        borderRadius: 2,
        cursor: 'pointer',
        border: SIDEBAR.border,
        bgcolor: SIDEBAR.hover,
        transition: 'background-color 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'flex-start',
        '&:hover': {
          bgcolor: 'rgba(148, 163, 184, 0.12)',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 1.5 }}>
        <Avatar
          src={account.photoURL}
          alt={account.displayName}
          sx={{
            width: 36,
            height: 36,
            bgcolor: 'rgba(56, 189, 248, 0.2)',
            color: SIDEBAR.accent,
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          {(userDetails?.clientName || account.displayName || 'U').charAt(0).toUpperCase()}
        </Avatar>
        {!collapsed && (
          <>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: SIDEBAR.text,
                  lineHeight: 1.3,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {userDetails?.clientName || account.displayName || 'User'}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontSize: 11,
                  color: SIDEBAR.textMuted,
                  display: 'block',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {userDetails?.clientEmail || account.email || 'user@example.com'}
              </Typography>
            </Box>
            <KeyboardArrowDownRoundedIcon
              sx={{
                fontSize: 20,
                color: SIDEBAR.textMuted,
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
              }}
            />
          </>
        )}
      </Box>
    </Box>
  );

  return (
    <>
      {trigger}
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        PaperProps={{
          sx: {
            mt: -1,
            minWidth: 200,
            borderRadius: 2,
            border: SIDEBAR.border,
            boxShadow: '0 20px 40px rgba(0,0,0,0.35)',
            bgcolor: '#0f172a',
            overflow: 'hidden',
          },
        }}
      >
        <MenuItem
          disableRipple
          onClick={handleLogout}
          sx={{
            py: 1.5,
            px: 2,
            gap: 1.5,
            typography: 'body2',
            fontWeight: 500,
            color: SIDEBAR.text,
            '&:hover': {
              bgcolor: SIDEBAR.hover,
              color: SIDEBAR.accent,
            },
          }}
        >
          <LogoutRoundedIcon sx={{ fontSize: 20 }} />
          Log out
        </MenuItem>
      </Popover>
    </>
  );
}

AccountPopover.propTypes = {
  collapsed: PropTypes.bool,
};
