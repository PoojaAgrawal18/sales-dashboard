import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowUpTwoToneIcon from '@mui/icons-material/KeyboardArrowUpTwoTone';
import KeyboardArrowDownTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone';

import { account } from 'src/_mock/account';

import { AUTH_ACTIONS } from '../../../redux/auth/actions';

// ----------------------------------------------------------------------

// const MENU_OPTIONS = [
//   {
//     label: 'Home',
//     icon: 'eva:home-fill',
//   },
//   {
//     label: 'Profile',
//     icon: 'eva:person-fill',
//   },
//   {
//     label: 'Settings',
//     icon: 'eva:settings-2-fill',
//   },
// ];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);

  const dispatch = useDispatch();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    dispatch({
      type: AUTH_ACTIONS.LOGOUT,
      payload: {},
    });
  };

  const { userDetails } = useSelector((reducers) => reducers.authReducer);
  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: '100%',
          height: '31px',
          borderRadius: 0,
          mb: 3,
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 16px',
          backgroundColor: '#0D477A',

        }}
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
        }}>
          <Avatar
            src={account.photoURL}
            alt={account.displayName}
            sx={{
              width: 25,
              height: 25,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ffffff',
              color: '#0D477A',
              fontSize: { xs: '14px', sm: '16px', md: '18px' },
            }}
          >
            {account.displayName.charAt(0).toUpperCase()}
          </Avatar>

          <Box sx={{
            ml: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontSize: '12px',
                  fontWeight: '500',
                  color: '#FFFFFF',
                  lineHeight: 1.3,
                }}
              >
                {userDetails?.clientName}
              </Typography>
              <IconButton
                onClick={handleOpen}
                size="small"
                sx={{ padding: 0, color: '#FFFFFF' }}
              >
                {open ? (
                  <KeyboardArrowUpTwoToneIcon sx={{ fontSize: 16 }} />
                ) : (
                  <KeyboardArrowDownTwoToneIcon sx={{ fontSize: 16 }} />
                )}
              </IconButton>            </Box>


            <Typography
              variant="body2"
              sx={{
                color: '#FFFFFF',
                fontSize: '9px',
                fontWeight: 300,
                fontFamily: 'Inter, sans-serif',
                lineHeight: 1.2,
              }}
            >
              {userDetails?.clientEmail}
            </Typography>
          </Box>
        </Box>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: -10,
            ml: -9,
            width: 138,
            backgroundColor: '#0D477A',
            borderRadius: 0,
          },
        }}
      >



        {/* {MENU_OPTIONS.map((option) => (
          <MenuItem key={option.label} onClick={handleClose}>
            {option.label}
          </MenuItem>
        ))} */}

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleLogout}
          sx={{
            typography: 'body2',
            color: '#FFFFFF',
            py: { xs: 0.5, sm: 0.75, md: 1 },
            fontSize: { xs: '12px', sm: '13px', md: '14px' },
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <LogoutIcon fontSize="small" />
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
